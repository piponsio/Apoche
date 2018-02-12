# Apoche 0.0.4
Apoche is a Web Server based in Node.js, compatible with PHP.
Works on php and node.js projects at the same time without the need to install other programs. Choose your directories to publish, your version of php preferred and ready.

## Easy Routing
Easily redirects one or more Node.js project, path to files, virtual directories and more. Only editing **/routes.js**

```
var routes = [

	{
	"host":"localhost",
	"port": 600,
	"original_path": "/blog",
	"path_to_redirect": "/",
	"type":0
	},
	

	{
	"host":"localhost",
	"port": 80,
	"original_path": "/VirtualDirectory1",
	"path_to_redirect": "/folder",
	"type":0
	},
	
	
	{
	"host":"localhost",
	"port": 80,
	"original_path": "/img",
	"path_to_redirect": "/1.jpg",
	"type":1
	}

];

module.exports = routes;
```
## Coming soon ...
* Redirects with Regular Expressions.
* phpMyAdmin included.
* Log Files.
* Protected routes.