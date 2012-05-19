/**
 *@author   <a href="mailto:major.yezhouquan@gmail.com">Zhouquan.yezq</a>
 *@description  the monitor.js depend on the logging.js, that want to solve the log under ie6 etc lower browser do not show up.
 */
(function($) {

  //the monitor constructor and config
  var _m={
    MONITOR_PAGE: "monitor.html", //this html file ,you should put together with your project file.   
	trunOn: false,
	_openWindow: function() {
	    var url = window.location.href;
	    url = url.replace(window.location.pathname, '/' + this.MONITOR_PAGE);
	    this._window = window.open(url, "Monitor_", "directories=no," + "location=no," + "menubar=no," + "status=yes," + "personalbar=no," + "titlebar=yes," + "toolbar=no," + "resizable=yes," + "scrollbars=no," + "width=500," + "height=400");
	    window.childOpen = true;
	    if (this._window) {
	      window.focus();
	    }
	    window.onunload = this.UpdateChild;
    },
	UpdateChild: function() {
	    //Only if child window is still open, set the parentOpen property
	    if (window.childOpen == true) {
	      //this._window.opener=null;
	      //this._window.parentOpen = false
	      //this._window.close();
	    }
    },
	appendMessage: function(msg) {
	    var w = this._window;
	    if (!w || !window.childOpen) {
	      this._openWindow();
	      w = this._window;
	    }
	    if (w && w.appendMessage) {
	      if (w.isFirstTime()) {
	        var memory = $.getLogger().constructor.logPool;
	        for (var i = 0; i < memory.length; i++) {
	          w.appendMessage(memory[i]);
	        }
	      }
	      w.appendMessage(msg);
	    }
    }
  };
 
  if($.getLogger){//if the log class exist, attend monitor to log prototype
	  window.childOpen = false;
	  var logPro=$.getLogger().constructor.prototype;
	  logPro.monitor=_m;
	  $(document).keydown(function(e) {
	    if (e.ctrlKey && e.altKey && e.keyCode == 76) { //ctrl+alt+l
	      _m.trunOn = true;
	      _m._openWindow();
	    }
	  });
  }
  
})(jQuery);
