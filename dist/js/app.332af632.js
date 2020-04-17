function replace_route(Vue) {
        	var args = window.location.search
        	function parseQuery (query) {
        	    var res = {}
        	    query = query.trim().replace(/^(\?|#|&)/, '')
        	    if (!query) {
        	      return res
        	    }
        	    query.split('&').forEach(function (param) {
        	      var parts = param.replace(/\+/g, ' ').split('=')
        	      var key = decodeURIComponent(parts.shift())
        	      var val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null
        	      if (res[key] === undefined) {
        	        res[key] = val
        	      } else if (Array.isArray(res[key])) {
        	        res[key].push(val)
        	      } else {
        	        res[key] = [res[key], val]
        	      }
        	    })

        	    return res
        	  }
        	var params = parseQuery(args)
        	Vue.prototype.$route = {}
        	Vue.prototype.$route.query = params

        	let $router = Vue.prototype.$router = {}
        	$router.push = function({path, query}) {
        	  let url = './' + path + '.html?'
        	  let _args = []
        	  if (typeof query === 'object') {
        	    Object.keys(query).forEach(key => {
        	      _args.push(key + '=' + query[key])
        	    })
        	  }
        	  url += _args.join('&')
        	  window.location.href = url
        	}
        } 

        var dynamic_route = (function(){
        					var posi = window.location.pathname.lastIndexOf('/')
        					var filename = window.location.pathname.substr(posi + 1)
        					if(filename === 'index.html') {
        						return 'OrderList'
        					} else {
        						return 'OrderDetail'
        					}
        				})() 
 function replace_route(Vue) {
        	var args = window.location.search
        	function parseQuery (query) {
        	    var res = {}
        	    query = query.trim().replace(/^(\?|#|&)/, '')
        	    if (!query) {
        	      return res
        	    }
        	    query.split('&').forEach(function (param) {
        	      var parts = param.replace(/\+/g, ' ').split('=')
        	      var key = decodeURIComponent(parts.shift())
        	      var val = parts.length > 0 ? decodeURIComponent(parts.join('=')) : null
        	      if (res[key] === undefined) {
        	        res[key] = val
        	      } else if (Array.isArray(res[key])) {
        	        res[key].push(val)
        	      } else {
        	        res[key] = [res[key], val]
        	      }
        	    })

        	    return res
        	  }
        	var params = parseQuery(args)
        	Vue.prototype.$route = {}
        	Vue.prototype.$route.query = params

        	let $router = Vue.prototype.$router = {}
        	$router.push = function({path, query}) {
        	  let url = './' + path + '.html?'
        	  let _args = []
        	  if (typeof query === 'object') {
        	    Object.keys(query).forEach(key => {
        	      _args.push(key + '=' + query[key])
        	    })
        	  }
        	  url += _args.join('&')
        	  window.location.href = url
        	}
        } 

        var dynamic_route = (function(){
        					var posi = window.location.pathname.lastIndexOf('/')
        					var filename = window.location.pathname.substr(posi + 1)
        					if(filename === 'index.html') {
        						return 'OrderList'
        					} else {
        						return 'OrderDetail'
        					}
        				})() 
 !function(e){function t(t){for(var r,o,u=t[0],c=t[1],s=t[2],f=0,d=[];f<u.length;f++)o=u[f],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);for(l&&l(t);d.length;)d.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[];o[e]?t.push(o[e]):0!==o[e]&&{"chunk-01fb1fad":1,"chunk-344f0980":1,"chunk-682cb5bb":1}[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-01fb1fad":"692df689","chunk-344f0980":"1caf3e1f","chunk-682cb5bb":"c1875b73"}[e]+".css",a=u.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var s=i[c],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===r||f===a))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++)if((f=(s=l[c]).getAttribute("data-href"))===r||f===a)return t();var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],d.parentNode.removeChild(d),n(i)},d.href=a,document.getElementsByTagName("head")[0].appendChild(d)})).then((function(){o[e]=0})));var n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,u.nc&&c.setAttribute("nonce",u.nc),c.src=function(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-01fb1fad":"056fb871","chunk-344f0980":"9d5a95ef","chunk-682cb5bb":"81572f5c"}[e]+".js"}(e);var s=new Error;i=function(t){c.onerror=c.onload=null,clearTimeout(f);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",s.name="ChunkLoadError",s.type=r,s.request=o,n[1](s)}a[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(t)},u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="",u.oe=function(e){throw e};var c=window.webpackJsonp=window.webpackJsonp||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var f=0;f<c.length;f++)t(c[f]);var l=s;i.push([0,"chunk-vendors"]),n()}({0:function(e,t,n){e.exports=n("56d7")},"03a5":function(e,t,n){},"0feb":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),o={name:"Index",provide:function(){return{reload:this.reload}},components:{OrderList:function(){return Promise.all([n.e("chunk-01fb1fad"),n.e("chunk-682cb5bb")]).then(n.bind(null,"3698")),OrderList:function(){return Promise.all([n.e("chunk-01fb1fad"),n.e("chunk-682cb5bb")]).then(n.bind(null,"3698"))},OrderDetail:function(){return Promise.all([n.e("chunk-01fb1fad"),n.e("chunk-344f0980")]).then(n.bind(null,"f907"))}},OrderDetail:function(){return Promise.all([n.e("chunk-01fb1fad"),n.e("chunk-344f0980")]).then(n.bind(null,"f907"))}},data:function(){return{isRouterAlive:!0}},created:function(){this.$Modal.remove(),this.$Notice.config({top:80,duration:2})},methods:{reload:function(){this.isRouterAlive=!1,this.$nextTick((function(){this.isRouterAlive=!0}))}}},a=(n("7c55"),n("2877")),i=Object(a.a)(o,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t(dynamic_route)],1)}),[],!1,null,null,null).exports,u=n("8c4f"),c=(n("e4d3"),{}),s=Object(a.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"nofound"},[n("div",{staticClass:"content-text"},[e._m(0),n("div",[n("router-link",{attrs:{to:"/"}},[n("span",{staticClass:"btn",attrs:{type:"text"}},[e._v(" << 返回首页 "),n("i",{staticClass:"fa fa-home",attrs:{"aria-hidden":"true"}})])])],1)])])}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("h1",[e._v("SORRY "),n("br"),e._v("您访问的页面失踪了")])}],!1,null,null,null).exports;replace_route(r.default);var f=new u.a({mode:"history",base:"",routes:[{path:"/",redirect:"/OrderList"},{path:"/OrderList",name:"OrderList",component:function(){return Promise.all([n.e("chunk-01fb1fad"),n.e("chunk-682cb5bb")]).then(n.bind(null,"3698"))}},{path:"/OrderDetail",name:"OrderDetail",component:function(){return Promise.all([n.e("chunk-01fb1fad"),n.e("chunk-344f0980")]).then(n.bind(null,"f907"))}},{path:"*",component:s}],scrollBehavior:function(e,t,n){return n||{x:0,y:0}}}),l=n("2f62"),d=n("0e44");r.default.use(l.a);var h=new l.a.Store({state:{loading:!1},plugins:[Object(d.a)()],mutations:{showLoading:function(e,t){e.loading=t},setNewOrderNum:function(e,t){e.newOrdersNum=t},setRefreshOrder:function(e,t){e.freshOrder=!e.freshOrder},setUserInfo:function(e,t){e.userInfo=t}},getters:{}}),p=n("e069"),m=n.n(p),v=(n("f5df"),n("03a5"),n("aede"),n("c7f0"),n("0fb7"),n("450d"),n("f529")),g=n.n(v),b=n("bc3a"),y=n.n(b),O={server:window.configs.API_ROOT,orderList:"/order/listOfSevenFish/",orderDetail:"/order/detailOfSevenFish/"};function w(e){var t=e;return Object.keys(O).forEach((function(n){-1!==n.indexOf(e)&&n.length===e.length&&(t=O.server+O["".concat(n)])})),t}function k(e,t,n,r){e.then((function(e){h.commit("showLoading",!1),m.a.LoadingBar.finish();var r=e.data;r&&"操作成功!"===r.message?t(r):(g()({type:"error",message:r.message}),n(r))})).catch((function(e){h.commit("showLoading",!1),m.a.LoadingBar.finish(),g()({type:"error",message:"网络异常"}),n(e)}))}y.a.interceptors.request.use((function(e){return e.url=w(e.url),e}),(function(e){return Promise.reject(e)})),y.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var _={apiGet:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=w(e),o=Object.keys(t).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(t[e])})).join("&");return o.length>0&&(r=r+"?"+o),new Promise((function(e,t){n||(h.commit("showLoading",!0),m.a.LoadingBar.start()),k(y.a.get(r),e,t,n)}))},apiPost:function(e,t,n){return new Promise((function(n,r){h.commit("showLoading",!0),m.a.LoadingBar.start(),k(y.a.post(e,t),n,r)}))}};r.default.prototype.$http=_,r.default.use(m.a),r.default.config.productionTip=!1,new r.default({store:h,render:function(e){return e(i)}}).$mount("#app")},"5c48":function(e,t,n){},"7c55":function(e,t,n){"use strict";var r=n("5c48");n.n(r).a},aede:function(e,t,n){},c7f0:function(e,t,n){},e4d3:function(e,t,n){"use strict";var r=n("0feb");n.n(r).a}});