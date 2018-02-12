var httpProxy = require('http-proxy');

var apiProxy = httpProxy.createProxyServer();

var fs = require("fs");

var express = require('express');
var app = express();

var routes = require("./routes.js");
var index_routes;
var route;
var proxy_host;

var webserver_path = 'C:/WebServer';
var port = 80;
var php = 'C:/php/php-cgi.exe'; //Example for Windows

var params;

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

app.all('/*', function(req, res, next) {
	params = req.params[0];
	index_routes = undefined;
	var path = webserver_path+"/"+req.params[0];
	if(fs.existsSync(path)){

		fs.stat(path, function(err,stats){
		
			if(stats.isDirectory()){
				
				if(path[path.length-1]!='/'){
					path += '/'
				}

				if(fs.existsSync(path+"index.php")){
					if(req.url[req.url.length-1]!='/'){
						req.url += '/'
					}
					req.url += "index.php";
					middleware(req, res);
				}
				else if(fs.existsSync(path+"index.html")){
					fs.readFile(path+"index.html",function(err,html){
						res.set('Content-Type', 'text/html');
						res.send(html);
					});
				}
				else{
					res.set('Content-Type', 'text/html');
					
					var html_dir = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN"><html><head><title>Index of /'+req.params[0]+'</title></head><body><h1>Index of /'+req.params[0]+'</h1><ul>';
					if(req.params[0]!=''){
						html_dir += '<li><a href="..">Parent Directory</a></li>';
					}
					
					files=fs.readdirSync(path);
					
					for(var i in files){
						html_dir += '<li><a href="./'+files[i]+'">'+files[i];

						var stats2 = fs.statSync(path+files[i]);
							if(stats2.isDirectory()){
								html_dir += '/';
							}							

						html_dir+='</a></li>';

					}
					html_dir += '</ul></body></html>'						
					res.send(html_dir);
				}
			}
			if(stats.isFile()){
				
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
						
					fs.readFile(path,function(err,html){
						res.set('Content-Type', format_type[format]);
						res.send(html);
					});
				}
			}

		});
	}
	else{
		
		var req_url = req.url;

		if(req_url[req_url.length-1]!='/'){
			req_url += '/'
		}

		for(var i in routes){
			if(req_url.indexOf(routes[i].original_path)  != -1){
				index_routes = i;
				route = routes[index_routes];
				proxy_host = route.host+":"+route.port;
			}
		}
		if(index_routes==undefined){
			res.set('Content-Type', 'text/html');
			res.send("<h1>Error404</h1>");	
		}
		else{			
			apiProxy.on('proxyReq', function (proxyReq, req, res, options) {

				if(routes[index_routes].type == 0){
			  		
			  		var original_path = route.original_path;

			  		if(original_path[original_path.length-1]!='/'){
						original_path += '/'
					}

					var expression =  new RegExp(original_path);
			  		
			  		var req_url = req.url;
			  		
			  		if(req_url[req_url.length-1]!='/'){
						req_url += '/'
					}

					var path_to_redirect = routes[index_routes].path_to_redirect;

					if(path_to_redirect[path_to_redirect.length-1]!='/'){
						path_to_redirect += '/'
					}
			  		
			  		var new_path = req_url.replace(expression,path_to_redirect);
			  
			  		if(new_path[new_path.length-1]=='/' && new_path.length>1){
						new_path = new_path.substring(0, new_path.length- 1);			  		
					}

			  		proxyReq.path =  new_path;
			  	}
			  	if(routes[index_routes].type == 1){
			  		proxyReq.path =  routes[index_routes].path_to_redirect;
			  	}
			});
			apiProxy.web(req, res, { target: 'http://'+proxy_host });					
		}	
	}
});	
app.listen(port);