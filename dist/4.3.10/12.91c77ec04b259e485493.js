webpackJsonp([12],{1341:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(80),u=a(n),s=r(305),c=r(1372),o=a(c),i=r(1686),d=r(1388),f=r(1687),l=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(f);t.default=(0,o.default)(d.model,{namespace:"dashboard",state:{weather:{city:"\u6df1\u5733",temperature:"30",name:"\u6674",icon:"//s5.sencdn.com/web/icons/3d_50/2.png"},sales:[],quote:{avatar:"http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236"},numbers:[],recentSales:[],comments:[],completed:[],browser:[],cpu:{},user:{avatar:"http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236"}},subscriptions:{},effects:{query:u.default.mark(function e(t,r){var a,n=t.payload,c=r.call,o=r.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(i.query,(0,s.parse)(n));case 2:return a=e.sent,e.next=5,o({type:"updateState",payload:a});case 5:case"end":return e.stop()}},e,this)}),queryWeather:u.default.mark(function e(t,r){var a,n,s,c,o=t.payload,i=void 0===o?{}:o,d=r.call,f=r.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return i.location="shenzhen",e.next=3,d(l.query,i);case 3:if(a=e.sent,!(n=a.success)){e.next=10;break}return s=a.results[0],c={city:s.location.name,temperature:s.now.temperature,name:s.now.text,icon:"//s5.sencdn.com/web/icons/3d_50/"+s.now.code+".png"},e.next=10,f({type:"updateState",payload:{weather:c}});case 10:case"end":return e.stop()}},e,this)})}}),e.exports=t.default},1372:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(){for(var e={state:{},subscriptions:{},effects:{},reducers:{}},t=[],r={},a=[],n={},u=[],c={},f=[],l={},p=arguments.length,y=Array(p),h=0;h<p;h++)y[h]=arguments[h];var m=y.reduce(function(e,d){return e.namespace=d.namespace,"object"!==(0,o.default)(d.state)||Array.isArray(d.state)?"state"in d&&(e.state=d.state):(i(d.state,t,r),(0,s.default)(e.state,d.state)),i(d.subscriptions,a,n),(0,s.default)(e.subscriptions,d.subscriptions),i(d.effects,u,c),(0,s.default)(e.effects,d.effects),i(d.reducers,f,l),(0,s.default)(e.reducers,d.reducers),e},e);return d(m,"state",r),d(m,"subscriptions",n),d(m,"effects",c),d(m,"reducers",l),m}Object.defineProperty(t,"__esModule",{value:!0});var u=r(294),s=a(u),c=r(57),o=a(c);t.default=n;var i=function(e,t,r){},d=function(e,t,r){}},1388:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var n=r(4),u=a(n),s=r(1372),c=a(s),o={reducers:{updateState:function(e,t){var r=t.payload;return(0,u.default)({},e,r)}}},i=(0,c.default)(o,{state:{list:[],pagination:{showSizeChanger:!0,showQuickJumper:!0,showTotal:function(e){return"Total "+e+" Items"},current:1,total:0}},reducers:{querySuccess:function(e,t){var r=t.payload,a=r.list,n=r.pagination;return(0,u.default)({},e,{list:a,pagination:(0,u.default)({},e.pagination,n)})}}});e.exports={model:o,pageModel:i}},1686:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.query=void 0;var n=r(80),u=a(n),s=r(194),c=a(s),o=(t.query=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,o.request)({url:d,method:"get",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(68)),i=o.config.api,d=i.dashboard},1687:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.query=void 0;var n=r(80),u=a(n),s=r(194),c=a(s),o=(t.query=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.key="i7sau1babuzwhycn",e.abrupt("return",(0,o.request)({url:i+"/weather/now.json",method:"get",data:t}));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(68)),i=o.config.APIV1}});