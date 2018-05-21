# Apoche 0.0.8
Apoche is a Web Server based in Node.js, compatible with PHP.
Works on php and node.js projects at the same time without the need to install other programs. Choose your directories to publish, your version of php preferred and ready.

## First use of Apoche.
The configuration of Apoche is very simple, so do not be afraid as it will still be explained step by step. Let's start.  

### Config.
The config is the 4 lines.  
Example of **/config.js**

```
exports.root_directory = './www';
exports.host = "localhost";
exports.port = 80;
exports.php = "C:/php/php-cgi.exe";
```

	exports.root_directory = "C:/www";	 //Example for Windows  
	exports.root_directory = "";		 //Example for Linux  
	exports.root_directory = "./www";	 //Example for all  
Website root directory is is the content that is loaded when visitors enter your domain name in a web browser.  
For default this directory is inside of Apoche directory, but is possible choose other path.

	exports.host = "localhost"; //Example of Server Host  

	exports.port = 80; //Example of Server listening port (80 is the port default in the web browsers).  

	exports.php = 'C:/php/php-cgi.exe'; //Example for Windows  
	exports.php = ""; 					//Example for Linux  
Path of php-cgi

### Installation of php for Windows.

Documentation and downloads in: https://windows.php.net/.  
*Note: Don't forget to install the necessary version of visual c++ for your chosen php version.*

### Installation of php for Linux.

Pending...

## Easy Routing.
Easily redirects one or more Node.js project, path to files, virtual directories and more. Only editing **/routes.js**.  
Identify patterns in the route and redirectionals easily using regular expressions.  
**Example of /routes.js**

```
var routes = [
	{
	"host":"localhost",
	"port": 600,
	"virtual_path": "/blog",
	"physical_path": "/"
	},
	//Internal redirection to another server in Node.js in port 600.

	{
	"host":"localhost",
	"port": 80,
	"root_directory": "./www/examples",
	"virtual_path": "/VirtualDirectory1",
	"physical_path": "/a"
	},
	//Internal routing. virtual path to physical path.

	{
	"root_directory": "./www/examples",
	"virtual_path": "/img",
	"physical_path": "/b/1.jpg"
	},
	//Internal routing. Host and port optional. 

	{
	"root_directory": "./www/examples/c",
	"virtual_path": "/test-([0-9]+)",
	"physical_path": "/$1"
	}
	//Internal routing using Regular Expression. 
	//For more info of Regular Expression 
	//(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
];

module.exports = routes;
```

The variable routes is a array of JSON.

	"host":"localhost" 			//Example of internal routing.  
	"host":"192.168.0.55"		//Example of internal routing or internal net redirection.  
	"host":"www.example.com"	//Example of external redirection.  

**"host"** is the host of routing or redirection.
This is optional, if this not exist or is empty will take a value of config.host(Default host of server).

**"port"** is the listen port of routing/redirection, internal or external.
Is possible create a routing using virtual paths if host and port are the same of config.host (Default host of server) and config.port (Default port of server).  

Is possible redirect a virtual path to physical path in other web server created in Node.js, Nginx, Apoche or others that start with "Ap" and end with "che" just is need a not use a same ports.  

If the other web server is off, Apoche will fail.  
This is optional, if this not exist or is empty will take a value of config.port(Default port of server).  

**root_directory** each route can have a own root directory.  

This is optional, if this not exist or is empty will take a value of config.root_directory(Default root directory of server).  

**"virtual_path"** is the virtual path with which you enter from the address bar.  

If this path exist(virtual_path is a real path), the preference will be given to the existing. Accessing to file or directory.  

Is possible use Regular Expressions in part or totally of virtual path.  

This is required, NO optional. if this not exist or is empty the server will show a "Routing Error" instead of "Error 404".  

**"physical_path"** is a physical path to routing or redirect.  

Is possible use a literal expression or use the regular expression memory to change data format.  

## Coming soon ...
* Manual of install of Linux.
* Easy installer for windows and linux.
* Connection with Mysql 8.0 Sql & NoSql.
* phpMyAdmin included.
* Log Files.
* Protected routes.
* HTTPS and others protocol for redirections