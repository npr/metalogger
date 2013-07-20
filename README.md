## What is MetaLogger?

If you are familiar with [Apache Commons Logging](http://commons.apache.org/proper/commons-logging/) then you know 
why Node.js needs Metalogger, if not: keep reading.

Node.js is famous for its modular architecture. However, every module developer can have his or her own  preference 
to which logging library they prefer to use. This can lead to one of the following non-ideal scenarios:

1. No logging in the released code (typically what you see in most modules, currently)
2. Logging using the most simplistic tools that don't support varying logging levels
3. Chaos, when each module does extensive logging, but using completely differing libraries.

Other platforms have solved this problem in elegant ways (yes, Node can learn **some** things from Java) so this is
an example of Node learning how to do unified logging from Apache/Java.

The metalogger module is a very lightweight bridge for different logging implementations. A library that 
uses the metalogger library can be used with any logging implementation at runtime. Metalogger comes with support
for a number of popular logger modules and can also default to native logging.

Usage of Metalogger is not limited to just standalone modules. Full-blown Node applications may also choose to 
Metalogger to ensure that a change to a different logging implementation is not a hassle, if and when needed.

## Installation and Initialization

Install:

```bash
npm install metalogger
```

Initialize: 

```javascript
var log = require('metalogger')(process.env.NODE_LOGGER_PLUGIN, process.env.NODE_LOGGER_LEVEL);
```

Where the arguments of initialization are:

1. Short name of the implemented logging plugin. Current implementations include:  ('util', 'npmlog', 'log'). 

    Full current list can be checked, at runtime, by issuing: 
    
    ```javascript
      log.loggers();
    ```
    
1. Name of the logging level. Current list allowed can be retrieved by issuing:

    ```
      log.levels();
    ```    
    
    As of this writing the list of levels mirrors that of syslog (and log.js) and is as follows (in decreasing criticality):
    
- __EMERGENCY__  system is unusable
- __ALERT__ action must be taken immediately
- __CRITICAL__ the system is in critical condition
- __ERROR__ error condition
- __WARNING__ warning condition
- __NOTICE__ a normal but significant condition
- __INFO__ a purely informational message
- __DEBUG__ messages to debug an application

## Usage

The great value of metalogger is in unifying (to the level it makes sense) the usage of various loggers. Even though first 
three implemented loggers (util, npmlog, log) are quite different, metalogger manages to bridge these differences.

Most commonly you will probably want to parametrize initialization of your module's logging:

```javascript
  var log = require('metalogger')(process.env.NODE_LOGGER_PLUGIN, process.env.NODE_LOGGER_LEVEL);
```

after which you can use the simple or advanced syntaxes, regardless of the underlying logging plugin.

#### Simple Syntax:

In the simple syntax, you can just pass some message (or a javascript object, which will be properly expanded/serialized):
```javascript
log.debug(message);
```

#### Advanced Syntax

In the complex syntax, you can use caption (first argument), format (second argument) and unlimited number of value-arguments
to construct complex expressions:

```javascript
log.debug("Caption: ", "Formatted sequence is string: %s, number: %d, number2: %d", somestring, somenumber, othernumber);
```
the format syntax follows the semantics of [util.format](http://nodejs.org/api/util.html#util_util_inspect_object_options)
