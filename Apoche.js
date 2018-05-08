var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer();

var fs = require("fs");

var express = require('express');
var express = express();

var routes = require("./routes.js");
var index_routes;
var route;
var proxy_host;
var temp;

var webserver_path = 'WebServer';
var port = 80;
var php = 'C:/php/php-cgi.exe'; //Example for Windows


var middleware = require('node-phpcgi')({
    documentRoot: webserver_path,
    handler: php
});

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

express.all('/*', function(req, res, next) {
	
	index_routes = undefined;
	var path = webserver_path+"/"+req.params[0];	

	fs.readFile(path,function(err,data){

		if(err === null){

			dir = path.split("/");
			archive = dir[dir.length-1];
			format = archive.split(".");
			format = format[format.length-1];

			if(format=="php"){
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
						
						if(path[path.length-1]!='/'){
							path += '/'
						}

						if(req.url[req.url.length-1]!='/'){
							req.url += '/'
						}

						fs.access(path+"index.php",function(err){
							if(err === null){
								
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
													html_dir += '\n\t\t\t<li><a href="'+req.url+files[i]+'/">'+files[i];
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
					if(req_url[req_url.length-1]!='/'){
						req_url += '/'
					}
					for(var i = 0;i<routes.length;i++){
						expression = RegExp(routes[i].virtual_path);
						if(req_url.search(expression)==0){
							temp = req_url.replace(expression,routes[i].physical_path);
							index_routes = i;
							i=routes.length;
						}		
					}
					fs.access(webserver_path+temp,function(err){
						if(err===null){
							if(index_routes!==undefined){
								route = routes[index_routes];
								proxy_host = route.host+":"+route.port;					
								apiProxy.on('proxyReq', function (proxyReq, req, res, options) {
							  		proxyReq.path=temp;
								});
								apiProxy.web(req, res, { target: 'http://'+proxy_host });	
							}				
						}
						else{
							res.set('Content-Type', 'text/html');
							res.send("<h1>Error404</h1>");			
						}
					});
				}
			});
		}
	});
});	
express.listen(port);