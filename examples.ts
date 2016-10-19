import {LoggerFactory} from './index';

// Create default logger: log all records to console, format them as single line
let logger = LoggerFactory.createDefaultLogger();

// Before you start, you should get Logging Interface. It can be hierarchical, it means that in our case variable 'l'
// also has method 'getInterface', if you call it - it will inherits all metadata of our 'root' logging interface
// it can be very useful if you have submodules or some kind of hierarchical logical or lexical structure in your code
// You can pass not optional parameter - location, and each log record made with logging interface will have this metadata
let l = logger.getInterface("root");

// The simplest way to use it - call 'log' method and pass a message
l.log("Just message is enough");
// You should see in console something like:
// [10/19/2016, 10:24:49 PM]	Just message is enough	.root
// You can see location '.root' at the end of the string

// Also you can attach data to your log record.
l.log("Initialize with config", {apiUrl: 'http://api.some.host'});
// Our formatter uses JSON.stringify to serialize data.
// So you should see in console something like this:
// [10/19/2016, 10:24:49 PM]	Initialize with config	.root	{"apiUrl":"http://api.some.host"}

// You can specify location for concrete log record. In can be useful if you would like to point concrete method name
// or specify a class
l.log("Initialize pagination module", {perPage: 20}, 'catalog');
// As you can see, location will iherits metadata of logging interface, you should see something like:
// [10/19/2016, 10:32:55 PM]	Initialize pagination module	.root.catalog	{"perPage":20}

