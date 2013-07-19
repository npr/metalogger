metalogger
==========

## What is MetaLogger?

If you are familiar with [Apache Commons Logging](http://commons.apache.org/proper/commons-logging/) then you know 
why Node.js needs Metalogger, if not: keep reading.

Node.js is famous for its modular architecture. However, every module developer can have his or her own  preference 
to a which logging library they prefer to use. This can lead to either 

1. No logging in the released code (typically what you see in most libraries, currently)
2. Logging using the most simplistic tools that don't support varying logging levels
3. Chaos, when each module does extensive logging, but using completely differing libraries.

Other platforms have solved this problem in elegant ways (yes, Node can learn **some** things from Java) so this is
an example of Node learning how to do unified logging from Apache/Java.

The metalogger module is a extremely lightweight bridge for different logging implementations. A library that 
uses the metalogger library can be used with any logging implementation at runtime. Metalogger comes with support
for a number of popular logger modules and can also default to native logging.

Usage of Metalogger is not limited to just standalone modules. Full-blown Node applications may also choose to 
Metalogger to ensure that a change to a different logging implementation is not a hassle, if and when needed.
