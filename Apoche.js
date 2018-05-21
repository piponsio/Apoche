const config = require('./config.js');

var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var fs = require("fs");
var express = require('express');
var express = express();

var routes = require("./routes.js");
var route;
var proxy_host;
var temp;

var content_type = [
	"text/plain", "text/html", "text/css", "text/javascript",
	"image/gif", "image/png", "image/jpeg", "image/bmp", "image/webp",
	"audio/midi", "audio/mpeg", "audio/webm", "audio/ogg", "audio/wav",
	"video/webm", "video/ogg"
];

var format_type = {
"jpg": content_type[6],
"mp4": content_type[14]
};

function explorer(req,res,route){
	var root_directory = config.root_directory;
	var params = req.params[0];
	var path = root_directory+"/"+req.params[0];	

	if(route!==undefined){
		if( route.root_directory!=undefined && route.root_directory!='' ){	
			root_directory = route.root_directory;
		}
		if( route.physical_path==undefined &&  route.physical_path=='' ){
			route.physical_path="/";
		}
		params = route.physical_path;
		path = root_directory+route.physical_path;		
	}
	var index_routes = undefined;
	var route_temp = undefined;
	var middleware = require('node-phpcgi')({
	    documentRoot: root_directory,
	    handler: config.php
	});

	fs.readFile(path,function(err,data){

		if(err === null){

			dir = path.split("/");
			archive = dir[dir.length-1];
			format = archive.split(".");
			format = format[format.length-1];

			if(format=="php"){
				req.url=params;
				middleware(req, res, function(err) {
					console.log(err);	
				});
			}
			else{										
				res.set('Content-Type', format_type[format]);
				res.send(data);
			}
		}
		else{
			fs.stat(path, function(err,stats){
			
				if(err === null){
					
					if(stats.isDirectory()){

						fs.access(path+"index.php",function(err){
							if(err === null){
								
								req.url=params;
								req.url += "index.php";
								middleware(req, res);
							}
							else{
								fs.readFile(path+"index.html",function(err,data){
									if(err === null){
										res.set('Content-Type', 'text/html');
										res.send(data);
									}
									else{
										res.set('Content-Type', 'text/html');
										var html_dir = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">\n<html>\n\t<head>\n\t\t<title>Index of /'+req.params[0]+'</title>\n\t\t</head>\n\t<body>\n\t\t<h1>Index of /'+req.params[0]+'</h1>\n\t\t<ul>';
										if(req.params[0]!=''){
											html_dir += '\n\t\t\t<li><a href="'+req.url+'..">Parent Directory</a></li>';
										}
										
										fs.readdir(path,function(err,files){
											if(err === null){
												for(var i in files){
													html_dir += '\n\t\t\t<li><a href="'+req.url+files[i]+'">'+files[i];
													html_dir+='</a></li>';
												}																									
											html_dir += '\n\t\t</ul>\n\t</body>\n</html>';						
											res.send(html_dir);
											}
										});
									}
								});
							}

						});
					}
				}
				else{
					var req_url = req.url;

					for(var i = 0;i<routes.length;i++){
						expression = RegExp(routes[i].virtual_path);
						if(req_url.search(expression)==0){
							temp = req_url.replace(expression,routes[i].physical_path);
							index_routes = i;
							i=routes.length;
						}		
					}
					var temp2;
					if(index_routes!==undefined){	
						if(routes[index_routes]!= undefined && routes[index_routes]!=''){
							root_directory = routes[index_routes].root_directory;
						}
						temp2=root_directory+temp;
						fs.access(temp2,function(err){
							if(err===null){	
								if(routes[index_routes].host==undefined || routes[index_routes].host==""){
									routes[index_routes].host=config.host;
								}	
								if(routes[index_routes].port==undefined || routes[index_routes].port==""){
									routes[index_routes].port=config.port;
								}
								if(routes[index_routes].host == config.host && routes[index_routes].port == config.port){ 
									route_temp = Object.assign({},routes[index_routes]);
									route_temp.physical_path = temp;
									explorer(req,res,route_temp);
								}
								else{
									proxy_host = routes[index_routes].host+":"+routes[index_routes].port;					
									apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
								  		proxyReq.path=temp;
									});
									apiProxy.web(req, res, { target: 'http://'+proxy_host });	
								}						
							}
							else{
								res.set('Content-Type', 'text/html');
								res.send("<h1>Routing Error</h1>");		
							}		
						});	
					}
					else{
						res.set('Content-Type', 'text/html');
						res.send("<h1>Error404</h1>");		
					}
				}
			});
		}
	});
}



express.all('/*', function(req, res, next) {
	explorer(req,res);
});	
express.listen(config.port);