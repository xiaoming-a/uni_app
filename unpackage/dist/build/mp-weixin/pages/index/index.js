(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{6194:function(t,n,e){},"7f7c":function(t,n,e){"use strict";var o=e("6194"),i=e.n(o);i.a},8188:function(t,n,e){"use strict";(function(t){e("5e9a");o(e("66fd"));var n=o(e("f803"));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e("543d")["createPage"])},8712:function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return o}));var i=function(){var t=this,n=t.$createElement;t._self._c},c=[]},"98c5":function(t,n,e){"use strict";e.r(n);var o=e("d8ee"),i=e.n(o);for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);n["default"]=i.a},d8ee:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=c(e("6b0c")),i=c(e("0537"));function c(t){return t&&t.__esModule?t:{default:t}}function r(t){return l(t)||s(t)||u(t)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function u(t,n){if(t){if("string"===typeof t)return d(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?d(t,n):void 0}}function s(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function l(t){if(Array.isArray(t))return d(t)}function d(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,o=new Array(n);e<n;e++)o[e]=t[e];return o}var f=function(){e.e("components/index/indexSwiper").then(function(){return resolve(e("7cd8"))}.bind(null,e)).catch(e.oe)},h=function(){e.e("components/index/recommend").then(function(){return resolve(e("ab1d"))}.bind(null,e)).catch(e.oe)},m=function(){e.e("components/common/card").then(function(){return resolve(e("25f2"))}.bind(null,e)).catch(e.oe)},p=function(){e.e("components/common/comodityList").then(function(){return resolve(e("6fb5"))}.bind(null,e)).catch(e.oe)},v=function(){e.e("components/index/banner").then(function(){return resolve(e("8822"))}.bind(null,e)).catch(e.oe)},b=function(){e.e("components/index/icons").then(function(){return resolve(e("4063"))}.bind(null,e)).catch(e.oe)},L=function(){e.e("components/index/iconBanner").then(function(){return resolve(e("cf7b"))}.bind(null,e)).catch(e.oe)},g=function(){e.e("components/index/hot").then(function(){return resolve(e("d76e"))}.bind(null,e)).catch(e.oe)},w=function(){e.e("components/index/shop").then(function(){return resolve(e("5746"))}.bind(null,e)).catch(e.oe)},x=function(){e.e("components/common/Tabbar").then(function(){return resolve(e("87ea"))}.bind(null,e)).catch(e.oe)},y={data:function(){return{choseIndex:0,topId:"top0",componentHeight:0,scrollListList:[],newScrollListList:[]}},components:{indexSwiper:f,recommend:h,card:m,comodityList:p,banner:v,icons:b,iconBanner:L,hot:g,shop:w,tabbar:x},onLoad:function(){this.getList()},onReady:function(){this.getHeight()},methods:{choseItem:function(t){t!==this.choseIndex&&(this.choseIndex=t,this.topId="top"+t,"first"===this.newScrollListList[t].load&&this.addData())},changeItem:function(t){this.choseItem(t.detail.current)},getList:function(){var n=this;o.default.request({url:"/index_list/data"}).then((function(t){var e=t.code,o=t.data;0===e&&(n.scrollListList=o.topBar,n.newScrollListList=n.initData(o))})).catch((function(n){t.showToast({title:"请求失败",icon:"none"})}))},onNavigationBarButtonTap:function(n){"left"===n.float&&t.navigateTo({url:"../search/search"})},initData:function(t){for(var n=[],e=0;e<this.scrollListList.length;e++){var o={data:[],load:"first",loadText:"上拉加载更多..."};0==e&&(o.data=t.data),n.push(o)}return n},getHeight:function(){var n=this,e=(0,i.default)();t.getSystemInfo({success:function(t){n.componentHeight=t.windowHeight-e,n.componentHeight=t.windowHeight}})},addData:function(n){var e=this,i=this.choseIndex,c=this.scrollListList[i].id,a=Math.ceil(this.newScrollListList[i].data.length/5)+1;o.default.request({url:"/index_list/".concat(c,"/data/").concat(a)}).then((function(t){var n=t.code,o=t.data;0===n&&(e.newScrollListList[i].data=[].concat(r(e.newScrollListList[i].data),r(o)))})).catch((function(n){t.showToast({title:"请求失败",icon:"none"})})),this.newScrollListList[i].load="last","function"===typeof n&&n()},loadMore:function(t){var n=this;this.newScrollListList[t].loadText="加载中...",this.addData((function(){n.newScrollListList[t].loadText="上拉加载更多..."}))},goSearch:function(){t.navigateTo({url:"../search/search"})}}};n.default=y}).call(this,e("543d")["default"])},f803:function(t,n,e){"use strict";e.r(n);var o=e("8712"),i=e("98c5");for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);e("7f7c");var r,a=e("f0c5"),u=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"21626349",null,!1,o["a"],r);n["default"]=u.exports}},[["8188","common/runtime","common/vendor"]]]);