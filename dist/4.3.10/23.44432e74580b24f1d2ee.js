webpackJsonp([23],{1447:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.setCurrTaskService=t.queryTasksByModelNameService=t.queryStartJudge=t.setCurrTask=t.queryUserParamsetName=t.queryParamsetName=t.queryParams=t.addParamSet=t.updateParamSet=t.appendParamSet=t.getModels=t.query=t.queryIndex=void 0;var n=r(80),u=a(n),s=r(194),o=a(s),i=(t.queryIndex=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:v,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.query=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:f,method:"get",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.getModels=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:l+"/base/model",method:"get",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.appendParamSet=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:l+"/userParamset/append",method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.updateParamSet=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:l+"/userParamset/update",method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.addParamSet=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:l+"/userParamset/new",method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryParams=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:d,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryParamsetName=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:p,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryUserParamsetName=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:l+"/userParamset/listParam",method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setCurrTask=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:l+"/userConfig/setCurrTask",method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryStartJudge=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:m,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.queryTasksByModelNameService=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:h,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setCurrTaskService=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:y,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(68)),c=i.config.api,l=i.config.APIV3,f=(i.config.APIHOST,c.listInstance),d=c.paramTree,p=c.paramsetName,m=c.startJudge,v=c.judgeIndex,h=c.queryTasksByModelNameAPI,y=c.setCurrTaskAPI},1491:function(e,t,r){var a=r(82);e.exports=function(e,t){if(!a(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!");return e}},1511:function(e,t,r){e.exports={default:r(1512),__esModule:!0}},1512:function(e,t,r){r(302),r(125),r(153),r(1513),r(1519),r(1522),r(1524),e.exports=r(30).Set},1513:function(e,t,r){"use strict";var a=r(1514),n=r(1491);e.exports=r(1515)("Set",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{add:function(e){return a.def(n(this,"Set"),e=0===e?0:e,e)}},a)},1514:function(e,t,r){"use strict";var a=r(71).f,n=r(201),u=r(607),s=r(103),o=r(606),i=r(597),c=r(301),l=r(613),f=r(616),d=r(77),p=r(605).fastKey,m=r(1491),v=d?"_s":"size",h=function(e,t){var r,a=p(t);if("F"!==a)return e._i[a];for(r=e._f;r;r=r.n)if(r.k==t)return r};e.exports={getConstructor:function(e,t,r,c){var l=e(function(e,a){o(e,l,t,"_i"),e._t=t,e._i=n(null),e._f=void 0,e._l=void 0,e[v]=0,void 0!=a&&i(a,r,e[c],e)});return u(l.prototype,{clear:function(){for(var e=m(this,t),r=e._i,a=e._f;a;a=a.n)a.r=!0,a.p&&(a.p=a.p.n=void 0),delete r[a.i];e._f=e._l=void 0,e[v]=0},delete:function(e){var r=m(this,t),a=h(r,e);if(a){var n=a.n,u=a.p;delete r._i[a.i],a.r=!0,u&&(u.n=n),n&&(n.p=u),r._f==a&&(r._f=n),r._l==a&&(r._l=u),r[v]--}return!!a},forEach:function(e){m(this,t);for(var r,a=s(e,arguments.length>1?arguments[1]:void 0,3);r=r?r.n:this._f;)for(a(r.v,r.k,this);r&&r.r;)r=r.p},has:function(e){return!!h(m(this,t),e)}}),d&&a(l.prototype,"size",{get:function(){return m(this,t)[v]}}),l},def:function(e,t,r){var a,n,u=h(e,t);return u?u.v=r:(e._l=u={i:n=p(t,!0),k:t,v:r,p:a=e._l,n:void 0,r:!1},e._f||(e._f=u),a&&(a.n=u),e[v]++,"F"!==n&&(e._i[n]=u)),e},getEntry:h,setStrong:function(e,t,r){c(e,t,function(e,r){this._t=m(e,t),this._k=r,this._l=void 0},function(){for(var e=this,t=e._k,r=e._l;r&&r.r;)r=r.p;return e._t&&(e._l=r=r?r.n:e._t._f)?"keys"==t?l(0,r.k):"values"==t?l(0,r.v):l(0,[r.k,r.v]):(e._t=void 0,l(1))},r?"entries":"values",!r,!0),f(t)}}},1515:function(e,t,r){"use strict";var a=r(40),n=r(51),u=r(605),s=r(106),o=r(84),i=r(607),c=r(597),l=r(606),f=r(82),d=r(152),p=r(71).f,m=r(1516)(0),v=r(77);e.exports=function(e,t,r,h,y,x){var w=a[e],k=w,b=y?"set":"add",P=k&&k.prototype,g={};return v&&"function"==typeof k&&(x||P.forEach&&!s(function(){(new k).entries().next()}))?(k=t(function(t,r){l(t,k,e,"_c"),t._c=new w,void 0!=r&&c(r,y,t[b],t)}),m("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(e){var t="add"==e||"set"==e;e in P&&(!x||"clear"!=e)&&o(k.prototype,e,function(r,a){if(l(this,k,e),!t&&x&&!f(r))return"get"==e&&void 0;var n=this._c[e](0===r?0:r,a);return t?this:n})}),x||p(k.prototype,"size",{get:function(){return this._c.size}})):(k=h.getConstructor(t,e,y,b),i(k.prototype,r),u.NEED=!0),d(k,e),g[e]=k,n(n.G+n.W+n.F,g),x||h.setStrong(k,e,y),k}},1516:function(e,t,r){var a=r(103),n=r(300),u=r(124),s=r(200),o=r(1517);e.exports=function(e,t){var r=1==e,i=2==e,c=3==e,l=4==e,f=6==e,d=5==e||f,p=t||o;return function(t,o,m){for(var v,h,y=u(t),x=n(y),w=a(o,m,3),k=s(x.length),b=0,P=r?p(t,k):i?p(t,0):void 0;k>b;b++)if((d||b in x)&&(v=x[b],h=w(v,b,y),e))if(r)P[b]=h;else if(h)switch(e){case 3:return!0;case 5:return v;case 6:return b;case 2:P.push(v)}else if(l)return!1;return f?-1:c||l?l:P}}},1517:function(e,t,r){var a=r(1518);e.exports=function(e,t){return new(a(e))(t)}},1518:function(e,t,r){var a=r(82),n=r(614),u=r(36)("species");e.exports=function(e){var t;return n(e)&&(t=e.constructor,"function"!=typeof t||t!==Array&&!n(t.prototype)||(t=void 0),a(t)&&null===(t=t[u])&&(t=void 0)),void 0===t?Array:t}},1519:function(e,t,r){var a=r(51);a(a.P+a.R,"Set",{toJSON:r(1520)("Set")})},1520:function(e,t,r){var a=r(202),n=r(1521);e.exports=function(e){return function(){if(a(this)!=e)throw TypeError(e+"#toJSON isn't generic");return n(this)}}},1521:function(e,t,r){var a=r(597);e.exports=function(e,t){var r=[];return a(e,!1,r.push,r,t),r}},1522:function(e,t,r){r(1523)("Set")},1523:function(e,t,r){"use strict";var a=r(51);e.exports=function(e){a(a.S,e,{of:function(){for(var e=arguments.length,t=Array(e);e--;)t[e]=arguments[e];return new this(t)}})}},1524:function(e,t,r){r(1525)("Set")},1525:function(e,t,r){"use strict";var a=r(51),n=r(151),u=r(103),s=r(597);e.exports=function(e){a(a.S,e,{from:function(e){var t,r,a,o,i=arguments[1];return n(this),t=void 0!==i,t&&n(i),void 0==e?new this:(r=[],t?(a=0,o=u(i,arguments[2],2),s(e,!1,function(e){r.push(o(e,a++))})):s(e,!1,r.push,r),new this(r))}})}},1526:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.userParamsetReplaceService=t.userParamsetUpdateService=t.userParamsetDeleteService=t.queryListUserParamsetByModelName=void 0;var n=r(80),u=a(n),s=r(194),o=a(s),i=(t.queryListUserParamsetByModelName=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:l,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.userParamsetDeleteService=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:f,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.userParamsetUpdateService=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:d,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.userParamsetReplaceService=function(){var e=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,i.request)({url:p,method:"post",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(68)),c=i.config.api,l=(i.config.APIV3,i.config.APIHOST,c.listUserParamsetByModelName),f=c.userParamsetDeleteAPI,d=c.userParamsetUpdateAPI,p=c.userParamsetReplaceAPI},1527:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.error=t.success=t.warning=void 0;var a=r(1528),n=function(e){return e&&e.__esModule?e:{default:e}}(a);r(1529);var u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"success",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"\u64cd\u4f5c\u6210\u529f",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";n.default[e]({message:t,description:r})};t.warning=u.bind(void 0,"warning"),t.success=u.bind(void 0,"success"),t.error=u.bind(void 0,"error");t.default=u},1528:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function n(e){var t=e.duration,r=e.placement,a=e.bottom,n=e.top,u=e.getContainer;void 0!==t&&(y=t),void 0!==r&&(k=r),void 0!==a&&(w=a),void 0!==n&&(x=n),void 0!==u&&(b=u)}function u(e){var t=void 0;switch(e){case"topLeft":t={left:0,top:x,bottom:"auto"};break;case"topRight":t={right:0,top:x,bottom:"auto"};break;case"bottomLeft":t={left:0,top:"auto",bottom:w};break;default:t={right:0,top:"auto",bottom:w}}return t}function s(e,t){var r=e+"-"+t;return h[r]||(h[r]=p.default.newInstance({prefixCls:e,className:e+"-"+t,style:u(t),getContainer:b})),h[r]}function o(e){var t=e.prefixCls||"ant-notification",r=t+"-notice",a=void 0===e.duration?y:e.duration,n=null;if(e.icon)n=f.default.createElement("span",{className:r+"-icon"},e.icon);else if(e.type){var u=P[e.type];n=f.default.createElement(v.default,{className:r+"-icon "+r+"-icon-"+e.type,type:u})}var o=!e.description&&n?f.default.createElement("span",{className:r+"-message-single-line-auto-margin"}):null;s(t,e.placement||k).notice({content:f.default.createElement("div",{className:n?r+"-with-icon":""},n,f.default.createElement("div",{className:r+"-message"},o,e.message),f.default.createElement("div",{className:r+"-description"},e.description),e.btn?f.default.createElement("span",{className:r+"-btn"},e.btn):null),duration:a,closable:!0,onClose:e.onClose,key:e.key,style:e.style||{},className:e.className})}Object.defineProperty(t,"__esModule",{value:!0});var i=r(4),c=a(i),l=r(0),f=a(l),d=r(612),p=a(d),m=r(33),v=a(m),h={},y=4.5,x=24,w=24,k="topRight",b=void 0,P={success:"check-circle-o",info:"info-circle-o",error:"cross-circle-o",warning:"exclamation-circle-o"},g={open:o,close:function(e){Object.keys(h).forEach(function(t){return h[t].removeNotice(e)})},config:n,destroy:function(){Object.keys(h).forEach(function(e){h[e].destroy(),delete h[e]})}};["success","info","warning","error"].forEach(function(e){g[e]=function(t){return g.open((0,c.default)({},t,{type:e}))}}),g.warn=g.warning,t.default=g,e.exports=t.default},1529:function(e,t,r){"use strict";r(29),r(1530)},1530:function(e,t){},617:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(1511),u=a(n),s=r(615),o=a(s),i=r(80),c=a(i),l=r(11),f=a(l),d=r(4),p=a(d),m=r(1382),v=a(m),h=r(1447),y=r(1526),x=r(1426),w=r(609),k=(a(w),r(123)),b=r(1527),P={taskModels:[],paramList:[],listInstanceId:[],paramsetName:"",paramsetList:[],judgeList:[],selectedRowKeys:[],listModalVisible:!1,listInstance:[],listUserParam:[],listDeviceParamset:[],paramsForm:{userParamsetName:"",modelName:""}},g=function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).map(function(e){return(0,p.default)({id:e.device+"_"+e.paramCode+"_"+e.paramName+"_"+e.paramsetName},e)})};t.default=(0,v.default)(x.pageModel,{namespace:"paramsBrowse",state:P,reducers:{clearState:function(e){return P},saveIndexDataList:function(e,t){var r=t.payload;return(0,p.default)({},e,r)},saveParamList:function(e,t){var r=t.payload;return(0,p.default)({},e,r)},saveParamsetList:function(e,t){var r=t.payload;return(0,p.default)({},e,r)},saveJudgeList:function(e,t){var r=t.payload;return(0,p.default)({},e,r)},showModal:function(e,t){var r=t.payload;return(0,p.default)({},e,r,{listModalVisible:!0})},hideModal:function(e){return(0,p.default)({},e,{listModalVisible:!1})},updateParamForm:function(e,t){var r=t.payload,a=r.name,n=r.value;return(0,p.default)({},e,{paramsForm:(0,p.default)({},e.paramsForm,(0,f.default)({},a,n))})}},subscriptions:{setup:function(e){var t=e.dispatch;e.history.listen(function(e){"/paramsBrowse"===e.pathname&&(t({type:"queryIndex",payload:{}}),t({type:"getModels",payload:{}}))})}},effects:{queryIndex:c.default.mark(function e(t,r){var a,n,u,s,o,i,l=t.payload,f=r.call,d=r.put,p=r.select;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p(function(e){return e.paramsBrowse.listInstance});case 2:if(a=e.sent,!a.length){e.next=5;break}return e.abrupt("return",!1);case 5:return e.next=7,f(h.queryIndex,l);case 7:if(n=e.sent,"0"!==n.result){e.next=16;break}return u=n.data,s=u.listInstance,o=u.listUserParamSetName,i=u.listDeviceParamset,e.next=12,d({type:"saveIndexDataList",payload:{listInstance:s,listUserParam:o,listDeviceParamset:i}});case 12:return e.next=14,d({type:"updateState",payload:{listInstanceId:s.map(function(e){return e.instanceId})}});case 14:e.next=17;break;case 16:throw n;case 17:case"end":return e.stop()}},e,this)}),query:c.default.mark(function e(t,r){var a,n=t.payload,u=r.call,s=r.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(h.query,n);case 2:if(a=e.sent,"0"!==a.result){e.next=8;break}return e.next=6,s({type:"querySuccess",payload:{list:a.data,pagination:{current:Number(n.page)||1,pageSize:Number(n.pageSize)||10,total:a.data.length}}});case 6:e.next=9;break;case 8:throw a;case 9:case"end":return e.stop()}},e,this)}),queryParams:c.default.mark(function e(t,r){var a,n=t.payload,u=r.call,s=r.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(h.queryParams,n);case 2:if(a=e.sent,"0"!==a.result){e.next=12;break}return e.next=6,s({type:"hideModal"});case 6:return e.next=8,s({type:"saveParamList",payload:{paramList:a.data.listDeviceParmset}});case 8:return e.next=10,s({type:"updateState",payload:(0,p.default)({},n,{selectedRowKeys:[]})});case 10:e.next=13;break;case 12:throw a;case 13:case"end":return e.stop()}},e,this)}),getModels:c.default.mark(function e(t,r){var a,n,u=(t.payload,r.call,r.put);return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,h.getModels)().catch(function(e){return null});case 2:return a=e.sent,n=[],a&&(n=a.data.map(function(e){return{name:e.modelName,value:e.modelName}})),e.next=7,u({type:"updateState",payload:{models:n}});case 7:case"end":return e.stop()}},e,this)}),queryParamsetName:c.default.mark(function e(t,r){var a,n,s,i,l,f,d=t.payload,m=r.call,v=r.put,y=r.select;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(function(e){return e.paramsBrowse});case 2:if(a=e.sent,n=a.listInstanceId,s=a.paramsetList,i=void 0,d.isUser){e.next=21;break}return e.next=9,m(h.queryParamsetName,(0,p.default)({},d,{listInstanceId:n}));case 9:if(i=e.sent,"0"!==i.result){e.next=18;break}return l=g(i.data.listParamSelectDTO),e.next=14,v({type:"saveParamsetList",payload:{paramsetList:(0,o.default)(new u.default(l))}});case 14:return e.next=16,v({type:"updateState",payload:{paramsetName:d.paramsetName}});case 16:e.next=19;break;case 18:throw i;case 19:e.next=33;break;case 21:return e.next=23,m(h.queryUserParamsetName,{userParamsetName:d.device});case 23:if(i=e.sent,"0"!==i.result){e.next=32;break}return f=g(i.data.userParamsetDTO.listParamSelectDTO),e.next=28,v({type:"saveParamsetList",payload:{paramsetList:(0,o.default)(new u.default(f))}});case 28:return e.next=30,v({type:"updateState",payload:{paramsetName:d.paramsetName}});case 30:e.next=33;break;case 32:throw i;case 33:case"end":return e.stop()}},e,this)}),queryStartJudge:c.default.mark(function e(t,r){var a,n,u,s=t.payload,o=r.call,i=r.put,l=r.select;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l(function(e){return e.paramsBrowse});case 2:return a=e.sent,n=a.listInstanceId,e.next=6,o(h.queryStartJudge,(0,p.default)({},s,{instanceIds:n}));case 6:if(u=e.sent,"0"!==u.result){e.next=14;break}return e.next=10,i({type:"saveJudgeList",payload:{judgeList:u.data.listManualJudge}});case 10:return e.next=12,i(k.routerRedux.push("/manualJudge"));case 12:e.next=15;break;case 14:throw u;case 15:case"end":return e.stop()}},e,this)}),saveParamSet:c.default.mark(function e(t,r){var a,n,u,s,o,i=t.payload,l=r.call,f=r.put,d=r.select;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d(function(e){return e.paramsBrowse.paramsForm});case 2:if(a=e.sent,n=i.type,u=i.listParamSelectDTO,s=void 0===u?[]:u,console.warn("paramsForm",a),a.modelName){e.next=7;break}return e.abrupt("return",(0,b.warning)("\u7f3a\u5c11\u578b\u53f7"));case 7:if(a.userParamsetName){e.next=9;break}return e.abrupt("return",(0,b.warning)("\u7f3a\u5c11\u540d\u79f0"));case 9:if(s&&s.length){e.next=11;break}return e.abrupt("return",(0,b.warning)("\u8bf7\u9009\u62e9\u53c2\u6570"));case 11:return e.next=13,l(h.addParamSet,(0,p.default)({},a,{listParamSelectDTO:s}));case 13:if(!(o=e.sent)){e.next=18;break}return console.warn(o.data.listUserParamSetName),e.next=18,f({type:"updateState",payload:{isSaving:!1,listUserParam:o.data.listUserParamSetName}});case 18:case"end":return e.stop()}},e,this)}),updateParamSet:c.default.mark(function(e,t){var r,a,n,u,s,o=e.payload,i=t.call,l=t.put,f=t.select;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f(function(e){return e.paramsBrowse.paramsForm});case 2:if(r=e.sent,console.warn("paramsForm",r),console.warn("payload",o),a=o.type,n=o.listParamSelectDTO,u=void 0===n?[]:n,s=void 0,"append"!==a){e.next=20;break}return e.next=10,i(h.appendParamSet,(0,p.default)({},r,{listParamSelectDTO:u}));case 10:if(!(s=e.sent)){e.next=17;break}return e.next=14,l({type:"updateState",payload:{isUpdating:!1}});case 14:(0,b.success)("\u66f4\u65b0\u6210\u529f"),e.next=18;break;case 17:(0,b.error)("\u66f4\u65b0\u5931\u8d25");case 18:e.next=31;break;case 20:if("update"!==a){e.next=31;break}return e.next=23,i(y.userParamsetReplaceService,(0,p.default)({},r,{listParamSelectDTO:u}));case 23:if(!(s=e.sent)){e.next=30;break}return e.next=27,l({type:"updateState",payload:{isUpdating:!1}});case 27:(0,b.success)("\u66f4\u65b0\u6210\u529f"),e.next=31;break;case 30:(0,b.error)("\u66f4\u65b0\u5931\u8d25");case 31:case"end":return e.stop()}},h.updateParamSet,this)}),queryTasksByModelNameModel:c.default.mark(function e(t,r){var a,n,u=t.payload,s=r.put,o=r.call;r.select;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(h.queryTasksByModelNameService,u);case 2:if(a=e.sent,"0"!==a.result){e.next=10;break}return console.warn(a),n=a.data.map(function(e){return{name:e.taskName,value:e.taskName}}),e.next=8,s({type:"updateState",payload:{taskModels:n,currentTask:""}});case 8:e.next=11;break;case 10:throw a;case 11:case"end":return e.stop()}},e,this)}),confirmSetCurrentTask:c.default.mark(function e(t,r){var a,n,u,s,o=(t.payload,r.put),i=r.call,l=r.select;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l(function(e){return e.paramsBrowse});case 2:return a=e.sent,n=a.currentTaskModel,u=a.currentTask,e.next=7,i(h.setCurrTaskService,{taskName:u});case 7:if(s=e.sent,"0"!==s.result){e.next=13;break}return e.next=11,o({type:"updateState",payload:{isSetting:!1,currentTaskModel:"",currentTask:""}});case 11:e.next=14;break;case 13:throw s;case 14:case"end":return e.stop()}},e,this)})}}),e.exports=t.default}});