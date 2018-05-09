# Apoche 0.0.6
Apoche is a Web Server based in Node.js, compatible with PHP.
Works on php and node.js projects at the same time without the need to install other programs. Choose your directories to publish, your version of php preferred and ready.

## First use of Apoche.
The configuration of Apoche is very simple, so do not be afraid as it will still be explained step by step. Let's start.  

### Config.
The config is the 3 lines of **config.js**

```
exports.webserver_path = './WebServer';
exports.port = 80;
exports.php = "C:/php/php-cgi.exe";

/*
EXAMPLES AND EXPLAINS

exports.webserver_path = './WebServer';

//Website root directory is is the content that is loaded when visitors enter your domain name in a web browser.
//For default this directory is inside of Apache directory, but is possible choose other path.
//Example for Windows: "C:/WebServer".
//Example for Linux: 
//Example for all: "./WebServer".

exports.port = 80;

//Server listening port

exports.php = 'C:/php/php-cgi.exe'; //Example for Windows
exports.php = ""; //Example for Linux

//Path of php-cgi

*/
```

### Installation of php for Windows.

Documentation and downloads in: https://windows.php.net/.  
*Note: Don't forget to install the necessary version of visual c++ for your chosen php version.*

### Installation of php for Linux.

Pending...

## Easy Routing.
Easily redirects one or more Node.js project, path to files, virtual directories and more. Only editing **/routes.js**.  
Identify patterns in the route and redirectionals easily using regular expressions.

```
var routes = [

	{
	"host":"localhost",
	"port": 600,
	"virtual_path": "/blog",
	"physical_path": "/",
	"type":0
	},
	//Show in the path /blog the contents of a Node.js server in port 600

	{
	"host":"localhost",
	"port": 80,
	"virtual_path": "/VirtualDirectory1",
	"physical_path": "/a"
	},
	//Redirect to other directory

	{
	"host":"localhost",
	"port": 80,
	"virtual_path": "/img",
	"physical_path": "/b/1.jpg"
	},
	//Redirect to a file

	{
	"host":"localhost",
	"port": 80,
	"virtual_path": "/test/[0-9]+",
	"physical_path": "/b/1.jpg"
	}
	//Redirect with Regular Expression to image
];

module.exports = routes;
```
## Coming soon ...
* Manual of install of Linux.
* Choose other Website directory root in routes.js.
* Easy installer for windows and linux.
* Connection with Mysql 8.0 Sql & NoSql.
* phpMyAdmin included.
* Log Files.
* Protected routes.
* HTTPS and others protocol for redirections