(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const K=function(o){if(o.firstElementChild)return o.firstElementChild;const t=o.childNodes;for(let n=0,e=t.length;n<e;n++)if(t[n]instanceof Element)return t[n];return null},J=function(o){return o.childElementCount||Array.prototype.filter.call(o.childNodes,function(t){return t instanceof Element}).length},X=function(o){for(let t=0;t<o.childNodes.length;t++){const n=o.childNodes[t];n.nodeType===8||n.nodeType===3&&!/\S/.test(n.nodeValue||"")?(o.removeChild(n),t--):n.nodeType===1&&X(n)}},ee=new DOMParser,F=function(o){if(typeof o=="number"||!isNaN(Number(o)))return document.createTextNode(String(o));if(typeof o=="string")try{const n=ee.parseFromString(o,"text/html").body;if(n.childNodes.length===1)return n.firstChild;{const e=document.createDocumentFragment();for(;n.firstChild;)e.appendChild(n.firstChild);return e}}catch{return document.createTextNode(o)}else return document.createTextNode("")},te=function(o){return Object.prototype.toString.call(o)==="[object Object]"},ne=(o,t)=>({rules:{style:{pattern:/(\<style id=[\s\S]+?\>[\s\S]+?\<\/style\>)/g,exec:function(n){var e;const r=document.createElement("template");r.innerHTML=n;const a=(r.content||r).querySelector("style");if(!a||!a.id)return"";const c=document.getElementById(a.id);return c&&((e=c.parentNode)===null||e===void 0||e.removeChild(c)),document.head.appendChild(a),""}},commentArea:{pattern:/##\*([\s\S]+?)##/g,exec:function(n){return""}},preEvaluate:{pattern:/##!([\s\S]+?)##/g,exec:function(n,e){try{new Function("compomint","tmplId",n)(t,e)}catch(r){if(o.throwError)throw console.error(`Template preEvaluate error in "${e}", ${r.name}: ${r.message}`),r;console.warn(`Template preEvaluate error in "${e}", ${r.name}: ${r.message}`)}return""}},interpolate:{pattern:/##=([\s\S]+?)##/g,exec:function(n){return`';
(() => {let __t, interpolate=${n};
__p+=((__t=(typeof (interpolate)=='function' ? (interpolate)() : (interpolate)))==null ? '' : String(__t) );})();
__p+='`}},escape:{pattern:/##-([\s\S]+?)##/g,exec:function(n){return`';
(() => {let __t, escape=${n};
__p+=((__t=(compomint.tools.escapeHtml.escape(typeof (escape)=='function' ? (escape)() : (escape))))==null ? '' : String(__t) );})();
__p+='`}},elementProps:{pattern:/data-co-props="##:([\s\S]+?)##"/g,exec:function(n){return`';
const eventId = (__lazyScope.elementPropsArray.length);
__p+='data-co-props="'+eventId+'"';

__lazyScope.elementPropsArray[eventId] = ${n};
__p+='`},lazyExec:function(n,e,r,a){e.elementPropsArray.forEach(function(c,s){if(!c)return;const i=a.querySelector(`[data-co-props="${s}"]`);i&&(delete i.dataset.coProps,Object.keys(c).forEach(function(h){i.setAttribute(h,String(c[h]))}))})}},namedElement:{pattern:/data-co-named-element="##:([\s\S]+?)##"/g,exec:function(n){return`';
const eventId = (__lazyScope.namedElementArray.length);
__p+='data-co-named-element="'+eventId+'"';

__lazyScope.namedElementArray[eventId] = ${n};
__p+='`},lazyExec:function(n,e,r,a){e.namedElementArray.forEach(function(c,s){const i=a.querySelector(`[data-co-named-element="${s}"]`);if(!i){o.debug&&console.warn(`Named element target not found for ID ${s} in template ${r.tmplId}`);return}delete i.dataset.coNamedElement,r[c]=i})}},elementRef:{pattern:/data-co-element-ref="##:([\s\S]+?)##"/g,exec:function(n){return`';
var eventId = (__lazyScope.elementRefArray.length);
__p+='data-co-element-ref="'+eventId+'"';
var ${n} = null;
__lazyScope.elementRefArray[eventId] = function(target) {${n} = target;};
__p+='`},lazyExec:function(n,e,r,a){e.elementRefArray.forEach(function(c,s){const i=a.querySelector(`[data-co-element-ref="${s}"]`);if(!i){o.debug&&console.warn(`Element ref target not found for ID ${s} in template ${r.tmplId}`);return}delete i.dataset.coElementRef,c.call(i,i)})}},elementLoad:{pattern:/data-co-load="##:([\s\S]+?)##"/g,exec:function(n){const e=n.split("::");return`';
const eventId = (__lazyScope.elementLoadArray.length);
__p+='data-co-load="'+eventId+'"';
__lazyScope.elementLoadArray[eventId] = {loadFunc: ${e[0]}, customData: ${e[1]}};
__p+='`},lazyExec:function(n,e,r,a){e.elementLoadArray.forEach(function(c,s){const i=a.querySelector(`[data-co-load="${s}"]`);if(!i){o.debug&&console.warn(`Element load target not found for ID ${s} in template ${r.tmplId}`);return}delete i.dataset.coLoad;try{if(typeof c.loadFunc=="function"){const h=[i,i,{data:n,element:i,customData:c.customData,component:r,compomint:t}];c.loadFunc.call(...h)}}catch(h){if(console.error(`Error executing elementLoad function for ID ${s} in template ${r.tmplId}:`,h,c.loadFunc),o.throwError)throw h}})}},event:{pattern:/data-co-event="##:([\s\S]+?)##"/g,exec:function(n){const e=n.split(":::");let r=`';
(() => {const eventId = (__lazyScope.eventArray.length);
__p+='data-co-event="'+eventId+'"';
`;const a=[];for(let c=0,s=e.length;c<s;c++){const i=e[c].split("::");a.push(`{eventFunc: ${i[0]}, $parent: this, customData: ${i[1]}}`)}return r+=`__lazyScope.eventArray[eventId] = [${a.join(",")}];})()
__p+='`,r},lazyExec:function(n,e,r,a){const c=this,s=c.attacher;s&&e.eventArray.forEach(function(i,h){const p=a.querySelector(`[data-co-event="${h}"]`);if(!p){o.debug&&console.warn(`Event target not found for ID ${h} in template ${r.tmplId}`);return}delete p.dataset.coEvent;for(let m=0,d=i.length;m<d;m++){const f=i[m];f.eventFunc&&(Array.isArray(f.eventFunc)?f.eventFunc.forEach(function(g){s(c,n,e,r,a,p,g,f)}):s(c,n,e,r,a,p,f.eventFunc,f))}})},trigger:function(n,e){const r=new Event(e,{bubbles:!0,cancelable:!0});n.dispatchEvent(r)},attacher:function(n,e,r,a,c,s,i,h){const p=n.trigger,m=K(c),d=J(c)===1?m:null;if(!i)return;const f=[s,null,{data:e,customData:h.customData,element:s,componentElement:d||(m==null?void 0:m.parentElement),component:a,compomint:t}];if(typeof i=="function"){const v=function(w){w.stopPropagation(),f[1]=w;try{i.call(...f)}catch(x){if(console.error(`Error in event handler for template ${a.tmplId}:`,x,i),o.throwError)throw x}};s.addEventListener("click",v),h.element=s,h.eventFunc=v;return}if(!te(i))return;const g=i,b=g.triggerName;b&&(a.trigger=a.trigger||{},a.trigger[b]={}),Object.keys(g).forEach(function(v){const w=g[v];if(v==="load"){f[1]=s;try{w.call(...f)}catch(y){if(console.error(`Error in 'load' event handler for template ${a.tmplId}:`,y,w),o.throwError)throw y}return}else if(v==="namedElement"){a[w]=s;return}else if(v==="triggerName")return;const x=function(y){y.stopPropagation(),f[1]=y;try{w.call(...f)}catch(z){if(console.error(`Error in '${v}' event handler for template ${a.tmplId}:`,z,w),o.throwError)throw z}};s.addEventListener(v,x),h.element=s,i[v]=x,b&&p&&(a.trigger[b][v]=function(){p(s,v)})})}},element:{pattern:/##%([\s\S]+?)##/g,exec:function(n){const e=n.split("::");return`';
(() => {
const elementId = (__lazyScope.elementArray.length);
__p+='<template data-co-tmpl-element-id="'+elementId+'"></template>';
__lazyScope.elementArray[elementId] = {childTarget: ${e[0]}, nonblocking: ${e[1]||!1}};})();
__p+='`},lazyExec:function(n,e,r,a){e.elementArray.forEach(function(c,s){const i=c.childTarget,h=c.nonblocking,p=a.querySelector(`template[data-co-tmpl-element-id="${s}"]`);if(!p){o.debug&&console.warn(`Element insertion placeholder not found for ID ${s} in template ${r.tmplId}`);return}if(!p.parentNode){o.debug&&console.warn(`Element insertion placeholder for ID ${s} in template ${r.tmplId} has no parent.`);return}const m=function(){if(!p||!p.parentNode){o.debug&&console.warn(`Placeholder for ID ${s} removed before insertion in template ${r.tmplId}.`);return}try{if(i instanceof Array){const d=document.createDocumentFragment();i.forEach(function(f){if(!f)return;const g=f.element||f;let b=null;if(typeof g=="string"||typeof g=="number")b=F(g);else if(typeof g=="function")b=F(g());else if(g instanceof Node)b=g;else{o.debug&&console.warn(`Invalid item type in element array for ID ${s}, template ${r.tmplId}:`,g);return}if(f.beforeAppendTo)try{f.beforeAppendTo()}catch(v){console.error("Error in beforeAppendTo (array item):",v)}b&&d.appendChild(b)}),p.parentNode.replaceChild(d,p),i.forEach(function(f){f&&f.afterAppendTo&&setTimeout(()=>{try{f.afterAppendTo()}catch(g){console.error("Error in afterAppendTo (array item):",g)}},0)})}else if(typeof i=="string"||typeof i=="number")p.parentNode.replaceChild(F(i),p);else if(typeof i=="function")p.parentNode.replaceChild(F(i()),p);else if(i&&(i.element||i)instanceof Node){const d=i,f=d.element||d;if(d.beforeAppendTo)try{d.beforeAppendTo()}catch(g){console.error("Error in beforeAppendTo:",g)}p.parentNode.replaceChild(f,p),d.afterAppendTo&&setTimeout(()=>{try{d.afterAppendTo&&d.afterAppendTo()}catch(g){console.error("Error in afterAppendTo:",g)}},0),d.tmplId&&(d.parentComponent=r)}else o.debug&&console.warn(`Invalid target for element insertion ID ${s}, template ${r.tmplId}:`,i),p.parentNode.removeChild(p)}catch(d){if(console.error(`Error during element insertion for ID ${s}, template ${r.tmplId}:`,d),o.throwError)throw d;if(p&&p.parentNode)try{p.parentNode.removeChild(p)}catch{}}};h===void 0||h===!1?m():setTimeout(m,typeof h=="number"?h:0)})}},lazyEvaluate:{pattern:/###([\s\S]+?)##/g,exec:function(n){return`';
__lazyScope.lazyEvaluateArray.push(function(data) {${n}});
__p+='`},lazyExec:function(n,e,r,a){const c=K(a),s=J(a)===1?c:null;e.lazyEvaluateArray.forEach(function(i,h){try{i.call(s||a,n)}catch(p){if(console.error(`Error in lazyEvaluate block ${h} for template ${r.tmplId}:`,p,i),o.throwError)throw p}})}},evaluate:{pattern:/##([\s\S]+?)##/g,exec:n=>`';
`+n+`
__p+='`},escapeSyntax:{pattern:/#\\#([\s\S]+?)#\\#/g,exec:function(n){return`'+
'##${n}##'+
'`}}},keys:{dataKeyName:"data",statusKeyName:"status",componentKeyName:"component",i18nKeyName:"i18n"}}),oe=o=>{o("co-Ele","<##=data[0]##></##=data[0]##>###compomint.tools.applyElementProps(this, data[1]);##"),o("co-Element",`##
  data.tag = data.tag || 'div';
  ##
  &lt;##=data.tag##
    ##=data.id ? 'id="' + (data.id === true ? component._id : data.id) + '"' : ''##
    data-co-props="##:data.props##"
    data-co-event="##:data.event##"&gt;
    ##if (typeof data.content === "string") {##
    ##=data.content##
    ##} else {##
      ##%data.content##
    ##}##
  &lt;/##=data.tag##&gt;`)};typeof Object.assign!="function"&&Object.defineProperty(Object,"assign",{value:function(t,...n){if(t==null)throw new TypeError("Cannot convert undefined or null to object");const e=Object(t);for(let r=0,a=n.length;r<a;r++){const c=n[r];if(c!=null)for(let s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s])}return e},writable:!0,configurable:!0});(function(o){o.forEach(function(t){!t||t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode!==null&&this.parentNode.removeChild(this)}})})})([Element.prototype,CharacterData.prototype,DocumentType.prototype]);(function(o){o||Object.defineProperty(window.Node.prototype,"isConnected",{get:function(){return document.body.contains(this)}})})("isConnected"in window.Node.prototype);const E={},_={},j=E.tools=E.tools||{},k=E.configs=Object.assign({printExecTime:!1,debug:!1,throwError:!0},E.configs),I=E.tmplCache=E.tmplCache||new Map;I.has("anonymous")||I.set("anonymous",{elements:new Set});const re="content"in document.createElement("template"),ae=/(.)^/,V={"'":"\\'","\\":"\\\\","\r":"\\r","\n":"\\n","	":"\\t","\u2028":"\u2028","\u2029":"\u2029","><":"><","<":"<",">":">"},B=/\>( |\n)+\<|\>( |\n)+|( |\n)+\<|\\|'|\r|\n|\t|\u2028|\u2029/g;E.templateEngine=ne(k,E);const q=function(){const o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},t=Object.keys(o).reduce((e,r)=>(e[o[r]]=r,e),{}),n=function(e){const r=function(i){return e[i]},a=`(?:${Object.keys(e).join("|").replace(/\\/g,"\\\\")})`,c=RegExp(a),s=RegExp(a,"g");return function(i){return i=i==null?"":`${i}`,c.test(i)?i.replace(s,r):i}};return{escape:n(o),unescape:n(t)}}();j.escapeHtml=q;const Z=function(o){const t=[],n=[],e={},r={};return Object.keys(o).forEach(function(a){const c=o[a];if(c&&typeof c=="object"&&c.pattern instanceof RegExp&&typeof c.exec=="function"&&(t.push((c.pattern||ae).source),n.push(c.exec)),c&&typeof c=="object"&&typeof c.lazyExec=="function"){const s=`${a}Array`;e[s]=c.lazyExec,r[s]=[]}}),{templateRules:o,pattern:new RegExp(t.join("|"),"g"),exec:n,lazyExecKeys:Object.keys(r),lazyExec:e,lazyScopeSeed:JSON.stringify(r)}},U=function(o){return V[o]||V[o.replace(/[ \n]/g,"")]||""},ie=Z(E.templateEngine.rules),ce=function(o,t,n){k.printExecTime&&console.time(`tmpl: ${o}`);let e=0,r="";return t.replace(n.pattern,function(...a){const c=a[0],s=a[a.length-2];r+=t.slice(e,s).replace(B,U);let i,h=null;if(a.slice(1,-2).some(function(p,m){return p!==void 0?(i=p,h=m,!0):!1}),i!==void 0&&h!==null)try{r+=n.exec[h].call(n.templateRules,i,o)}catch(p){if(console.error(`Error executing template rule index ${h} for match "${i}" in template "${o}":`,p),k.throwError)throw p;r+=""}else r+=c.replace(B,U);return e=s+c.length,c}),r+=t.slice(e).replace(B,U),k.printExecTime&&console.timeEnd(`tmpl: ${o}`),r},se=E.template=function(t,n,e){let r=E.templateEngine,a=ie;e&&(r={rules:Object.assign({},r.rules,e.rules||{}),keys:Object.assign({},r.keys,e.keys||{})},a=Z(r.rules));const c=`
/* tmplId: ${t} */
//# sourceURL=http://tmpl//${t.split("-").join("//")}.js
// if (__debugger) {
// debugger;
// }
let __p='';
__p+='${ce(t,n,a)}';
return __p;`;let s=null;try{s=new Function(r.keys.dataKeyName,r.keys.statusKeyName,r.keys.componentKeyName,r.keys.i18nKeyName,"compomint","tmpl","__lazyScope","__debugger",c)}catch(h){if(k.throwError){console.error(`Template compilation error in "${t}", ${h.name}: ${h.message}`);try{new Function(r.keys.dataKeyName,r.keys.statusKeyName,r.keys.componentKeyName,r.keys.i18nKeyName,"compomint","tmpl","__lazyScope","__debugger",c)}catch{}throw h}else return()=>({})}const i=function(...p){let m,d,f,g;const b=p[0];b&&typeof b=="object"&&(b.$wrapperElement||b.$callback||b.$baseComponent)?(m=Object.assign({},b),d=m.$wrapperElement,delete m.$wrapperElement,f=m.$callback,delete m.$callback,g=m.$baseComponent,delete m.$baseComponent):(m=b,typeof p[1]=="function"?(d=void 0,f=p[1],g=p[2]):(d=p[1],f=p[2],g=p[3]));const v=r.keys.dataKeyName,w=r.keys.statusKeyName,x=JSON.parse(a.lazyScopeSeed),y=Object.assign(g||{},{tmplId:t,element:null,status:g&&g.status||{},replace:function(u){const l=this;if(!l.element||!(l.element instanceof Node)||!l.element.parentElement){k.debug&&console.warn(`Cannot replace template "${t}": element not in DOM.`);return}l.element.parentElement.replaceChild(u.element||u,l.element)},remove:function(u=!1){const l=this;if(l.beforeRemove)try{l.beforeRemove()}catch(A){console.error("Error in beforeRemove:",A)}x.eventArray&&x.eventArray.forEach(function(A){A.forEach(function($){$.element&&(typeof $.eventFunc=="function"?$.element.removeEventListener("click",$.eventFunc):Object.keys($.eventFunc).forEach(function(D){$.element.removeEventListener(D,$.eventFunc[D])}),Object.keys($).forEach(D=>delete $[D]))})});const C=l.element instanceof Node?l.element.parentElement:null,L=l.element;if(C)if(u){const A=document.createElement("template");C.replaceChild(A,l.element),l.element=A}else C.removeChild(l.element);else k.debug&&console.warn(`Cannot remove template "${t}": element not in DOM.`);if(l.afterRemove)try{l.afterRemove()}catch(A){console.error("Error in afterRemove:",A)}return L},appendTo:function(u){const l=this;if(l.beforeAppendTo)try{l.beforeAppendTo()}catch(C){console.error("Error in beforeAppendTo:",C)}return u&&l.element instanceof Node?u.appendChild(l.element):k.debug&&console.warn(`Cannot append template "${t}": parentElement or scope.element is missing or not a Node.`),l.afterAppendTo&&setTimeout(()=>{try{l.afterAppendTo()}catch(C){console.error("Error in afterAppendTo:",C)}},0),l},release:function(){},render:function(u){return this},refresh:function(u){return this},reflash:function(u){return this}});y._id||(y._id=j.genId(t)),y[v]=m,y[w]==null&&(y[w]={});const z=d instanceof Element,R=document.createElement("template");k.printExecTime&&console.time(`render: ${t}`);let S=null,P=null;try{P=m?s.call(d||null,m,y[w],y,E.i18n[t],E,_,x,k.debug):`<template data-co-empty-template="${t}"></template>`}catch(u){if(k.throwError){console.error(`Runtime error during render of "${t}":`,u.message),console.log("--- Data ---",m,"------------");try{s.call(d||null,m,y[w],y,E.i18n[t],x,!0)}catch{}throw u}else return console.warn(`Render failed for "${t}". Returning scope with comment node.`),y.element=document.createComment(`Render Error: ${t}`),y}k.printExecTime&&console.timeEnd(`render: ${t}`),R.innerHTML=P;let T=R.content||R;if(T.tagName=="TEMPLATE"&&!R.content){const u=Array.from(T.childNodes);T=document.createDocumentFragment(),u.forEach(l=>T.appendChild(l))}if(z&&d){for(;d.firstChild;)d.removeChild(d.firstChild);y.wrapperElement=d}if((T.querySelector?T.querySelector("style"):null)&&T.querySelector){const u=document.createElement(t);try{const l=u.attachShadow({mode:"open"});for(;T.firstChild;)l.appendChild(T.firstChild);T=u}catch(l){console.error(`Failed to attach shadow DOM for template "${t}":`,l)}}if(T.firstChild&&T.firstChild.nodeType==8)S=T.firstChild;else if(J(T)==1){if(S=K(T),z&&d&&S){if(y.beforeAppendTo)try{y.beforeAppendTo()}catch(u){console.error("Error in beforeAppendTo:",u)}d.appendChild(S),y.afterAppendTo&&setTimeout(()=>{try{y.afterAppendTo()}catch(u){console.error("Error in afterAppendTo:",u)}},0)}}else if(z&&d){if(y.beforeAppendTo)try{y.beforeAppendTo()}catch(u){console.error("Error in beforeAppendTo:",u)}d.appendChild(T),y.afterAppendTo&&setTimeout(()=>{try{y.afterAppendTo()}catch(u){console.error("Error in afterAppendTo:",u)}},0),S=d}else S=T;if(m&&m.$props&&S instanceof Element)for(const u in m.$props)try{const l=m.$props[u];if(u.startsWith("data-")){const C=u.substring(5).replace(/-([a-z])/g,L=>L[1].toUpperCase());S.dataset[C]=String(l)}else u in S?S[u]=l:S.setAttribute(u,String(l))}catch(l){console.error(`Error applying prop "${u}" to element in template "${t}":`,l)}S instanceof Node&&S.normalize&&S.normalize(),S instanceof Node&&X(S),y.element=S;const O=a.lazyExec;if(m&&a.lazyExecKeys.forEach(function(u){if(x[u]&&x[u].length>0)try{O[u].call(r.rules[u.slice(0,-5)],m,x,y,T)}catch(l){if(k.throwError)throw console.error(`Error during lazy execution of "${u}" for template "${t}":`,l),l}}),j.liveReloadSupport)try{j.liveReloadSupport(y)}catch(u){console.error("Error in liveReloadSupport:",u)}if(f)try{f.call(d||null,y)}catch(u){if(console.error(`Error in template callback for "${t}":`,u),k.throwError)throw u}return y.release=function(){const u=this,l=Object.getOwnPropertyNames(u),C=[w,"_id"];for(let L=0;L<l.length;L++){const A=l[L];typeof u[A]!="function"&&!C.includes(A)&&delete u[A]}},y.render=function(u){const l=this,C=l.element,L=C instanceof Node?C.parentElement:null,A=l.wrapperElement,$=E.tmpl(l.tmplId);if(!$)return console.error(`Cannot re-render: Template function for "${l.tmplId}" not found.`),l;const D={beforeAppendTo:l.beforeAppendTo,afterAppendTo:l.afterAppendTo,beforeRemove:l.beforeRemove,afterRemove:l.afterRemove,beforeRefresh:l.beforeRefresh,afterRefresh:l.afterRefresh};if(l.beforeRemove)try{l.beforeRemove()}catch(N){console.error("Error in beforeRemove during render:",N)}let M;if(A)M=$(u,A,void 0,l);else if(L&&C instanceof Node)if(M=$(u,void 0,void 0,l),M.element instanceof Node){if(M.beforeAppendTo)try{M.beforeAppendTo()}catch(N){console.error("Error in beforeAppendTo during render:",N)}L.replaceChild(M.element,C),M.afterAppendTo&&setTimeout(()=>{try{M.afterAppendTo()}catch(N){console.error("Error in afterAppendTo during render:",N)}},0)}else k.debug&&console.warn(`Re-render of "${l.tmplId}" resulted in no element or target was missing.`);else M=$(u,void 0,void 0,l);if(l.afterRemove)try{l.afterRemove()}catch(N){console.error("Error in afterRemove during render:",N)}return Object.assign(M,D),M},y.refresh=function(u){const l=this,C=l[v];if(l.beforeRefresh)try{l.beforeRefresh()}catch($){console.error("Error in beforeRefresh:",$)}const L=Object.assign({},C||{},u),A=l.render(L);if(l.afterRefresh)try{l.afterRefresh()}catch($){console.error("Error in afterRefresh:",$)}return A},y.reflash=y.refresh,y};if(Object.defineProperty(i,"name",{value:`render_${t}`,writable:!1}),t){const h=k.debug?{renderingFunc:i,source:q.escape(`function ${t}_source (${r.keys.dataKeyName}, ${r.keys.statusKeyName}, ${r.keys.componentKeyName}, ${r.keys.i18nKeyName}, __lazyScope, __debugger) {
${c}
}`),templateText:q.escape(n)}:{renderingFunc:i};I.set(t,h);const p=t.split("-");if(p.length>1){const m=p[0];let d=_[m];d||(_[m]=d={});const f=p.slice(1).map((g,b)=>b===0?g:g.charAt(0).toUpperCase()+g.slice(1)).join("");d[f]=h.renderingFunc}}return i};E.remapTmpl=function(o){Object.keys(o).forEach(function(t){const n=o[t],e=I.get(t);e?(I.set(n,e),k.debug&&console.log(`Remapped template "${t}" to "${n}"`)):k.debug&&console.warn(`Cannot remap template: Old key "${t}" not found in cache.`)})};E.tmpl=function(o){const t=I.get(o);return t?t.renderingFunc:null};const Q=function(o){let t;if(o instanceof Element)return o.tagName==="TEMPLATE",o;if(typeof o!="string"&&(k.debug&&console.warn("safeTemplate received non-string/non-element source:",o),o=""),t=document.createElement("template"),re){const n=o.replace(/<(?!template|\/template|body|\/body|html|\/html|head|\/head|style|\/style|script|\/script|link|\/link|meta|\/meta|!--)/gi,"&lt;");t.innerHTML=n}else{const n=o.replace(/<(?!template|\/template|body|\/body|html|\/html|head|\/head|style|\/style|script|\/script|link|\/link|meta|\/meta|!--)/gi,"&lt;").replace(/<template/g,'<script type="template"').replace(/<\/template>/g,"<\/script>");t.innerHTML=n}return t},W=E.addTmpl=function(o,t,n){let e=t instanceof Element?t.innerHTML:String(t);return e=q.unescape(e.replace(/<!---|--->/gi,"")),se(o,e,n)},le=E.addTmpls=function(o,t,n){typeof t!="boolean"&&n==null?(n=t,t=!1):t=!!t;const e=Q(o);return(e.content||e).querySelectorAll('template[id], script[type="text/template"][id], script[type="text/compomint"][id]').forEach(c=>{const s=c.id;s&&(c.dataset.coLoadScript!==void 0?W(s,c,n)({}):W(s,c,n),t&&c.parentNode&&c.parentNode.removeChild(c))}),e};E.addTmplByUrl=function(t,n,e){!e&&typeof n=="function"&&(e=n,n={});const a=Object.assign({},{loadScript:!0,loadStyle:!0,loadLink:!0,templateEngine:void 0},n),c=m=>typeof m=="string"?{url:m,option:a}:m&&typeof m=="object"&&m.url?{url:m.url,option:Object.assign({},a,m.option)}:(console.error("Invalid import data format in addTmplByUrl:",m),null),s=m=>{m.forEach(d=>{var f;if(d){if(d.id){const g=document.getElementById(d.id);g&&((f=g.parentNode)===null||f===void 0||f.removeChild(g))}d.tagName==="SCRIPT"||d.tagName==="LINK"||d.tagName==="STYLE"?document.head.appendChild(d):document.body.appendChild(d)}})},i=(m,d)=>{const f=Q(m);le(f,!1,d.templateEngine);const g=f.content||f;if(d.loadLink){const b=g.querySelectorAll('link[rel="stylesheet"]');s(b)}if(d.loadStyle){const b=g.querySelectorAll("style[id]");s(b)}if(d.loadScript){const b=g.querySelectorAll('script:not([type]), script[type="text/javascript"], script[type="module"]'),v=Array.from(b).filter(w=>{let x=w.parentNode;for(;x;){if(x.nodeName==="TEMPLATE"||x.nodeName==="SCRIPT"&&x.type.includes("template"))return!1;x=x.parentNode}return!0}).map(w=>{const x=document.createElement("script");return w.getAttributeNames().forEach(y=>x.setAttribute(y,w.getAttribute(y))),w.innerHTML&&(x.textContent=w.innerHTML),x});s(v)}},h=m=>new Promise((d,f)=>{const g=c(m);if(!g){d();return}const b=g.url,v=g.option;if(b.endsWith(".js")){const w=Y("script",{async:!0,src:b});w.addEventListener("load",()=>d()),w.addEventListener("error",()=>{console.error(`Failed to load script: ${b}`),f(new Error(`Failed to load script: ${b}`))}),document.head.appendChild(w)}else if(b.endsWith(".css")){const w=Y("link",{type:"text/css",rel:"stylesheet",href:b});w.addEventListener("load",()=>d()),w.addEventListener("error",()=>{console.error(`Failed to load stylesheet: ${b}`),f(new Error(`Failed to load stylesheet: ${b}`))}),document.head.appendChild(w)}else de(b,null,(w,x)=>{if(x===200||x===0)try{i(w,v),d()}catch(y){console.error(`Error processing imported HTML from ${b}:`,y),f(new Error(`Error processing imported HTML from ${b}: ${y}`))}else console.error(`Failed to fetch template file: ${b} (Status: ${x})`),f(new Error(`Failed to fetch template file: ${b} (Status: ${x})`))})});if(t==null)if(e){e();return}else return Promise.resolve();const p=Array.isArray(t)?t.length===0?Promise.resolve():Promise.all(t.map(h)).then(()=>{}).catch(m=>{throw console.error("Error loading resources in addTmplByUrl:",m),m}):h(t).catch(m=>{throw console.error("Error loading resource in addTmplByUrl:",m),m});if(e){p.then(()=>e()).catch(m=>{console.error("Error in addTmplByUrl callback mode:",m),e()});return}else return p};const de=function(o,t,n){const e=new XMLHttpRequest;e.onreadystatechange=function(){e.readyState==XMLHttpRequest.DONE&&(e.status==200||e.status===0?n(e.responseText,e.status,e):(e.status==404?console.error(`Error 404: Not Found - ${o}`):e.status>=400?console.error(`HTTP Error ${e.status} for ${o}`):console.error(`Request failed for ${o}`,e.statusText),n(null,e.status,e)))},e.onerror=function(){console.error(`Network error requesting ${o}`),n(null,0,e)},e.ontimeout=function(){console.error(`Request timed out for ${o}`),n(null,408,e)};try{const r=t&&t.method||"GET";e.open(r,o,!0),t||e.send()}catch(r){console.error(`Error sending request to ${o}:`,r),n(null,0,e)}};E.i18n={};E.addI18n=function(o,t){if(!o||typeof o!="string"||!t||typeof t!="object"){console.error("Invalid arguments for addI18n:",o,t);return}const n=o.split(".");let e=E.i18n;const r=n.length-1;n.forEach(function(a,c){a&&(r===c?Object.keys(t).some(i=>Array.isArray(t[i]))?(e[a]||(e[a]=[]),Object.keys(t).filter(i=>Array.isArray(t[i])).forEach(i=>{t[i].forEach((p,m)=>{e[a][m]||(e[a][m]={}),p instanceof Object&&!Array.isArray(p)&&Object.keys(p).forEach(d=>{E.addI18n(o+"."+m+"."+d,p[d])})})})):(e[a]||(e[a]=function(i){const h=document.documentElement.lang||"en";let p=t[h];return p==null&&(p=i,k.debug&&console.warn(`i18n: Label key ["${o}"] for lang "${h}" is missing. Using default: "${i}"`)),p!=null?String(p):""}),Object.keys(t).filter(i=>t[i]instanceof Object&&!Array.isArray(t[i])).forEach(i=>{E.addI18n(o+"."+i,t[i])})):((!e[a]||typeof e[a]=="function")&&(e[a]={}),e=e[a]))})};E.addI18ns=function(o){const t=new Map;function n(a){if(t.has(a))return t.get(a);const c=a.split(".");let s=E.i18n;for(let i=0;i<c.length-1;i++)s[c[i]]||(s[c[i]]={}),s=s[c[i]];return t.set(a,s),s}function e(a){for(const c in a){const i=typeof a[c];if(i!=="string"&&i!=="number"&&i!=="boolean")return!1}return!0}function r(a,c=""){for(const s in a){const i=a[s],h=c?c+"."+s:s;if(Array.isArray(i)){const p=n(h),m=h.split(".").pop();p[m]||(p[m]=[]);for(let d=0;d<i.length;d++){const f=i[d];if(p[m][d]||(p[m][d]={}),f&&typeof f=="object")for(const g in f){const b=f[g];if(b&&typeof b=="object"){const v=h+"."+d+"."+g;E.addI18n(v,b)}}}}else i&&typeof i=="object"?e(i)?E.addI18n(h,i):r(i,h):E.addI18n(h,i)}}r(o)};let G=0;j.genId=function(o){return G++,o+G};const pe=j.applyElementProps=function(o,t){return Object.keys(t).forEach(function(n){const e=t[n],r=n==="class"?"className":n;try{n==="style"&&typeof e=="object"&&e!==null?Object.assign(o.style,e):n==="dataset"&&typeof e=="object"&&e!==null?Object.assign(o.dataset,e):n.startsWith("on")&&typeof e=="function"?o[n.toLowerCase()]=e:r in o?o[r]=e:o.setAttribute(n,String(e))}catch(a){console.error(`Error setting attribute/property "${n}" on <${o.tagName}>:`,a)}}),o},Y=j.genElement=function(o,t={},...n){const e=document.createElement(o);let r={};return typeof t=="string"||t instanceof Node?n.unshift(t):Array.isArray(t)?n=t.concat(n):r=t,pe(e,r),n.forEach(a=>{typeof a=="string"?e.appendChild(document.createTextNode(a)):a instanceof Node&&e.appendChild(a)}),e};j.props=function(...o){if(!o||o.length===0)return"";const t=Object.assign({},...o),n=[];return Object.keys(t).forEach(function(e){const r=t[e];if(r||r===0){const a=String(r).replace(/"/g,"&quot;");n.push(`${e}="${a}"`)}}),n.join(" ")};oe(W);document.addEventListener("DOMContentLoaded",function(){let o;try{o=localStorage.getItem("compomint-theme")}catch(r){console.warn("Couldn't access localStorage:",r)}const t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=o==="dark"||o===null&&t;n?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode"),document.documentElement.setAttribute("data-theme","dark")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode"),document.documentElement.setAttribute("data-theme","light")),E.addTmpls(`
    <template id="ui-ThemeSwitcher">
      ##
      status.isDarkMode = status.isDarkMode !== undefined ? status.isDarkMode : ${n};
      ##
      <div class="fixed bottom-4 right-4 z-50">
        <button 
          class="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
          data-co-event="##:{
            click: function() {
              toggleTheme();
            }
          }##"
        >
          <svg id="light-icon" class="##=status.isDarkMode ? 'hidden' : 'block'## w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <svg id="dark-icon" class="##=status.isDarkMode ? 'block' : 'hidden'## w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16.95 6.343l-.707.707M6.343 6.343l-.707-.707"></path>
          </svg>
        </button>
      </div>
      ##
        // Apply initial theme based on status
        if (status.isDarkMode) {
          applyDarkMode();
        } else {
          applyLightMode();
        }
        
        // Toggle theme function
        function toggleTheme() {
          status.isDarkMode = !status.isDarkMode;
          
          // Save preference to localStorage
          try {
            localStorage.setItem('compomint-theme', status.isDarkMode ? 'dark' : 'light');
          } catch (e) {
            console.warn("Couldn't save theme preference:", e);
          }

          if (status.isDarkMode) {
            applyDarkMode();
          } else {
            applyLightMode();
          }
          
          // Refresh component to update UI
          component.refresh();
        }
        
        // Apply dark mode
        function applyDarkMode() {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark-mode');
          document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        // Apply light mode
        function applyLightMode() {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark-mode');
          document.documentElement.setAttribute('data-theme', 'light');
        }
      ##
    </template>
  `);const e=_.ui.ThemeSwitcher({});if(document.body.appendChild(e.element),window.matchMedia){const r=window.matchMedia("(prefers-color-scheme: dark)");r.addEventListener&&r.addEventListener("change",function(a){localStorage.getItem("compomint-theme")||(e.status.isDarkMode=a.matches,a.matches?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode")),e.refresh())})}});document.addEventListener("DOMContentLoaded",function(){function o(){const t=document.querySelectorAll("pre code");if(!t.length){setTimeout(o,100);return}t.forEach(function(n){let e=n.textContent;if(n.innerHTML!==e)return;const r={keyword:/\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|new|this|typeof|instanceof|null|undefined|true|false|try|catch|finally|throw|class|extends|import|export|from|as|async|await|yield)\b/g,compomintKeyword:/\b(data|status|component|i18n|compomint|tmpl)\b/g,string:/((['"])(?:\\.|[^\\])*?\2)|(`(?:\\.|[^\\])*?`)/g,comment:/(\/\/.*?$)|(\/\*[\s\S]*?\*\/)/gm,function:/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,number:/\b(\d+(?:\.\d+)?)\b/g,tag:/(&lt;[^>]*&gt;)/g,compomintTemplate:/(##[=%\-!*]?[\s\S]*?##)/g},a={keyword:"text-pink-500",compomintKeyword:"text-purple-400",string:"text-green-400",comment:"text-gray-500",function:"text-blue-400",number:"text-yellow-500",tag:"text-cyan-400",compomintTemplate:"text-orange-400"};e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");for(const[c,s]of Object.entries(r))e=e.replace(s,function(i){if(c==="function"){const h=i.slice(0,-1);return`<span class="${a[c]}">${h}</span>(`}return`<span class="${a[c]}">${i}</span>`});n.innerHTML=e})}o(),setTimeout(o,500)});document.addEventListener("DOMContentLoaded",function(){E.addI18ns({app:{"page-title":{en:"Compomint - Lightweight Component Engine",ko:"Compomint - 경량 컴포넌트 엔진",ja:"Compomint - 軽量コンポーネントエンジン",zh:"Compomint - 轻量级组件引擎"},"meta-description":{en:"Compomint is a lightweight JavaScript template-based component engine for web applications",ko:"Compomint는 웹 애플리케이션을 위한 경량 JavaScript 템플릿 기반 컴포넌트 엔진입니다",ja:"Compomintは、Webアプリケーション向けの軽量JavaScriptテンプレートベースコンポーネントエンジンです",zh:"Compomint是一个用于Web应用程序的轻量级JavaScript模板组件引擎"},"og-image-alt":{en:"Compomint logo and code example screen",ko:"Compomint 로고 및 코드 예제 화면",ja:"Compomintロゴとコード例の画面",zh:"Compomint标志和代码示例屏幕"},examplesTitle:{en:"Code Examples",ko:"코드 예제",ja:"コード例",zh:"代码示例"}}});const o=["en","ko","ja","zh"];function t(){let n;try{n=localStorage.getItem("compomint-lang")}catch(a){console.warn("Failed to read language preference from localStorage:",a)}if(!n){const a=navigator.language.split("-")[0];n=o.includes(a)?a:"en"}const r=new URLSearchParams(window.location.search).get("lang");r&&o.includes(r)&&(n=r),document.documentElement.lang=n,localStorage.setItem("compomint-lang",n),setTimeout(function(){try{typeof window.updateMetaTags=="function"&&window.updateMetaTags()}catch(a){console.warn("Failed to update meta tags:",a)}},100)}t()});document.addEventListener("DOMContentLoaded",async function(){const o=E.addTmplByUrl(["templates/app-layout.cmint","templates/layout-header.cmint","templates/layout-footer.cmint","templates/section-hero.cmint","templates/section-features.cmint","templates/section-vscode-extension.cmint","templates/section-examples.cmint","templates/section-architecture.cmint","templates/section-syntax.cmint","templates/section-installation.cmint","templates/section-documentation.cmint","templates/page-tutorial.cmint","templates/ui-cookie-consent.cmint","templates/ui-language-switcher.cmint","templates/cmint-brui.cmint","templates/cmint-playground.cmint"]);o?o.then(()=>{console.log("loaded templates, now initialize app"),ue()}):(console.error("Failed to load templates, cannot initialize app"),document.getElementById("app-container").innerHTML='<div class="text-center p-8"><h1 class="text-2xl text-red-600">Error loading application templates</h1></div>'),me()});function me(){let o;try{o=localStorage.getItem("compomint-theme")}catch(e){console.warn("Couldn't access localStorage:",e)}const t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;o==="dark"||o===null&&t?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode"))}async function ue(){E.addI18ns({examples:{basicComponent:{title:{en:"Basic Component",ko:"기본 컴포넌트",ja:"基本的なコンポーネント",zh:"基础组件"},description:{en:"Simple template definition and usage",ko:"간단한 템플릿 정의와 사용 방법",ja:"シンプルなテンプレート定義と使用方法",zh:"简单的模板定义和使用方法"}},stateManagement:{title:{en:"State Management",ko:"상태 관리",ja:"状態管理",zh:"状态管理"},description:{en:"How to manage internal component state and respond to events",ko:"컴포넌트 내부 상태를 관리하고 이벤트에 반응하는 방법",ja:"コンポーネントの内部状態を管理しイベントに応答する方法",zh:"如何管理组件内部状态并响应事件"}},complexComponent:{title:{en:"Complex Component",ko:"복잡한 컴포넌트",ja:"複雑なコンポーネント",zh:"复杂组件"},description:{en:"A more complex component example: Todo List",ko:"더 복잡한 컴포넌트 예제: Todo 리스트",ja:"より複雑なコンポーネントの例：Todoリスト",zh:"更复杂的组件示例：待办事项列表"}},userManagementTable:{title:{en:"Data Table Component",ko:"데이터 테이블 컴포넌트",ja:"データテーブルコンポーネント",zh:"数据表格组件"},description:{en:"Interactive table with sorting, filtering and pagination",ko:"정렬, 필터링, 페이지네이션이 포함된 인터랙티브 테이블",ja:"ソート、フィルタリング、ページネーションを備えたインタラクティブテーブル",zh:"具有排序、过滤和分页功能的交互式表格"}},multiTemplate:{title:{en:"Multi-Template Application",ko:"다중 템플릿 애플리케이션",ja:"マルチテンプレートアプリケーション",zh:"多模板应用程序"},description:{en:"Complete application example combining multiple templates",ko:"여러 템플릿을 결합한 완전한 애플리케이션 예제",ja:"複数のテンプレートを組み合わせた完全なアプリケーション例",zh:"结合多个模板的完整应用程序示例"}}}});const o=_.layout.Header({}),t=_.section.Hero({}),n=_.section.Features({}),e=_.section.VSCodeExtension({}),r=await(await fetch("templates/demo/demo.Counter.cmint")).text(),a=await(await fetch("templates/demo/demo.TodoList.cmint")).text(),c=await(await fetch("templates/demo/demo.UserManagement.cmint")).text(),s=await(await fetch("templates/demo/demo.UserManagementTable.cmint")).text(),i=_.section.Architecture({}),h=_.section.Syntax({}),p=_.section.Installation({}),m=_.section.Examples({examples:()=>{var v,w,x,y,z,R,S,P,T,H,O,u,l,C,L,A,$,D,M,N;return[{class:"h-[500px]",interactive:!0,title:(w=(v=E.i18n.examples)==null?void 0:v.basicComponent)==null?void 0:w.title("Basic Component"),description:(y=(x=E.i18n.examples)==null?void 0:x.basicComponent)==null?void 0:y.description("Simple template definition and usage"),code:`// Template definition
compomint.addTmpl('demo-Button', \`
  <button class="ui-Button p-2 ##=data.color ? 'bg-' + data.color + '-50' : ''##"
    data-co-event="##:data.onClick##">
    ##=data.label##
  </button>
\`);

// Create and use component
const button = tmpl.demo.Button({
  label: 'Click here',
  color: 'indigo',
  onClick: function() {
    alert('The button has been clicked!');
  }
});
document.body.appendChild(button.element);`},{class:"h-[700px]",interactive:!0,title:(R=(z=E.i18n.examples)==null?void 0:z.stateManagement)==null?void 0:R.title("State Management"),description:(P=(S=E.i18n.examples)==null?void 0:S.stateManagement)==null?void 0:P.description("How to manage internal component state and respond to events"),type:"codeIsTemplateFile",template:r,code:`// Create a counter component for an example
const counter = tmpl.demo.Counter({
  initialCount: 1
});
document.body.appendChild(counter.element);`},{class:"h-[1000px]",interactive:!0,title:(H=(T=E.i18n.examples)==null?void 0:T.complexComponent)==null?void 0:H.title("Complex Component"),description:(u=(O=E.i18n.examples)==null?void 0:O.complexComponent)==null?void 0:u.description("A more complex component example: Todo List"),type:"codeIsTemplateFile",template:a,code:`// Create a todo list component for an example
const todoList = tmpl.demo.TodoList({
  initialTodos: [
    { text: "Read Compomint documentation", completed: true },
    { text: "Create your first component", completed: false },
    { text: "Apply to website", completed: false }
  ]
});
document.body.appendChild(todoList.element);`},{class:"h-[1400px]",interactive:!0,title:(C=(l=E.i18n.examples)==null?void 0:l.userManagementTable)==null?void 0:C.title("Data Table Component"),description:(A=(L=E.i18n.examples)==null?void 0:L.userManagementTable)==null?void 0:A.description("Interactive table with sorting, filtering and pagination"),type:"codeIsTemplateFile",template:s,imports:[],code:`// Create a user management system for an example
const userManagementTable = tmpl.demo.UserManagementTable({
  users: [
    { id: 1, name: 'Kim Chul-su', email: 'kim@example.com', role: 'admin', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Lee Young-hee', email: 'lee@example.com', role: 'moderator', status: 'active', joinDate: '2024-02-10' },
    { id: 3, name: 'Park Min-su', email: 'park@example.com', role: 'user', status: 'inactive', joinDate: '2024-03-05' },
    { id: 4, name: 'Choi Ji-eun', email: 'choi@example.com', role: 'user', status: 'pending', joinDate: '2024-06-20' }
  ]
});
document.body.appendChild(userManagementTable.element);`},{class:"h-[1400px]",interactive:!0,title:(D=($=E.i18n.examples)==null?void 0:$.multiTemplate)==null?void 0:D.title("Multi-Template Application"),description:(N=(M=E.i18n.examples)==null?void 0:M.multiTemplate)==null?void 0:N.description("Complete application example combining multiple templates"),type:"codeIsTemplateFile",template:c,imports:[],code:`// Create a user management system for an example
const userManagement = tmpl.demo.UserManagement({
  users: [
    { id: 1, name: 'Kim Chul-su', email: 'kim@example.com', role: 'admin', active: true, joinDate: '2024-01-15' },
    { id: 2, name: 'Lee Young-hee', email: 'lee@example.com', role: 'moderator', active: true, joinDate: '2024-02-10' },
    { id: 3, name: 'Park Min-su', email: 'park@example.com', role: 'user', active: false, joinDate: '2024-03-05' },
    { id: 4, name: 'Choi Ji-eun', email: 'choi@example.com', role: 'user', active: true, joinDate: '2024-06-20' }
  ]
});
document.body.appendChild(userManagement.element);`}]}}),d=_.section.Documentation({}),f=_.layout.Footer({}),g=_.app.Layout({header:o,hero:t,features:n,vscodeExtension:e,architecture:i,syntax:h,installation:p,examples:m,documentation:d,footer:f});document.getElementById("app-container").appendChild(g.element),window.appLayout=g,document.querySelectorAll('a[href^="#"]').forEach(v=>{v.addEventListener("click",function(w){w.preventDefault();const x=this.getAttribute("href");if(x==="#")return;const y=document.querySelector(x);console.log("Target ID:",x,"Target Element:",y),y?window.scrollTo({top:y.offsetTop-70,behavior:"smooth"}):console.warn("Target element not found:",x)})}),window.originalLayout=g,window.currentPage="home"}window.showPage=function(o){const t=document.getElementById("app-container");if(o==="tutorial"){window.currentPage="tutorial";const n=[{id:"getting-started",title:"Getting Started",description:"Learn the basics of Compomint and create your first component.",code:`// Create a simple greeting component
compomint.addTmpl('demo-greeting', '<div class="p-4 bg-blue-100 dark:bg-blue-800 rounded-lg">Hello, ##=data.name##!</div>');

// Use the component
const greeting = tmpl.demo.greeting({name: 'World'});
document.body.appendChild(greeting.element);`,interactive:!0,showConsole:!1},{id:"basic-usage",title:"Basic Usage",description:"Understand data binding and component rendering.",code:`// Template with data binding
compomint.addTmpl('user-card', \`
  <div class="p-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800">
    <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">##=data.name##</h3>
    <p class="text-gray-600 dark:text-gray-300">##=data.email##</p>
    <p class="text-sm text-gray-500 dark:text-gray-400">Age: ##=data.age##</p>
  </div>\`);

// Create and render component
const userCard = tmpl.user.card({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

document.body.appendChild(userCard.element);`,interactive:!0,showConsole:!1},{id:"template-syntax",title:"Template Syntax",description:"Explore different template expression types.",code:`// Template with various syntax types
compomint.addTmpl('syntax-demo', \`
    ##
      // JavaScript code block
      const currentTime = new Date().toLocaleTimeString();
      const items = ['Apple', 'Banana', 'Orange'];
    ##
    <div class="p-4 space-y-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <h3 class="font-bold text-gray-900 dark:text-gray-100">Template Syntax Demo</h3>
      <p class="text-gray-700 dark:text-gray-300">Name: ##=data.name##</p>
      <p class="text-gray-700 dark:text-gray-300">HTML: ##-data.html##</p>
      <p class="text-gray-700 dark:text-gray-300">Time: ##=currentTime##</p>
      ##if (data.showList) {##
        <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300">
          ##items.forEach(item => {##
            <li>##=item##</li>
          ##})##
        </ul>
      ##}##
    </div>\`);

// Use the component
const syntaxDemo = tmpl.syntax.demo({
  name: 'Alice',
  html: '<strong>Bold Text</strong>',
  showList: true
});

document.body.appendChild(syntaxDemo.element);`,interactive:!0,showConsole:!1},{id:"component-creation",title:"Component Creation",description:"Learn how to create reusable components with state management.",code:`// Counter component with state
compomint.addTmpl('demo-counter', \`
    ##
      // Initialize state
      status.count = status.count || data.initialCount || 0;

      function increment() {
        status.count++;
        component.refresh();
      }

      function decrement() {
        status.count--;
        component.refresh();
      }

      function reset() {
        status.count = 0;
        component.refresh();
      }
    ##
    <div class="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
      <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Counter: ##=status.count##</h3>
      <div class="space-x-2">
        <button class="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                data-co-event="##:{click: increment}##">+</button>
        <button class="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                data-co-event="##:{click: decrement}##">-</button>
        <button class="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                data-co-event="##:{click: reset}##">Reset</button>
      </div>
    </div>
\`);

// Create counter component
const counter = tmpl.demo.counter({initialCount: 5});
document.body.appendChild(counter.element);`,interactive:!0,showConsole:!1},{id:"advanced-features",title:"Advanced Features",description:"Explore component composition and lifecycle management.",code:`// Simple list component
compomint.addTmpl('item-list', \`
    ##
      status.items = status.items || data.items || [];

      function addItem() {
        const input = component.element.querySelector('input');
        if (input.value.trim()) {
          status.items.push(input.value.trim());
          input.value = \\'\\';
          component.refresh();
        }
      }

      function removeItem(index) {
        status.items.splice(index, 1);
        component.refresh();
      }
    ##
    <div class="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 max-w-md">
      <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">My List</h3>
      <div class="mb-4 flex gap-2">
        <input type="text" class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-100"
               placeholder="Add an item...">
        <button class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                data-co-event="##:{click: addItem}##">Add</button>
      </div>
      <ul class="space-y-2">
        ##status.items.forEach((item, index) => {##
          <li class="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-600 rounded">
            <span class="flex-1 text-gray-700 dark:text-gray-300">##=item##</span>
            <button class="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                    data-co-event="##:{click: () => removeItem(index)}##">✕</button>
          </li>
        ##})##
      </ul>
    </div>
\`);

// Create list component
const itemList = tmpl.item.list({
  items: ['Learn Compomint', 'Build awesome apps']
});

document.body.appendChild(itemList.element);`,interactive:!0,showConsole:!1}],e=_.page.Tutorial({examples:n});t.innerHTML="",t.appendChild(e.element),window.scrollTo({top:0,behavior:"smooth"})}else o==="home"&&(window.currentPage="home",t.innerHTML="",t.appendChild(window.originalLayout.element),window.scrollTo({top:0,behavior:"smooth"}))};
