webpackJsonp([9],{1359:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=r(1380),n=a(u),s=r(69),c=(r(1522),r(623)),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(c),o=r(1395),f=r(626),d=a(f),l=r(644),p=a(l),h=(0,p.default)({app:d.default,component:function(){return r.e(12).then(r.bind(null,622))}});d.default.model((0,n.default)(h,{namespace:"test"+Math.random()}));var v=(i.query,i.changeStatus,i.updateFlyTime,i.blurSearch,s.config.prefix,{pages:[]});t.default=(0,n.default)(o.pageModel,{namespace:"multiPages",state:v,subscriptions:{setup:function(e){var t=e.dispatch;e.history.listen(function(e){if("/trial/admin"===e.pathname||"/paramsBrowse"===e.pathname){var r=e.query||{page:1,pageSize:10};t({type:"queryTree",payload:r})}})}},effects:{},reducers:{}}),e.exports=t.default},1380:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function u(){for(var e={state:{},subscriptions:{},effects:{},reducers:{}},t=[],r={},a=[],u={},n=[],c={},d=[],l={},p=arguments.length,h=Array(p),v=0;v<p;v++)h[v]=arguments[v];var m=h.reduce(function(e,f){return e.namespace=f.namespace,"object"!==(0,i.default)(f.state)||Array.isArray(f.state)?"state"in f&&(e.state=f.state):(o(f.state,t,r),(0,s.default)(e.state,f.state)),o(f.subscriptions,a,u),(0,s.default)(e.subscriptions,f.subscriptions),o(f.effects,n,c),(0,s.default)(e.effects,f.effects),o(f.reducers,d,l),(0,s.default)(e.reducers,f.reducers),e},e);return f(m,"state",r),f(m,"subscriptions",u),f(m,"effects",c),f(m,"reducers",l),m}Object.defineProperty(t,"__esModule",{value:!0});var n=r(297),s=a(n),c=r(58),i=a(c);t.default=u;var o=function(e,t,r){},f=function(e,t,r){}},1395:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}var u=r(4),n=a(u),s=r(1380),c=a(s),i={reducers:{updateState:function(e,t){var r=t.payload;return(0,n.default)({},e,r)}}},o=(0,c.default)(i,{state:{list:[],pagination:{showSizeChanger:!0,showQuickJumper:!0,showTotal:function(e){return"Total "+e+" Items"},current:1,total:0}},reducers:{querySuccess:function(e,t){var r=t.payload,a=r.list,u=r.pagination;return(0,n.default)({},e,{list:a,pagination:(0,n.default)({},e.pagination,u)})}}});e.exports={model:i,pageModel:o}},1522:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.update=t.remove=t.create=t.query=void 0;var u=r(83),n=a(u),s=r(196),c=a(s),i=(t.query=function(){var e=(0,c.default)(n.default.mark(function e(t){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:d,method:"get",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.create=function(){var e=(0,c.default)(n.default.mark(function e(t){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:f.replace("/:id",""),method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.remove=function(){var e=(0,c.default)(n.default.mark(function e(t){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:p,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.update=function(){var e=(0,c.default)(n.default.mark(function e(t){return n.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:l,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(69)),o=i.config.api,f=o.user,d=o.listInstance,l=o.instanceUpdate,p=o.instanceDelete}});