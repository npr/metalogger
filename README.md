## What is MetaLogger?

If you are familiar with [Apache Commons Logging](http://commons.apache.org/proper/commons-logging/) then you know 
why Node.js needs Metalogger, if not: keep reading.

Node.js is famous for its modular architecture. However, every module developer can have his or her own  preference 
to which logging library they prefer to use. This can lead to one of the following non-ideal scenarios:

1. No logging in the released code (typically what you see in most modules, currently)
2. Logging using the most simplistic tools that don't support varying logging levels
3. Chaos, when each module does extensive logging, but using completely differing libraries.

Other platforms have solved the problem of logging in elegant ways. Metalogger is an attempt to integrate that experience 
into Node.js and achieve seamless logging experience.

The metalogger module is a very lightweight bridge/wrapper for a number of popular logging implementations: 
[npmlog](https://github.com/isaacs/npmlog), 
[log](https://github.com/visionmedia/log.js), [util](http://nodejs.org/api/util.html). A node.js module that 
uses the metalogger library can choose which logging implementation to use at runtime.

Usage of Metalogger is not limited to just standalone modules. Full-blown Node applications may also choose to 
use Metalogger to ensure that a switch over to a different logging implementation won't be a hassle, if and when needed.

## Installation and Initialization

Install:

```bash
npm install metalogger
```

Initialization: 

```javascript
var log = require('metalogger')(plugin, level);
```

Where the arguments of initialization are:

1. `plugin`: short name of the implemented logging plugin. Current implementations include:  ('util', 'npmlog', 'log'). If you
   skip this value or pass `null`, it will default to the value of the environmental variable NODE_LOGGER_PLUGIN

    Full current list can be checked, at runtime, by issuing: 
    
    ```javascript
      log.loggers();
    ```
    
1. `level`: name of the default theshold logging level. If you
   skip this value or pass `null`, it will default to the value of the environmental variable NODE_LOGGER_LEVEL

    Current list of allowed level names can be retrieved by issuing:

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

As a best practice, you shouldn't set plugin and/or level values when initializing metalooger from your re-usable modules. 
If not set, these values default to NODE_LOGGER_PLUGIN and NODE_LOGGER_LEVEL environmental variables, allowing the main 
application to affect all modules in the application. 

Initialize metalooger, in your modules, as follows:

```javascript
  var log = require('metalogger')();
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
