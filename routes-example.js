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
];

module.exports = routes;