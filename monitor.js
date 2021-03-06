/**
 *@author   <a href="mailto:major.yezhouquan@gmail.com">Zhouquan.yezq</a>
 *@description  the monitor.js depend on the logging.js, that want to solve the log under ie6 etc lower browser do not show up problem.
 */
(function($) {

  //the monitor constructor and config
  var childWin;
  var _m={
    MONITOR_PAGE: "monitor.html", //this html file ,you should put together with your project file.   
	trunOn: false,
	_openWindow: function() {
	    //var url = window.location.href;
		var url=_m.MONITOR_PAGE;
	    //url = url.replace(window.location.pathname, '/' + this.MONITOR_PAGE);
	    childWin = window.open(url, "Monitor_", "directories=no," + "location=no," + "menubar=no," + "status=yes," + "personalbar=no," + "titlebar=yes," + "toolbar=no," + "resizable=yes," + "scrollbars=no," + "width=500," + "height=400");
	    window.childOpen = true;
	    if (childWin) {
	      window.focus();
	    }
	    window.onunload = this.UpdateChild;
    },
	UpdateChild: function() {
	    //if parent win close, then close the child win
	    if (window.childOpen == true) {
	      childWin.opener=null;
	      childWin.parentOpen = false
	      childWin.close();
		  childWin=null;
	    }
    },
	appendMessage: function(msg) {
	    if ( !window.childOpen) {
	      this._openWindow();
	    }
	    if (childWin && childWin.appendMessage) {
	      if (childWin.isFirstTime()) {
	        var memory = $.Logger().constructor.logPool;
	        for (var i = 0; i < memory.length; i++) {
	          childWin.appendMessage(memory[i]);
	        }
	      }
	      childWin.appendMessage(msg);
	    }
    },
	
    gc: function(){
	   childWin=null;
	 }
  };
 
  if($.Logger) {//if the log class exist, attend monitor to log prototype
	  window.childOpen = false;
	  var logPro=$.Logger().constructor.prototype;
	  logPro.monitor=_m;
	  $(document).keydown(function(e) {
	    if (e.ctrlKey && e.altKey && e.keyCode == 76) { //ctrl+alt+l
	      _m.trunOn = true;
	      _m._openWindow();
	    }
	  });
  }
  
})(jQuery);
