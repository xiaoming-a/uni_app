(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/login/logoOther"],{2317:function(t,e,n){"use strict";n.r(e);var r=n("8f29"),o=n.n(r);for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);e["default"]=o.a},"4a07":function(t,e,n){"use strict";var r=n("bf5d"),o=n.n(r);o.a},"8f29":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=c(n("6b0c")),o=n("26cb");function c(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f={data:function(){return{}},methods:a(a({},(0,o.mapMutations)(["login"])),{},{goBack:function(){t.navigateBack({delta:1})},getWXLogin:function(e){var n=this;t.getUserProfile({desc:"登录注册",success:function(o){t.login({provider:e,success:function(c){var i=c.code;r.default.request({url:"/wxLogin",method:"POST",data:{code:i}}).then((function(t){if(t.success){var r={provider:e,openid:t.data.openid,nickName:o.userInfo.nickName,avatarUrl:o.userInfo.avatarUrl};n.getLogin(r)}})).catch((function(e){t.showToast({title:"请求失败",icon:"none"})}))}})}})},getLogin:function(e){var n=this;r.default.request({url:"/loginOther",method:"POST",data:e}).then((function(e){n.login(e.data),t.showToast({icon:"none",title:"登陆成功"}),n.goBack()})).catch((function(e){t.showToast({title:"请求失败",icon:"none"})}))},loginOther:function(t){this.getWXLogin(t)}})};e.default=f}).call(this,n("543d")["default"])},bf5d:function(t,e,n){},c0c0:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return r}));var o=function(){var t=this,e=t.$createElement;t._self._c},c=[]},eef0:function(t,e,n){"use strict";n.r(e);var r=n("c0c0"),o=n("2317");for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);n("4a07");var i,a=n("f0c5"),u=Object(a["a"])(o["default"],r["b"],r["c"],!1,null,"0d866cba",null,!1,r["a"],i);e["default"]=u.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/login/logoOther-create-component',
    {
        'components/login/logoOther-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("eef0"))
        })
    },
    [['components/login/logoOther-create-component']]
]);