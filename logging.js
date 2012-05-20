/**
*@class jQuery.getLogger
*@name   jQuery.getLogger
*@author   <a href="mailto:zhouquan.yezq@alibaba-inc.com">Zhouquan.yezq</a>
*@description jQuery.getLogger will return a logger instance, and it already solve the console
*script issue on lower browser version like IE6. and for the IE6 or other lower version, we use the log
monitor to show the log .
 <h2>How to use?<h2>
<pre>
  var mylog=jQuery.getLogger('com.company.project.moduleName');
  mylog.log('this is the log');
</pre>
*/
(function($){
   //the _log constructor
   
   var _log=function(){};
   _log.level=4; //default level, show all the log,if you want to close the log, just set log level as -1
   _log.cacheSize=1000;
   _log.setLevel=function(level){//set logger level to filter the logger , so just show the logger level you focus.
     _log.level=level;
   };
   
   var methods = [ "error", "warn", "info", "debug", "log"];//0-4 level 
   //log level not very clear compare with back-end  --log4j
   
   $.extend(_log.prototype, {
    /***
          *  @name jQuery.getLogger#enabled
          * @function
          */
     enabled: function(lev) {
       if(lev>_log.level ) {
         return false;
       }
       return true;
     },
     /***
          *  @name jQuery.getLogger#doFilter
          * @function
          */
	 doFilter: function(log) {
	   if(_log.filter && _log.filter.test && !_log.filter.test(log[0]) && !_log.filter.test(this.name())) {
	     return false
	   }
	   return true;
	 },
     name: function() {
       return this._name;
     },
     /***
          *  @name jQuery.getLogger#log
          * @function
          */
     log: function() {
        this._log(4, arguments);
     },
     /***
          *  @name jQuery.getLogger#debug
          * @function
          */
     debug: function() {
        this._log(3, arguments);
     },
     /***
          *  @name jQuery.getLogger#info
          * @function
          */
     info: function() {
        this._log(2, arguments);
     },
    /***
          *  @name jQuery.getLogger#warn
          * @function
          */
     warn: function() {
        this._log(1, arguments);
     },
     /***
          *  @name jQuery.getLogger#error
          * @function
          */
     error: function() {
        this._log(0, arguments);
     },
     _handler: function(level, name, msg){
        var method=methods[level];
        msg=[[method,name+" |"].join(" | ")].concat(Array.prototype.slice.call(msg));
             if(!_log.logPool){
               _log.logPool=[];
             }
			 if(_log.logPool.length===_log.cacheSize){
			    //if the cache log more than cacheSize , then remove the  previous first one.
			    _log.logPool=_log.logPool.slice(1);
			 }
             _log.logPool.push(msg.join(''));
             if( this.monitor && this.monitor.trunOn ){ //$.browser.msie &&
               this.monitor.appendMessage(msg.join(''));
             }
       if(self.console && self.console.error) {
           if(console.log.apply) {//IE8 do not work on this way. undefined
              console[method].apply(console, msg);       
           }else {
              console[console[method]?method:'log'](msg);
           }
       }
     },
	 
    _log: function(level, msg) {
      if (this.enabled(level) && this.doFilter(msg)) {
         this._handler(level,this.name(),msg);
		 if(_log.filter && _log.filter.test &&  (_log.filter.test(msg) || _log.filter.test(this.name()))){// if have filter action , do it
		   _log.filterAction?_log.filterAction(msg):'';
		 }
      }
    }
     
   });
   
   var logs={};//logs container
   //extend this getLoggger method as jQuery method
   $.extend({
     getLogger: function(name) {
       if (!logs[name]) {
          logs[name] = new _log(name);
          logs[name]._name=name;
        }
        return logs[name];
     },
	 setLogLevel: function(level) {
	   _log.level=level;
	 },
	/**
	 *  @param filter should be RegExp pattern
	 *  @fct this is the call back function, it will pass the log message into
	 *    the fct parameter as the first parameter. so user could do some action to process the log message , like
	 *    send the message to the back-end or others.  etc: fct(message)
	 */
	 setLogFilter: function(filter,fct) {
	   _log.filter=filter;
	   fct?(_log.filterAction=fct):'';
	 }
	 
   });   
   
})(jQuery);
