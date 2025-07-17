(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&e(c)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();const V=function(o){if(o.firstElementChild)return o.firstElementChild;const t=o.childNodes;for(let n=0,e=t.length;n<e;n++)if(t[n]instanceof Element)return t[n];return null},Z=function(o){return o.childElementCount||Array.prototype.filter.call(o.childNodes,function(t){return t instanceof Element}).length},Q=function(o){for(let t=0;t<o.childNodes.length;t++){const n=o.childNodes[t];n.nodeType===8||n.nodeType===3&&!/\S/.test(n.nodeValue||"")?(o.removeChild(n),t--):n.nodeType===1&&Q(n)}},te=new DOMParser,F=function(o){if(typeof o=="number"||!isNaN(Number(o)))return document.createTextNode(String(o));if(typeof o=="string")try{const n=te.parseFromString(o,"text/html").body;if(n.childNodes.length===1)return n.firstChild;{const e=document.createDocumentFragment();for(;n.firstChild;)e.appendChild(n.firstChild);return e}}catch{return document.createTextNode(o)}else return document.createTextNode("")},ne=function(o){return Object.prototype.toString.call(o)==="[object Object]"},oe=(o,t)=>({rules:{style:{pattern:/(\<style id=[\s\S]+?\>[\s\S]+?\<\/style\>)/g,exec:function(n){var e;const r=document.createElement("template");r.innerHTML=n;const a=(r.content||r).querySelector("style");if(!a||!a.id)return"";const c=document.getElementById(a.id);return c&&((e=c.parentNode)===null||e===void 0||e.removeChild(c)),document.head.appendChild(a),""}},commentArea:{pattern:/##\*([\s\S]+?)##/g,exec:function(n){return""}},preEvaluate:{pattern:/##!([\s\S]+?)##/g,exec:function(n,e){try{new Function("compomint","tmplId",n)(t,e)}catch(r){if(o.throwError)throw console.error(`Template preEvaluate error in "${e}", ${r.name}: ${r.message}`),r;console.warn(`Template preEvaluate error in "${e}", ${r.name}: ${r.message}`)}return""}},interpolate:{pattern:/##=([\s\S]+?)##/g,exec:function(n){return`';
(() => {let __t, interpolate=${n};
__p+=((__t=(typeof (interpolate)=='function' ? (interpolate)() : (interpolate)))==null ? '' : String(__t) );})();
__p+='`}},escape:{pattern:/##-([\s\S]+?)##/g,exec:function(n){return`';
(() => {let __t, escape=${n};
__p+=((__t=(compomint.tools.escapeHtml.escape(typeof (escape)=='function' ? (escape)() : (escape))))==null ? '' : String(__t) );})();
__p+='`}},elementProps:{pattern:/data-co-props="##:([\s\S]+?)##"/g,exec:function(n){return`';
const eventId = (__lazyScope.elementPropsArray.length);
__p+='data-co-props="'+eventId+'"';

__lazyScope.elementPropsArray[eventId] = ${n};
__p+='`},lazyExec:function(n,e,r,a){e.elementPropsArray.forEach(function(c,s){if(!c)return;const i=a.querySelector(`[data-co-props="${s}"]`);i&&(delete i.dataset.coProps,Object.keys(c).forEach(function(g){i.setAttribute(g,String(c[g]))}))})}},namedElement:{pattern:/data-co-named-element="##:([\s\S]+?)##"/g,exec:function(n){return`';
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
__p+='`},lazyExec:function(n,e,r,a){e.elementLoadArray.forEach(function(c,s){const i=a.querySelector(`[data-co-load="${s}"]`);if(!i){o.debug&&console.warn(`Element load target not found for ID ${s} in template ${r.tmplId}`);return}delete i.dataset.coLoad;try{if(typeof c.loadFunc=="function"){const g=[i,i,{data:n,element:i,customData:c.customData,component:r,compomint:t}];c.loadFunc.call(...g)}}catch(g){if(console.error(`Error executing elementLoad function for ID ${s} in template ${r.tmplId}:`,g,c.loadFunc),o.throwError)throw g}})}},event:{pattern:/data-co-event="##:([\s\S]+?)##"/g,exec:function(n){const e=n.split(":::");let r=`';
(() => {const eventId = (__lazyScope.eventArray.length);
__p+='data-co-event="'+eventId+'"';
`;const a=[];for(let c=0,s=e.length;c<s;c++){const i=e[c].split("::");a.push(`{eventFunc: ${i[0]}, $parent: this, customData: ${i[1]}}`)}return r+=`__lazyScope.eventArray[eventId] = [${a.join(",")}];})()
__p+='`,r},lazyExec:function(n,e,r,a){const c=this,s=c.attacher;s&&e.eventArray.forEach(function(i,g){const m=a.querySelector(`[data-co-event="${g}"]`);if(!m){o.debug&&console.warn(`Event target not found for ID ${g} in template ${r.tmplId}`);return}delete m.dataset.coEvent;for(let p=0,d=i.length;p<d;p++){const f=i[p];f.eventFunc&&(Array.isArray(f.eventFunc)?f.eventFunc.forEach(function(y){s(c,n,e,r,a,m,y,f)}):s(c,n,e,r,a,m,f.eventFunc,f))}})},trigger:function(n,e){const r=new Event(e,{bubbles:!0,cancelable:!0});n.dispatchEvent(r)},attacher:function(n,e,r,a,c,s,i,g){const m=n.trigger,p=V(c),d=Z(c)===1?p:null;if(!i)return;const f=[s,null,{data:e,customData:g.customData,element:s,componentElement:d||(p==null?void 0:p.parentElement),component:a,compomint:t}];if(typeof i=="function"){const C=function(E){E.stopPropagation(),f[1]=E;try{i.call(...f)}catch(v){if(console.error(`Error in event handler for template ${a.tmplId}:`,v,i),o.throwError)throw v}};s.addEventListener("click",C),g.element=s,g.eventFunc=C;return}if(!ne(i))return;const y=i,b=y.triggerName;b&&(a.trigger=a.trigger||{},a.trigger[b]={}),Object.keys(y).forEach(function(C){const E=y[C];if(C==="load"){f[1]=s;try{E.call(...f)}catch(h){if(console.error(`Error in 'load' event handler for template ${a.tmplId}:`,h,E),o.throwError)throw h}return}else if(C==="namedElement"){a[E]=s;return}else if(C==="triggerName")return;const v=function(h){h.stopPropagation(),f[1]=h;try{E.call(...f)}catch(I){if(console.error(`Error in '${C}' event handler for template ${a.tmplId}:`,I,E),o.throwError)throw I}};s.addEventListener(C,v),g.element=s,i[C]=v,b&&m&&(a.trigger[b][C]=function(){m(s,C)})})}},element:{pattern:/##%([\s\S]+?)##/g,exec:function(n){const e=n.split("::");return`';
(() => {
const elementId = (__lazyScope.elementArray.length);
__p+='<template data-co-tmpl-element-id="'+elementId+'"></template>';
__lazyScope.elementArray[elementId] = {childTarget: ${e[0]}, nonblocking: ${e[1]||!1}};})();
__p+='`},lazyExec:function(n,e,r,a){e.elementArray.forEach(function(c,s){const i=c.childTarget,g=c.nonblocking,m=a.querySelector(`template[data-co-tmpl-element-id="${s}"]`);if(!m){o.debug&&console.warn(`Element insertion placeholder not found for ID ${s} in template ${r.tmplId}`);return}if(!m.parentNode){o.debug&&console.warn(`Element insertion placeholder for ID ${s} in template ${r.tmplId} has no parent.`);return}const p=function(){if(!m||!m.parentNode){o.debug&&console.warn(`Placeholder for ID ${s} removed before insertion in template ${r.tmplId}.`);return}try{if(i instanceof Array){const d=document.createDocumentFragment();i.forEach(function(f){if(!f)return;const y=f.element||f;let b=null;if(typeof y=="string"||typeof y=="number")b=F(y);else if(typeof y=="function")b=F(y());else if(y instanceof Node)b=y;else{o.debug&&console.warn(`Invalid item type in element array for ID ${s}, template ${r.tmplId}:`,y);return}if(f.beforeAppendTo)try{f.beforeAppendTo()}catch(C){console.error("Error in beforeAppendTo (array item):",C)}b&&d.appendChild(b)}),m.parentNode.replaceChild(d,m),i.forEach(function(f){f&&f.afterAppendTo&&setTimeout(()=>{try{f.afterAppendTo()}catch(y){console.error("Error in afterAppendTo (array item):",y)}},0)})}else if(typeof i=="string"||typeof i=="number")m.parentNode.replaceChild(F(i),m);else if(typeof i=="function")m.parentNode.replaceChild(F(i()),m);else if(i&&(i.element||i)instanceof Node){const d=i,f=d.element||d;if(d.beforeAppendTo)try{d.beforeAppendTo()}catch(y){console.error("Error in beforeAppendTo:",y)}m.parentNode.replaceChild(f,m),d.afterAppendTo&&setTimeout(()=>{try{d.afterAppendTo&&d.afterAppendTo()}catch(y){console.error("Error in afterAppendTo:",y)}},0),d.tmplId&&(d.parentComponent=r)}else o.debug&&console.warn(`Invalid target for element insertion ID ${s}, template ${r.tmplId}:`,i),m.parentNode.removeChild(m)}catch(d){if(console.error(`Error during element insertion for ID ${s}, template ${r.tmplId}:`,d),o.throwError)throw d;if(m&&m.parentNode)try{m.parentNode.removeChild(m)}catch{}}};g===void 0||g===!1?p():setTimeout(p,typeof g=="number"?g:0)})}},lazyEvaluate:{pattern:/###([\s\S]+?)##/g,exec:function(n){return`';
__lazyScope.lazyEvaluateArray.push(function(data) {${n}});
__p+='`},lazyExec:function(n,e,r,a){const c=V(a),s=Z(a)===1?c:null;e.lazyEvaluateArray.forEach(function(i,g){try{i.call(s||a,n)}catch(m){if(console.error(`Error in lazyEvaluate block ${g} for template ${r.tmplId}:`,m,i),o.throwError)throw m}})}},evaluate:{pattern:/##([\s\S]+?)##/g,exec:n=>`';
`+n+`
__p+='`},escapeSyntax:{pattern:/#\\#([\s\S]+?)#\\#/g,exec:function(n){return`'+
'##${n}##'+
'`}}},keys:{dataKeyName:"data",statusKeyName:"status",componentKeyName:"component",i18nKeyName:"i18n"}}),re=o=>{o("co-Ele","<##=data[0]##></##=data[0]##>###compomint.tools.applyElementProps(this, data[1]);##"),o("co-Element",`##
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
  &lt;/##=data.tag##&gt;`)};typeof Object.assign!="function"&&Object.defineProperty(Object,"assign",{value:function(t,...n){if(t==null)throw new TypeError("Cannot convert undefined or null to object");const e=Object(t);for(let r=0,a=n.length;r<a;r++){const c=n[r];if(c!=null)for(let s in c)Object.prototype.hasOwnProperty.call(c,s)&&(e[s]=c[s])}return e},writable:!0,configurable:!0});(function(o){o.forEach(function(t){!t||t.hasOwnProperty("remove")||Object.defineProperty(t,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode!==null&&this.parentNode.removeChild(this)}})})})([Element.prototype,CharacterData.prototype,DocumentType.prototype]);(function(o){o||Object.defineProperty(window.Node.prototype,"isConnected",{get:function(){return document.body.contains(this)}})})("isConnected"in window.Node.prototype);const x={},M={},D=x.tools=x.tools||{},$=x.configs=Object.assign({printExecTime:!1,debug:!1,throwError:!0},x.configs),P=x.tmplCache=x.tmplCache||new Map;P.has("anonymous")||P.set("anonymous",{elements:new Set});const ae="content"in document.createElement("template"),ie=/(.)^/,J={"'":"\\'","\\":"\\\\","\r":"\\r","\n":"\\n","	":"\\t","\u2028":"\u2028","\u2029":"\u2029","><":"><","<":"<",">":">"},q=/\>( |\n)+\<|\>( |\n)+|( |\n)+\<|\\|'|\r|\n|\t|\u2028|\u2029/g;x.templateEngine=oe($,x);const H=function(){const o={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},t=Object.keys(o).reduce((e,r)=>(e[o[r]]=r,e),{}),n=function(e){const r=function(i){return e[i]},a=`(?:${Object.keys(e).join("|").replace(/\\/g,"\\\\")})`,c=RegExp(a),s=RegExp(a,"g");return function(i){return i=i==null?"":`${i}`,c.test(i)?i.replace(s,r):i}};return{escape:n(o),unescape:n(t)}}();D.escapeHtml=H;const X=function(o){const t=[],n=[],e={},r={};return Object.keys(o).forEach(function(a){const c=o[a];if(c&&typeof c=="object"&&c.pattern instanceof RegExp&&typeof c.exec=="function"&&(t.push((c.pattern||ie).source),n.push(c.exec)),c&&typeof c=="object"&&typeof c.lazyExec=="function"){const s=`${a}Array`;e[s]=c.lazyExec,r[s]=[]}}),{templateRules:o,pattern:new RegExp(t.join("|"),"g"),exec:n,lazyExecKeys:Object.keys(r),lazyExec:e,lazyScopeSeed:JSON.stringify(r)}},B=function(o){return J[o]||J[o.replace(/[ \n]/g,"")]||""},ce=X(x.templateEngine.rules),se=function(o,t,n){$.printExecTime&&console.time(`tmpl: ${o}`);let e=0,r="";return t.replace(n.pattern,function(...a){const c=a[0],s=a[a.length-2];r+=t.slice(e,s).replace(q,B);let i,g=null;if(a.slice(1,-2).some(function(m,p){return m!==void 0?(i=m,g=p,!0):!1}),i!==void 0&&g!==null)try{r+=n.exec[g].call(n.templateRules,i,o)}catch(m){if(console.error(`Error executing template rule index ${g} for match "${i}" in template "${o}":`,m),$.throwError)throw m;r+=""}else r+=c.replace(q,B);return e=s+c.length,c}),r+=t.slice(e).replace(q,B),$.printExecTime&&console.timeEnd(`tmpl: ${o}`),r},le=x.template=function(t,n,e){let r=x.templateEngine,a=ce;e&&(r={rules:Object.assign({},r.rules,e.rules||{}),keys:Object.assign({},r.keys,e.keys||{})},a=X(r.rules));const c=`
/* tmplId: ${t} */
//# sourceURL=http://tmpl//${t.split("-").join("//")}.js
// if (__debugger) {
// debugger;
// }
let __p='';
__p+='${se(t,n,a)}';
return __p;`;let s=null;try{s=new Function(r.keys.dataKeyName,r.keys.statusKeyName,r.keys.componentKeyName,r.keys.i18nKeyName,"compomint","tmpl","__lazyScope","__debugger",c)}catch(g){if($.throwError){console.error(`Template compilation error in "${t}", ${g.name}: ${g.message}`);try{new Function(r.keys.dataKeyName,r.keys.statusKeyName,r.keys.componentKeyName,r.keys.i18nKeyName,"compomint","tmpl","__lazyScope","__debugger",c)}catch{}throw g}else return()=>({})}const i=function(...m){let p,d,f,y;const b=m[0];b&&typeof b=="object"&&(b.$wrapperElement||b.$callback||b.$baseComponent)?(p=Object.assign({},b),d=p.$wrapperElement,delete p.$wrapperElement,f=p.$callback,delete p.$callback,y=p.$baseComponent,delete p.$baseComponent):(p=b,typeof m[1]=="function"?(d=void 0,f=m[1],y=m[2]):(d=m[1],f=m[2],y=m[3]));const C=r.keys.dataKeyName,E=r.keys.statusKeyName,v=JSON.parse(a.lazyScopeSeed),h=Object.assign(y||{},{tmplId:t,element:null,status:y&&y.status||{},replace:function(u){const l=this;if(!l.element||!(l.element instanceof Node)||!l.element.parentElement){$.debug&&console.warn(`Cannot replace template "${t}": element not in DOM.`);return}l.element.parentElement.replaceChild(u.element||u,l.element)},remove:function(u=!1){const l=this;if(l.beforeRemove)try{l.beforeRemove()}catch(k){console.error("Error in beforeRemove:",k)}v.eventArray&&v.eventArray.forEach(function(k){k.forEach(function(A){A.element&&(typeof A.eventFunc=="function"?A.element.removeEventListener("click",A.eventFunc):Object.keys(A.eventFunc).forEach(function(z){A.element.removeEventListener(z,A.eventFunc[z])}),Object.keys(A).forEach(z=>delete A[z]))})});const S=l.element instanceof Node?l.element.parentElement:null,R=l.element;if(S)if(u){const k=document.createElement("template");S.replaceChild(k,l.element),l.element=k}else S.removeChild(l.element);else $.debug&&console.warn(`Cannot remove template "${t}": element not in DOM.`);if(l.afterRemove)try{l.afterRemove()}catch(k){console.error("Error in afterRemove:",k)}return R},appendTo:function(u){const l=this;if(l.beforeAppendTo)try{l.beforeAppendTo()}catch(S){console.error("Error in beforeAppendTo:",S)}return u&&l.element instanceof Node?u.appendChild(l.element):$.debug&&console.warn(`Cannot append template "${t}": parentElement or scope.element is missing or not a Node.`),l.afterAppendTo&&setTimeout(()=>{try{l.afterAppendTo()}catch(S){console.error("Error in afterAppendTo:",S)}},0),l},release:function(){},render:function(u){return this},refresh:function(u){return this},reflash:function(u){return this}});h._id||(h._id=D.genId(t)),h[C]=p,h[E]==null&&(h[E]={});const I=d instanceof Element,N=document.createElement("template");$.printExecTime&&console.time(`render: ${t}`);let T=null,j=null;try{j=p?s.call(d||null,p,h[E],h,x.i18n[t],x,M,v,$.debug):`<template data-co-empty-template="${t}"></template>`}catch(u){if($.throwError){console.error(`Runtime error during render of "${t}":`,u.message),console.log("--- Data ---",p,"------------");try{s.call(d||null,p,h[E],h,x.i18n[t],v,!0)}catch{}throw u}else return console.warn(`Render failed for "${t}". Returning scope with comment node.`),h.element=document.createComment(`Render Error: ${t}`),h}$.printExecTime&&console.timeEnd(`render: ${t}`),N.innerHTML=j;let w=N.content||N;if(w.tagName=="TEMPLATE"&&!N.content){const u=Array.from(w.childNodes);w=document.createDocumentFragment(),u.forEach(l=>w.appendChild(l))}if(I&&d){for(;d.firstChild;)d.removeChild(d.firstChild);h.wrapperElement=d}if((w.querySelector?w.querySelector("style"):null)&&w.querySelector){const u=document.createElement(t);try{const l=u.attachShadow({mode:"open"});for(;w.firstChild;)l.appendChild(w.firstChild);w=u}catch(l){console.error(`Failed to attach shadow DOM for template "${t}":`,l)}}if(w.firstChild&&w.firstChild.nodeType==8)T=w.firstChild;else if(Z(w)==1){if(T=V(w),I&&d&&T){if(h.beforeAppendTo)try{h.beforeAppendTo()}catch(u){console.error("Error in beforeAppendTo:",u)}d.appendChild(T),h.afterAppendTo&&setTimeout(()=>{try{h.afterAppendTo()}catch(u){console.error("Error in afterAppendTo:",u)}},0)}}else if(I&&d){if(h.beforeAppendTo)try{h.beforeAppendTo()}catch(u){console.error("Error in beforeAppendTo:",u)}d.appendChild(w),h.afterAppendTo&&setTimeout(()=>{try{h.afterAppendTo()}catch(u){console.error("Error in afterAppendTo:",u)}},0),T=d}else T=w;if(p&&p.$props&&T instanceof Element)for(const u in p.$props)try{const l=p.$props[u];if(u.startsWith("data-")){const S=u.substring(5).replace(/-([a-z])/g,R=>R[1].toUpperCase());T.dataset[S]=String(l)}else u in T?T[u]=l:T.setAttribute(u,String(l))}catch(l){console.error(`Error applying prop "${u}" to element in template "${t}":`,l)}T instanceof Node&&T.normalize&&T.normalize(),T instanceof Node&&Q(T),h.element=T;const O=a.lazyExec;if(p&&a.lazyExecKeys.forEach(function(u){if(v[u]&&v[u].length>0)try{O[u].call(r.rules[u.slice(0,-5)],p,v,h,w)}catch(l){if($.throwError)throw console.error(`Error during lazy execution of "${u}" for template "${t}":`,l),l}}),D.liveReloadSupport)try{D.liveReloadSupport(h)}catch(u){console.error("Error in liveReloadSupport:",u)}if(f)try{f.call(d||null,h)}catch(u){if(console.error(`Error in template callback for "${t}":`,u),$.throwError)throw u}return h.release=function(){const u=this,l=Object.getOwnPropertyNames(u),S=[E,"_id"];for(let R=0;R<l.length;R++){const k=l[R];typeof u[k]!="function"&&!S.includes(k)&&delete u[k]}},h.render=function(u){const l=this,S=l.element,R=S instanceof Node?S.parentElement:null,k=l.wrapperElement,A=x.tmpl(l.tmplId);if(!A)return console.error(`Cannot re-render: Template function for "${l.tmplId}" not found.`),l;const z={beforeAppendTo:l.beforeAppendTo,afterAppendTo:l.afterAppendTo,beforeRemove:l.beforeRemove,afterRemove:l.afterRemove,beforeRefresh:l.beforeRefresh,afterRefresh:l.afterRefresh};if(l.beforeRemove)try{l.beforeRemove()}catch(_){console.error("Error in beforeRemove during render:",_)}let L;if(k)L=A(u,k,void 0,l);else if(R&&S instanceof Node)if(L=A(u,void 0,void 0,l),L.element instanceof Node){if(L.beforeAppendTo)try{L.beforeAppendTo()}catch(_){console.error("Error in beforeAppendTo during render:",_)}R.replaceChild(L.element,S),L.afterAppendTo&&setTimeout(()=>{try{L.afterAppendTo()}catch(_){console.error("Error in afterAppendTo during render:",_)}},0)}else $.debug&&console.warn(`Re-render of "${l.tmplId}" resulted in no element or target was missing.`);else L=A(u,void 0,void 0,l);if(l.afterRemove)try{l.afterRemove()}catch(_){console.error("Error in afterRemove during render:",_)}return Object.assign(L,z),L},h.refresh=function(u){const l=this,S=l[C];if(l.beforeRefresh)try{l.beforeRefresh()}catch(A){console.error("Error in beforeRefresh:",A)}const R=Object.assign({},S||{},u),k=l.render(R);if(l.afterRefresh)try{l.afterRefresh()}catch(A){console.error("Error in afterRefresh:",A)}return k},h.reflash=h.refresh,h};if(Object.defineProperty(i,"name",{value:`render_${t}`,writable:!1}),t){const g=$.debug?{renderingFunc:i,source:H.escape(`function ${t}_source (${r.keys.dataKeyName}, ${r.keys.statusKeyName}, ${r.keys.componentKeyName}, ${r.keys.i18nKeyName}, __lazyScope, __debugger) {
${c}
}`),templateText:H.escape(n)}:{renderingFunc:i};P.set(t,g);const m=t.split("-");if(m.length>1){const p=m[0];let d=M[p];d||(M[p]=d={});const f=m.slice(1).map((y,b)=>b===0?y:y.charAt(0).toUpperCase()+y.slice(1)).join("");d[f]=g.renderingFunc}}return i};x.remapTmpl=function(o){Object.keys(o).forEach(function(t){const n=o[t],e=P.get(t);e?(P.set(n,e),$.debug&&console.log(`Remapped template "${t}" to "${n}"`)):$.debug&&console.warn(`Cannot remap template: Old key "${t}" not found in cache.`)})};x.tmpl=function(o){const t=P.get(o);return t?t.renderingFunc:null};const ee=function(o){let t;if(o instanceof Element)return o.tagName==="TEMPLATE",o;if(typeof o!="string"&&($.debug&&console.warn("safeTemplate received non-string/non-element source:",o),o=""),t=document.createElement("template"),ae){const n=o.replace(/<(?!template|\/template|body|\/body|html|\/html|head|\/head|style|\/style|script|\/script|link|\/link|meta|\/meta|!--)/gi,"&lt;");t.innerHTML=n}else{const n=o.replace(/<(?!template|\/template|body|\/body|html|\/html|head|\/head|style|\/style|script|\/script|link|\/link|meta|\/meta|!--)/gi,"&lt;").replace(/<template/g,'<script type="template"').replace(/<\/template>/g,"<\/script>");t.innerHTML=n}return t},G=x.addTmpl=function(o,t,n){let e=t instanceof Element?t.innerHTML:String(t);return e=H.unescape(e.replace(/<!---|--->/gi,"")),le(o,e,n)},de=x.addTmpls=function(o,t,n){typeof t!="boolean"&&n==null?(n=t,t=!1):t=!!t;const e=ee(o);return(e.content||e).querySelectorAll('template[id], script[type="text/template"][id], script[type="text/compomint"][id]').forEach(c=>{const s=c.id;s&&(c.dataset.coLoadScript!==void 0?G(s,c,n)({}):G(s,c,n),t&&c.parentNode&&c.parentNode.removeChild(c))}),e};x.addTmplByUrl=function(t,n,e){!e&&typeof n=="function"&&(e=n,n={});const a=Object.assign({},{loadScript:!0,loadStyle:!0,loadLink:!0,templateEngine:void 0},n),c=p=>typeof p=="string"?{url:p,option:a}:p&&typeof p=="object"&&p.url?{url:p.url,option:Object.assign({},a,p.option)}:(console.error("Invalid import data format in addTmplByUrl:",p),null),s=p=>{p.forEach(d=>{var f;if(d){if(d.id){const y=document.getElementById(d.id);y&&((f=y.parentNode)===null||f===void 0||f.removeChild(y))}d.tagName==="SCRIPT"||d.tagName==="LINK"||d.tagName==="STYLE"?document.head.appendChild(d):document.body.appendChild(d)}})},i=(p,d)=>{const f=ee(p);de(f,!1,d.templateEngine);const y=f.content||f;if(d.loadLink){const b=y.querySelectorAll('link[rel="stylesheet"]');s(b)}if(d.loadStyle){const b=y.querySelectorAll("style[id]");s(b)}if(d.loadScript){const b=y.querySelectorAll('script:not([type]), script[type="text/javascript"], script[type="module"]'),C=Array.from(b).filter(E=>{let v=E.parentNode;for(;v;){if(v.nodeName==="TEMPLATE"||v.nodeName==="SCRIPT"&&v.type.includes("template"))return!1;v=v.parentNode}return!0}).map(E=>{const v=document.createElement("script");return E.getAttributeNames().forEach(h=>v.setAttribute(h,E.getAttribute(h))),E.innerHTML&&(v.textContent=E.innerHTML),v});s(C)}},g=p=>new Promise((d,f)=>{const y=c(p);if(!y){d();return}const b=y.url,C=y.option;if(b.endsWith(".js")){const E=Y("script",{async:!0,src:b});E.addEventListener("load",()=>d()),E.addEventListener("error",()=>{console.error(`Failed to load script: ${b}`),f(new Error(`Failed to load script: ${b}`))}),document.head.appendChild(E)}else if(b.endsWith(".css")){const E=Y("link",{type:"text/css",rel:"stylesheet",href:b});E.addEventListener("load",()=>d()),E.addEventListener("error",()=>{console.error(`Failed to load stylesheet: ${b}`),f(new Error(`Failed to load stylesheet: ${b}`))}),document.head.appendChild(E)}else me(b,null,(E,v)=>{if(v===200||v===0)try{i(E,C),d()}catch(h){console.error(`Error processing imported HTML from ${b}:`,h),f(new Error(`Error processing imported HTML from ${b}: ${h}`))}else console.error(`Failed to fetch template file: ${b} (Status: ${v})`),f(new Error(`Failed to fetch template file: ${b} (Status: ${v})`))})});if(t==null)if(e){e();return}else return Promise.resolve();const m=Array.isArray(t)?t.length===0?Promise.resolve():Promise.all(t.map(g)).then(()=>{}).catch(p=>{throw console.error("Error loading resources in addTmplByUrl:",p),p}):g(t).catch(p=>{throw console.error("Error loading resource in addTmplByUrl:",p),p});if(e){m.then(()=>e()).catch(p=>{console.error("Error in addTmplByUrl callback mode:",p),e()});return}else return m};const me=function(o,t,n){const e=new XMLHttpRequest;e.onreadystatechange=function(){e.readyState==XMLHttpRequest.DONE&&(e.status==200||e.status===0?n(e.responseText,e.status,e):(e.status==404?console.error(`Error 404: Not Found - ${o}`):e.status>=400?console.error(`HTTP Error ${e.status} for ${o}`):console.error(`Request failed for ${o}`,e.statusText),n(null,e.status,e)))},e.onerror=function(){console.error(`Network error requesting ${o}`),n(null,0,e)},e.ontimeout=function(){console.error(`Request timed out for ${o}`),n(null,408,e)};try{const r=t&&t.method||"GET";e.open(r,o,!0),t||e.send()}catch(r){console.error(`Error sending request to ${o}:`,r),n(null,0,e)}};x.i18n={};x.addI18n=function(o,t){if(!o||typeof o!="string"||!t||typeof t!="object"){console.error("Invalid arguments for addI18n:",o,t);return}const n=o.split(".");let e=x.i18n;const r=n.length-1;n.forEach(function(a,c){a&&(r===c?Object.keys(t).some(i=>Array.isArray(t[i]))?(e[a]||(e[a]=[]),Object.keys(t).filter(i=>Array.isArray(t[i])).forEach(i=>{t[i].forEach((m,p)=>{e[a][p]||(e[a][p]={}),m instanceof Object&&!Array.isArray(m)&&Object.keys(m).forEach(d=>{x.addI18n(o+"."+p+"."+d,m[d])})})})):(e[a]||(e[a]=function(i){const g=document.documentElement.lang||"en";let m=t[g];return m==null&&(m=i,$.debug&&console.warn(`i18n: Label key ["${o}"] for lang "${g}" is missing. Using default: "${i}"`)),m!=null?String(m):""}),Object.keys(t).filter(i=>t[i]instanceof Object&&!Array.isArray(t[i])).forEach(i=>{x.addI18n(o+"."+i,t[i])})):((!e[a]||typeof e[a]=="function")&&(e[a]={}),e=e[a]))})};x.addI18ns=function(o){const t=new Map;function n(a){if(t.has(a))return t.get(a);const c=a.split(".");let s=x.i18n;for(let i=0;i<c.length-1;i++)s[c[i]]||(s[c[i]]={}),s=s[c[i]];return t.set(a,s),s}function e(a){for(const c in a){const i=typeof a[c];if(i!=="string"&&i!=="number"&&i!=="boolean")return!1}return!0}function r(a,c=""){for(const s in a){const i=a[s],g=c?c+"."+s:s;if(Array.isArray(i)){const m=n(g),p=g.split(".").pop();m[p]||(m[p]=[]);for(let d=0;d<i.length;d++){const f=i[d];if(m[p][d]||(m[p][d]={}),f&&typeof f=="object")for(const y in f){const b=f[y];if(b&&typeof b=="object"){const C=g+"."+d+"."+y;x.addI18n(C,b)}}}}else i&&typeof i=="object"?e(i)?x.addI18n(g,i):r(i,g):x.addI18n(g,i)}}r(o)};let W=0;D.genId=function(o){return W++,o+W};const pe=D.applyElementProps=function(o,t){return Object.keys(t).forEach(function(n){const e=t[n],r=n==="class"?"className":n;try{n==="style"&&typeof e=="object"&&e!==null?Object.assign(o.style,e):n==="dataset"&&typeof e=="object"&&e!==null?Object.assign(o.dataset,e):n.startsWith("on")&&typeof e=="function"?o[n.toLowerCase()]=e:r in o?o[r]=e:o.setAttribute(n,String(e))}catch(a){console.error(`Error setting attribute/property "${n}" on <${o.tagName}>:`,a)}}),o},Y=D.genElement=function(o,t={},...n){const e=document.createElement(o);let r={};return typeof t=="string"||t instanceof Node?n.unshift(t):Array.isArray(t)?n=t.concat(n):r=t,pe(e,r),n.forEach(a=>{typeof a=="string"?e.appendChild(document.createTextNode(a)):a instanceof Node&&e.appendChild(a)}),e};D.props=function(...o){if(!o||o.length===0)return"";const t=Object.assign({},...o),n=[];return Object.keys(t).forEach(function(e){const r=t[e];if(r||r===0){const a=String(r).replace(/"/g,"&quot;");n.push(`${e}="${a}"`)}}),n.join(" ")};re(G);document.addEventListener("DOMContentLoaded",function(){let o;try{o=localStorage.getItem("compomint-theme")}catch(r){console.warn("Couldn't access localStorage:",r)}const t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,n=o==="dark"||o===null&&t;n?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode"),document.documentElement.setAttribute("data-theme","dark")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode"),document.documentElement.setAttribute("data-theme","light")),x.addTmpls(`
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
  `);const e=M.ui.ThemeSwitcher({});if(document.body.appendChild(e.element),window.matchMedia){const r=window.matchMedia("(prefers-color-scheme: dark)");r.addEventListener&&r.addEventListener("change",function(a){localStorage.getItem("compomint-theme")||(e.status.isDarkMode=a.matches,a.matches?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode")),e.refresh())})}});document.addEventListener("DOMContentLoaded",function(){function o(){const t=document.querySelectorAll("pre code");if(!t.length){setTimeout(o,100);return}t.forEach(function(n){let e=n.textContent;if(n.innerHTML!==e)return;const r={keyword:/\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|new|this|typeof|instanceof|null|undefined|true|false|try|catch|finally|throw|class|extends|import|export|from|as|async|await|yield)\b/g,compomintKeyword:/\b(data|status|component|i18n|compomint|tmpl)\b/g,string:/((['"])(?:\\.|[^\\])*?\2)|(`(?:\\.|[^\\])*?`)/g,comment:/(\/\/.*?$)|(\/\*[\s\S]*?\*\/)/gm,function:/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,number:/\b(\d+(?:\.\d+)?)\b/g,tag:/(&lt;[^>]*&gt;)/g,compomintTemplate:/(##[=%\-!*]?[\s\S]*?##)/g},a={keyword:"text-pink-500",compomintKeyword:"text-purple-400",string:"text-green-400",comment:"text-gray-500",function:"text-blue-400",number:"text-yellow-500",tag:"text-cyan-400",compomintTemplate:"text-orange-400"};e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");for(const[c,s]of Object.entries(r))e=e.replace(s,function(i){if(c==="function"){const g=i.slice(0,-1);return`<span class="${a[c]}">${g}</span>(`}return`<span class="${a[c]}">${i}</span>`});n.innerHTML=e})}o(),setTimeout(o,500)});document.addEventListener("DOMContentLoaded",function(){x.addI18ns({app:{"page-title":{en:"Compomint - Lightweight Component Engine",ko:"Compomint - 경량 컴포넌트 엔진",ja:"Compomint - 軽量コンポーネントエンジン",zh:"Compomint - 轻量级组件引擎"},"meta-description":{en:"Compomint is a lightweight JavaScript template-based component engine for web applications",ko:"Compomint는 웹 애플리케이션을 위한 경량 JavaScript 템플릿 기반 컴포넌트 엔진입니다",ja:"Compomintは、Webアプリケーション向けの軽量JavaScriptテンプレートベースコンポーネントエンジンです",zh:"Compomint是一个用于Web应用程序的轻量级JavaScript模板组件引擎"},"og-image-alt":{en:"Compomint logo and code example screen",ko:"Compomint 로고 및 코드 예제 화면",ja:"Compomintロゴとコード例の画面",zh:"Compomint标志和代码示例屏幕"},examplesTitle:{en:"Code Examples",ko:"코드 예제",ja:"コード例",zh:"代码示例"}}});const o=["en","ko","ja","zh"];function t(){let n;try{n=localStorage.getItem("compomint-lang")}catch(a){console.warn("Failed to read language preference from localStorage:",a)}if(!n){const a=navigator.language.split("-")[0];n=o.includes(a)?a:"en"}const r=new URLSearchParams(window.location.search).get("lang");r&&o.includes(r)&&(n=r),document.documentElement.lang=n,localStorage.setItem("compomint-lang",n),setTimeout(function(){try{typeof window.updateMetaTags=="function"&&window.updateMetaTags()}catch(a){console.warn("Failed to update meta tags:",a)}},100)}t()});document.addEventListener("DOMContentLoaded",async function(){const o=x.addTmplByUrl(["templates/app-layout.cmint","templates/layout-header.cmint","templates/layout-footer.cmint","templates/section-hero.cmint","templates/section-features.cmint","templates/section-vscode-extension.cmint","templates/section-examples.cmint","templates/section-architecture.cmint","templates/section-syntax.cmint","templates/section-installation.cmint","templates/section-documentation.cmint","templates/section-integrations.cmint","templates/page-tutorial.cmint","templates/ui-cookie-consent.cmint","templates/ui-language-switcher.cmint","templates/cmint-brui.cmint","templates/cmint-playground.cmint"]);o?o.then(()=>{console.log("loaded templates, now initialize app"),fe()}):(console.error("Failed to load templates, cannot initialize app"),document.getElementById("app-container").innerHTML='<div class="text-center p-8"><h1 class="text-2xl text-red-600">Error loading application templates</h1></div>'),ue()});function ue(){let o;try{o=localStorage.getItem("compomint-theme")}catch(e){console.warn("Couldn't access localStorage:",e)}const t=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;o==="dark"||o===null&&t?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode"))}async function fe(){x.addI18ns({examples:{basicComponent:{title:{en:"Basic Component",ko:"기본 컴포넌트",ja:"基本的なコンポーネント",zh:"基础组件"},description:{en:"Simple template definition and usage",ko:"간단한 템플릿 정의와 사용 방법",ja:"シンプルなテンプレート定義と使用方法",zh:"简单的模板定义和使用方法"}},stateManagement:{title:{en:"State Management",ko:"상태 관리",ja:"状態管理",zh:"状态管理"},description:{en:"How to manage internal component state and respond to events",ko:"컴포넌트 내부 상태를 관리하고 이벤트에 반응하는 방법",ja:"コンポーネントの内部状態を管理しイベントに応答する方法",zh:"如何管理组件内部状态并响应事件"}},complexComponent:{title:{en:"Complex Component",ko:"복잡한 컴포넌트",ja:"複雑なコンポーネント",zh:"复杂组件"},description:{en:"A more complex component example: Todo List",ko:"더 복잡한 컴포넌트 예제: Todo 리스트",ja:"より複雑なコンポーネントの例：Todoリスト",zh:"更复杂的组件示例：待办事项列表"}},userManagementTable:{title:{en:"Data Table Component",ko:"데이터 테이블 컴포넌트",ja:"データテーブルコンポーネント",zh:"数据表格组件"},description:{en:"Interactive table with sorting, filtering and pagination",ko:"정렬, 필터링, 페이지네이션이 포함된 인터랙티브 테이블",ja:"ソート、フィルタリング、ページネーションを備えたインタラクティブテーブル",zh:"具有排序、过滤和分页功能的交互式表格"}},multiTemplate:{title:{en:"Multi-Template Application",ko:"다중 템플릿 애플리케이션",ja:"マルチテンプレートアプリケーション",zh:"多模板应用程序"},description:{en:"Complete application example combining multiple templates",ko:"여러 템플릿을 결합한 완전한 애플리케이션 예제",ja:"複数のテンプレートを組み合わせた完全なアプリケーション例",zh:"结合多个模板的完整应用程序示例"}},reactIntegration:{title:{en:"React + Compomint Integration",ko:"React + Compomint 통합",ja:"React + Compomint統合",zh:"React + Compomint 集成"},description:{en:"Using Compomint templates inside React components for flexible UI templating",ko:"유연한 UI 템플릿을 위해 React 컴포넌트 내에서 Compomint 템플릿 사용",ja:"柔軟なUIテンプレートのためにReactコンポーネント内でCompomintテンプレートを使用",zh:"在React组件中使用Compomint模板以获得灵活的UI模板"}},vueIntegration:{title:{en:"Vue + Compomint Integration",ko:"Vue + Compomint 통합",ja:"Vue + Compomint統合",zh:"Vue + Compomint 集成"},description:{en:"Using Compomint templates within Vue.js components for enhanced templating",ko:"Vue.js 컴포넌트 내에서 Compomint 템플릿을 사용하여 향상된 템플릿 기능 제공",ja:"Vue.jsコンポーネント内でCompomintテンプレートを使用した拡張テンプレート機能",zh:"在Vue.js组件中使用Compomint模板以增强模板功能"}}}});const o=M.layout.Header({}),t=M.section.Hero({}),n=M.section.Features({}),e=M.section.VSCodeExtension({}),r=await(await fetch("templates/demo/demo.Counter.cmint")).text(),a=await(await fetch("templates/demo/demo.TodoList.cmint")).text(),c=await(await fetch("templates/demo/demo.UserManagement.cmint")).text(),s=await(await fetch("templates/demo/demo.UserManagementTable.cmint")).text(),i=M.section.Architecture({}),g=M.section.Syntax({}),m=M.section.Installation({}),p=M.section.Examples({examples:()=>{var E,v,h,I,N,T,j,w,U,O,u,l,S,R,k,A,z,L,_,K;return[{class:"h-[500px]",interactive:!0,title:(v=(E=x.i18n.examples)==null?void 0:E.basicComponent)==null?void 0:v.title("Basic Component"),description:(I=(h=x.i18n.examples)==null?void 0:h.basicComponent)==null?void 0:I.description("Simple template definition and usage"),code:`// Template definition
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
document.body.appendChild(button.element);`},{class:"h-[700px]",interactive:!0,title:(T=(N=x.i18n.examples)==null?void 0:N.stateManagement)==null?void 0:T.title("State Management"),description:(w=(j=x.i18n.examples)==null?void 0:j.stateManagement)==null?void 0:w.description("How to manage internal component state and respond to events"),type:"codeIsTemplateFile",template:r,code:`// Create a counter component for an example
const counter = tmpl.demo.Counter({
  initialCount: 1
});
document.body.appendChild(counter.element);`},{class:"h-[1000px]",interactive:!0,title:(O=(U=x.i18n.examples)==null?void 0:U.complexComponent)==null?void 0:O.title("Complex Component"),description:(l=(u=x.i18n.examples)==null?void 0:u.complexComponent)==null?void 0:l.description("A more complex component example: Todo List"),type:"codeIsTemplateFile",template:a,code:`// Create a todo list component for an example
const todoList = tmpl.demo.TodoList({
  initialTodos: [
    { text: "Read Compomint documentation", completed: true },
    { text: "Create your first component", completed: false },
    { text: "Apply to website", completed: false }
  ]
});
document.body.appendChild(todoList.element);`},{class:"h-[1400px]",interactive:!0,title:(R=(S=x.i18n.examples)==null?void 0:S.userManagementTable)==null?void 0:R.title("Data Table Component"),description:(A=(k=x.i18n.examples)==null?void 0:k.userManagementTable)==null?void 0:A.description("Interactive table with sorting, filtering and pagination"),type:"codeIsTemplateFile",template:s,imports:[],code:`// Create a user management system for an example
const userManagementTable = tmpl.demo.UserManagementTable({
  users: [
    { id: 1, name: 'Kim Chul-su', email: 'kim@example.com', role: 'admin', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Lee Young-hee', email: 'lee@example.com', role: 'moderator', status: 'active', joinDate: '2024-02-10' },
    { id: 3, name: 'Park Min-su', email: 'park@example.com', role: 'user', status: 'inactive', joinDate: '2024-03-05' },
    { id: 4, name: 'Choi Ji-eun', email: 'choi@example.com', role: 'user', status: 'pending', joinDate: '2024-06-20' }
  ]
});
document.body.appendChild(userManagementTable.element);`},{class:"h-[1400px]",interactive:!0,title:(L=(z=x.i18n.examples)==null?void 0:z.multiTemplate)==null?void 0:L.title("Multi-Template Application"),description:(K=(_=x.i18n.examples)==null?void 0:_.multiTemplate)==null?void 0:K.description("Complete application example combining multiple templates"),type:"codeIsTemplateFile",template:c,imports:[],code:`// Create a user management system for an example
const userManagement = tmpl.demo.UserManagement({
  users: [
    { id: 1, name: 'Kim Chul-su', email: 'kim@example.com', role: 'admin', active: true, joinDate: '2024-01-15' },
    { id: 2, name: 'Lee Young-hee', email: 'lee@example.com', role: 'moderator', active: true, joinDate: '2024-02-10' },
    { id: 3, name: 'Park Min-su', email: 'park@example.com', role: 'user', active: false, joinDate: '2024-03-05' },
    { id: 4, name: 'Choi Ji-eun', email: 'choi@example.com', role: 'user', active: true, joinDate: '2024-06-20' }
  ]
});
document.body.appendChild(userManagement.element);`}]}}),d=M.section.Integrations({integrationExamples:()=>{var E,v,h,I,N,T,j,w;return[{title:(v=(E=x.i18n.examples)==null?void 0:E.reactIntegration)==null?void 0:v.title("React Integration"),description:(I=(h=x.i18n.examples)==null?void 0:h.reactIntegration)==null?void 0:I.description("Using Compomint templates inside React components for flexible UI templating"),icon:"⚛️",gradient:"from-blue-500 to-cyan-500",class:"h-[600px]",interactive:!0,code:`// Load React if not already loaded - Please Click Run Button!
if (!window.React) {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
  script.onload = () => {
    const reactDomScript = document.createElement('script');
    reactDomScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
    //reactDomScript.onload = initializeApp;
    document.head.appendChild(reactDomScript);
  };
  document.head.appendChild(script);
} else {
  initializeApp();
}

function initializeApp() {
  // 1. Create simple Compomint template
  compomint.addTmpl('status-card', \`
    ##
      // text-green-800 text-yellow-800 text-blue-800
      const statusColor = data.status === 'success' ? 'green' : 
                         data.status === 'warning' ? 'yellow' : 'blue';
    ##
    <div class="p-4 bg-##=statusColor##-50 border border-##=statusColor##-200 rounded-lg">
      <div class="flex items-center">
        <span class="text-2xl mr-3">##=data.icon##</span>
        <div>
          <h3 class="font-bold text-##=statusColor##-800">##=data.title##</h3>
          <p class="text-##=statusColor##-600">##=data.message##</p>
        </div>
      </div>
    </div>
  \`);

  // 2. Simple React Hook for Compomint
  function useCompomint(templateId, data) {
    const [element, setElement] = React.useState(null);
    const containerRef = React.useRef(null);
    
    React.useEffect(() => {
      if (containerRef.current) {
        const comp = compomint.tmpl(templateId)(data);
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(comp.element);
      }
    }, [templateId, JSON.stringify(data)]);
    
    return containerRef;
  }

  // 3. React Component using Compomint template
  function StatusCard({ title, message, icon, status }) {
    const containerRef = useCompomint('status-card', {
      title, message, icon, status
    });
    
    return React.createElement('div', { ref: containerRef });
  }

  // 4. Main React App
  function App() {
    const [count, setCount] = React.useState(0);
    
    return React.createElement('div', { className: 'p-6 space-y-4' },
      React.createElement('h1', { className: 'text-2xl font-bold mb-4' }, 
        'React + Compomint Demo'),
      
      React.createElement('div', { className: 'space-y-3' },
        React.createElement(StatusCard, {
          title: 'Counter Status',
          message: \`Current count: \${count}\`,
          icon: '📊',
          status: count > 5 ? 'success' : count > 2 ? 'warning' : 'blue'
        }),
        
        React.createElement(StatusCard, {
          title: 'System Status', 
          message: 'All systems operational',
          icon: '✅',
          status: 'success'
        })
      ),
      
      React.createElement('div', { className: 'pt-4' },
        React.createElement('button', {
          className: 'px-4 py-2 bg-blue-500 text-white rounded mr-2',
          onClick: () => setCount(count + 1)
        }, 'Increment: ' + count),
        
        React.createElement('button', {
          className: 'px-4 py-2 bg-gray-500 text-white rounded',
          onClick: () => setCount(0)
        }, 'Reset')
      )
    );
  }

  // 5. Render the app
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(React.createElement(App), container);
}`},{title:(T=(N=x.i18n.examples)==null?void 0:N.vueIntegration)==null?void 0:T.title("Vue Integration"),description:(w=(j=x.i18n.examples)==null?void 0:j.vueIntegration)==null?void 0:w.description("Using Compomint templates within Vue.js components for enhanced templating"),icon:"🔧",gradient:"from-green-500 to-emerald-500",class:"h-[600px]",interactive:!0,code:`// Load Vue.js if not already loaded - Please Click Run Button!
if (!window.Vue) {
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/vue@3/dist/vue.global.js';
  //script.onload = initializeVueApp;
  document.head.appendChild(script);
} else {
  initializeVueApp();
}

function initializeVueApp() {
  const { createApp, ref, onMounted, onUnmounted, watchEffect } = Vue;

  // 1. Create Compomint templates for Vue components
  compomint.addTmpl('product-card', \`
    ##
      const priceColor = data.onSale ? 'text-red-600' : 'text-gray-800';
      const badgeClass = data.onSale ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';
    ##
    <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      ##if (data.onSale) {##
        <span class="inline-block px-2 py-1 text-xs font-semibold ##=badgeClass## rounded-full mb-2">
          SALE
        </span>
      ##}##
      <img src="##=data.image##" alt="##=data.name##" class="w-full h-32 object-cover rounded mb-3">
      <h3 class="font-semibold text-gray-900 mb-2">##=data.name##</h3>
      <p class="text-sm text-gray-600 mb-3">##=data.description##</p>
      <div class="flex justify-between items-center">
        <span class="##=priceColor## font-bold">##=data.price##</span>
        <button class="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                data-co-event="##:data.onAddToCart##">
          Add to Cart
        </button>
      </div>
    </div>
  \`);

  compomint.addTmpl('shopping-cart', \`
    ##
      const totalPrice = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    ##
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <h3 class="font-semibold text-gray-900 mb-3">Shopping Cart (##=data.items.length##)</h3>
      ##if (data.items.length === 0) {##
        <p class="text-gray-500">Your cart is empty</p>
      ##} else {##
        <div class="space-y-2 mb-3">
          ##data.items.forEach(item => {##
            <div class="flex justify-between items-center py-1">
              <span class="text-sm">##=item.name## x##=item.quantity##</span>
              <span class="text-sm font-medium">$##=(item.price * item.quantity).toFixed(2)##</span>
            </div>
          ##})##
        </div>
        <div class="border-t pt-2">
          <div class="flex justify-between items-center font-semibold">
            <span>Total:</span>
            <span>$##=totalPrice.toFixed(2)##</span>
          </div>
        </div>
      ##}##
    </div>
  \`);

  // 2. Vue composable for Compomint integration
  function useCompomint(templateId, data) {
    const containerRef = ref(null);
    let compomintInstance = null;

    const updateCompomint = () => {
      if (containerRef.value) {
        // Remove previous instance
        if (compomintInstance) {
          compomintInstance.remove();
        }
        
        // Create new instance
        compomintInstance = compomint.tmpl(templateId)(data.value);
        containerRef.value.innerHTML = '';
        containerRef.value.appendChild(compomintInstance.element);
      }
    };

    onMounted(() => {
      updateCompomint();
    });

    watchEffect(() => {
      updateCompomint();
    });

    onUnmounted(() => {
      if (compomintInstance) {
        compomintInstance.remove();
      }
    });

    return containerRef;
  }

  // 3. Vue app with Compomint components
  const app = createApp({
    setup() {
      // State
      const cartItems = ref([]);
      
      const products = ref([
        {
          id: 1,
          name: 'Wireless Headphones',
          description: 'High-quality sound with noise cancellation',
          price: 99.99,
          onSale: true,
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmMGYwZjAiLz48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIyMCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg=='
        },
        {
          id: 2,
          name: 'Smart Watch',
          description: 'Track your fitness and stay connected',
          price: 199.99,
          onSale: false,
          image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmMGYwZjAiLz48cmVjdCB4PSIzMCIgeT0iMzAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg=='
        }
      ]);

      // Methods
      const addToCart = (product) => {
        const existingItem = cartItems.value.find(item => item.id === product.id);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cartItems.value.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
          });
        }
      };

      // Compomint refs
      const cartRef = useCompomint('shopping-cart', ref({
        items: cartItems
      }));

      return {
        products,
        cartItems,
        addToCart,
        cartRef
      };
    },

    template: \`
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-6">Vue + Compomint Shop</h1>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Products (Vue components using Compomint templates) -->
          <div class="lg:col-span-2">
            <h2 class="text-lg font-semibold mb-4">Products</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CompomintProductCard 
                v-for="product in products" 
                :key="product.id"
                :product="product"
                @add-to-cart="addToCart"
              />
            </div>
          </div>
          
          <!-- Cart (Compomint template) -->
          <div>
            <h2 class="text-lg font-semibold mb-4">Cart</h2>
            <div ref="cartRef"></div>
          </div>
        </div>
      </div>
    \`
  });

  // 4. Register Vue component that uses Compomint
  app.component('CompomintProductCard', {
    props: ['product'],
    emits: ['add-to-cart'],
    setup(props, { emit }) {
      const productData = ref({
        ...props.product,
        onAddToCart: () => emit('add-to-cart', props.product)
      });

      const containerRef = useCompomint('product-card', productData);

      return { containerRef };
    },
    template: '<div ref="containerRef"></div>'
  });

  // 5. Mount the app
  const container = document.createElement('div');
  document.body.appendChild(container);
  app.mount(container);
}`}]}}),f=M.section.Documentation({}),y=M.layout.Footer({}),b=M.app.Layout({header:o,hero:t,features:n,vscodeExtension:e,architecture:i,syntax:g,installation:m,examples:p,integrations:d,documentation:f,footer:y});document.getElementById("app-container").appendChild(b.element),window.appLayout=b,document.querySelectorAll('a[href^="#"]').forEach(E=>{E.addEventListener("click",function(v){v.preventDefault();const h=this.getAttribute("href");if(h==="#")return;const I=document.querySelector(h);console.log("Target ID:",h,"Target Element:",I),I?window.scrollTo({top:I.offsetTop-70,behavior:"smooth"}):console.warn("Target element not found:",h)})}),window.originalLayout=b,window.currentPage="home"}window.showPage=function(o){const t=document.getElementById("app-container");if(o==="tutorial"){window.currentPage="tutorial";const n=[{id:"getting-started",title:"Getting Started",description:"Learn the basics of Compomint and create your first component.",code:`// Create a simple greeting component
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

document.body.appendChild(itemList.element);`,interactive:!0,showConsole:!1}],e=M.page.Tutorial({examples:n});t.innerHTML="",t.appendChild(e.element),window.scrollTo({top:0,behavior:"smooth"})}else o==="home"&&(window.currentPage="home",t.innerHTML="",t.appendChild(window.originalLayout.element),window.scrollTo({top:0,behavior:"smooth"}))};
