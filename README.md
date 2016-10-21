#JS-NTC-Logger
_NTC - is abbreviation of [Nestor the Chronicler](https://en.wikipedia.org/wiki/Nestor_the_Chronicler)_

Flexible, configurable JavaScript logger, that can be used both in the browser and with NodeJS.

## Documentation

* [Installation](#installation)
    * [Install with npm](#install-with-npm)
    * [Or clone repository on github](#or-clone-repository-on-github)
* [Idea and concept](#idea-and-concept)
* [How to use](#how-to-use)
    * [Initialization on back-end](#initialization-on-back-end)
    * [What is logging interface](#what-is-logging-interface)
        * [Get logging interface](#get-logging-interface)
    * [Do logging](#do-logging)
        * [Immediate log record creation](#immediate-log-record-creation)
        * [Log record construction](#log-record-construction)
* [Logs processing](#logs-processing)
    * [Filters in place](#filters-in-place)
        * [FilterAny](#filterany)
    * [Formatters in place](#formatters-in-place)
        * [FormatterSingleLine](#formattersingleline)
    * [Writers in place](#writers-in-place)
        * [WriterToConsole](#writertoconsole)
* [Logging interface](#logging-interface)
* [Log record interface](#log-record-interface)
* [Syslog levels](#syslog-levels)


## Installation

#### Install with npm

```bash
npm install js-ntc-logger 
```

#### Or clone repository on github

You can clone GitHub repository [https://github.com/GeorP/js-ntc-logger](https://github.com/GeorP/js-ntc-logger):

```bash
git clone https://github.com/GeorP/js-ntc-logger.git
```

Once you clone the project, got to project folder and install dependencies:

```bash
cd js-ntc-logger 
npm install 
```

Project is written with TypeScript, so you need a compiler. Please follow installation instructions on [https://www.typescriptlang.org](https://www.typescriptlang.org)

Once you get TypeScript, you can compile ES6, ES5 and browser with SystemJS loader versions.:
```bash
npm run build
```

To run unit tests use:
```bash
npm run test
```

## Idea and concept

Idea of this library is to provide flexible and configurable loggin tool, that can be easily integrated across
entire application and allow you to collect and process logs in centalized way. Process mechanism of the log records 
can be easily adjusted or extended. And of course you can use it both, on the client and back-end sides.

###### Let's introduce some terms:

* `Logger` - Central entity, that coordinates all log records processing
* `Loggin interface` - Interface, that provide functionality to create log records, do log action and get new 
logging interface that inherits metadata from current one.
* `Log record` - Entity that holds information about specific log record and has interface to manipulate metadata of it 
* `Filter` - Allow us to filter Log Records that should be processed and ignore all other.
* `Formatter` - Log record represents by set of data: message, attached data, location, tags. 
Forrmatter serialize all this data (it can actually ignore some of it) to a string. It receives only that log records 
that been passed throw filter,
* `Writer` - It receives string from formatter and process it some how. It can log it to console, write to file, 
  send via sockets or whatever else.
* `Log handler` - It's concrete combination of filter, formatter and writer, that can be registered in Logger. By design
filters, formatter and writers are independent from each other, so you can have set of each entities and make different
 combinations if them for concrete cases.
 
 
 
```text
+--------------+  Create new     +-------------------+  create   +------------+
|              |---------------->|                   |---------->|            |
|    Logger    |                 | Logging Interface |           | Log Record |
|              |<----------------|                   |<----------|            |
+--------------+      save       +-------------------+   save    +------------+
  |                                 ^             |
  |                                 |             |
  |                                 |   inherit   |
  |                                 |_____________|
  |
  |
  |        +------------------------------------------------+
  |        | Log handler 1                                  |
  |--------|                                                |
  |        | +-----------+   +-----------+   +-----------+  |
  |        | | Filter    |-->| Formatter |-->| Writer    |  |
  |        | +-----------+   +-----------+   +-----------+  |
  |        +------------------------------------------------+
 ... 
  |        +------------------------------------------------+
  |        | Log handler N                                  |
  |--------|                                                |
           | +-----------+   +-----------+   +-----------+  |
           | | Filter    |-->| Formatter |-->| Writer    |  |
           | +-----------+   +-----------+   +-----------+  |
           +------------------------------------------------+

```

Of course you can define your own filters, formatters and writers.


## How to use 

Library initially developed with TypeScript, and also it compiled to ES5, ES6 and browser version with SystemJS loader.

### Initialization on back-end

For the back-end we going to use ES6 version (you also can find version compiled in ES5 and go with it, 
there should be much difference in initialization and use).
 
```JavaScript

const NtcLogger = require('js-ntc-logger').NtcLogger;
let logger = NtcLogger.createDefaultLogger();
let l = logger.getInterface();

l.log("Just message is enough");

```

### What is logging interface

So, we have configured logger, with all needed log handlers. What we can do now?
First of all, Logger is central entity and it coordinates log processing, but it dont have methods to log, to do it 
we should get logging interface, to be able to actually do logging.
The simplest way is to call `getInterface` method of a logger, you can find detailed description of it [here](#logging-interface). 

```JavaScript
let l = logger.getInterface();
```

After you get the logging interface you can log all you want. The basic way is to log just a message:

```JavaScript
l.log("Just message is enough");
```

#### Get logging interface

There are two optional parameters in `getInterface` method of a Logger: `location` and `tags`. `location` is a simple 
string that describe place where this logging interface will be used. You can leave it empty, if you have simple 
application that is quite small and you can easily identify where log been done. You can pass something like `root` or
`app` or name of your application. If you pass location, all log records done with current logging interface will have
it metadata, for example is you use default logger, like in example:

```JavaScript
let l = logger.getInterface('root');
l.log("Just message is enough");
```

you should see in console something like this:

```
[10/21/2016, 11:50:28 AM]	Just message is enough	.root
```

As you can see log record has passed massage and also location inherited from logging interface, and time when this log 
record been done.

Usually we can represent our appliaction like tree of components/modules. And our logger interface can be inherited. 
You just call `getInterface` method of existing logging interface and of course you can specify location:
  
```JavaScript
const rootL = logger.getInterface('root');
rootL.log("Init our application");

const subL = rootL.getInterface('Permissions');
subL.log('Init submodule Permissions');
//...
subL.log("Load user's permissions from server");
```
Output with default logger should be like this:

```
[10/21/2016, 11:58:06 AM]	Init our application	.root
[10/21/2016, 11:58:06 AM]	Init submodule Permissions	.root.Permissions
[10/21/2016, 11:58:06 AM]	Load user's permissions from server	.root.Permissions
```

You can inherit location as many time as you want.

The second parameters of logging interface is `tags`. Tags is array of strings, tags will be attached to each log record
made by this logging interface.

```JavaScript
let l = logger.getInterface('root', ['example', 'tmp']);
l.log("Just message is enough");
```

And you should see in console:

```
[10/21/2016, 12:02:30 PM]	Just message is enough	.root		example,tmp
```

The same as location, tags will be inherited for child logging interfaces:

```JavaScript
const rootL = logger.getInterface('root', ['core']);
rootL.log("Init our application");

const subL = rootL.getInterface('Permissions', ['service']);
subL.log('Init submodule Permissions');
//...
subL.log("Load user's permissions from server");
```

And result:

```
[10/21/2016, 12:04:58 PM]	Init our application	.root		core
[10/21/2016, 12:04:58 PM]	Init submodule Permissions	.root.Permissions		core,service
[10/21/2016, 12:04:58 PM]	Load user's permissions from server	.root.Permissions		core,service
```

### Do logging

As you already know we do logging with our Logging Interface. There is two possible way to do log record: immediately 
do log record or construct it and then save.

#### Immediate log record creation

Main instrument that you have for it is method `log`, it cat take four parameters: `message`, `data`, `location` and 
`tags`. All of them, except `message` are optional. We already know how to use it just passing message, so lets talk 
now about additional parameters.

##### Parameter `data`

We can attach `data` to our log record. It's simple, we passing any informationw e want as second parameter:

```JavaScript
l.log("Init application", {modules: [
	"user_profile",
	"permissions",
	"articles",
	"comments"
]});

l.log("Permission loading error", "server not responded");
```  

You should see in console:

```
[10/21/2016, 12:17:18 PM]	Init application    {"modules":["user_profile","permissions","articles","comments"]}
[10/21/2016, 12:17:18 PM]	Permission loading error    server not responded
```

In the same way you can pass any JavaScript type and it will be attached to this log record. How this data processed and 
serialized we will discuss when talk about Formatters.


##### Parameter `location`

It's easy. It works completely the same as with logging interface. The only difference is that location will attached 
for one concrete log record. 

```JavaScript
const l = logger.getInterface('root');

l.log("Init application", {modules: [
	"user_profile",
	"permissions",
	"articles",
	"comments"
]}, 'loader');

l.log("Permission loading error", "server not responded", 'transport');

```  

Our result in console:

```
[10/21/2016, 12:23:03 PM]	Init application	.root.loader	{"modules":["user_profile","permissions","articles","comments"]}
[10/21/2016, 12:23:03 PM]	Permission loading error	.root.transport	server not responded
```

As you can see it add to location, inherited from our logging interface.


##### Parameter `tags`

And the same with tags. We just specify tags for concrete log record:

```JavaScript
const l = logger.getInterface();

l.log("Init application", {modules: [
	"user_profile",
	"permissions",
	"articles",
	"comments"
]}, 'loader', ['initialization']);

l.log("Permission loading error", "server not responded", 'transport', ['initialization']);

```  

And result:

```
Init application	.loader	{"modules":["user_profile","permissions","articles","comments"]}	initialization
[10/21/2016, 12:25:48 PM]	Permission loading error	.transport	server not responded	initialization
```

##### Point syslog levels

Also you can easily attach tag that identify syslog levels, if you are not familiar with it, please take a look 
[here](#syslog-levels). For this you have special methods: `emerg`, `alert`, `crit`, `error`, `warning`, `notice`, 
`info`, `debug`. All these methods have the same signature as `log` method. All they do, they call `log` method and pass 
appropriate tag.

```JavaScript
const l = logger.getInterface();

l.info("Init application", {modules: [
	"user_profile",
	"permissions",
	"articles",
	"comments"
]}, 'loader', ['initialization']);

l.emerg("Permission loading error", "server not responded", 'transport', ['initialization']);

```  

You will see in console:

```
[10/21/2016, 12:47:06 PM]	Init application	.loader	{"modules":["user_profile","permissions","articles","comments"]}	initialization,__info
[10/21/2016, 12:47:06 PM]	Permission loading error	.transport	server not responded	initialization,__emerg
```

As you can see tags that represent syslog levels starts with `__` in order not to mix with user tags that can have the 
same name.


#### Log record construction

Alternative way is to construct the log record. For this logging interface has method `l` that accept one parameter 
`message` and returns Log Record.
To save this log record you should call `log` method on it.

```JavaScript
const l = logger.getInterface();
let logRecord = l.l('Constructing log record');
logRecord.log();
```

And result:

```
[10/21/2016, 12:56:57 PM]	Constructing log record
```

Also log record has methods, that we already familiar with: `data` to attach data, `tag` to attach list of tags, `loc` 
to specify location. And methods to attach syslog tag: `emerg`, `alert`, `crit`, `error`, `warning`, `notice`, `info`, 
`debug`. Log record implements fluent interface, so all of this methods return log record itself, so you can easily 
manipulate it.
 
```JavaScript
const l = logger.getInterface();
l.l('Constructing log record').loc('example').info().log();
```

Result:

```
[10/21/2016, 1:07:20 PM]	Constructing log record	.example    __info
```

The main advantage of this that you can create log record in one place and pass it to some function to attach data or 
metadata or just save it later.


## Logs processing

We already know how to create log records, now it's time to discuss how we process them.
As you remember from [Idea and concept](#idea-and-concept), to process log records we have special entity - Log handler 
that consist of Filter, Formatter and Writer. Our Logger can have multiple log handlers registered at the time or don't 
have them at all. You may think of a Logger as some of coordinator, it receives created log records and pass them for 
processing to log handlers, after that it erase log record.

Algorithm of log handler is simple: it checks if log record pass Filter, if yes - uses Formatter to serialize log record 
to string and pass this string to Writer.

```
+-------------+
| Logger      |
+-------------+
   |
   | process Log Record
   |
+-------------+
| Log Handler |
+-------------+
   |
   | Match filter?
   |
+-------------+ No
| Filter      |------| Do nothing
+-------------+
   |
   | Serialize to string
   |
+-------------+
| Formatter   |
+-------------+
   |
   | Do something with this string, e.g. log to console,
   | display to a user, write to file, write to database,
   | send via AJAX or sockets, print 
   | or do wahtever you want.
   |
+-------------+
| Writer      |
+-------------+
 
```

So, now we can have set of different filters, formatters and writers, we can implement our own if we need. And then we 
just configure our Logger by registering log handlers with needed combination of filter, formatter and writer.

In our examples we use default logger:

```JavaScript

const NtcLogger = require('js-ntc-logger').NtcLogger;
let logger = NtcLogger.createDefaultLogger();

```

Lets see what actually happens inside:

```JavaScript

const ntcLogger = require('js-ntc-logger');
const { Logger, LogRecord, LoggingInterface, LogHandler, 
        FilterAny, FormatterSingleLine, WriterToConsole } = ntcLogger;

let logger = new Logger(LogRecord, LoggingInterface);

let handler = new LogHandler(
    'any_to_console_as_single_line',
    FilterAny.create(),
    FormatterSingleLine.create(),
    WriterToConsole.create()
);
logger.registerHandler(handler);
let l = logger.getInterface();

l.log("Just message is enough");

```

So, as you can see, you can manually configure logger.

Also you can use LoggerFactory, to configure logger. Let's do the same with the factory:

```JavaScript

const NtcLogger = require('js-ntc-logger').NtcLogger;
let logger = NtcLogger.createLogger([
    {
        name: 'any_to_console_as_single_line',
        filter: 'FilterAny',
        formatter: 'FormatterSingleLine',
        writer: 'WriterToConsole'
    }
]);
let l = logger.getInterface();
l.log("Just message is enough");

```

As you can see, to configure custom logger you should specify configuration of log handlers. It simple list of objects, 
that describes log handler. Log handler option defined by `ILogHandlerOptions` interface in `/src/core/i/ILoggerFactory.ts`
  
```typescript

interface ILogHandlerOptions {
    name: string;
    filter: string;
    formatter: string;
    writer: string;
}

```
Where: 
* `name` - name of the log handler, it's used only to identify concrete log handler in list of log handler, nothing more 
* `filter` - Name of the filter, registered in logger factory 
* `formatter` - Name of the formatter, registered in logger factory 
* `writer` - Name of the writer, registered in logger factory


### Filters in place

#### FilterAny

It's simple filter that pass all log records.


### Formatters in place

#### FormatterSingleLine

Tis formatter serialize log record to next shape:

```javascript
`[${date.toLocaleString()}]  ${message}  ${location}  ${JSON.serialize(data)}  ${tags}`
```

### Writers in place

#### WriterToConsole

This writer just print all serialized log records to console, using `console.log()`


## Logging interface

###### log
`log (message: string, data?:any, loc?:string, tags?:string[]):void`

Creates new Log record and process it

 * `message` - message that describes log record
 * `data` - Data attached to the log record
 * `loc` - Location, where this log done
 * `tags` - Array of tags attached for this specific log record
 

###### emerg
`emerg (message: string, data?:any, loc?:string, tags?:string[]):void`

Creates new Log record with Emergency tag and process it

* `message` - message that describes log record
* `data` - Data attached to the log record
* `loc` - Location, where this log done
* `tags` - Array of tags attached for this specific log record


###### alert
`alert (message: string, data?:any, loc?:string, tags?:string[]):void`

Creates new Log record with Alert tag and process it

* `message` - message that describes log record
* `data` - Data attached to the log record
* `loc` - Location, where this log done
* `tags` - Array of tags attached for this specific log record


###### crit
`crit (message: string, data?:any, loc?:string, tags?:string[]):void`

Creates new Log record with Critical tag and process it

* `message` - message that describes log record
* `data` - Data attached to the log record
* `loc` - Location, where this log done
* `tags` - Array of tags attached for this specific log record


###### error
`error (message: string, data?:any, loc?:string, tags?:string[]):void`

Creates new Log record with Error tag and process it

* `message` - message that describes log record
* `data` - Data attached to the log record
* `loc` - Location, where this log done
* `tags` - Array of tags attached for this specific log record


###### warning
`warning (message: string, data?:any, loc?:string, tags?:string[]):void`

Creates new Log record with Warning tag and process it

* `message` - message that describes log record
* `data` - Data attached to the log record
* `loc` - Location, where this log done
* `tags` - Array of tags attached for this specific log record

###### notice
`notice (message: string, data?:any, loc?:string, tags?:string[]):void`

Creates new Log record with Notice tag and process it

* `message` - message that describes log record
* `data` - Data attached to the log record
* `loc` - Location, where this log done
* `tags` - Array of tags attached for this specific log record


###### info
`info (message: string, data?:any, loc?:string, tags?:string[]):void`

Creates new Log record with Info tag and process it

* `message` - message that describes log record
* `data` - Data attached to the log record
* `loc` - Location, where this log done
* `tags` - Array of tags attached for this specific log record


###### debug
`debug (message: string, data?:any, loc?:string, tags?:string[]):void`

Creates new Log record with Debug tag and process it

* `message` - message that describes log record
* `data` - Data attached to the log record
* `loc` - Location, where this log done
* `tags` - Array of tags attached for this specific log record

###### l
`l (message: string): ILogRecord`

Creates new log record with passed message, that allow attach additional metadata to log record and save it later
See Log record interface.

* `message` - message that describes log record

###### serializeError
`serializeError (error: Error): ISerializedError`

Serialize error to object

* `error` - JavaScript error


###### getInterface
`getInterface (loc: string, tags: string[]): ILoggingInterface;`

Get new logging interface that inherits tag and location

* `loc` - Location that will be added to location of the current logging interface
* `tags` -  List of tags that will be merged with tags of the current logging interface


## Log record interface

Log record object implements Fluent interface, that allow you easily manipulate it.

###### data
`data (value: any): ILogRecord`

Attach data related to the log record and return itself

* `value` - Any data related to this log record. If you call it few times - it will replace previously added data.


###### tag
`tag (value: string[]):ILogRecord`

Attach new tags to log record and return itself

* `value` - New tags that related to this log record. Tags will be merged with already existed, not replaced!


###### loc
`loc (value: string):ILogRecord`

Specify location of a log record and return itself

* `value` - location that will be added to already existed (inherited from logging interface or previously added).
 If logging interface has specified location, during initialization, 'root' - it will be represented as '.root'. 
 If you specify location on log record, for example 'CatalogModule', it will be '.root.CatalogModule'. If you call
 `loc` method one more time on the same record and pass for example 'loadStructure', location will be 
 '.roo.CatalogModule.loadStructure'. So `loc` method not replacing previously added location metadata to log record, 
 but extending it.

 
###### emerg
`emerg ():ILogRecord`
 
Attach emergency tag to log record and return itself
 

###### alert
`alert ():ILogRecord`
 
 Attach alert tag to log record and return itself
 

###### crit
`crit ():ILogRecord`
 
Attach critical tag to log record and return itself


###### error
`error ():ILogRecord`
 
Attach error tag to log record and return itself
 
 
###### warning
`warning ():ILogRecord`
  
 Attach warning tag to log record and return itself
 
 
###### notice
`notice ():ILogRecord`

Attach notice tag to log record and return itself


###### info
`info ():ILogRecord`

Attach info tag to log record and return itself


###### debug
`debugs ():ILogRecord`

Attach debug tag to log record and return itself


###### toObject
`toObject (): ISerializedLogRecord`

Serialize log record to object


###### log
`log ()`

Process log record


###### erase
`erase ()`

Erase all data of the log record, to prevent memory leaks


## Syslog levels

All syslog level tags defined in file `/src/core/utils.ts`, here you can find it's values:

```JavaScript
export const LOG_EMERGENCY = '__emerg';
export const LOG_ALERT = '__alert';
export const LOG_CRITICAL = '__crit';
export const LOG_ERROR = '__err';
export const LOG_WARNING = '__warning';
export const LOG_NOTICE = '__notice';
export const LOG_INFORMATIONAL = '__info';
export const LOG_DEBUG = '__debug';


// Syslog levels: https://en.wikipedia.org/wiki/Syslog
//_______________________________________________________________________________________________________
//| Value |   Severity	   |  Keyword  |	Description	                                                 |
//|=======|================|===========|=================================================================|
//|  0    | Emergency      | emerg     | System is unusable                                              |
//|  1    | Alert          | alert     | Should be corrected immediately                                 |
//|  2    | Critical       | crit      | Critical conditions                                             |
//|  3    | Error          | err       | Error conditions                                                |
//|  4    | Warning        | warning   | May indicate that an error will occur if action is not taken    |
//|  5    | Notice         | notice    | Events that are unusual, but not error conditions               |
//|  6    | Informational  | info      | Normal operational messages that require no action              |
//|  7    | Debug          | debug     | Information useful to developers for debugging the application  |
//|_______|________________|___________|_________________________________________________________________|
```