var routes = [

	{
	"host":"localhost",
	"port": 600,
	"virtual_path": "/blog",
	"physical_path": "/"
	},
	

	{
	"host":"localhost",
	"port": 80,
	"virtual_path": "/VirtualDirectory1",
	"physical_path": "/a"
	},

	{
	"host":"localhost",
	"port": 80,
	"virtual_path": "/img",
	"physical_path": "/b/1.jpg"
	},

	{
	"host":"localhost",
	"port": 80,
	"virtual_path": "/test/[0-9]+",
	"physical_path": "/b/1.jpg"
	}

];

module.exports = routes;