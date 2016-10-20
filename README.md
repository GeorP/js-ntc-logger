#JS-NTC-Logger
_NTC - is abbreviation of [Nestor the Chronicler](https://en.wikipedia.org/wiki/Nestor_the_Chronicler)_

Flexible, configurable JavaScript logger, that can be used both on front-end and back-end side

Once you checkout the project, please don't forget to do:
```bash
npm install
```


Build project with Babel and run tests:
```bash
npm run build; npm run test
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

### Back-end

For the back-end we going to use ES6 version (you also can find version compiled in ES5 and go with it, 
there should be much difference in initialization and use).
 
```JavaScript

const LoggerFactory = require('./index').LoggerFactory;
let l = LoggerFactory.getInterface("root");
l.log("Just message is enough");

```



### Logging interface

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


### Log record interface

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