# Apoche 0.0.5
Apoche is a Web Server based in Node.js, compatible with PHP.
Works on php and node.js projects at the same time without the need to install other programs. Choose your directories to publish, your version of php preferred and ready.

## Easy Routing
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
* Manual and easy installer for windows and linux.
* Connection with Mysql 8.0 Sql & NoSql.
* phpMyAdmin included.
* Log Files.
* Protected routes.
* HTTPS and others protocol for redirections