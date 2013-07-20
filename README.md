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

```bash
npm install metalogger
```bash

```javascript
var log = require('metalogger')('util', 'info');
```

Where the the arguments of initialization are:

1. Short name of the implemented logging plugin. Current implementations include:  ('util', 'npmlog', 'log'). 

    Full current list can be checked, at runtime, by issuing: 
    
    ```javascript
      log.loggers();
    ```
    
1. Name of the logging level. Current list allowed can be retrieved by issuing:

    ```
      log.levels();
    ```    
    
    As of this writing the list of levels mirrors that of syslog (and log.js) and is as follows:
    
- 0 __EMERGENCY__  system is unusable
- 1 __ALERT__ action must be taken immediately
- 2 __CRITICAL__ the system is in critical condition
- 3 __ERROR__ error condition
- 4 __WARNING__ warning condition
- 5 __NOTICE__ a normal but significant condition
- 6 __INFO__ a purely informational message
- 7 __DEBUG__ messages to debug an application

