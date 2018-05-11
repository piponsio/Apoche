var routes = [

	{
	"virtual_path": "/blog",
	"root_directory": "",
	"host":"localhost",
	"port": 600,
	"physical_path": "/"
	},
	

	{
	"virtual_path": "/VirtualDirectory1",
	"root_directory": "",
	"host":"localhost",
	"port": 80,
	"physical_path": "/examples/a"
	},

	{
	"virtual_path": "/img",
	"root_directory": "",
	"host":"localhost",
	"port": 80,
	"physical_path": "/examples/b/1.jpg"
	},

	{
	"virtual_path": "/test/[0-9]+",
	"root_directory": ".www/examples",
	"host":"localhost",
	"port": 80,
	"physical_path": "/b/1.jpg"
	}

];

module.exports = routes;