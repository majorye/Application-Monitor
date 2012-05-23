
Application Log Monitor 是一个开源，简单，易用的Log Monitor

---


## 想解决的问题


1. **统一项目中的Log方式，解决低版本浏览器下console.info等的脚本错误问题
1. **让开发人员，在低版本的浏览器，比如IE6,也能看见Log. 解决低版本浏览器调试之痛
1. **让前端根据Log的级别来打Log,规范Log级别
1. **在调试阶段，可以只显示某一类的Log,提高开发效率
1. **当出现某类严重错误时，开发人员可以收集这类的Log，发送到后端做监控




## 目前设计的原则

jQuery PlugIn, 简单，易用



## 目前API

- $.Logger
- $.Logger.setLogLevel
- $.Logger.setLogFilter

## 使用示例

- var mylog=$.Logger("logger-monitor-tester");
- $.Logger.setLogLevel(4);  // logger-monitor-tester
- $.Logger.setLogFilter(/^.*monitor.*$/,function(msg){
-  //do the action , like send request to the back-end or store the log in some place
- });

- mylog.log("+++log test start+++");