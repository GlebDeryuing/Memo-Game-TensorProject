!function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=8)}([function(t,e,r){"use strict";function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var n;"undefined"!=typeof window?n=window:"undefined"==typeof self?(console.warn("Using browser-only version of superagent in non-browser environment"),n=void 0):n=self;var s=r(2),i=r(3),a=r(4),c=r(1),u=r(5),l=r(7);function p(){}t.exports=function(t,r){return"function"==typeof r?new e.Request("GET",t).end(r):1===arguments.length?new e.Request("GET",t):new e.Request(t,r)};var h=e=t.exports;e.Request=v,h.getXHR=function(){if(n.XMLHttpRequest&&(!n.location||"file:"!==n.location.protocol||!n.ActiveXObject))return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(t){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(t){}throw new Error("Browser-only version of superagent could not find XHR")};var d="".trim?function(t){return t.trim()}:function(t){return t.replace(/(^\s*|\s*$)/g,"")};function f(t){if(!c(t))return t;var e=[];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&y(e,r,t[r]);return e.join("&")}function y(t,e,r){if(void 0!==r)if(null!==r)if(Array.isArray(r))r.forEach((function(r){y(t,e,r)}));else if(c(r))for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&y(t,"".concat(e,"[").concat(o,"]"),r[o]);else t.push(encodeURIComponent(e)+"="+encodeURIComponent(r));else t.push(encodeURIComponent(e))}function m(t){for(var e,r,o={},n=t.split("&"),s=0,i=n.length;s<i;++s)-1===(r=(e=n[s]).indexOf("="))?o[decodeURIComponent(e)]="":o[decodeURIComponent(e.slice(0,r))]=decodeURIComponent(e.slice(r+1));return o}function b(t){return/[/+]json($|[^-\w])/.test(t)}function _(t){this.req=t,this.xhr=this.req.xhr,this.text="HEAD"!==this.req.method&&(""===this.xhr.responseType||"text"===this.xhr.responseType)||void 0===this.xhr.responseType?this.xhr.responseText:null,this.statusText=this.req.xhr.statusText;var e=this.xhr.status;1223===e&&(e=204),this._setStatusProperties(e),this.headers=function(t){for(var e,r,o,n,s=t.split(/\r?\n/),i={},a=0,c=s.length;a<c;++a)-1!==(e=(r=s[a]).indexOf(":"))&&(o=r.slice(0,e).toLowerCase(),n=d(r.slice(e+1)),i[o]=n);return i}(this.xhr.getAllResponseHeaders()),this.header=this.headers,this.header["content-type"]=this.xhr.getResponseHeader("content-type"),this._setHeaderProperties(this.header),null===this.text&&t._responseType?this.body=this.xhr.response:this.body="HEAD"===this.req.method?null:this._parseBody(this.text?this.text:this.xhr.response)}function v(t,e){var r=this;this._query=this._query||[],this.method=t,this.url=e,this.header={},this._header={},this.on("end",(function(){var t,e=null,o=null;try{o=new _(r)}catch(t){return(e=new Error("Parser is unable to parse the response")).parse=!0,e.original=t,r.xhr?(e.rawResponse=void 0===r.xhr.responseType?r.xhr.responseText:r.xhr.response,e.status=r.xhr.status?r.xhr.status:null,e.statusCode=e.status):(e.rawResponse=null,e.status=null),r.callback(e)}r.emit("response",o);try{r._isResponseOK(o)||(t=new Error(o.statusText||"Unsuccessful HTTP response"))}catch(e){t=e}t?(t.original=e,t.response=o,t.status=o.status,r.callback(t,o)):r.callback(null,o)}))}function g(t,e,r){var o=h("DELETE",t);return"function"==typeof e&&(r=e,e=null),e&&o.send(e),r&&o.end(r),o}h.serializeObject=f,h.parseString=m,h.types={html:"text/html",json:"application/json",xml:"text/xml",urlencoded:"application/x-www-form-urlencoded",form:"application/x-www-form-urlencoded","form-data":"application/x-www-form-urlencoded"},h.serialize={"application/x-www-form-urlencoded":f,"application/json":i},h.parse={"application/x-www-form-urlencoded":m,"application/json":JSON.parse},u(_.prototype),_.prototype._parseBody=function(t){var e=h.parse[this.type];return this.req._parser?this.req._parser(this,t):(!e&&b(this.type)&&(e=h.parse["application/json"]),e&&t&&(t.length>0||t instanceof Object)?e(t):null)},_.prototype.toError=function(){var t=this.req,e=t.method,r=t.url,o="cannot ".concat(e," ").concat(r," (").concat(this.status,")"),n=new Error(o);return n.status=this.status,n.method=e,n.url=r,n},h.Response=_,s(v.prototype),a(v.prototype),v.prototype.type=function(t){return this.set("Content-Type",h.types[t]||t),this},v.prototype.accept=function(t){return this.set("Accept",h.types[t]||t),this},v.prototype.auth=function(t,e,r){1===arguments.length&&(e=""),"object"===o(e)&&null!==e&&(r=e,e=""),r||(r={type:"function"==typeof btoa?"basic":"auto"});var n=function(t){if("function"==typeof btoa)return btoa(t);throw new Error("Cannot use basic auth, btoa is not a function")};return this._auth(t,e,r,n)},v.prototype.query=function(t){return"string"!=typeof t&&(t=f(t)),t&&this._query.push(t),this},v.prototype.attach=function(t,e,r){if(e){if(this._data)throw new Error("superagent can't mix .send() and .attach()");this._getFormData().append(t,e,r||e.name)}return this},v.prototype._getFormData=function(){return this._formData||(this._formData=new n.FormData),this._formData},v.prototype.callback=function(t,e){if(this._shouldRetry(t,e))return this._retry();var r=this._callback;this.clearTimeout(),t&&(this._maxRetries&&(t.retries=this._retries-1),this.emit("error",t)),r(t,e)},v.prototype.crossDomainError=function(){var t=new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");t.crossDomain=!0,t.status=this.status,t.method=this.method,t.url=this.url,this.callback(t)},v.prototype.agent=function(){return console.warn("This is not supported in browser version of superagent"),this},v.prototype.buffer=v.prototype.ca,v.prototype.ca=v.prototype.agent,v.prototype.write=function(){throw new Error("Streaming is not supported in browser version of superagent")},v.prototype.pipe=v.prototype.write,v.prototype._isHost=function(t){return t&&"object"===o(t)&&!Array.isArray(t)&&"[object Object]"!==Object.prototype.toString.call(t)},v.prototype.end=function(t){this._endCalled&&console.warn("Warning: .end() was called twice. This is not supported in superagent"),this._endCalled=!0,this._callback=t||p,this._finalizeQueryString(),this._end()},v.prototype._setUploadTimeout=function(){var t=this;this._uploadTimeout&&!this._uploadTimeoutTimer&&(this._uploadTimeoutTimer=setTimeout((function(){t._timeoutError("Upload timeout of ",t._uploadTimeout,"ETIMEDOUT")}),this._uploadTimeout))},v.prototype._end=function(){if(this._aborted)return this.callback(new Error("The request has been aborted even before .end() was called"));var t=this;this.xhr=h.getXHR();var e=this.xhr,r=this._formData||this._data;this._setTimeouts(),e.onreadystatechange=function(){var r=e.readyState;if(r>=2&&t._responseTimeoutTimer&&clearTimeout(t._responseTimeoutTimer),4===r){var o;try{o=e.status}catch(t){o=0}if(!o){if(t.timedout||t._aborted)return;return t.crossDomainError()}t.emit("end")}};var o=function(e,r){r.total>0&&(r.percent=r.loaded/r.total*100,100===r.percent&&clearTimeout(t._uploadTimeoutTimer)),r.direction=e,t.emit("progress",r)};if(this.hasListeners("progress"))try{e.addEventListener("progress",o.bind(null,"download")),e.upload&&e.upload.addEventListener("progress",o.bind(null,"upload"))}catch(t){}e.upload&&this._setUploadTimeout();try{this.username&&this.password?e.open(this.method,this.url,!0,this.username,this.password):e.open(this.method,this.url,!0)}catch(t){return this.callback(t)}if(this._withCredentials&&(e.withCredentials=!0),!this._formData&&"GET"!==this.method&&"HEAD"!==this.method&&"string"!=typeof r&&!this._isHost(r)){var n=this._header["content-type"],s=this._serializer||h.serialize[n?n.split(";")[0]:""];!s&&b(n)&&(s=h.serialize["application/json"]),s&&(r=s(r))}for(var i in this.header)null!==this.header[i]&&Object.prototype.hasOwnProperty.call(this.header,i)&&e.setRequestHeader(i,this.header[i]);this._responseType&&(e.responseType=this._responseType),this.emit("request",this),e.send(void 0===r?null:r)},h.agent=function(){return new l},["GET","POST","OPTIONS","PATCH","PUT","DELETE"].forEach((function(t){l.prototype[t.toLowerCase()]=function(e,r){var o=new h.Request(t,e);return this._setDefaults(o),r&&o.end(r),o}})),l.prototype.del=l.prototype.delete,h.get=function(t,e,r){var o=h("GET",t);return"function"==typeof e&&(r=e,e=null),e&&o.query(e),r&&o.end(r),o},h.head=function(t,e,r){var o=h("HEAD",t);return"function"==typeof e&&(r=e,e=null),e&&o.query(e),r&&o.end(r),o},h.options=function(t,e,r){var o=h("OPTIONS",t);return"function"==typeof e&&(r=e,e=null),e&&o.send(e),r&&o.end(r),o},h.del=g,h.delete=g,h.patch=function(t,e,r){var o=h("PATCH",t);return"function"==typeof e&&(r=e,e=null),e&&o.send(e),r&&o.end(r),o},h.post=function(t,e,r){var o=h("POST",t);return"function"==typeof e&&(r=e,e=null),e&&o.send(e),r&&o.end(r),o},h.put=function(t,e,r){var o=h("PUT",t);return"function"==typeof e&&(r=e,e=null),e&&o.send(e),r&&o.end(r),o}},function(t,e,r){"use strict";function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}t.exports=function(t){return null!==t&&"object"===o(t)}},function(t,e,r){function o(t){if(t)return function(t){for(var e in o.prototype)t[e]=o.prototype[e];return t}(t)}t.exports=o,o.prototype.on=o.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},o.prototype.once=function(t,e){function r(){this.off(t,r),e.apply(this,arguments)}return r.fn=e,this.on(t,r),this},o.prototype.off=o.prototype.removeListener=o.prototype.removeAllListeners=o.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var r,o=this._callbacks["$"+t];if(!o)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var n=0;n<o.length;n++)if((r=o[n])===e||r.fn===e){o.splice(n,1);break}return 0===o.length&&delete this._callbacks["$"+t],this},o.prototype.emit=function(t){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),r=this._callbacks["$"+t],o=1;o<arguments.length;o++)e[o-1]=arguments[o];if(r){o=0;for(var n=(r=r.slice(0)).length;o<n;++o)r[o].apply(this,e)}return this},o.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},o.prototype.hasListeners=function(t){return!!this.listeners(t).length}},function(t,e){t.exports=n,n.default=n,n.stable=i,n.stableStringify=i;var r=[],o=[];function n(t,e,n){var s;for(!function t(e,n,s,i){var a;if("object"==typeof e&&null!==e){for(a=0;a<s.length;a++)if(s[a]===e){var c=Object.getOwnPropertyDescriptor(i,n);return void(void 0!==c.get?c.configurable?(Object.defineProperty(i,n,{value:"[Circular]"}),r.push([i,n,e,c])):o.push([e,n]):(i[n]="[Circular]",r.push([i,n,e])))}if(s.push(e),Array.isArray(e))for(a=0;a<e.length;a++)t(e[a],a,s,e);else{var u=Object.keys(e);for(a=0;a<u.length;a++){var l=u[a];t(e[l],l,s,e)}}s.pop()}}(t,"",[],void 0),s=0===o.length?JSON.stringify(t,e,n):JSON.stringify(t,a(e),n);0!==r.length;){var i=r.pop();4===i.length?Object.defineProperty(i[0],i[1],i[3]):i[0][i[1]]=i[2]}return s}function s(t,e){return t<e?-1:t>e?1:0}function i(t,e,n){var i,c=function t(e,n,i,a){var c;if("object"==typeof e&&null!==e){for(c=0;c<i.length;c++)if(i[c]===e){var u=Object.getOwnPropertyDescriptor(a,n);return void(void 0!==u.get?u.configurable?(Object.defineProperty(a,n,{value:"[Circular]"}),r.push([a,n,e,u])):o.push([e,n]):(a[n]="[Circular]",r.push([a,n,e])))}if("function"==typeof e.toJSON)return;if(i.push(e),Array.isArray(e))for(c=0;c<e.length;c++)t(e[c],c,i,e);else{var l={},p=Object.keys(e).sort(s);for(c=0;c<p.length;c++){var h=p[c];t(e[h],h,i,e),l[h]=e[h]}if(void 0===a)return l;r.push([a,n,e]),a[n]=l}i.pop()}}(t,"",[],void 0)||t;for(i=0===o.length?JSON.stringify(c,e,n):JSON.stringify(c,a(e),n);0!==r.length;){var u=r.pop();4===u.length?Object.defineProperty(u[0],u[1],u[3]):u[0][u[1]]=u[2]}return i}function a(t){return t=void 0!==t?t:function(t,e){return e},function(e,r){if(o.length>0)for(var n=0;n<o.length;n++){var s=o[n];if(s[1]===e&&s[0]===r){r="[Circular]",o.splice(n,1);break}}return t.call(this,e,r)}}},function(t,e,r){"use strict";function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var n=r(1);function s(t){if(t)return function(t){for(var e in s.prototype)Object.prototype.hasOwnProperty.call(s.prototype,e)&&(t[e]=s.prototype[e]);return t}(t)}t.exports=s,s.prototype.clearTimeout=function(){return clearTimeout(this._timer),clearTimeout(this._responseTimeoutTimer),clearTimeout(this._uploadTimeoutTimer),delete this._timer,delete this._responseTimeoutTimer,delete this._uploadTimeoutTimer,this},s.prototype.parse=function(t){return this._parser=t,this},s.prototype.responseType=function(t){return this._responseType=t,this},s.prototype.serialize=function(t){return this._serializer=t,this},s.prototype.timeout=function(t){if(!t||"object"!==o(t))return this._timeout=t,this._responseTimeout=0,this._uploadTimeout=0,this;for(var e in t)if(Object.prototype.hasOwnProperty.call(t,e))switch(e){case"deadline":this._timeout=t.deadline;break;case"response":this._responseTimeout=t.response;break;case"upload":this._uploadTimeout=t.upload;break;default:console.warn("Unknown timeout option",e)}return this},s.prototype.retry=function(t,e){return 0!==arguments.length&&!0!==t||(t=1),t<=0&&(t=0),this._maxRetries=t,this._retries=0,this._retryCallback=e,this};var i=["ECONNRESET","ETIMEDOUT","EADDRINFO","ESOCKETTIMEDOUT"];s.prototype._shouldRetry=function(t,e){if(!this._maxRetries||this._retries++>=this._maxRetries)return!1;if(this._retryCallback)try{var r=this._retryCallback(t,e);if(!0===r)return!0;if(!1===r)return!1}catch(t){console.error(t)}if(e&&e.status&&e.status>=500&&501!==e.status)return!0;if(t){if(t.code&&i.includes(t.code))return!0;if(t.timeout&&"ECONNABORTED"===t.code)return!0;if(t.crossDomain)return!0}return!1},s.prototype._retry=function(){return this.clearTimeout(),this.req&&(this.req=null,this.req=this.request()),this._aborted=!1,this.timedout=!1,this._end()},s.prototype.then=function(t,e){var r=this;if(!this._fullfilledPromise){var o=this;this._endCalled&&console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"),this._fullfilledPromise=new Promise((function(t,e){o.on("abort",(function(){var t=new Error("Aborted");t.code="ABORTED",t.status=r.status,t.method=r.method,t.url=r.url,e(t)})),o.end((function(r,o){r?e(r):t(o)}))}))}return this._fullfilledPromise.then(t,e)},s.prototype.catch=function(t){return this.then(void 0,t)},s.prototype.use=function(t){return t(this),this},s.prototype.ok=function(t){if("function"!=typeof t)throw new Error("Callback required");return this._okCallback=t,this},s.prototype._isResponseOK=function(t){return!!t&&(this._okCallback?this._okCallback(t):t.status>=200&&t.status<300)},s.prototype.get=function(t){return this._header[t.toLowerCase()]},s.prototype.getHeader=s.prototype.get,s.prototype.set=function(t,e){if(n(t)){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&this.set(r,t[r]);return this}return this._header[t.toLowerCase()]=e,this.header[t]=e,this},s.prototype.unset=function(t){return delete this._header[t.toLowerCase()],delete this.header[t],this},s.prototype.field=function(t,e){if(null==t)throw new Error(".field(name, val) name can not be empty");if(this._data)throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");if(n(t)){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&this.field(r,t[r]);return this}if(Array.isArray(e)){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&this.field(t,e[o]);return this}if(null==e)throw new Error(".field(name, val) val can not be empty");return"boolean"==typeof e&&(e=String(e)),this._getFormData().append(t,e),this},s.prototype.abort=function(){return this._aborted?this:(this._aborted=!0,this.xhr&&this.xhr.abort(),this.req&&this.req.abort(),this.clearTimeout(),this.emit("abort"),this)},s.prototype._auth=function(t,e,r,o){switch(r.type){case"basic":this.set("Authorization","Basic ".concat(o("".concat(t,":").concat(e))));break;case"auto":this.username=t,this.password=e;break;case"bearer":this.set("Authorization","Bearer ".concat(t))}return this},s.prototype.withCredentials=function(t){return void 0===t&&(t=!0),this._withCredentials=t,this},s.prototype.redirects=function(t){return this._maxRedirects=t,this},s.prototype.maxResponseSize=function(t){if("number"!=typeof t)throw new TypeError("Invalid argument");return this._maxResponseSize=t,this},s.prototype.toJSON=function(){return{method:this.method,url:this.url,data:this._data,headers:this._header}},s.prototype.send=function(t){var e=n(t),r=this._header["content-type"];if(this._formData)throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");if(e&&!this._data)Array.isArray(t)?this._data=[]:this._isHost(t)||(this._data={});else if(t&&this._data&&this._isHost(this._data))throw new Error("Can't merge these send calls");if(e&&n(this._data))for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(this._data[o]=t[o]);else"string"==typeof t?(r||this.type("form"),r=this._header["content-type"],this._data="application/x-www-form-urlencoded"===r?this._data?"".concat(this._data,"&").concat(t):t:(this._data||"")+t):this._data=t;return!e||this._isHost(t)?this:(r||this.type("json"),this)},s.prototype.sortQuery=function(t){return this._sort=void 0===t||t,this},s.prototype._finalizeQueryString=function(){var t=this._query.join("&");if(t&&(this.url+=(this.url.includes("?")?"&":"?")+t),this._query.length=0,this._sort){var e=this.url.indexOf("?");if(e>=0){var r=this.url.slice(e+1).split("&");"function"==typeof this._sort?r.sort(this._sort):r.sort(),this.url=this.url.slice(0,e)+"?"+r.join("&")}}},s.prototype._appendQueryString=function(){console.warn("Unsupported")},s.prototype._timeoutError=function(t,e,r){if(!this._aborted){var o=new Error("".concat(t+e,"ms exceeded"));o.timeout=e,o.code="ECONNABORTED",o.errno=r,this.timedout=!0,this.abort(),this.callback(o)}},s.prototype._setTimeouts=function(){var t=this;this._timeout&&!this._timer&&(this._timer=setTimeout((function(){t._timeoutError("Timeout of ",t._timeout,"ETIME")}),this._timeout)),this._responseTimeout&&!this._responseTimeoutTimer&&(this._responseTimeoutTimer=setTimeout((function(){t._timeoutError("Response timeout of ",t._responseTimeout,"ETIMEDOUT")}),this._responseTimeout))}},function(t,e,r){"use strict";var o=r(6);function n(t){if(t)return function(t){for(var e in n.prototype)Object.prototype.hasOwnProperty.call(n.prototype,e)&&(t[e]=n.prototype[e]);return t}(t)}t.exports=n,n.prototype.get=function(t){return this.header[t.toLowerCase()]},n.prototype._setHeaderProperties=function(t){var e=t["content-type"]||"";this.type=o.type(e);var r=o.params(e);for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(this[n]=r[n]);this.links={};try{t.link&&(this.links=o.parseLinks(t.link))}catch(t){}},n.prototype._setStatusProperties=function(t){var e=t/100|0;this.statusCode=t,this.status=this.statusCode,this.statusType=e,this.info=1===e,this.ok=2===e,this.redirect=3===e,this.clientError=4===e,this.serverError=5===e,this.error=(4===e||5===e)&&this.toError(),this.created=201===t,this.accepted=202===t,this.noContent=204===t,this.badRequest=400===t,this.unauthorized=401===t,this.notAcceptable=406===t,this.forbidden=403===t,this.notFound=404===t,this.unprocessableEntity=422===t}},function(t,e,r){"use strict";e.type=function(t){return t.split(/ *; */).shift()},e.params=function(t){return t.split(/ *; */).reduce((function(t,e){var r=e.split(/ *= */),o=r.shift(),n=r.shift();return o&&n&&(t[o]=n),t}),{})},e.parseLinks=function(t){return t.split(/ *, */).reduce((function(t,e){var r=e.split(/ *; */),o=r[0].slice(1,-1);return t[r[1].split(/ *= */)[1].slice(1,-1)]=o,t}),{})},e.cleanHeader=function(t,e){return delete t["content-type"],delete t["content-length"],delete t["transfer-encoding"],delete t.host,e&&(delete t.authorization,delete t.cookie),t}},function(t,e,r){"use strict";function o(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function n(){this._defaults=[]}["use","on","once","set","query","type","accept","auth","withCredentials","sortQuery","retry","ok","redirects","timeout","buffer","serialize","parse","ca","key","pfx","cert","disableTLSCerts"].forEach((function(t){n.prototype[t]=function(){for(var e=arguments.length,r=new Array(e),o=0;o<e;o++)r[o]=arguments[o];return this._defaults.push({fn:t,args:r}),this}})),n.prototype._setDefaults=function(t){this._defaults.forEach((function(e){t[e.fn].apply(t,o(e.args))}))},t.exports=n},function(t,e,r){"use strict";r.r(e);const o=r(0);function n(t,e,r,o){const n=document.createElement("div"),s=document.createElement("h3"),i=document.createElement("span"),a=document.createElement("p"),c=document.createElement("span");return n.className=t,s.textContent=r,i.textContent=function(t){const e=new Date(1e3*t);return`${e.getHours()}:${e.getMinutes()}:${e.getSeconds()}`}(o),a.textContent=e,c.textContent="  ",n.appendChild(s).appendChild(c).appendChild(i).appendChild(a),n}const s=t=>t.user,i=t=>t.text,a=t=>t.time;function c(t){!function(){const t=document.querySelectorAll(".message"),e=document.querySelectorAll(".my-message");t.forEach(t=>t.remove()),e.forEach(t=>t.remove())}();const e=document.body.getElementsByClassName("chat-body");Object.values(t).map(t=>(function(t){const e=t,r=s(e),o=i(e),c=a(e);return n(e.isMine?"my-message":"message",o,r,c)})(t)).forEach(t=>e[0].appendChild(t))}function u(){return o.get("/api/messages").set("Content-Type","application/json").then(t=>t.body).then(c)}function l(){const t=document.getElementById("#");var e;t.value&&((e=t.value,o.post("/api/messages").set("Content-Type","application/json").send({text:e}).catch(t=>console.log(t))).then(()=>{t.value=""}),u(),function(){const t=document.body.querySelector(".chat-body");t.scrollTop=t.scrollHeight}())}const p=r(0);function h(t){const e=document.body.getElementsByClassName("users-body");t.forEach(t=>(function(t,e){const r=document.createElement("div");r.className=t,r.textContent=e})(".user",t)).forEach(t=>e.append(t))}function d(){p.get("/api/users").then(t=>t.body).then(t=>{document.querySelectorAll(".users").forEach(t=>t.remove),h(t.name)}).catch(t=>console.log(t))}const f=r(0),y="Memo";const m=document.querySelector(".memo");let b=-1,_=[],v=!0;const g=document.querySelector("#myModal"),w=document.querySelectorAll(".modal-block__level"),T=document.querySelector(".refresh"),E=document.querySelector(".settings"),x=document.querySelectorAll(".exit");let O=16;const C=document.querySelector("#userName");let k=[],S=0;function j(t){return{value:t,passed:!1}}function q(t){k=[],_=[],S=t;for(let e=0;e<t/2;e+=1)k.push(j(e)),k.push(j(e));for(let e=0;e<k.length;e+=1){const r=k[e],o=Math.floor(Math.random()*(t-1));k[e]=k[o],k[o]=r}for(let t=0;t<k.length;t+=1){const t=document.createElement("div");t.className="",_.push(t),m.appendChild(t)}!function(){const t=m.children,e=100/Math.ceil(Math.sqrt(t.length)),r=window.innerWidth/230;m.style.padding=`${r/2}px`;for(let o=0;o<t.length;o+=1)t[o].style.margin=`${r/2}px`,t[o].style.height=`calc(${e}% - ${r}px)`,t[o].style.width=`calc(${e}% - ${r}px)`}()}function A(){return C.value.length<4?(C.style.border="3px solid rgba(255, 0, 0, 0.4)",!1):(C.style.border="1px solid rgb(138, 138, 138)",!0)}document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector("#startGame");t.addEventListener("click",()=>{if(A()){return t.style.display="none",document.querySelector("#myModalFirst").style.display="none",function(t){o.post("/api/users").set("Content-Type","application/json").send({name:t}).catch(t=>console.log(t))}(C.value)}return alert("This user is authorized!")}),C.addEventListener("input",()=>A());const e=f.post("/api/records").set("Content-Type","application/json").send({game:y}).catch(t=>console.log(t));q(16),m.addEventListener("click",t=>{const e="DIV"===t.target.nodeName?t.target:t.target.parentNode;if(v&&"selected"!==e.className&&"defeated"!==e.className&&"memo"!==e.className&&"setting"!==e.className){e.className="selected";const t=document.createElement("img");if(t.src=`image/cards/${k[_.indexOf(e)].value}.svg`,e.appendChild(t),-1===b)b=_.indexOf(e);else{const t=function(t,e){const r=k[t],o=k[e];return!r.passed&&!o.passed&&r.value===o.value&&(S-=2,r.passed=!0,o.passed=!0,0===S&&setTimeout(()=>{g.style.display="flex",document.querySelector("#modalWinning").style.display="flex"},1e3),!0)}(b,_.indexOf(e)),r=_[b];b=-1,v=!1,setTimeout(()=>{t?(e.className="defeated",e.firstChild.style.opacity=.7,r.className="defeated",r.firstChild.style.opacity=.7):(e.className="",e.innerHTML="",r.className="",r.innerHTML=""),v=!0},300)}}else"selected"===e.className&&(e.className="",e.innerHTML="",b=-1)}),x.forEach(t=>t.addEventListener("click",()=>{g.style.display="none",document.querySelectorAll(".modal-message").forEach(t=>{t.style.display="none"}),o.delete("/api/users")})),E.addEventListener("click",()=>{g.style.display="flex",document.querySelector(".modal-block").style.display="flex"}),w.forEach(t=>t.addEventListener("click",()=>{const e=t.id;O=parseInt(e),g.style.display="none",document.querySelector(".modal-block").style.display="none",T.click()})),T.addEventListener("click",()=>{g.style.display="flex",document.querySelector("#modalRefresh").style.display="flex",function(t,e){f.patch("/api/records").set("Content-Type","application/json").send({id:t,score:e}).catch(t=>console.log(t))}(e,"Win"),f.get("/api/records").set("Content-Type","application/json").then(t=>t.body).catch(t=>console.log(t)).forEach(t=>{alert(`Best players:\n\n      Name: ${t.user}, \n      game: ${t.game}, \n      score: ${t.score}, \n      time: ${t.time}.\n      `)})}),document.querySelectorAll(".modal-message-content").forEach(t=>{t.addEventListener("click",t=>{if("yesRefresh"===t.target.id||"noWinning"===t.target.id){for(;m.firstChild;)m.removeChild(m.firstChild);q(O)}g.style.display="none",document.querySelectorAll(".modal-message").forEach(t=>{t.style.display="none"})})}),document.getElementById("send").addEventListener("click",()=>{l()}),setInterval(u,2e3),setInterval(d,3e3)})}]);