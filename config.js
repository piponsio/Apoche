exports.webserver_path = './WebServer';
exports.port = 80;
exports.php = "C:/php/php-cgi.exe";

/*	EXAMPLES AND EXPLAINS

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