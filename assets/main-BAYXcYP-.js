(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const H=function(n){if(n.firstElementChild)return n.firstElementChild;const o=n.childNodes;for(let t=0,e=o.length;t<e;t++)if(o[t]instanceof Element)return o[t];return null},U=function(n){return n.childElementCount||Array.prototype.filter.call(n.childNodes,function(o){return o instanceof Element}).length},G=function(n){for(let o=0;o<n.childNodes.length;o++){const t=n.childNodes[o];t.nodeType===8||t.nodeType===3&&!/\S/.test(t.nodeValue||"")?(n.removeChild(t),o--):t.nodeType===1&&G(t)}},Q=new DOMParser,F=function(n){if(typeof n=="number"||!isNaN(Number(n)))return document.createTextNode(String(n));if(typeof n=="string")try{const t=Q.parseFromString(n,"text/html").body;if(t.childNodes.length===1)return t.firstChild;{const e=document.createDocumentFragment();for(;t.firstChild;)e.appendChild(t.firstChild);return e}}catch{return document.createTextNode(n)}else return document.createTextNode("")},ee=function(n){return Object.prototype.toString.call(n)==="[object Object]"},te=(n,o)=>({rules:{style:{pattern:/(\<style id=[\s\S]+?\>[\s\S]+?\<\/style\>)/g,exec:function(t){var e;const r=document.createElement("template");r.innerHTML=t;const a=(r.content||r).querySelector("style");if(!a||!a.id)return"";const i=document.getElementById(a.id);return i&&((e=i.parentNode)===null||e===void 0||e.removeChild(i)),document.head.appendChild(a),""}},commentArea:{pattern:/##\*([\s\S]+?)##/g,exec:function(t){return""}},preEvaluate:{pattern:/##!([\s\S]+?)##/g,exec:function(t,e){try{new Function("compomint","tmplId",t)(o,e)}catch(r){if(n.throwError)throw console.error(`Template preEvaluate error in "${e}", ${r.name}: ${r.message}`),r;console.warn(`Template preEvaluate error in "${e}", ${r.name}: ${r.message}`)}return""}},interpolate:{pattern:/##=([\s\S]+?)##/g,exec:function(t){return`';
(() => {let __t, interpolate=${t};
__p+=((__t=(typeof (interpolate)=='function' ? (interpolate)() : (interpolate)))==null ? '' : String(__t) );})();
__p+='`}},escape:{pattern:/##-([\s\S]+?)##/g,exec:function(t){return`';
(() => {let __t, escape=${t};
__p+=((__t=(compomint.tools.escapeHtml.escape(typeof (escape)=='function' ? (escape)() : (escape))))==null ? '' : String(__t) );})();
__p+='`}},elementProps:{pattern:/data-co-props="##:([\s\S]+?)##"/g,exec:function(t){return`';
const eventId = (__lazyScope.elementPropsArray.length);
__p+='data-co-props="'+eventId+'"';

__lazyScope.elementPropsArray[eventId] = ${t};
__p+='`},lazyExec:function(t,e,r,a){e.elementPropsArray.forEach(function(i,s){if(!i)return;const l=a.querySelector(`[data-co-props="${s}"]`);l&&(delete l.dataset.coProps,Object.keys(i).forEach(function(g){l.setAttribute(g,String(i[g]))}))})}},namedElement:{pattern:/data-co-named-element="##:([\s\S]+?)##"/g,exec:function(t){return`';
const eventId = (__lazyScope.namedElementArray.length);
__p+='data-co-named-element="'+eventId+'"';

__lazyScope.namedElementArray[eventId] = ${t};
__p+='`},lazyExec:function(t,e,r,a){e.namedElementArray.forEach(function(i,s){const l=a.querySelector(`[data-co-named-element="${s}"]`);if(!l){n.debug&&console.warn(`Named element target not found for ID ${s} in template ${r.tmplId}`);return}delete l.dataset.coNamedElement,r[i]=l})}},elementRef:{pattern:/data-co-element-ref="##:([\s\S]+?)##"/g,exec:function(t){return`';
var eventId = (__lazyScope.elementRefArray.length);
__p+='data-co-element-ref="'+eventId+'"';
var ${t} = null;
__lazyScope.elementRefArray[eventId] = function(target) {${t} = target;};
__p+='`},lazyExec:function(t,e,r,a){e.elementRefArray.forEach(function(i,s){const l=a.querySelector(`[data-co-element-ref="${s}"]`);if(!l){n.debug&&console.warn(`Element ref target not found for ID ${s} in template ${r.tmplId}`);return}delete l.dataset.coElementRef,i.call(l,l)})}},elementLoad:{pattern:/data-co-load="##:([\s\S]+?)##"/g,exec:function(t){const e=t.split("::");return`';
const eventId = (__lazyScope.elementLoadArray.length);
__p+='data-co-load="'+eventId+'"';
__lazyScope.elementLoadArray[eventId] = {loadFunc: ${e[0]}, customData: ${e[1]}};
__p+='`},lazyExec:function(t,e,r,a){e.elementLoadArray.forEach(function(i,s){const l=a.querySelector(`[data-co-load="${s}"]`);if(!l){n.debug&&console.warn(`Element load target not found for ID ${s} in template ${r.tmplId}`);return}delete l.dataset.coLoad;try{if(typeof i.loadFunc=="function"){const g=[l,l,{data:t,element:l,customData:i.customData,component:r,compomint:o}];i.loadFunc.call(...g)}}catch(g){if(console.error(`Error executing elementLoad function for ID ${s} in template ${r.tmplId}:`,g,i.loadFunc),n.throwError)throw g}})}},event:{pattern:/data-co-event="##:([\s\S]+?)##"/g,exec:function(t){const e=t.split(":::");let r=`';
(() => {const eventId = (__lazyScope.eventArray.length);
__p+='data-co-event="'+eventId+'"';
`;const a=[];for(let i=0,s=e.length;i<s;i++){const l=e[i].split("::");a.push(`{eventFunc: ${l[0]}, $parent: this, customData: ${l[1]}}`)}return r+=`__lazyScope.eventArray[eventId] = [${a.join(",")}];})()
__p+='`,r},lazyExec:function(t,e,r,a){const i=this,s=i.attacher;s&&e.eventArray.forEach(function(l,g){const f=a.querySelector(`[data-co-event="${g}"]`);if(!f){n.debug&&console.warn(`Event target not found for ID ${g} in template ${r.tmplId}`);return}delete f.dataset.coEvent;for(let m=0,d=l.length;m<d;m++){const h=l[m];h.eventFunc&&(Array.isArray(h.eventFunc)?h.eventFunc.forEach(function(y){s(i,t,e,r,a,f,y,h)}):s(i,t,e,r,a,f,h.eventFunc,h))}})},trigger:function(t,e){const r=new Event(e,{bubbles:!0,cancelable:!0});t.dispatchEvent(r)},attacher:function(t,e,r,a,i,s,l,g){const f=t.trigger,m=H(i),d=U(i)===1?m:null;if(!l)return;const h=[s,null,{data:e,customData:g.customData,element:s,componentElement:d||(m==null?void 0:m.parentElement),component:a,compomint:o}];if(typeof l=="function"){const k=function(b){b.stopPropagation(),h[1]=b;try{l.call(...h)}catch(E){if(console.error(`Error in event handler for template ${a.tmplId}:`,E,l),n.throwError)throw E}};s.addEventListener("click",k),g.element=s,g.eventFunc=k;return}if(!ee(l))return;const y=l,v=y.triggerName;v&&(a.trigger=a.trigger||{},a.trigger[v]={}),Object.keys(y).forEach(function(k){const b=y[k];if(k==="load"){h[1]=s;try{b.call(...h)}catch(w){if(console.error(`Error in 'load' event handler for template ${a.tmplId}:`,w,b),n.throwError)throw w}return}else if(k==="namedElement"){a[b]=s;return}else if(k==="triggerName")return;const E=function(w){w.stopPropagation(),h[1]=w;try{b.call(...h)}catch(N){if(console.error(`Error in '${k}' event handler for template ${a.tmplId}:`,N,b),n.throwError)throw N}};s.addEventListener(k,E),g.element=s,l[k]=E,v&&f&&(a.trigger[v][k]=function(){f(s,k)})})}},element:{pattern:/##%([\s\S]+?)##/g,exec:function(t){const e=t.split("::");return`';
(() => {
const elementId = (__lazyScope.elementArray.length);
__p+='<template data-co-tmpl-element-id="'+elementId+'"></template>';
__lazyScope.elementArray[elementId] = {childTarget: ${e[0]}, nonblocking: ${e[1]||!1}};})();
__p+='`},lazyExec:function(t,e,r,a){e.elementArray.forEach(function(i,s){const l=i.childTarget,g=i.nonblocking,f=a.querySelector(`template[data-co-tmpl-element-id="${s}"]`);if(!f){n.debug&&console.warn(`Element insertion placeholder not found for ID ${s} in template ${r.tmplId}`);return}if(!f.parentNode){n.debug&&console.warn(`Element insertion placeholder for ID ${s} in template ${r.tmplId} has no parent.`);return}const m=function(){if(!f||!f.parentNode){n.debug&&console.warn(`Placeholder for ID ${s} removed before insertion in template ${r.tmplId}.`);return}try{if(l instanceof Array){const d=document.createDocumentFragment();l.forEach(function(h){if(!h)return;const y=h.element||h;let v=null;if(typeof y=="string"||typeof y=="number")v=F(y);else if(typeof y=="function")v=F(y());else if(y instanceof Node)v=y;else{n.debug&&console.warn(`Invalid item type in element array for ID ${s}, template ${r.tmplId}:`,y);return}if(h.beforeAppendTo)try{h.beforeAppendTo()}catch(k){console.error("Error in beforeAppendTo (array item):",k)}v&&d.appendChild(v)}),f.parentNode.replaceChild(d,f),l.forEach(function(h){h&&h.afterAppendTo&&setTimeout(()=>{try{h.afterAppendTo()}catch(y){console.error("Error in afterAppendTo (array item):",y)}},0)})}else if(typeof l=="string"||typeof l=="number")f.parentNode.replaceChild(F(l),f);else if(typeof l=="function")f.parentNode.replaceChild(F(l()),f);else if(l&&(l.element||l)instanceof Node){const d=l,h=d.element||d;if(d.beforeAppendTo)try{d.beforeAppendTo()}catch(y){console.error("Error in beforeAppendTo:",y)}f.parentNode.replaceChild(h,f),d.afterAppendTo&&setTimeout(()=>{try{d.afterAppendTo&&d.afterAppendTo()}catch(y){console.error("Error in afterAppendTo:",y)}},0),d.tmplId&&(d.parentComponent=r)}else n.debug&&console.warn(`Invalid target for element insertion ID ${s}, template ${r.tmplId}:`,l),f.parentNode.removeChild(f)}catch(d){if(console.error(`Error during element insertion for ID ${s}, template ${r.tmplId}:`,d),n.throwError)throw d;if(f&&f.parentNode)try{f.parentNode.removeChild(f)}catch{}}};g===void 0||g===!1?m():setTimeout(m,typeof g=="number"?g:0)})}},lazyEvaluate:{pattern:/###([\s\S]+?)##/g,exec:function(t){return`';
__lazyScope.lazyEvaluateArray.push(function(data) {${t}});
__p+='`},lazyExec:function(t,e,r,a){const i=H(a),s=U(a)===1?i:null;e.lazyEvaluateArray.forEach(function(l,g){try{l.call(s||a,t)}catch(f){if(console.error(`Error in lazyEvaluate block ${g} for template ${r.tmplId}:`,f,l),n.throwError)throw f}})}},evaluate:{pattern:/##([\s\S]+?)##/g,exec:t=>`';
`+t+`
__p+='`}},keys:{dataKeyName:"data",statusKeyName:"status",componentKeyName:"component",i18nKeyName:"i18n"}}),ne=n=>{n("co-Ele","<##=data[0]##></##=data[0]##>###compomint.tools.applyElementProps(this, data[1]);##"),n("co-Element",`##
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
  &lt;/##=data.tag##&gt;`)};typeof Object.assign!="function"&&Object.defineProperty(Object,"assign",{value:function(o,...t){if(o==null)throw new TypeError("Cannot convert undefined or null to object");const e=Object(o);for(let r=0,a=t.length;r<a;r++){const i=t[r];if(i!=null)for(let s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s])}return e},writable:!0,configurable:!0});(function(n){n.forEach(function(o){!o||o.hasOwnProperty("remove")||Object.defineProperty(o,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode!==null&&this.parentNode.removeChild(this)}})})})([Element.prototype,CharacterData.prototype,DocumentType.prototype]);(function(n){n||Object.defineProperty(window.Node.prototype,"isConnected",{get:function(){return document.body.contains(this)}})})("isConnected"in window.Node.prototype);const c={},M={},j=c.tools=c.tools||{},C=c.configs=Object.assign({printExecTime:!1,debug:!1,throwError:!0},c.configs),R=c.tmplCache=c.tmplCache||new Map;R.has("anonymous")||R.set("anonymous",{elements:new Set});const oe="content"in document.createElement("template"),re=/(.)^/,J={"'":"\\'","\\":"\\\\","\r":"\\r","\n":"\\n","	":"\\t","\u2028":"\u2028","\u2029":"\u2029","><":"><","<":"<",">":">"},P=/\>( |\n)+\<|\>( |\n)+|( |\n)+\<|\\|'|\r|\n|\t|\u2028|\u2029/g;c.templateEngine=te(C,c);const D=function(){const n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=Object.keys(n).reduce((e,r)=>(e[n[r]]=r,e),{}),t=function(e){const r=function(l){return e[l]},a=`(?:${Object.keys(e).join("|").replace(/\\/g,"\\\\")})`,i=RegExp(a),s=RegExp(a,"g");return function(l){return l=l==null?"":`${l}`,i.test(l)?l.replace(s,r):l}};return{escape:t(n),unescape:t(o)}}();j.escapeHtml=D;const X=function(n){const o=[],t=[],e={},r={};return Object.keys(n).forEach(function(a){const i=n[a];if(i&&typeof i=="object"&&i.pattern instanceof RegExp&&typeof i.exec=="function"&&(o.push((i.pattern||re).source),t.push(i.exec)),i&&typeof i=="object"&&typeof i.lazyExec=="function"){const s=`${a}Array`;e[s]=i.lazyExec,r[s]=[]}}),{templateRules:n,pattern:new RegExp(o.join("|"),"g"),exec:t,lazyExecKeys:Object.keys(r),lazyExec:e,lazyScopeSeed:JSON.stringify(r)}},B=function(n){return J[n]||J[n.replace(/[ \n]/g,"")]||""},ae=X(c.templateEngine.rules),ie=function(n,o,t){C.printExecTime&&console.time(`tmpl: ${n}`);let e=0,r="";return o.replace(t.pattern,function(...a){const i=a[0],s=a[a.length-2];r+=o.slice(e,s).replace(P,B);let l,g=null;if(a.slice(1,-2).some(function(f,m){return f!==void 0?(l=f,g=m,!0):!1}),l!==void 0&&g!==null)try{r+=t.exec[g].call(t.templateRules,l,n)}catch(f){if(console.error(`Error executing template rule index ${g} for match "${l}" in template "${n}":`,f),C.throwError)throw f;r+=""}else r+=i.replace(P,B);return e=s+i.length,i}),r+=o.slice(e).replace(P,B),C.printExecTime&&console.timeEnd(`tmpl: ${n}`),r},se=c.template=function(o,t,e){let r=c.templateEngine,a=ae;e&&(r=Object.assign({},c.templateEngine,e),a=X(r.rules));const i=`
/* tmplId: ${o} */
//# sourceURL=http://tmpl//${o.split("-").join("//")}.js
// if (__debugger) {
// debugger;
// }
let __p='';
__p+='${ie(o,t,a)}';
return __p;`;let s=null;try{s=new Function(r.keys.dataKeyName,r.keys.statusKeyName,r.keys.componentKeyName,r.keys.i18nKeyName,"compomint","tmpl","__lazyScope","__debugger",i)}catch(g){if(C.throwError){console.error(`Template compilation error in "${o}", ${g.name}: ${g.message}`);try{new Function(r.keys.dataKeyName,r.keys.statusKeyName,r.keys.componentKeyName,r.keys.i18nKeyName,"compomint","tmpl","__lazyScope","__debugger",i)}catch{}throw g}else return()=>({})}const l=function(...f){let m,d,h,y;const v=f[0];v&&typeof v=="object"&&(v.$wrapperElement||v.$callback||v.$baseComponent)?(m=Object.assign({},v),d=m.$wrapperElement,delete m.$wrapperElement,h=m.$callback,delete m.$callback,y=m.$baseComponent,delete m.$baseComponent):(m=v,typeof f[1]=="function"?(d=void 0,h=f[1],y=f[2]):(d=f[1],h=f[2],y=f[3]));const k=r.keys.dataKeyName,b=r.keys.statusKeyName,E=JSON.parse(a.lazyScopeSeed),w=Object.assign(y||{},{tmplId:o,element:null,status:y&&y.status||{},replace:function(u){const p=this;if(!p.element||!(p.element instanceof Node)||!p.element.parentElement){C.debug&&console.warn(`Cannot replace template "${o}": element not in DOM.`);return}p.element.parentElement.replaceChild(u.element||u,p.element)},remove:function(u=!1){const p=this;if(p.beforeRemove)try{p.beforeRemove()}catch($){console.error("Error in beforeRemove:",$)}E.eventArray&&E.eventArray.forEach(function($){$.forEach(function(T){T.element&&(typeof T.eventFunc=="function"?T.element.removeEventListener("click",T.eventFunc):Object.keys(T.eventFunc).forEach(function(I){T.element.removeEventListener(I,T.eventFunc[I])}),Object.keys(T).forEach(I=>delete T[I]))})});const S=p.element instanceof Node?p.element.parentElement:null,z=p.element;if(S)if(u){const $=document.createElement("template");S.replaceChild($,p.element),p.element=$}else S.removeChild(p.element);else C.debug&&console.warn(`Cannot remove template "${o}": element not in DOM.`);if(p.afterRemove)try{p.afterRemove()}catch($){console.error("Error in afterRemove:",$)}return z},appendTo:function(u){const p=this;if(p.beforeAppendTo)try{p.beforeAppendTo()}catch(S){console.error("Error in beforeAppendTo:",S)}return u&&p.element instanceof Node?u.appendChild(p.element):C.debug&&console.warn(`Cannot append template "${o}": parentElement or scope.element is missing or not a Node.`),p.afterAppendTo&&setTimeout(()=>{try{p.afterAppendTo()}catch(S){console.error("Error in afterAppendTo:",S)}},0),p},release:function(){},render:function(u){return this},refresh:function(u){return this},reflash:function(u){return this}});w._id||(w._id=j.genId(o)),w[k]=m,w[b]==null&&(w[b]={});const N=d instanceof Element,O=document.createElement("template");C.printExecTime&&console.time(`render: ${o}`);let A=null,q=null;try{q=m?s.call(d||null,m,w[b],w,c.i18n[o],c,M,E,C.debug):`<template data-co-empty-template="${o}"></template>`}catch(u){if(C.throwError){console.error(`Runtime error during render of "${o}":`,u.message),console.log("--- Data ---",m,"------------");try{s.call(d||null,m,w[b],w,c.i18n[o],E,!0)}catch{}throw u}else return console.warn(`Render failed for "${o}". Returning scope with comment node.`),w.element=document.createComment(`Render Error: ${o}`),w}C.printExecTime&&console.timeEnd(`render: ${o}`),O.innerHTML=q;let x=O.content||O;if(x.tagName=="TEMPLATE"&&!O.content){const u=Array.from(x.childNodes);x=document.createDocumentFragment(),u.forEach(p=>x.appendChild(p))}if(N&&d){for(;d.firstChild;)d.removeChild(d.firstChild);w.wrapperElement=d}if((x.querySelector?x.querySelector("style"):null)&&x.querySelector){const u=document.createElement(o);try{const p=u.attachShadow({mode:"open"});for(;x.firstChild;)p.appendChild(x.firstChild);x=u}catch(p){console.error(`Failed to attach shadow DOM for template "${o}":`,p)}}if(x.firstChild&&x.firstChild.nodeType==8)A=x.firstChild;else if(U(x)==1){if(A=H(x),N&&d&&A){if(w.beforeAppendTo)try{w.beforeAppendTo()}catch(u){console.error("Error in beforeAppendTo:",u)}d.appendChild(A),w.afterAppendTo&&setTimeout(()=>{try{w.afterAppendTo()}catch(u){console.error("Error in afterAppendTo:",u)}},0)}}else if(N&&d){if(w.beforeAppendTo)try{w.beforeAppendTo()}catch(u){console.error("Error in beforeAppendTo:",u)}d.appendChild(x),w.afterAppendTo&&setTimeout(()=>{try{w.afterAppendTo()}catch(u){console.error("Error in afterAppendTo:",u)}},0),A=d}else A=x;if(m&&m.$props&&A instanceof Element)for(const u in m.$props)try{const p=m.$props[u];if(u.startsWith("data-")){const S=u.substring(5).replace(/-([a-z])/g,z=>z[1].toUpperCase());A.dataset[S]=String(p)}else u in A?A[u]=p:A.setAttribute(u,String(p))}catch(p){console.error(`Error applying prop "${u}" to element in template "${o}":`,p)}A instanceof Node&&A.normalize&&A.normalize(),A instanceof Node&&G(A),w.element=A;const Z=a.lazyExec;if(m&&a.lazyExecKeys.forEach(function(u){if(E[u]&&E[u].length>0)try{Z[u].call(r.rules[u.slice(0,-5)],m,E,w,x)}catch(p){if(C.throwError)throw console.error(`Error during lazy execution of "${u}" for template "${o}":`,p),p}}),j.liveReloadSupport)try{j.liveReloadSupport(w)}catch(u){console.error("Error in liveReloadSupport:",u)}if(h)try{h.call(d||null,w)}catch(u){if(console.error(`Error in template callback for "${o}":`,u),C.throwError)throw u}return w.release=function(){const u=this,p=Object.getOwnPropertyNames(u),S=[b,"_id"];for(let z=0;z<p.length;z++){const $=p[z];typeof u[$]!="function"&&!S.includes($)&&delete u[$]}},w.render=function(u){const p=this,S=p.element,z=S instanceof Node?S.parentElement:null,$=p.wrapperElement,T=c.tmpl(p.tmplId);if(!T)return console.error(`Cannot re-render: Template function for "${p.tmplId}" not found.`),p;const I={beforeAppendTo:p.beforeAppendTo,afterAppendTo:p.afterAppendTo,beforeRemove:p.beforeRemove,afterRemove:p.afterRemove,beforeRefresh:p.beforeRefresh,afterRefresh:p.afterRefresh};if(p.beforeRemove)try{p.beforeRemove()}catch(_){console.error("Error in beforeRemove during render:",_)}let L;if($)L=T(u,$,void 0,p);else if(z&&S instanceof Node)if(L=T(u,void 0,void 0,p),L.element instanceof Node){if(L.beforeAppendTo)try{L.beforeAppendTo()}catch(_){console.error("Error in beforeAppendTo during render:",_)}z.replaceChild(L.element,S),L.afterAppendTo&&setTimeout(()=>{try{L.afterAppendTo()}catch(_){console.error("Error in afterAppendTo during render:",_)}},0)}else C.debug&&console.warn(`Re-render of "${p.tmplId}" resulted in no element or target was missing.`);else L=T(u,void 0,void 0,p);if(p.afterRemove)try{p.afterRemove()}catch(_){console.error("Error in afterRemove during render:",_)}return Object.assign(L,I),L},w.refresh=function(u){const p=this,S=p[k];if(p.beforeRefresh)try{p.beforeRefresh()}catch(T){console.error("Error in beforeRefresh:",T)}const z=Object.assign({},S||{},u),$=p.render(z);if(p.afterRefresh)try{p.afterRefresh()}catch(T){console.error("Error in afterRefresh:",T)}return $},w.reflash=w.refresh,w};if(Object.defineProperty(l,"name",{value:`render_${o}`,writable:!1}),o){const g=C.debug?{renderingFunc:l,source:D.escape(`function ${o}_source (${r.keys.dataKeyName}, ${r.keys.statusKeyName}, ${r.keys.componentKeyName}, ${r.keys.i18nKeyName}, __lazyScope, __debugger) {
${i}
}`),templateText:D.escape(t)}:{renderingFunc:l};R.set(o,g);const f=o.split("-");if(f.length>1){const m=f[0];let d=M[m];d||(M[m]=d={});const h=f.slice(1).map((y,v)=>v===0?y:y.charAt(0).toUpperCase()+y.slice(1)).join("");d[h]=g.renderingFunc}}return l};c.remapTmpl=function(n){Object.keys(n).forEach(function(o){const t=n[o],e=R.get(o);e?(R.set(t,e),C.debug&&console.log(`Remapped template "${o}" to "${t}"`)):C.debug&&console.warn(`Cannot remap template: Old key "${o}" not found in cache.`)})};c.tmpl=function(n){const o=R.get(n);return o?o.renderingFunc:null};const Y=function(n){let o;if(n instanceof Element)return n.tagName==="TEMPLATE",n;if(typeof n!="string"&&(C.debug&&console.warn("safeTemplate received non-string/non-element source:",n),n=""),o=document.createElement("template"),oe){const t=n.replace(/<(?!template|\/template|body|\/body|html|\/html|head|\/head|style|\/style|script|\/script|link|\/link|meta|\/meta|!--)/gi,"&lt;");o.innerHTML=t}else{const t=n.replace(/<(?!template|\/template|body|\/body|html|\/html|head|\/head|style|\/style|script|\/script|link|\/link|meta|\/meta|!--)/gi,"&lt;").replace(/<template/g,'<script type="template"').replace(/<\/template>/g,"<\/script>");o.innerHTML=t}return o},K=c.addTmpl=function(n,o,t){let e=o instanceof Element?o.innerHTML:String(o);return e=D.unescape(e.replace(/<!---|--->/gi,"")),se(n,e,t)},le=c.addTmpls=function(n,o,t){typeof o!="boolean"&&t==null?(t=o,o=!1):o=!!o;const e=Y(n);return(e.content||e).querySelectorAll('template[id], script[type="text/template"][id], script[type="text/compomint"][id]').forEach(i=>{const s=i.id;s&&(i.dataset.coLoadScript!==void 0?K(s,i,t)({}):K(s,i,t),o&&i.parentNode&&i.parentNode.removeChild(i))}),e};c.addTmplByUrl=function(o,t,e){!e&&typeof t=="function"&&(e=t,t={});const a=Object.assign({},{loadScript:!0,loadStyle:!0,loadLink:!0,templateEngine:void 0},t),i=m=>typeof m=="string"?{url:m,option:a}:m&&typeof m=="object"&&m.url?{url:m.url,option:Object.assign({},a,m.option)}:(console.error("Invalid import data format in addTmplByUrl:",m),null),s=m=>{m.forEach(d=>{var h;if(d){if(d.id){const y=document.getElementById(d.id);y&&((h=y.parentNode)===null||h===void 0||h.removeChild(y))}d.tagName==="SCRIPT"||d.tagName==="LINK"||d.tagName==="STYLE"?document.head.appendChild(d):document.body.appendChild(d)}})},l=(m,d)=>{const h=Y(m);le(h,!1,d.tmplSettings);const y=h.content||h;if(d.loadLink){const v=y.querySelectorAll('link[rel="stylesheet"]');s(v)}if(d.loadStyle){const v=y.querySelectorAll("style[id]");s(v)}if(d.loadScript){const v=y.querySelectorAll('script:not([type]), script[type="text/javascript"], script[type="module"]'),k=Array.from(v).filter(b=>{let E=b.parentNode;for(;E;){if(E.nodeName==="TEMPLATE"||E.nodeName==="SCRIPT"&&E.type.includes("template"))return!1;E=E.parentNode}return!0}).map(b=>{const E=document.createElement("script");return b.getAttributeNames().forEach(w=>E.setAttribute(w,b.getAttribute(w))),b.innerHTML&&(E.textContent=b.innerHTML),E});s(k)}},g=m=>new Promise((d,h)=>{const y=i(m);if(!y){d();return}const v=y.url,k=y.option;if(v.endsWith(".js")){const b=W("script",{async:!0,src:v});b.addEventListener("load",()=>d()),b.addEventListener("error",()=>{console.error(`Failed to load script: ${v}`),h(new Error(`Failed to load script: ${v}`))}),document.head.appendChild(b)}else if(v.endsWith(".css")){const b=W("link",{type:"text/css",rel:"stylesheet",href:v});b.addEventListener("load",()=>d()),b.addEventListener("error",()=>{console.error(`Failed to load stylesheet: ${v}`),h(new Error(`Failed to load stylesheet: ${v}`))}),document.head.appendChild(b)}else ce(v,null,(b,E)=>{if(E===200||E===0)try{l(b,k),d()}catch(w){console.error(`Error processing imported HTML from ${v}:`,w),h(new Error(`Error processing imported HTML from ${v}: ${w}`))}else console.error(`Failed to fetch template file: ${v} (Status: ${E})`),h(new Error(`Failed to fetch template file: ${v} (Status: ${E})`))})});if(o==null)if(e){e();return}else return Promise.resolve();const f=Array.isArray(o)?o.length===0?Promise.resolve():Promise.all(o.map(g)).then(()=>{}).catch(m=>{throw console.error("Error loading resources in addTmplByUrl:",m),m}):g(o).catch(m=>{throw console.error("Error loading resource in addTmplByUrl:",m),m});if(e){f.then(()=>e()).catch(m=>{console.error("Error in addTmplByUrl callback mode:",m),e()});return}else return f};const ce=function(n,o,t){const e=new XMLHttpRequest;e.onreadystatechange=function(){e.readyState==XMLHttpRequest.DONE&&(e.status==200||e.status===0?t(e.responseText,e.status,e):(e.status==404?console.error(`Error 404: Not Found - ${n}`):e.status>=400?console.error(`HTTP Error ${e.status} for ${n}`):console.error(`Request failed for ${n}`,e.statusText),t(null,e.status,e)))},e.onerror=function(){console.error(`Network error requesting ${n}`),t(null,0,e)},e.ontimeout=function(){console.error(`Request timed out for ${n}`),t(null,408,e)};try{const r=o&&o.method||"GET";e.open(r,n,!0),o||e.send()}catch(r){console.error(`Error sending request to ${n}:`,r),t(null,0,e)}};c.i18n={};c.addI18n=function(n,o){if(!n||typeof n!="string"||!o||typeof o!="object"){console.error("Invalid arguments for addI18n:",n,o);return}const t=n.split(".");let e=c.i18n;const r=t.length-1;t.forEach(function(a,i){a&&(r===i?(e[a]||(e[a]=function(s){const l=document.documentElement.lang||"en";let g=o[l];return g==null&&(g=s,C.debug&&console.warn(`i18n: Label key ["${n}"] for lang "${l}" is missing. Using default: "${s}"`)),g!=null?String(g):""}),Object.keys(o).filter(s=>o[s]instanceof Object&&!Array.isArray(o[s])).forEach(s=>{c.addI18n(n+"."+s,o[s])})):((!e[a]||typeof e[a]=="function")&&(e[a]={}),e=e[a]))})};c.addI18ns=function(n){Object.keys(n||{}).forEach(function(o){c.addI18n(o,n[o])})};let V=0;j.genId=function(n){return V++,n+V};const pe=j.applyElementProps=function(n,o){return Object.keys(o).forEach(function(t){const e=o[t],r=t==="class"?"className":t;try{t==="style"&&typeof e=="object"&&e!==null?Object.assign(n.style,e):t==="dataset"&&typeof e=="object"&&e!==null?Object.assign(n.dataset,e):t.startsWith("on")&&typeof e=="function"?n[t.toLowerCase()]=e:r in n?n[r]=e:n.setAttribute(t,String(e))}catch(a){console.error(`Error setting attribute/property "${t}" on <${n.tagName}>:`,a)}}),n},W=j.genElement=function(n,o={},...t){const e=document.createElement(n);let r={};return typeof o=="string"||o instanceof Node?t.unshift(o):Array.isArray(o)?t=o.concat(t):r=o,pe(e,r),t.forEach(a=>{typeof a=="string"?e.appendChild(document.createTextNode(a)):a instanceof Node&&e.appendChild(a)}),e};j.props=function(...n){if(!n||n.length===0)return"";const o=Object.assign({},...n),t=[];return Object.keys(o).forEach(function(e){const r=o[e];if(r||r===0){const a=String(r).replace(/"/g,"&quot;");t.push(`${e}="${a}"`)}}),t.join(" ")};ne(K);document.addEventListener("DOMContentLoaded",function(){let n;try{n=localStorage.getItem("compomint-theme")}catch(r){console.warn("Couldn't access localStorage:",r)}const o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=n==="dark"||n===null&&o;t?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode"),document.documentElement.setAttribute("data-theme","dark")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode"),document.documentElement.setAttribute("data-theme","light")),c.addTmpls(`
    <template id="ui-ThemeSwitcher">
      ##
      status.isDarkMode = status.isDarkMode !== undefined ? status.isDarkMode : ${t};
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
  `);const e=M.ui.ThemeSwitcher({});if(document.body.appendChild(e.element),window.matchMedia){const r=window.matchMedia("(prefers-color-scheme: dark)");r.addEventListener&&r.addEventListener("change",function(a){localStorage.getItem("compomint-theme")||(e.status.isDarkMode=a.matches,a.matches?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode")),e.refresh())})}});document.addEventListener("DOMContentLoaded",function(){function n(){const o=document.querySelectorAll("pre code");if(!o.length){setTimeout(n,100);return}o.forEach(function(t){let e=t.textContent;if(t.innerHTML!==e)return;const r={keyword:/\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|new|this|typeof|instanceof|null|undefined|true|false|try|catch|finally|throw|class|extends|import|export|from|as|async|await|yield)\b/g,compomintKeyword:/\b(data|status|component|i18n|compomint|tmpl)\b/g,string:/((['"])(?:\\.|[^\\])*?\2)|(`(?:\\.|[^\\])*?`)/g,comment:/(\/\/.*?$)|(\/\*[\s\S]*?\*\/)/gm,function:/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,number:/\b(\d+(?:\.\d+)?)\b/g,tag:/(&lt;[^>]*&gt;)/g,compomintTemplate:/(##[=%\-!*]?[\s\S]*?##)/g},a={keyword:"text-pink-500",compomintKeyword:"text-purple-400",string:"text-green-400",comment:"text-gray-500",function:"text-blue-400",number:"text-yellow-500",tag:"text-cyan-400",compomintTemplate:"text-orange-400"};e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");for(const[i,s]of Object.entries(r))e=e.replace(s,function(l){if(i==="function"){const g=l.slice(0,-1);return`<span class="${a[i]}">${g}</span>(`}return`<span class="${a[i]}">${l}</span>`});t.innerHTML=e})}n(),setTimeout(n,500)});document.addEventListener("DOMContentLoaded",function(){window.updateMetaTags=function(){document.documentElement.lang;function t(a){const i=a.split(".");if(i.length!==2)return null;const s=c.i18n[i[0]];if(!s||!s[i[1]])return null;const l=s[i[1]];return typeof l=="function"?l():null}const r=t("app.page-title");r&&(document.title=r),document.querySelectorAll("[data-i18n-content]").forEach(a=>{const i=a.getAttribute("data-i18n-content"),s=t(i);s&&(a.hasAttribute("content")?a.setAttribute("content",s):a.textContent=s)});try{document.querySelectorAll('script[type="application/ld+json"]').forEach(i=>{try{const s=JSON.parse(i.textContent);if(s["@type"]==="SoftwareApplication"){const l=t("app.meta-description");l&&(s.description=l),i.textContent=JSON.stringify(s,null,2)}}catch(s){console.warn("Failed to parse schema JSON:",s)}})}catch(a){console.warn("Error updating schema.org data:",a)}},c.addI18ns({app:{title:{en:"How to Create Web Components Easily",ko:"웹 컴포넌트를 간단하게 만드는 방법",ja:"Webコンポーネントを簡単に作成する方法",zh:"如何轻松创建Web组件"},subtitle:{en:"Compomint is a lightweight JavaScript framework that provides a template-based component system.",ko:"Compomint는 템플릿 기반 컴포넌트 시스템을 제공하는 경량 JavaScript 프레임워크입니다.",ja:"Compomintは、テンプレートベースのコンポーネントシステムを提供する軽量JavaScriptフレームワークです。",zh:"Compomint是一个轻量级JavaScript框架，提供基于模板的组件系统。"},"page-title":{en:"Compomint - Lightweight Component Engine",ko:"Compomint - 경량 컴포넌트 엔진",ja:"Compomint - 軽量コンポーネントエンジン",zh:"Compomint - 轻量级组件引擎"},"meta-description":{en:"Compomint is a lightweight JavaScript template-based component engine for web applications",ko:"Compomint는 웹 애플리케이션을 위한 경량 JavaScript 템플릿 기반 컴포넌트 엔진입니다",ja:"Compomintは、Webアプリケーション向けの軽量JavaScriptテンプレートベースコンポーネントエンジンです",zh:"Compomint是一个用于Web应用程序的轻量级JavaScript模板组件引擎"},"og-image-alt":{en:"Compomint logo and code example screen",ko:"Compomint 로고 및 코드 예제 화면",ja:"Compomintロゴとコード例の画面",zh:"Compomint标志和代码示例屏幕"},getStarted:{en:"Get Started",ko:"시작하기",ja:"始めましょう",zh:"开始使用"},featuresTitle:{en:"Why Use Compomint?",ko:"왜 Compomint를 사용해야 할까요?",ja:"なぜCompomintを使用するのですか？",zh:"为什么使用Compomint？"},examplesTitle:{en:"Code Examples",ko:"코드 예제",ja:"コード例",zh:"代码示例"},docTitle:{en:"Learn More",ko:"더 알아보기",ja:"もっと詳しく",zh:"了解更多"},docDescription:{en:"Check out detailed documentation and resources for Compomint.",ko:"Compomint에 대한 자세한 정보와 문서를 확인하세요.",ja:"Compomintの詳細なドキュメントとリソースをご覧ください。",zh:"查看Compomint的详细文档和资源。"}},features:{lightweight:{title:{en:"Lightweight Size",ko:"가벼운 크기",ja:"軽量サイズ",zh:"轻量级大小"},description:{en:"Fast loading and execution with a small footprint (~14KB gzipped).",ko:"약 14KB(gzip 압축)의 작은 크기로 빠른 로딩과 실행이 가능합니다.",ja:"小さなフットプリント（gzip圧縮で約14KB）で高速なロードと実行が可能です。",zh:"小体积（gzip压缩后约14KB）实现快速加载和执行。"}},template:{title:{en:"Template-Based",ko:"템플릿 기반",ja:"テンプレートベース",zh:"基于模板"},description:{en:"Use a simple yet powerful string-based template syntax with JavaScript evaluation.",ko:"JavaScript 평가가 가능한 간단하고 강력한 문자열 기반 템플릿 구문을 사용합니다.",ja:"JavaScript評価が可能なシンプルで強力な文字列ベースのテンプレート構文を使用します。",zh:"使用简单而强大的基于字符串的模板语法，支持JavaScript评估。"}},component:{title:{en:"Component-Oriented",ko:"컴포넌트 지향",ja:"コンポーネント指向",zh:"组件导向"},description:{en:"Build reusable UI components with proper encapsulation.",ko:"적절한 캡슐화와 함께 재사용 가능한 UI 컴포넌트를 구축합니다.",ja:"適切なカプセル化を備えた再利用可能なUIコンポーネントを構築します。",zh:"构建具有适当封装的可重用UI组件。"}},easy:{title:{en:"Component Composition",ko:"컴포넌트 구성",ja:"コンポーネントの構成",zh:"组件组合"},description:{en:"Combine components like building blocks to create complex UIs.",ko:"복잡한 UI를 구성하기 위해 블록처럼 컴포넌트를 조합할 수 있습니다.",ja:"複雑なUIを作成するために、ビルディングブロックのようにコンポーネントを組み合わせます。",zh:"像积木一样组合组件，创建复杂的UI。"}},responsive:{title:{en:"State Management",ko:"상태 관리",ja:"状態管理",zh:"状态管理"},description:{en:"Manage component state efficiently with automatic updates.",ko:"자동 업데이트와 함께 컴포넌트 상태를 효율적으로 관리합니다.",ja:"自動更新でコンポーネントの状態を効率的に管理します。",zh:"通过自动更新高效管理组件状态。"}},i18n:{title:{en:"Internationalization",ko:"다국어 지원",ja:"国際化",zh:"国际化"},description:{en:"Built-in support for multiple languages with i18n system.",ko:"여러 언어를 지원하는 내장된 국제화(i18n) 시스템을 제공합니다.",ja:"複数言語をサポートする組み込みの国際化（i18n）システムを提供します。",zh:"内置的i18n系统支持多种语言。"}}},examples:{result:{en:"Result:",ko:"결과:",ja:"結果:",zh:"结果:"},basicComponent:{title:{en:"Basic Component",ko:"기본 컴포넌트",ja:"基本的なコンポーネント",zh:"基础组件"},description:{en:"Simple template definition and usage",ko:"간단한 템플릿 정의와 사용 방법",ja:"シンプルなテンプレート定義と使用方法",zh:"简单的模板定义和使用方法"}},stateManagement:{title:{en:"State Management",ko:"상태 관리",ja:"状態管理",zh:"状态管理"},description:{en:"How to manage internal component state and respond to events",ko:"컴포넌트 내부 상태를 관리하고 이벤트에 반응하는 방법",ja:"コンポーネントの内部状態を管理しイベントに応答する方法",zh:"如何管理组件内部状态并响应事件"}},complexComponent:{title:{en:"Complex Component",ko:"복잡한 컴포넌트",ja:"複雑なコンポーネント",zh:"复杂组件"},description:{en:"A more complex component example: Todo List",ko:"더 복잡한 컴포넌트 예제: Todo 리스트",ja:"より複雑なコンポーネントの例：Todoリスト",zh:"更复杂的组件示例：待办事项列表"}}},vscode:{title:{en:"VSCode Extension",ko:"VSCode 확장 기능",ja:"VSCode拡張機能",zh:"VSCode扩展"},subtitle:{en:"Boost your Compomint development with powerful VSCode extension that provides syntax highlighting, auto-completion, and live preview.",ko:"구문 하이라이팅, 자동 완성, 라이브 미리보기를 제공하는 강력한 VSCode 확장 기능으로 Compomint 개발을 향상시키세요.",ja:"構文ハイライト、自動補完、ライブプレビューを提供する強力なVSCode拡張機能でCompomint開発を向上させましょう。",zh:"使用提供语法高亮、自动完成和实时预览的强大VSCode扩展来提升您的Compomint开发体验。"},install:{en:"Install Extension",ko:"확장 기능 설치",ja:"拡張機能をインストール",zh:"安装扩展"},features:{syntax:{title:{en:"Syntax Highlighting",ko:"구문 하이라이팅",ja:"構文ハイライト",zh:"语法高亮"},description:{en:"Colored syntax highlighting for Compomint templates and expressions.",ko:"Compomint 템플릿과 표현식을 위한 컬러 구문 하이라이팅을 제공합니다.",ja:"Compomintテンプレートと式のカラー構文ハイライトを提供します。",zh:"为Compomint模板和表达式提供彩色语法高亮。"}},autocomplete:{title:{en:"Auto-completion",ko:"자동 완성",ja:"自動補完",zh:"自动完成"},description:{en:"Smart auto-completion for Compomint APIs and template syntax.",ko:"Compomint API와 템플릿 구문을 위한 스마트 자동 완성 기능을 제공합니다.",ja:"Compomint APIとテンプレート構文のスマート自動補完を提供します。",zh:"为Compomint API和模板语法提供智能自动完成。"}},snippets:{title:{en:"Code Snippets",ko:"코드 스니펫",ja:"コードスニペット",zh:"代码片段"},description:{en:"Ready-to-use code snippets for common Compomint patterns.",ko:"일반적인 Compomint 패턴을 위한 즉시 사용 가능한 코드 스니펫을 제공합니다.",ja:"一般的なCompomintパターン用のすぐに使えるコードスニペットを提供します。",zh:"为常见的Compomint模式提供即用型代码片段。"}},preview:{title:{en:"Live Preview",ko:"라이브 미리보기",ja:"ライブプレビュー",zh:"实时预览"},description:{en:"Real-time preview of your Compomint templates and components.",ko:"Compomint 템플릿과 컴포넌트의 실시간 미리보기를 제공합니다.",ja:"Compomintテンプレートとコンポーネントのリアルタイムプレビューを提供します。",zh:"为您的Compomint模板和组件提供实时预览。"}}},screenshots:{template:{title:{en:"Template Support",ko:"템플릿 지원",ja:"テンプレートサポート",zh:"模板支持"},description:{en:"Advanced template editing with syntax highlighting and IntelliSense.",ko:"구문 하이라이팅과 IntelliSense를 통한 고급 템플릿 편집 기능입니다.",ja:"構文ハイライトとIntelliSenseによる高度なテンプレート編集機能です。",zh:"通过语法高亮和IntelliSense提供高级模板编辑功能。"}},preview:{title:{en:"Live Preview",ko:"라이브 미리보기",ja:"ライブプレビュー",zh:"实时预览"},description:{en:"See your components rendered in real-time as you code.",ko:"코딩하는 동시에 컴포넌트가 실시간으로 렌더링되는 것을 확인할 수 있습니다.",ja:"コーディング中にコンポーネントがリアルタイムでレンダリングされるのを確認できます。",zh:"在编码时实时查看组件的渲染效果。"}}}},footer:{description:{en:"Compomint is a lightweight JavaScript framework for creating web applications with a component-based architecture.",ko:"Compomint는 웹 애플리케이션 개발을 위한 경량 JavaScript 프레임워크로, 컴포넌트 기반 아키텍처에 중점을 둡니다.",ja:"Compomintは、コンポーネントベースのアーキテクチャでウェブアプリケーションを作成するための軽量JavaScriptフレームワークです。",zh:"Compomint是一个用于创建基于组件架构的Web应用程序的轻量级JavaScript框架。"},links:{home:{en:"Home",ko:"홈",ja:"ホーム",zh:"首页"},features:{en:"Features",ko:"특징",ja:"機能",zh:"特性"},examples:{en:"Examples",ko:"예제",ja:"例",zh:"示例"},docs:{en:"Documentation",ko:"문서",ja:"ドキュメント",zh:"文档"}},links_section:{en:"Links",ko:"링크",ja:"リンク",zh:"链接"},contact_section:{en:"Contact",ko:"연락처",ja:"お問い合わせ",zh:"联系我们"},license_text:{en:"Available under MIT License.",ko:"MIT 라이센스에 따라 사용 가능합니다.",ja:"MITライセンスの下で利用可能です。",zh:"根据MIT许可证可用。"}},"ui-LanguageSwitcher":{language:{en:"Language",ko:"언어",ja:"言語",zh:"语言"},en:{en:"English",ko:"English",ja:"English",zh:"English"},ko:{en:"한국어",ko:"한국어",ja:"한국어",zh:"한국어"},ja:{en:"日本語",ko:"日本語",ja:"日本語",zh:"日本語"},zh:{en:"中文",ko:"中文",ja:"中文",zh:"中文"}}}),c.addTmpls(`
    <template id="ui-LanguageSwitcher">
      ##
      const langs = ['en', 'ko', 'ja', 'zh'];

      // Get current language
      const currentLang = document.documentElement.lang || 'en';
      
      // Initialize state
      status.isOpen = status.isOpen || false;
      
      // Function to set language
      function setLanguage(lang) {

        // Set HTML lang attribute
        document.documentElement.lang = lang;

        // Store language preference
        try {
          localStorage.setItem('compomint-lang', lang);
        } catch (e) {
          console.warn('Failed to save language preference to localStorage:', e);
        }

        // Close the dropdown
        status.isOpen = false;

        // Refresh all components on page
        refreshAllComponents();

        // Refresh this component
        component.refresh();
      }

      // Close dropdown when clicking outside
      document.addEventListener('click', function (event) {
        if (status.isOpen && !event.target.closest('.ui-LanguageSwitcher')) {
          status.isOpen = false;
          component.refresh();
        }
      });

      // Function to refresh all components on the page
      function refreshAllComponents() {
        // Update meta tags with i18n content
        if (typeof window.updateMetaTags === 'function') {
          window.updateMetaTags();
        }

        // This is a simple way to refresh the page
        // For a more sophisticated approach, you would track all compomint
        // components and refresh them individually
        window.location.reload();
      }

      // Function to update meta tags based on the selected language
      function updateMetaTags() {
        // Update document title
        if (compomint.i18n.app && compomint.i18n.app['page-title']) {
          document.title = compomint.i18n.app['page-title']();
        }

        // Update meta tags with data-i18n-content attributes
        document.querySelectorAll('[data-i18n-content]').forEach(el => {
          const i18nKey = el.getAttribute('data-i18n-content');
          const parts = i18nKey.split('.');

          if (parts.length === 2 && compomint.i18n[parts[0]] && compomint.i18n[parts[0]][parts[1]]) {
            if (el.hasAttribute('content')) {
              el.setAttribute('content', compomint.i18n[parts[0]][parts[1]]());
            } else {
              el.textContent = compomint.i18n[parts[0]][parts[1]]();
            }
          }
        });
      }
      ##
      <div class="relative inline-block text-left ui-LanguageSwitcher" >
        <button 
          class="flex items-center space-x-1 text-gray-600 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
          data-co-event="##:{
            click: function() {
              status.isOpen = !status.isOpen;
              component.refresh();
            }
          }##"
        >
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
          </svg>
          <span>##=compomint.i18n['ui-LanguageSwitcher'].language##</span>
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <div class="##=status.isOpen ? 'block' : 'hidden'## absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 text-gray-800 dark:text-gray-200">
          ##langs.forEach(lang => {##
            <a href="##=window.location.origin + window.location.pathname + '?lang=' + lang##" 
              class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ##=currentLang === lang ? 'bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-200' : ''##"
              data-co-event="##:{
                click: function(e) {
                  setLanguage(lang);
                }
              }##"
            >
              ##=compomint.i18n['ui-LanguageSwitcher'][lang]##
            </a>
          ##});##

        </div>
      </div >
    </template >
  `);const n=["en","ko","ja","zh"];function o(){let t;try{t=localStorage.getItem("compomint-lang")}catch(a){console.warn("Failed to read language preference from localStorage:",a)}if(!t){const a=navigator.language.split("-")[0];t=n.includes(a)?a:"en"}const r=new URLSearchParams(window.location.search).get("lang");r&&n.includes(r)&&(t=r),document.documentElement.lang=t,setTimeout(function(){try{typeof window.updateMetaTags=="function"&&window.updateMetaTags()}catch(a){console.warn("Failed to update meta tags:",a)}},100)}o()});document.addEventListener("DOMContentLoaded",async function(){const n=c.addTmplByUrl(["templates/layout.cmint","templates/header.cmint","templates/hero.cmint","templates/features.cmint","templates/vscode-extension.cmint","templates/examples.cmint","templates/documentation.cmint","templates/footer.cmint","templates/ui-components.cmint","templates/ui.components.cmint","templates/pg.components.cmint"]);n?n.then(()=>{console.log("loaded templates, now initialize app"),me()}):(console.error("Failed to load templates, cannot initialize app"),document.getElementById("app-container").innerHTML='<div class="text-center p-8"><h1 class="text-2xl text-red-600">Error loading application templates</h1></div>'),de()});function de(){let n;try{n=localStorage.getItem("compomint-theme")}catch(e){console.warn("Couldn't access localStorage:",e)}const o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;n==="dark"||n===null&&o?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode"))}async function me(){const n={lightweight:`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>`,template:`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
    </svg>`,component:`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>
    </svg>`,responsive:`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>`,easy:`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>`,i18n:`<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
    </svg>`},o=M.ui.Header({menuItems:[{label:c.i18n.footer.links.home("Home"),url:"#home",active:!0},{label:c.i18n.footer.links.features("Features"),url:"#features"},{label:c.i18n.vscode.title("VSCode"),url:"#vscode-extension"},{label:c.i18n.footer.links.examples("Examples"),url:"#examples"},{label:c.i18n.footer.links.docs("Documentation"),url:"#documentation"}]}),t=M.ui.Hero({title:c.i18n.app.title("How to Create Web Components Easily"),subtitle:c.i18n.app.subtitle("Compomint is a lightweight JavaScript framework that provides a template-based component system."),primaryButtonText:c.i18n.app.getStarted("Get Started"),primaryButtonUrl:"#documentation",secondaryButtonText:"GitHub",secondaryButtonUrl:"https://github.com/kurukona/compomint",codeExample:`<template id="hello-world">
  <style id="style-hello-world">
    .hello-world { color: ##=data.color || 'black'## }
  </style>
  <div class="hello-world">
    <h1>##=data.title || 'Hello'##</h1>
    <p>##=data.message##</p>
  </div>
</template>

// Create and use component
const hello = compomint.tmpl('hello-world')({
  title: 'Hello Compomint!',
  message: 'Easy and simple component',
  color: '#4F46E5'
});

document.body.appendChild(hello.element);`}),e=M.ui.Features({title:c.i18n.app.featuresTitle("Why Use Compomint?"),features:[{title:c.i18n.features.lightweight.title("Lightweight Size"),description:c.i18n.features.lightweight.description("Fast loading and execution with a small footprint (~14KB gzipped)."),icon:n.lightweight},{title:c.i18n.features.template.title("Template-Based"),description:c.i18n.features.template.description("Use a simple yet powerful string-based template syntax with JavaScript evaluation."),icon:n.template},{title:c.i18n.features.component.title("Component-Oriented"),description:c.i18n.features.component.description("Build reusable UI components with proper encapsulation."),icon:n.component},{title:c.i18n.features.easy.title("Component Composition"),description:c.i18n.features.easy.description("Combine components like building blocks to create complex UIs."),icon:n.easy},{title:c.i18n.features.responsive.title("State Management"),description:c.i18n.features.responsive.description("Manage component state efficiently with automatic updates."),icon:n.responsive},{title:c.i18n.features.i18n.title("Internationalization"),description:c.i18n.features.i18n.description("Built-in support for multiple languages with i18n system."),icon:n.i18n}]}),r={syntax:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
    </svg>`,autocomplete:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
    </svg>`,snippets:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
    </svg>`,preview:`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
    </svg>`},a=M.ui.VSCodeExtension({title:c.i18n.vscode.title("VSCode Extension"),subtitle:c.i18n.vscode.subtitle("Boost your Compomint development with powerful VSCode extension that provides syntax highlighting, auto-completion, and live preview."),extensionUrl:"https://marketplace.visualstudio.com/items?itemName=compomint.compomint-vscode",buttonText:c.i18n.vscode.install("Install Extension"),features:[{title:c.i18n.vscode.features.syntax.title("Syntax Highlighting"),description:c.i18n.vscode.features.syntax.description("Colored syntax highlighting for Compomint templates and expressions."),icon:r.syntax},{title:c.i18n.vscode.features.autocomplete.title("Auto-completion"),description:c.i18n.vscode.features.autocomplete.description("Smart auto-completion for Compomint APIs and template syntax."),icon:r.autocomplete},{title:c.i18n.vscode.features.snippets.title("Code Snippets"),description:c.i18n.vscode.features.snippets.description("Ready-to-use code snippets for common Compomint patterns."),icon:r.snippets},{title:c.i18n.vscode.features.preview.title("Live Preview"),description:c.i18n.vscode.features.preview.description("Real-time preview of your Compomint templates and components."),icon:r.preview}],screenshots:[{src:"img/compomint-template-support.png",alt:"Compomint Template Support in VSCode",title:c.i18n.vscode.screenshots.template.title("Template Support"),description:c.i18n.vscode.screenshots.template.description("Advanced template editing with syntax highlighting and IntelliSense.")},{src:"img/template-preview.png",alt:"Template Preview Feature",title:c.i18n.vscode.screenshots.preview.title("Live Preview"),description:c.i18n.vscode.screenshots.preview.description("See your components rendered in real-time as you code.")}]}),i=M.ui.Examples({title:c.i18n.app.examplesTitle("Code Examples"),examples:[{interactive:!0,title:c.i18n.examples.basicComponent.title("Basic Component"),description:c.i18n.examples.basicComponent.description("Simple template definition and usage"),code:`// Template definition
compomint.addTmpl('ui-Button', \` // Template definition
  <button class="ui-Button ##=data.variant ? 'ui-Button--' + data.variant : ''##"
    data-co-event="##:data.onClick##">
    ##=data.label##
  </button>
\`);

// Create and use component
const button = tmpl.ui.Button({
  label: 'Click here',
  variant: 'primary',
  onClick: function() {
    alert('The button has been clicked!');
  }
});
document.body.appendChild(button.element);`},{interactive:!0,title:c.i18n.examples.stateManagement.title("State Management"),description:c.i18n.examples.stateManagement.description("How to manage internal component state and respond to events"),type:"codeIsTemplateFile",template:await(await fetch("templates/demo/ui.Counter.cmint")).text(),code:`// Create a counter component for an example
  const counter = tmpl.ui.Counter({
    initialCount: 1,
  });
  document.body.appendChild(counter.element);`},{interactive:!0,title:c.i18n.examples.complexComponent.title("Complex Component"),description:c.i18n.examples.complexComponent.description("A more complex component example: Todo List"),type:"codeIsTemplateFile",template:await(await fetch("templates/demo/ui.TodoList.cmint")).text(),code:`// Create a todo list component for an example
  const todoList = tmpl.ui.TodoList({
    initialTodos: [
      { text: "Read Compomint documentation", completed: true },
      { text: "Create your first component", completed: false },
      { text: "Apply to website", completed: false },
    ],
  });
  document.body.appendChild(todoList.element);`}]}),s=M.ui.Documentation({title:c.i18n.app.docTitle("Learn More"),description:c.i18n.app.docDescription("Check out detailed documentation and resources for Compomint."),links:[{label:"Getting Started",url:"https://kurukona.github.io/compomint/"},{label:"Basic Usage",url:"https://kurukona.github.io/compomint/#basic-usage"},{label:"Template Syntax",url:"https://kurukona.github.io/compomint/#template-syntax"},{label:"API Reference",url:"https://kurukona.github.io/compomint/#api-reference"},{label:"Examples",url:"https://github.com/kurukona/compomint/tree/master/examples"},{label:"GitHub",url:"https://github.com/kurukona/compomint"}]}),l=M.ui.Footer({description:c.i18n.footer.description("Compomint is a lightweight JavaScript framework for creating web applications with a component-based architecture."),links:[{label:c.i18n.footer.links.home("Home"),url:"#home"},{label:c.i18n.footer.links.features("Features"),url:"#features"},{label:c.i18n.footer.links.examples("Examples"),url:"#examples"},{label:"샘플 코드",url:"samples.html"},{label:c.i18n.footer.links.docs("Documentation"),url:"#documentation"},{label:"GitHub",url:"https://github.com/kurukona/compomint"}],email:"choish@kurukona.com",github:"kurukona/compomint",year:new Date().getFullYear(),copyright:"Compomint"}),g=M.app.Layout({header:o,hero:t,features:e,vscodeExtension:a,examples:i,documentation:s,footer:l});document.getElementById("app-container").appendChild(g.element),document.querySelectorAll('a[href^="#"]').forEach(m=>{m.addEventListener("click",function(d){d.preventDefault();const h=this.getAttribute("href");if(h==="#")return;const y=document.querySelector(h);console.log("Target ID:",h,"Target Element:",y),y?window.scrollTo({top:y.offsetTop-70,behavior:"smooth"}):console.warn("Target element not found:",h)})})}
