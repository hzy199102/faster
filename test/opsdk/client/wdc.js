!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=4)}([function(t,e,r){"use strict";t.exports=r(1).polyfill()},function(t,e,r){(function(e,r){
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */var n;n=function(){"use strict";function t(t){return"function"==typeof t}var n=Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},o=0,i=void 0,s=void 0,a=function(t,e){p[o]=t,p[o+1]=e,2===(o+=2)&&(s?s(y):_())},u="undefined"!=typeof window?window:void 0,c=u||{},l=c.MutationObserver||c.WebKitMutationObserver,d="undefined"==typeof self&&void 0!==e&&"[object process]"==={}.toString.call(e),f="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function h(){var t=setTimeout;return function(){return t(y,1)}}var p=new Array(1e3);function y(){for(var t=0;t<o;t+=2)(0,p[t])(p[t+1]),p[t]=void 0,p[t+1]=void 0;o=0}var v,g,m,b,_=void 0;function w(t,e){var r=this,n=new this.constructor(S);void 0===n[E]&&U(n);var o=r._state;if(o){var i=arguments[o-1];a((function(){return B(o,n,i,r._result)}))}else P(r,n,t,e);return n}function R(t){if(t&&"object"==typeof t&&t.constructor===this)return t;var e=new this(S);return T(e,t),e}d?_=function(){return e.nextTick(y)}:l?(g=0,m=new l(y),b=document.createTextNode(""),m.observe(b,{characterData:!0}),_=function(){b.data=g=++g%2}):f?((v=new MessageChannel).port1.onmessage=y,_=function(){return v.port2.postMessage(0)}):_=void 0===u?function(){try{var t=Function("return this")().require("vertx");return void 0!==(i=t.runOnLoop||t.runOnContext)?function(){i(y)}:h()}catch(t){return h()}}():h();var E=Math.random().toString(36).substring(2);function S(){}function A(e,r,n){r.constructor===e.constructor&&n===w&&r.constructor.resolve===R?function(t,e){1===e._state?j(t,e._result):2===e._state?x(t,e._result):P(e,void 0,(function(e){return T(t,e)}),(function(e){return x(t,e)}))}(e,r):void 0===n?j(e,r):t(n)?function(t,e,r){a((function(t){var n=!1,o=function(t,e,r,n){try{t.call(e,r,n)}catch(t){return t}}(r,e,(function(r){n||(n=!0,e!==r?T(t,r):j(t,r))}),(function(e){n||(n=!0,x(t,e))}),t._label);!n&&o&&(n=!0,x(t,o))}),t)}(e,r,n):j(e,r)}function T(t,e){if(t===e)x(t,new TypeError("You cannot resolve a promise with itself"));else if(o=typeof(n=e),null===n||"object"!==o&&"function"!==o)j(t,e);else{var r=void 0;try{r=e.then}catch(e){return void x(t,e)}A(t,e,r)}var n,o}function O(t){t._onerror&&t._onerror(t._result),C(t)}function j(t,e){void 0===t._state&&(t._result=e,t._state=1,0!==t._subscribers.length&&a(C,t))}function x(t,e){void 0===t._state&&(t._state=2,t._result=e,a(O,t))}function P(t,e,r,n){var o=t._subscribers,i=o.length;t._onerror=null,o[i]=e,o[i+1]=r,o[i+2]=n,0===i&&t._state&&a(C,t)}function C(t){var e=t._subscribers,r=t._state;if(0!==e.length){for(var n=void 0,o=void 0,i=t._result,s=0;s<e.length;s+=3)n=e[s],o=e[s+r],n?B(r,n,o,i):o(i);t._subscribers.length=0}}function B(e,r,n,o){var i=t(n),s=void 0,a=void 0,u=!0;if(i){try{s=n(o)}catch(t){u=!1,a=t}if(r===s)return void x(r,new TypeError("A promises callback cannot return that same promise."))}else s=o;void 0!==r._state||(i&&u?T(r,s):!1===u?x(r,a):1===e?j(r,s):2===e&&x(r,s))}var k=0;function U(t){t[E]=k++,t._state=void 0,t._result=void 0,t._subscribers=[]}var L=function(){function t(t,e){this._instanceConstructor=t,this.promise=new t(S),this.promise[E]||U(this.promise),n(e)?(this.length=e.length,this._remaining=e.length,this._result=new Array(this.length),0===this.length?j(this.promise,this._result):(this.length=this.length||0,this._enumerate(e),0===this._remaining&&j(this.promise,this._result))):x(this.promise,new Error("Array Methods must be provided an Array"))}return t.prototype._enumerate=function(t){for(var e=0;void 0===this._state&&e<t.length;e++)this._eachEntry(t[e],e)},t.prototype._eachEntry=function(t,e){var r=this._instanceConstructor,n=r.resolve;if(n===R){var o=void 0,i=void 0,s=!1;try{o=t.then}catch(t){s=!0,i=t}if(o===w&&void 0!==t._state)this._settledAt(t._state,e,t._result);else if("function"!=typeof o)this._remaining--,this._result[e]=t;else if(r===M){var a=new r(S);s?x(a,i):A(a,t,o),this._willSettleAt(a,e)}else this._willSettleAt(new r((function(e){return e(t)})),e)}else this._willSettleAt(n(t),e)},t.prototype._settledAt=function(t,e,r){var n=this.promise;void 0===n._state&&(this._remaining--,2===t?x(n,r):this._result[e]=r),0===this._remaining&&j(n,this._result)},t.prototype._willSettleAt=function(t,e){var r=this;P(t,void 0,(function(t){return r._settledAt(1,e,t)}),(function(t){return r._settledAt(2,e,t)}))},t}(),M=function(){function e(t){this[E]=k++,this._result=this._state=void 0,this._subscribers=[],S!==t&&("function"!=typeof t&&function(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}(),this instanceof e?function(t,e){try{e((function(e){T(t,e)}),(function(e){x(t,e)}))}catch(e){x(t,e)}}(this,t):function(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}())}return e.prototype.catch=function(t){return this.then(null,t)},e.prototype.finally=function(e){var r=this.constructor;return t(e)?this.then((function(t){return r.resolve(e()).then((function(){return t}))}),(function(t){return r.resolve(e()).then((function(){throw t}))})):this.then(e,e)},e}();return M.prototype.then=w,M.all=function(t){return new L(this,t).promise},M.race=function(t){var e=this;return n(t)?new e((function(r,n){for(var o=t.length,i=0;i<o;i++)e.resolve(t[i]).then(r,n)})):new e((function(t,e){return e(new TypeError("You must pass an array to race."))}))},M.resolve=R,M.reject=function(t){var e=new this(S);return x(e,t),e},M._setScheduler=function(t){s=t},M._setAsap=function(t){a=t},M._asap=a,M.polyfill=function(){var t=void 0;if(void 0!==r)t=r;else if("undefined"!=typeof self)t=self;else try{t=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var e=t.Promise;if(e){var n=null;try{n=Object.prototype.toString.call(e.resolve())}catch(t){}if("[object Promise]"===n&&!e.cast)return}t.Promise=M},M.Promise=M,M},t.exports=n()}).call(this,r(2),r(3))},function(t,e){var r,n,o=t.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(r===setTimeout)return setTimeout(t,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(t,0);try{return r(t,0)}catch(e){try{return r.call(null,t,0)}catch(e){return r.call(this,t,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(t){r=i}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(t){n=s}}();var u,c=[],l=!1,d=-1;function f(){l&&u&&(l=!1,u.length?c=u.concat(c):d=-1,c.length&&h())}function h(){if(!l){var t=a(f);l=!0;for(var e=c.length;e;){for(u=c,c=[];++d<e;)u&&u[d].run();d=-1,e=c.length}u=null,l=!1,function(t){if(n===clearTimeout)return clearTimeout(t);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(t);try{n(t)}catch(e){try{return n.call(null,t)}catch(e){return n.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function y(){}o.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)e[r-1]=arguments[r];c.push(new p(t,e)),1!==c.length||l||a(h)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=y,o.addListener=y,o.once=y,o.off=y,o.removeListener=y,o.removeAllListeners=y,o.emit=y,o.prependListener=y,o.prependOnceListener=y,o.listeners=function(t){return[]},o.binding=function(t){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(t){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(t,e){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e,r){"use strict";r.r(e);var n="URLSearchParams"in self,o="Symbol"in self&&"iterator"in Symbol,i="FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),s="FormData"in self,a="ArrayBuffer"in self;if(a)var u=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],c=ArrayBuffer.isView||function(t){return t&&u.indexOf(Object.prototype.toString.call(t))>-1};function l(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function d(t){return"string"!=typeof t&&(t=String(t)),t}function f(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return o&&(e[Symbol.iterator]=function(){return e}),e}function h(t){this.map={},t instanceof h?t.forEach((function(t,e){this.append(e,t)}),this):Array.isArray(t)?t.forEach((function(t){this.append(t[0],t[1])}),this):t&&Object.getOwnPropertyNames(t).forEach((function(e){this.append(e,t[e])}),this)}function p(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function y(t){return new Promise((function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}}))}function v(t){var e=new FileReader,r=y(e);return e.readAsArrayBuffer(t),r}function g(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function m(){return this.bodyUsed=!1,this._initBody=function(t){var e;this._bodyInit=t,t?"string"==typeof t?this._bodyText=t:i&&Blob.prototype.isPrototypeOf(t)?this._bodyBlob=t:s&&FormData.prototype.isPrototypeOf(t)?this._bodyFormData=t:n&&URLSearchParams.prototype.isPrototypeOf(t)?this._bodyText=t.toString():a&&i&&((e=t)&&DataView.prototype.isPrototypeOf(e))?(this._bodyArrayBuffer=g(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):a&&(ArrayBuffer.prototype.isPrototypeOf(t)||c(t))?this._bodyArrayBuffer=g(t):this._bodyText=t=Object.prototype.toString.call(t):this._bodyText="",this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},i&&(this.blob=function(){var t=p(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?p(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(v)}),this.text=function(){var t,e,r,n=p(this);if(n)return n;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,r=y(e),e.readAsText(t),r;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),r=new Array(e.length),n=0;n<e.length;n++)r[n]=String.fromCharCode(e[n]);return r.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s&&(this.formData=function(){return this.text().then(w)}),this.json=function(){return this.text().then(JSON.parse)},this}h.prototype.append=function(t,e){t=l(t),e=d(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},h.prototype.delete=function(t){delete this.map[l(t)]},h.prototype.get=function(t){return t=l(t),this.has(t)?this.map[t]:null},h.prototype.has=function(t){return this.map.hasOwnProperty(l(t))},h.prototype.set=function(t,e){this.map[l(t)]=d(e)},h.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},h.prototype.keys=function(){var t=[];return this.forEach((function(e,r){t.push(r)})),f(t)},h.prototype.values=function(){var t=[];return this.forEach((function(e){t.push(e)})),f(t)},h.prototype.entries=function(){var t=[];return this.forEach((function(e,r){t.push([r,e])})),f(t)},o&&(h.prototype[Symbol.iterator]=h.prototype.entries);var b=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function _(t,e){var r,n,o=(e=e||{}).body;if(t instanceof _){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new h(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,o||null==t._bodyInit||(o=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new h(e.headers)),this.method=(r=e.method||this.method||"GET",n=r.toUpperCase(),b.indexOf(n)>-1?n:r),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&o)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(o)}function w(t){var e=new FormData;return t.trim().split("&").forEach((function(t){if(t){var r=t.split("="),n=r.shift().replace(/\+/g," "),o=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(n),decodeURIComponent(o))}})),e}function R(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new h(e.headers),this.url=e.url||"",this._initBody(t)}_.prototype.clone=function(){return new _(this,{body:this._bodyInit})},m.call(_.prototype),m.call(R.prototype),R.prototype.clone=function(){return new R(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},R.error=function(){var t=new R(null,{status:0,statusText:""});return t.type="error",t};var E=[301,302,303,307,308];R.redirect=function(t,e){if(-1===E.indexOf(e))throw new RangeError("Invalid status code");return new R(null,{status:e,headers:{location:t}})};var S=self.DOMException;try{new S}catch(t){(S=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack}).prototype=Object.create(Error.prototype),S.prototype.constructor=S}function A(t,e){return new Promise((function(r,n){var o=new _(t,e);if(o.signal&&o.signal.aborted)return n(new S("Aborted","AbortError"));var s=new XMLHttpRequest;function a(){s.abort()}s.onload=function(){var t,e,n={status:s.status,statusText:s.statusText,headers:(t=s.getAllResponseHeaders()||"",e=new h,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(t){var r=t.split(":"),n=r.shift().trim();if(n){var o=r.join(":").trim();e.append(n,o)}})),e)};n.url="responseURL"in s?s.responseURL:n.headers.get("X-Request-URL");var o="response"in s?s.response:s.responseText;r(new R(o,n))},s.onerror=function(){n(new TypeError("Network request failed"))},s.ontimeout=function(){n(new TypeError("Network request failed"))},s.onabort=function(){n(new S("Aborted","AbortError"))},s.open(o.method,o.url,!0),"include"===o.credentials?s.withCredentials=!0:"omit"===o.credentials&&(s.withCredentials=!1),"responseType"in s&&i&&(s.responseType="blob"),o.headers.forEach((function(t,e){s.setRequestHeader(e,t)})),o.signal&&(o.signal.addEventListener("abort",a),s.onreadystatechange=function(){4===s.readyState&&o.signal.removeEventListener("abort",a)}),s.send(void 0===o._bodyInit?null:o._bodyInit)}))}A.polyfill=!0,self.fetch||(self.fetch=A,self.Headers=h,self.Request=_,self.Response=R),r(0),"function"!=typeof Object.assign&&(Object.assign=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");t=Object(t);for(var e=1;e<arguments.length;e++){var r=arguments[e];if(null!=r)for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t}),function(t,e){var r={url:{test:"http://aecore-collector-test.glodon.com",prod:"https://aecore-collector.glodon.com"},trackCom:{},validate:{_isString:function(t){return"string"==typeof t},_isStringRequired:function(t){return"string"==typeof t&&""!==t.trim()},_isBoolean:function(t){return"boolean"==typeof t},pcode:{desc:"产品编码",validate:function(t){return r.validate._isStringRequired(t)}},fncode:{desc:"功能编码",validate:function(t){return r.validate._isStringRequired(t)}},fnname:{desc:"功能名称",validate:function(t){return r.validate._isStringRequired(t)}},fngroup:{desc:"功能分组",validate:function(t){return r.validate._isStringRequired(t)}},ver:{desc:"版本号",validate:function(t){return r.validate._isStringRequired(t)}},gid:{desc:"广联达云账号id",validate:function(t){return r.validate._isStringRequired(t)}},sessionid:{desc:"会话id",validate:function(t){return r.validate._isStringRequired(t)}},trigertime:{desc:"事件触发事件 格式：'yyyy/MM/dd HH:mm:ss SSS' 2012/10/15 18:47:46 203",validate:function(t){return r.validate._isStringRequired(t)}},debug:{desc:"是否测试数据",validate:function(t){return r.validate._isBoolean(t)}},dognum:{desc:"加密锁号",validate:function(t){return r.validate._isString(t)}},hardwareid:{desc:"硬件id",validate:function(t){return r.validate._isString(t)}},iskeypath:{desc:"是否是关键路径功能点",validate:function(t){return r.validate._isBoolean(t)}},utype:{desc:"各产品自定义的用户类型",validate:function(t){return r.validate._isString(t)}},vername:{desc:"版本名称",validate:function(t){return r.validate._isString(t)}},ver2:{desc:"内核版本号",validate:function(t){return r.validate._isString(t)}},usetype:{desc:"使用模式",validate:function(t){return r.validate._isString(t)}},keyword:{desc:"搜索关键字",validate:function(t){return r.validate._isString(t)}},projectid:{desc:"工程id",validate:function(t){return r.validate._isString(t)}},prjname:{desc:"工程名称",validate:function(t){return r.validate._isString(t)}},prjfullpath:{desc:"工程全路径",validate:function(t){return r.validate._isString(t)}},prjcost:{desc:"工程造价",validate:function(t){return r.validate._isString(t)}},prjedocnt:{desc:"工程图元数",validate:function(t){return r.validate._isString(t)}},prjsize:{desc:"工程文件大小",validate:function(t){return r.validate._isString(t)}},major:{desc:"专业",validate:function(t){return r.validate._isString(t)}},regionrule:{desc:"地区规则",validate:function(t){return r.validate._isString(t)}},duration:{desc:"使用时长",validate:function(t){return r.validate._isString(t)}},platform:{desc:"产品类型",validate:function(t){return r.validate._isString(t)}},mac:{desc:"mac地址",validate:function(t){return r.validate._isString(t)}},sys:{desc:"操作系统类型：1:android,2:ios,3:window,4:mac,5:linux,6:unix,7:sunOS,0:其他 （Web可以没有）",validate:function(t){return r.validate._isString(t)}},sysver:{desc:"操作系统版本",validate:function(t){return r.validate._isString(t)}},query:{desc:"自定义数据（json格式）",validate:function(t){if(!r.validate._isString(t))return!1;try{return"object"==typeof JSON.parse(t)}catch(t){return!1}}}},trackRequired:["pcode","fncode","fnname","fngroup","ver","sessionid","debug"],commonField:["pcode","fngroup","ver","gid","sessionid","dognum","hardwareid","vername","ver2","platform","mac","sys","sysver","debug"],logCode:{TYPE_ERROR:1,VALIDATE_ERROR:2,ANONYMITY_ERROR:3,SURPLUS_ERROR:4}},n=function(t,e){var r={"M+":e.getMonth()+1,"d+":e.getDate(),"h+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};for(var n in/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length))),r)new RegExp("("+n+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?r[n]:("00"+r[n]).substr((""+r[n]).length)));return t},o=function(){console.log("空方法")},i=function(){for(var e=t.Report||[],r=0,n=this;r<e.length;r++)if("_init"===e[r][0]){var o=e.shift(),i=o.shift();o.push((function(){for(;e&&e.length>0;){var t=e.shift(),r=t.shift();n[r]&&n[r].apply(n,t)}})),n[i]&&n[i].apply(n,o);break}};i.prototype._init=function(t,e){var n=t||{};this.url=r.url.prod,this.debug="boolean"==typeof n.debug&&n.debug,e&&e()},i.prototype.defineCom=function(e){if("object"!=typeof e)return t.Report.onError({code:r.logCode.TYPE_ERROR,msg:"defineCom只支持对象格式的参数"}),!1;for(var n in e)r.commonField.indexOf(n)>-1?r.validate[n].validate(e[n])?r.trackCom[n]=e[n]:t.Report.onError({code:r.logCode.VALIDATE_ERROR,msg:`字段：${n}（${r.validate[n].desc}）未通过校验，不会被defineCom处理`}):t.Report.onError({code:r.logCode.SURPLUS_ERROR,msg:`多余字段：${n}，不会被defineCom处理`});return!0},i.prototype.getCom=function(){return Object.assign({},r.trackCom)},i.prototype.delCom=function(e){if("[object Array]"!==Object.prototype.toString.call(e))return t.Report.onError({code:r.logCode.TYPE_ERROR,msg:"delCom只支持数组格式的参数"}),!1;for(var n=0,o=e.length;n<o;n++)delete r.trackCom[e[n]];return!0},i.prototype.listen=function(t){this.onError=t.onError||o},i.prototype.version="1.3",i.prototype.track=function(e){(function(e){if("object"!=typeof e)return t.Report.onError({code:r.logCode.TYPE_ERROR,msg:"传递对象形式的埋点数据，track失败"}),!1;for(var o in e.trigertime=n("yyyy/MM/dd hh:mm:ss S",new Date),e.debug=t.Report.debug,r.trackCom)e.hasOwnProperty(o)||(e[o]=r.trackCom[o]),"debug"===o&&(e[o]=r.trackCom[o]);if(!e.hardwareid&&!e.dognum&&!e.gid)return t.Report.onError({code:r.logCode.ANONYMITY_ERROR,msg:"匿名用户无法上报埋点，请传递hardwareid，dognum，gid中的至少一个确认用户身份，track失败"}),!1;for(var i=0,s=r.trackRequired.length;i<s;i++)if(void 0===e[r.trackRequired[i]])return t.Report.onError({code:r.logCode.VALIDATE_ERROR,msg:`缺少必填字段：${r.trackRequired[i]}（${r.validate[r.trackRequired[i]].desc}），track失败`}),!1;for(var o in e)if(r.validate[o]){if(!r.validate[o].validate(e[o]))return t.Report.onError({code:r.logCode.VALIDATE_ERROR,msg:`字段：${o}（${r.validate[o].desc}）未通过校验，track失败`}),!1}else t.Report.onError({code:r.logCode.SURPLUS_ERROR,msg:`多余字段：${o}，不会被track处理`});return!0})(e)&&fetch(this.url+"/receive",{method:"post",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(t){console.log(t)})).catch((function(t){console.log(t)}))},t.Report=new i}(window)}]);