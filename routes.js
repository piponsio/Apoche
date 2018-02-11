var routes = [

	{
	"host":"localhost",
	"port": 666,
	"original_path": "/jadetest",
	"path_to_redirect": "/", //redirect to localhost:666/
	"type":0
	},
	

	{
	"host":"localhost",
	"port": 80,
	"original_path": "/tiki",
	"path_to_redirect": "/carpeta",
	"type":0
	},
	
	
	{
	"host":"localhost",
	"port": 80,
	"original_path": "/foto",
	"path_to_redirect": "/1.jpg",
	"type":1
	}

];

module.exports = routes;