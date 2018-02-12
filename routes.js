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