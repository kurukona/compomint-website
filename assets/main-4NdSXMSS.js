(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))e(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&e(i)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function e(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const B=function(n){if(n.firstElementChild)return n.firstElementChild;const o=n.childNodes;for(let t=0,e=o.length;t<e;t++)if(o[t]instanceof Element)return o[t];return null},K=function(n){return n.childElementCount||Array.prototype.filter.call(n.childNodes,function(o){return o instanceof Element}).length},G=function(n){for(let o=0;o<n.childNodes.length;o++){const t=n.childNodes[o];t.nodeType===8||t.nodeType===3&&!/\S/.test(t.nodeValue||"")?(n.removeChild(t),o--):t.nodeType===1&&G(t)}},Q=new DOMParser,F=function(n){if(typeof n=="number"||!isNaN(Number(n)))return document.createTextNode(String(n));if(typeof n=="string")try{const t=Q.parseFromString(n,"text/html").body;if(t.childNodes.length===1)return t.firstChild;{const e=document.createDocumentFragment();for(;t.firstChild;)e.appendChild(t.firstChild);return e}}catch{return document.createTextNode(n)}else return document.createTextNode("")},ee=function(n){return Object.prototype.toString.call(n)==="[object Object]"},te=(n,o)=>({rules:{style:{pattern:/(\<style id=[\s\S]+?\>[\s\S]+?\<\/style\>)/g,exec:function(t){var e;const r=document.createElement("template");r.innerHTML=t;const a=(r.content||r).querySelector("style");if(!a||!a.id)return"";const i=document.getElementById(a.id);return i&&((e=i.parentNode)===null||e===void 0||e.removeChild(i)),document.head.appendChild(a),""}},commentArea:{pattern:/##\*([\s\S]+?)##/g,exec:function(t){return""}},preEvaluate:{pattern:/##!([\s\S]+?)##/g,exec:function(t,e){try{new Function("compomint","tmplId",t)(o,e)}catch(r){if(n.throwError)throw console.error(`Template preEvaluate error in "${e}", ${r.name}: ${r.message}`),r;console.warn(`Template preEvaluate error in "${e}", ${r.name}: ${r.message}`)}return""}},interpolate:{pattern:/##=([\s\S]+?)##/g,exec:function(t){return`';
(() => {let __t, interpolate=${t};
__p+=((__t=(typeof (interpolate)=='function' ? (interpolate)() : (interpolate)))==null ? '' : String(__t) );})();
__p+='`}},escape:{pattern:/##-([\s\S]+?)##/g,exec:function(t){return`';
(() => {let __t, escape=${t};
__p+=((__t=(compomint.tools.escapeHtml.escape(typeof (escape)=='function' ? (escape)() : (escape))))==null ? '' : String(__t) );})();
__p+='`}},elementProps:{pattern:/data-co-props="##:([\s\S]+?)##"/g,exec:function(t){return`';
const eventId = (__lazyScope.elementPropsArray.length);
__p+='data-co-props="'+eventId+'"';

__lazyScope.elementPropsArray[eventId] = ${t};
__p+='`},lazyExec:function(t,e,r,a){e.elementPropsArray.forEach(function(i,c){if(!i)return;const l=a.querySelector(`[data-co-props="${c}"]`);l&&(delete l.dataset.coProps,Object.keys(i).forEach(function(f){l.setAttribute(f,String(i[f]))}))})}},namedElement:{pattern:/data-co-named-element="##:([\s\S]+?)##"/g,exec:function(t){return`';
const eventId = (__lazyScope.namedElementArray.length);
__p+='data-co-named-element="'+eventId+'"';

__lazyScope.namedElementArray[eventId] = ${t};
__p+='`},lazyExec:function(t,e,r,a){e.namedElementArray.forEach(function(i,c){const l=a.querySelector(`[data-co-named-element="${c}"]`);if(!l){n.debug&&console.warn(`Named element target not found for ID ${c} in template ${r.tmplId}`);return}delete l.dataset.coNamedElement,r[i]=l})}},elementRef:{pattern:/data-co-element-ref="##:([\s\S]+?)##"/g,exec:function(t){return`';
var eventId = (__lazyScope.elementRefArray.length);
__p+='data-co-element-ref="'+eventId+'"';
var ${t} = null;
__lazyScope.elementRefArray[eventId] = function(target) {${t} = target;};
__p+='`},lazyExec:function(t,e,r,a){e.elementRefArray.forEach(function(i,c){const l=a.querySelector(`[data-co-element-ref="${c}"]`);if(!l){n.debug&&console.warn(`Element ref target not found for ID ${c} in template ${r.tmplId}`);return}delete l.dataset.coElementRef,i.call(l,l)})}},elementLoad:{pattern:/data-co-load="##:([\s\S]+?)##"/g,exec:function(t){const e=t.split("::");return`';
const eventId = (__lazyScope.elementLoadArray.length);
__p+='data-co-load="'+eventId+'"';
__lazyScope.elementLoadArray[eventId] = {loadFunc: ${e[0]}, customData: ${e[1]}};
__p+='`},lazyExec:function(t,e,r,a){e.elementLoadArray.forEach(function(i,c){const l=a.querySelector(`[data-co-load="${c}"]`);if(!l){n.debug&&console.warn(`Element load target not found for ID ${c} in template ${r.tmplId}`);return}delete l.dataset.coLoad;try{if(typeof i.loadFunc=="function"){const f=[l,l,{data:t,element:l,customData:i.customData,component:r,compomint:o}];i.loadFunc.call(...f)}}catch(f){if(console.error(`Error executing elementLoad function for ID ${c} in template ${r.tmplId}:`,f,i.loadFunc),n.throwError)throw f}})}},event:{pattern:/data-co-event="##:([\s\S]+?)##"/g,exec:function(t){const e=t.split(":::");let r=`';
(() => {const eventId = (__lazyScope.eventArray.length);
__p+='data-co-event="'+eventId+'"';
`;const a=[];for(let i=0,c=e.length;i<c;i++){const l=e[i].split("::");a.push(`{eventFunc: ${l[0]}, $parent: this, customData: ${l[1]}}`)}return r+=`__lazyScope.eventArray[eventId] = [${a.join(",")}];})()
__p+='`,r},lazyExec:function(t,e,r,a){const i=this,c=i.attacher;c&&e.eventArray.forEach(function(l,f){const u=a.querySelector(`[data-co-event="${f}"]`);if(!u){n.debug&&console.warn(`Event target not found for ID ${f} in template ${r.tmplId}`);return}delete u.dataset.coEvent;for(let p=0,d=l.length;p<d;p++){const h=l[p];h.eventFunc&&(Array.isArray(h.eventFunc)?h.eventFunc.forEach(function(g){c(i,t,e,r,a,u,g,h)}):c(i,t,e,r,a,u,h.eventFunc,h))}})},trigger:function(t,e){const r=new Event(e,{bubbles:!0,cancelable:!0});t.dispatchEvent(r)},attacher:function(t,e,r,a,i,c,l,f){const u=t.trigger,p=B(i),d=K(i)===1?p:null;if(!l)return;const h=[c,null,{data:e,customData:f.customData,element:c,componentElement:d||(p==null?void 0:p.parentElement),component:a,compomint:o}];if(typeof l=="function"){const v=function(b){b.stopPropagation(),h[1]=b;try{l.call(...h)}catch(C){if(console.error(`Error in event handler for template ${a.tmplId}:`,C,l),n.throwError)throw C}};c.addEventListener("click",v),f.element=c,f.eventFunc=v;return}if(!ee(l))return;const g=l,w=g.triggerName;w&&(a.trigger=a.trigger||{},a.trigger[w]={}),Object.keys(g).forEach(function(v){const b=g[v];if(v==="load"){h[1]=c;try{b.call(...h)}catch(y){if(console.error(`Error in 'load' event handler for template ${a.tmplId}:`,y,b),n.throwError)throw y}return}else if(v==="namedElement"){a[b]=c;return}else if(v==="triggerName")return;const C=function(y){y.stopPropagation(),h[1]=y;try{b.call(...h)}catch(M){if(console.error(`Error in '${v}' event handler for template ${a.tmplId}:`,M,b),n.throwError)throw M}};c.addEventListener(v,C),f.element=c,l[v]=C,w&&u&&(a.trigger[w][v]=function(){u(c,v)})})}},element:{pattern:/##%([\s\S]+?)##/g,exec:function(t){const e=t.split("::");return`';
(() => {
const elementId = (__lazyScope.elementArray.length);
__p+='<template data-co-tmpl-element-id="'+elementId+'"></template>';
__lazyScope.elementArray[elementId] = {childTarget: ${e[0]}, nonblocking: ${e[1]||!1}};})();
__p+='`},lazyExec:function(t,e,r,a){e.elementArray.forEach(function(i,c){const l=i.childTarget,f=i.nonblocking,u=a.querySelector(`template[data-co-tmpl-element-id="${c}"]`);if(!u){n.debug&&console.warn(`Element insertion placeholder not found for ID ${c} in template ${r.tmplId}`);return}if(!u.parentNode){n.debug&&console.warn(`Element insertion placeholder for ID ${c} in template ${r.tmplId} has no parent.`);return}const p=function(){if(!u||!u.parentNode){n.debug&&console.warn(`Placeholder for ID ${c} removed before insertion in template ${r.tmplId}.`);return}try{if(l instanceof Array){const d=document.createDocumentFragment();l.forEach(function(h){if(!h)return;const g=h.element||h;let w=null;if(typeof g=="string"||typeof g=="number")w=F(g);else if(typeof g=="function")w=F(g());else if(g instanceof Node)w=g;else{n.debug&&console.warn(`Invalid item type in element array for ID ${c}, template ${r.tmplId}:`,g);return}if(h.beforeAppendTo)try{h.beforeAppendTo()}catch(v){console.error("Error in beforeAppendTo (array item):",v)}w&&d.appendChild(w)}),u.parentNode.replaceChild(d,u),l.forEach(function(h){h&&h.afterAppendTo&&setTimeout(()=>{try{h.afterAppendTo()}catch(g){console.error("Error in afterAppendTo (array item):",g)}},0)})}else if(typeof l=="string"||typeof l=="number")u.parentNode.replaceChild(F(l),u);else if(typeof l=="function")u.parentNode.replaceChild(F(l()),u);else if(l&&(l.element||l)instanceof Node){const d=l,h=d.element||d;if(d.beforeAppendTo)try{d.beforeAppendTo()}catch(g){console.error("Error in beforeAppendTo:",g)}u.parentNode.replaceChild(h,u),d.afterAppendTo&&setTimeout(()=>{try{d.afterAppendTo&&d.afterAppendTo()}catch(g){console.error("Error in afterAppendTo:",g)}},0),d.tmplId&&(d.parentComponent=r)}else n.debug&&console.warn(`Invalid target for element insertion ID ${c}, template ${r.tmplId}:`,l),u.parentNode.removeChild(u)}catch(d){if(console.error(`Error during element insertion for ID ${c}, template ${r.tmplId}:`,d),n.throwError)throw d;if(u&&u.parentNode)try{u.parentNode.removeChild(u)}catch{}}};f===void 0||f===!1?p():setTimeout(p,typeof f=="number"?f:0)})}},lazyEvaluate:{pattern:/###([\s\S]+?)##/g,exec:function(t){return`';
__lazyScope.lazyEvaluateArray.push(function(data) {${t}});
__p+='`},lazyExec:function(t,e,r,a){const i=B(a),c=K(a)===1?i:null;e.lazyEvaluateArray.forEach(function(l,f){try{l.call(c||a,t)}catch(u){if(console.error(`Error in lazyEvaluate block ${f} for template ${r.tmplId}:`,u,l),n.throwError)throw u}})}},evaluate:{pattern:/##([\s\S]+?)##/g,exec:t=>`';
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
  &lt;/##=data.tag##&gt;`)};typeof Object.assign!="function"&&Object.defineProperty(Object,"assign",{value:function(o,...t){if(o==null)throw new TypeError("Cannot convert undefined or null to object");const e=Object(o);for(let r=0,a=t.length;r<a;r++){const i=t[r];if(i!=null)for(let c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c])}return e},writable:!0,configurable:!0});(function(n){n.forEach(function(o){!o||o.hasOwnProperty("remove")||Object.defineProperty(o,"remove",{configurable:!0,enumerable:!0,writable:!0,value:function(){this.parentNode!==null&&this.parentNode.removeChild(this)}})})})([Element.prototype,CharacterData.prototype,DocumentType.prototype]);(function(n){n||Object.defineProperty(window.Node.prototype,"isConnected",{get:function(){return document.body.contains(this)}})})("isConnected"in window.Node.prototype);const E={},L={},_=E.tools=E.tools||{},S=E.configs=Object.assign({printExecTime:!1,debug:!1,throwError:!0},E.configs),O=E.tmplCache=E.tmplCache||new Map;O.has("anonymous")||O.set("anonymous",{elements:new Set});const oe="content"in document.createElement("template"),re=/(.)^/,J={"'":"\\'","\\":"\\\\","\r":"\\r","\n":"\\n","	":"\\t","\u2028":"\u2028","\u2029":"\u2029","><":"><","<":"<",">":">"},P=/\>( |\n)+\<|\>( |\n)+|( |\n)+\<|\\|'|\r|\n|\t|\u2028|\u2029/g;E.templateEngine=te(S,E);const D=function(){const n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},o=Object.keys(n).reduce((e,r)=>(e[n[r]]=r,e),{}),t=function(e){const r=function(l){return e[l]},a=`(?:${Object.keys(e).join("|").replace(/\\/g,"\\\\")})`,i=RegExp(a),c=RegExp(a,"g");return function(l){return l=l==null?"":`${l}`,i.test(l)?l.replace(c,r):l}};return{escape:t(n),unescape:t(o)}}();_.escapeHtml=D;const X=function(n){const o=[],t=[],e={},r={};return Object.keys(n).forEach(function(a){const i=n[a];if(i&&typeof i=="object"&&i.pattern instanceof RegExp&&typeof i.exec=="function"&&(o.push((i.pattern||re).source),t.push(i.exec)),i&&typeof i=="object"&&typeof i.lazyExec=="function"){const c=`${a}Array`;e[c]=i.lazyExec,r[c]=[]}}),{templateRules:n,pattern:new RegExp(o.join("|"),"g"),exec:t,lazyExecKeys:Object.keys(r),lazyExec:e,lazyScopeSeed:JSON.stringify(r)}},U=function(n){return J[n]||J[n.replace(/[ \n]/g,"")]||""},ae=X(E.templateEngine.rules),ie=function(n,o,t){S.printExecTime&&console.time(`tmpl: ${n}`);let e=0,r="";return o.replace(t.pattern,function(...a){const i=a[0],c=a[a.length-2];r+=o.slice(e,c).replace(P,U);let l,f=null;if(a.slice(1,-2).some(function(u,p){return u!==void 0?(l=u,f=p,!0):!1}),l!==void 0&&f!==null)try{r+=t.exec[f].call(t.templateRules,l,n)}catch(u){if(console.error(`Error executing template rule index ${f} for match "${l}" in template "${n}":`,u),S.throwError)throw u;r+=""}else r+=i.replace(P,U);return e=c+i.length,i}),r+=o.slice(e).replace(P,U),S.printExecTime&&console.timeEnd(`tmpl: ${n}`),r},ce=E.template=function(o,t,e){let r=E.templateEngine,a=ae;e&&(r=Object.assign({},E.templateEngine,e),a=X(r.rules));const i=`
/* tmplId: ${o} */
//# sourceURL=http://tmpl//${o.split("-").join("//")}.js
// if (__debugger) {
// debugger;
// }
let __p='';
__p+='${ie(o,t,a)}';
return __p;`;let c=null;try{c=new Function(r.keys.dataKeyName,r.keys.statusKeyName,r.keys.componentKeyName,r.keys.i18nKeyName,"compomint","tmpl","__lazyScope","__debugger",i)}catch(f){if(S.throwError){console.error(`Template compilation error in "${o}", ${f.name}: ${f.message}`);try{new Function(r.keys.dataKeyName,r.keys.statusKeyName,r.keys.componentKeyName,r.keys.i18nKeyName,"compomint","tmpl","__lazyScope","__debugger",i)}catch{}throw f}else return()=>({})}const l=function(...u){let p,d,h,g;const w=u[0];w&&typeof w=="object"&&(w.$wrapperElement||w.$callback||w.$baseComponent)?(p=Object.assign({},w),d=p.$wrapperElement,delete p.$wrapperElement,h=p.$callback,delete p.$callback,g=p.$baseComponent,delete p.$baseComponent):(p=w,typeof u[1]=="function"?(d=void 0,h=u[1],g=u[2]):(d=u[1],h=u[2],g=u[3]));const v=r.keys.dataKeyName,b=r.keys.statusKeyName,C=JSON.parse(a.lazyScopeSeed),y=Object.assign(g||{},{tmplId:o,element:null,status:g&&g.status||{},replace:function(m){const s=this;if(!s.element||!(s.element instanceof Node)||!s.element.parentElement){S.debug&&console.warn(`Cannot replace template "${o}": element not in DOM.`);return}s.element.parentElement.replaceChild(m.element||m,s.element)},remove:function(m=!1){const s=this;if(s.beforeRemove)try{s.beforeRemove()}catch($){console.error("Error in beforeRemove:",$)}C.eventArray&&C.eventArray.forEach(function($){$.forEach(function(T){T.element&&(typeof T.eventFunc=="function"?T.element.removeEventListener("click",T.eventFunc):Object.keys(T.eventFunc).forEach(function(R){T.element.removeEventListener(R,T.eventFunc[R])}),Object.keys(T).forEach(R=>delete T[R]))})});const x=s.element instanceof Node?s.element.parentElement:null,z=s.element;if(x)if(m){const $=document.createElement("template");x.replaceChild($,s.element),s.element=$}else x.removeChild(s.element);else S.debug&&console.warn(`Cannot remove template "${o}": element not in DOM.`);if(s.afterRemove)try{s.afterRemove()}catch($){console.error("Error in afterRemove:",$)}return z},appendTo:function(m){const s=this;if(s.beforeAppendTo)try{s.beforeAppendTo()}catch(x){console.error("Error in beforeAppendTo:",x)}return m&&s.element instanceof Node?m.appendChild(s.element):S.debug&&console.warn(`Cannot append template "${o}": parentElement or scope.element is missing or not a Node.`),s.afterAppendTo&&setTimeout(()=>{try{s.afterAppendTo()}catch(x){console.error("Error in afterAppendTo:",x)}},0),s},release:function(){},render:function(m){return this},refresh:function(m){return this},reflash:function(m){return this}});y._id||(y._id=_.genId(o)),y[v]=p,y[b]==null&&(y[b]={});const M=d instanceof Element,I=document.createElement("template");S.printExecTime&&console.time(`render: ${o}`);let A=null,H=null;try{H=p?c.call(d||null,p,y[b],y,E.i18n[o],E,L,C,S.debug):`<template data-co-empty-template="${o}"></template>`}catch(m){if(S.throwError){console.error(`Runtime error during render of "${o}":`,m.message),console.log("--- Data ---",p,"------------");try{c.call(d||null,p,y[b],y,E.i18n[o],C,!0)}catch{}throw m}else return console.warn(`Render failed for "${o}". Returning scope with comment node.`),y.element=document.createComment(`Render Error: ${o}`),y}S.printExecTime&&console.timeEnd(`render: ${o}`),I.innerHTML=H;let k=I.content||I;if(k.tagName=="TEMPLATE"&&!I.content){const m=Array.from(k.childNodes);k=document.createDocumentFragment(),m.forEach(s=>k.appendChild(s))}if(M&&d){for(;d.firstChild;)d.removeChild(d.firstChild);y.wrapperElement=d}if((k.querySelector?k.querySelector("style"):null)&&k.querySelector){const m=document.createElement(o);try{const s=m.attachShadow({mode:"open"});for(;k.firstChild;)s.appendChild(k.firstChild);k=m}catch(s){console.error(`Failed to attach shadow DOM for template "${o}":`,s)}}if(k.firstChild&&k.firstChild.nodeType==8)A=k.firstChild;else if(K(k)==1){if(A=B(k),M&&d&&A){if(y.beforeAppendTo)try{y.beforeAppendTo()}catch(m){console.error("Error in beforeAppendTo:",m)}d.appendChild(A),y.afterAppendTo&&setTimeout(()=>{try{y.afterAppendTo()}catch(m){console.error("Error in afterAppendTo:",m)}},0)}}else if(M&&d){if(y.beforeAppendTo)try{y.beforeAppendTo()}catch(m){console.error("Error in beforeAppendTo:",m)}d.appendChild(k),y.afterAppendTo&&setTimeout(()=>{try{y.afterAppendTo()}catch(m){console.error("Error in afterAppendTo:",m)}},0),A=d}else A=k;if(p&&p.$props&&A instanceof Element)for(const m in p.$props)try{const s=p.$props[m];if(m.startsWith("data-")){const x=m.substring(5).replace(/-([a-z])/g,z=>z[1].toUpperCase());A.dataset[x]=String(s)}else m in A?A[m]=s:A.setAttribute(m,String(s))}catch(s){console.error(`Error applying prop "${m}" to element in template "${o}":`,s)}A instanceof Node&&A.normalize&&A.normalize(),A instanceof Node&&G(A),y.element=A;const Z=a.lazyExec;if(p&&a.lazyExecKeys.forEach(function(m){if(C[m]&&C[m].length>0)try{Z[m].call(r.rules[m.slice(0,-5)],p,C,y,k)}catch(s){if(S.throwError)throw console.error(`Error during lazy execution of "${m}" for template "${o}":`,s),s}}),_.liveReloadSupport)try{_.liveReloadSupport(y)}catch(m){console.error("Error in liveReloadSupport:",m)}if(h)try{h.call(d||null,y)}catch(m){if(console.error(`Error in template callback for "${o}":`,m),S.throwError)throw m}return y.release=function(){const m=this,s=Object.getOwnPropertyNames(m),x=[b,"_id"];for(let z=0;z<s.length;z++){const $=s[z];typeof m[$]!="function"&&!x.includes($)&&delete m[$]}},y.render=function(m){const s=this,x=s.element,z=x instanceof Node?x.parentElement:null,$=s.wrapperElement,T=E.tmpl(s.tmplId);if(!T)return console.error(`Cannot re-render: Template function for "${s.tmplId}" not found.`),s;const R={beforeAppendTo:s.beforeAppendTo,afterAppendTo:s.afterAppendTo,beforeRemove:s.beforeRemove,afterRemove:s.afterRemove,beforeRefresh:s.beforeRefresh,afterRefresh:s.afterRefresh};if(s.beforeRemove)try{s.beforeRemove()}catch(N){console.error("Error in beforeRemove during render:",N)}let j;if($)j=T(m,$,void 0,s);else if(z&&x instanceof Node)if(j=T(m,void 0,void 0,s),j.element instanceof Node){if(j.beforeAppendTo)try{j.beforeAppendTo()}catch(N){console.error("Error in beforeAppendTo during render:",N)}z.replaceChild(j.element,x),j.afterAppendTo&&setTimeout(()=>{try{j.afterAppendTo()}catch(N){console.error("Error in afterAppendTo during render:",N)}},0)}else S.debug&&console.warn(`Re-render of "${s.tmplId}" resulted in no element or target was missing.`);else j=T(m,void 0,void 0,s);if(s.afterRemove)try{s.afterRemove()}catch(N){console.error("Error in afterRemove during render:",N)}return Object.assign(j,R),j},y.refresh=function(m){const s=this,x=s[v];if(s.beforeRefresh)try{s.beforeRefresh()}catch(T){console.error("Error in beforeRefresh:",T)}const z=Object.assign({},x||{},m),$=s.render(z);if(s.afterRefresh)try{s.afterRefresh()}catch(T){console.error("Error in afterRefresh:",T)}return $},y.reflash=y.refresh,y};if(Object.defineProperty(l,"name",{value:`render_${o}`,writable:!1}),o){const f=S.debug?{renderingFunc:l,source:D.escape(`function ${o}_source (${r.keys.dataKeyName}, ${r.keys.statusKeyName}, ${r.keys.componentKeyName}, ${r.keys.i18nKeyName}, __lazyScope, __debugger) {
${i}
}`),templateText:D.escape(t)}:{renderingFunc:l};O.set(o,f);const u=o.split("-");if(u.length>1){const p=u[0];let d=L[p];d||(L[p]=d={});const h=u.slice(1).map((g,w)=>w===0?g:g.charAt(0).toUpperCase()+g.slice(1)).join("");d[h]=f.renderingFunc}}return l};E.remapTmpl=function(n){Object.keys(n).forEach(function(o){const t=n[o],e=O.get(o);e?(O.set(t,e),S.debug&&console.log(`Remapped template "${o}" to "${t}"`)):S.debug&&console.warn(`Cannot remap template: Old key "${o}" not found in cache.`)})};E.tmpl=function(n){const o=O.get(n);return o?o.renderingFunc:null};const Y=function(n){let o;if(n instanceof Element)return n.tagName==="TEMPLATE",n;if(typeof n!="string"&&(S.debug&&console.warn("safeTemplate received non-string/non-element source:",n),n=""),o=document.createElement("template"),oe){const t=n.replace(/<(?!template|\/template|body|\/body|html|\/html|head|\/head|style|\/style|script|\/script|link|\/link|meta|\/meta|!--)/gi,"&lt;");o.innerHTML=t}else{const t=n.replace(/<(?!template|\/template|body|\/body|html|\/html|head|\/head|style|\/style|script|\/script|link|\/link|meta|\/meta|!--)/gi,"&lt;").replace(/<template/g,'<script type="template"').replace(/<\/template>/g,"<\/script>");o.innerHTML=t}return o},q=E.addTmpl=function(n,o,t){let e=o instanceof Element?o.innerHTML:String(o);return e=D.unescape(e.replace(/<!---|--->/gi,"")),ce(n,e,t)},le=E.addTmpls=function(n,o,t){typeof o!="boolean"&&t==null?(t=o,o=!1):o=!!o;const e=Y(n);return(e.content||e).querySelectorAll('template[id], script[type="text/template"][id], script[type="text/compomint"][id]').forEach(i=>{const c=i.id;c&&(i.dataset.coLoadScript!==void 0?q(c,i,t)({}):q(c,i,t),o&&i.parentNode&&i.parentNode.removeChild(i))}),e};E.addTmplByUrl=function(o,t,e){!e&&typeof t=="function"&&(e=t,t={});const a=Object.assign({},{loadScript:!0,loadStyle:!0,loadLink:!0,templateEngine:void 0},t),i=p=>typeof p=="string"?{url:p,option:a}:p&&typeof p=="object"&&p.url?{url:p.url,option:Object.assign({},a,p.option)}:(console.error("Invalid import data format in addTmplByUrl:",p),null),c=p=>{p.forEach(d=>{var h;if(d){if(d.id){const g=document.getElementById(d.id);g&&((h=g.parentNode)===null||h===void 0||h.removeChild(g))}d.tagName==="SCRIPT"||d.tagName==="LINK"||d.tagName==="STYLE"?document.head.appendChild(d):document.body.appendChild(d)}})},l=(p,d)=>{const h=Y(p);le(h,!1,d.tmplSettings);const g=h.content||h;if(d.loadLink){const w=g.querySelectorAll('link[rel="stylesheet"]');c(w)}if(d.loadStyle){const w=g.querySelectorAll("style[id]");c(w)}if(d.loadScript){const w=g.querySelectorAll('script:not([type]), script[type="text/javascript"], script[type="module"]'),v=Array.from(w).filter(b=>{let C=b.parentNode;for(;C;){if(C.nodeName==="TEMPLATE"||C.nodeName==="SCRIPT"&&C.type.includes("template"))return!1;C=C.parentNode}return!0}).map(b=>{const C=document.createElement("script");return b.getAttributeNames().forEach(y=>C.setAttribute(y,b.getAttribute(y))),b.innerHTML&&(C.textContent=b.innerHTML),C});c(v)}},f=p=>new Promise((d,h)=>{const g=i(p);if(!g){d();return}const w=g.url,v=g.option;if(w.endsWith(".js")){const b=W("script",{async:!0,src:w});b.addEventListener("load",()=>d()),b.addEventListener("error",()=>{console.error(`Failed to load script: ${w}`),h(new Error(`Failed to load script: ${w}`))}),document.head.appendChild(b)}else if(w.endsWith(".css")){const b=W("link",{type:"text/css",rel:"stylesheet",href:w});b.addEventListener("load",()=>d()),b.addEventListener("error",()=>{console.error(`Failed to load stylesheet: ${w}`),h(new Error(`Failed to load stylesheet: ${w}`))}),document.head.appendChild(b)}else se(w,null,(b,C)=>{if(C===200||C===0)try{l(b,v),d()}catch(y){console.error(`Error processing imported HTML from ${w}:`,y),h(new Error(`Error processing imported HTML from ${w}: ${y}`))}else console.error(`Failed to fetch template file: ${w} (Status: ${C})`),h(new Error(`Failed to fetch template file: ${w} (Status: ${C})`))})});if(o==null)if(e){e();return}else return Promise.resolve();const u=Array.isArray(o)?o.length===0?Promise.resolve():Promise.all(o.map(f)).then(()=>{}).catch(p=>{throw console.error("Error loading resources in addTmplByUrl:",p),p}):f(o).catch(p=>{throw console.error("Error loading resource in addTmplByUrl:",p),p});if(e){u.then(()=>e()).catch(p=>{console.error("Error in addTmplByUrl callback mode:",p),e()});return}else return u};const se=function(n,o,t){const e=new XMLHttpRequest;e.onreadystatechange=function(){e.readyState==XMLHttpRequest.DONE&&(e.status==200||e.status===0?t(e.responseText,e.status,e):(e.status==404?console.error(`Error 404: Not Found - ${n}`):e.status>=400?console.error(`HTTP Error ${e.status} for ${n}`):console.error(`Request failed for ${n}`,e.statusText),t(null,e.status,e)))},e.onerror=function(){console.error(`Network error requesting ${n}`),t(null,0,e)},e.ontimeout=function(){console.error(`Request timed out for ${n}`),t(null,408,e)};try{const r=o&&o.method||"GET";e.open(r,n,!0),o||e.send()}catch(r){console.error(`Error sending request to ${n}:`,r),t(null,0,e)}};E.i18n={};E.addI18n=function(n,o){if(!n||typeof n!="string"||!o||typeof o!="object"){console.error("Invalid arguments for addI18n:",n,o);return}const t=n.split(".");let e=E.i18n;const r=t.length-1;t.forEach(function(a,i){a&&(r===i?(e[a]||(e[a]=function(c){const l=document.documentElement.lang||"en";let f=o[l];return f==null&&(f=c,S.debug&&console.warn(`i18n: Label key ["${n}"] for lang "${l}" is missing. Using default: "${c}"`)),f!=null?String(f):""}),Object.keys(o).filter(c=>o[c]instanceof Object&&!Array.isArray(o[c])).forEach(c=>{E.addI18n(n+"."+c,o[c])})):((!e[a]||typeof e[a]=="function")&&(e[a]={}),e=e[a]))})};E.addI18ns=function(n){Object.keys(n||{}).forEach(function(o){E.addI18n(o,n[o])})};let V=0;_.genId=function(n){return V++,n+V};const pe=_.applyElementProps=function(n,o){return Object.keys(o).forEach(function(t){const e=o[t],r=t==="class"?"className":t;try{t==="style"&&typeof e=="object"&&e!==null?Object.assign(n.style,e):t==="dataset"&&typeof e=="object"&&e!==null?Object.assign(n.dataset,e):t.startsWith("on")&&typeof e=="function"?n[t.toLowerCase()]=e:r in n?n[r]=e:n.setAttribute(t,String(e))}catch(a){console.error(`Error setting attribute/property "${t}" on <${n.tagName}>:`,a)}}),n},W=_.genElement=function(n,o={},...t){const e=document.createElement(n);let r={};return typeof o=="string"||o instanceof Node?t.unshift(o):Array.isArray(o)?t=o.concat(t):r=o,pe(e,r),t.forEach(a=>{typeof a=="string"?e.appendChild(document.createTextNode(a)):a instanceof Node&&e.appendChild(a)}),e};_.props=function(...n){if(!n||n.length===0)return"";const o=Object.assign({},...n),t=[];return Object.keys(o).forEach(function(e){const r=o[e];if(r||r===0){const a=String(r).replace(/"/g,"&quot;");t.push(`${e}="${a}"`)}}),t.join(" ")};ne(q);document.addEventListener("DOMContentLoaded",function(){let n;try{n=localStorage.getItem("compomint-theme")}catch(r){console.warn("Couldn't access localStorage:",r)}const o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=n==="dark"||n===null&&o;t?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode"),document.documentElement.setAttribute("data-theme","dark")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode"),document.documentElement.setAttribute("data-theme","light")),E.addTmpls(`
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
  `);const e=L.ui.ThemeSwitcher({});if(document.body.appendChild(e.element),window.matchMedia){const r=window.matchMedia("(prefers-color-scheme: dark)");r.addEventListener&&r.addEventListener("change",function(a){localStorage.getItem("compomint-theme")||(e.status.isDarkMode=a.matches,a.matches?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode")),e.refresh())})}});document.addEventListener("DOMContentLoaded",function(){function n(){const o=document.querySelectorAll("pre code");if(!o.length){setTimeout(n,100);return}o.forEach(function(t){let e=t.textContent;if(t.innerHTML!==e)return;const r={keyword:/\b(const|let|var|function|return|if|else|for|while|switch|case|break|continue|new|this|typeof|instanceof|null|undefined|true|false|try|catch|finally|throw|class|extends|import|export|from|as|async|await|yield)\b/g,compomintKeyword:/\b(data|status|component|i18n|compomint|tmpl)\b/g,string:/((['"])(?:\\.|[^\\])*?\2)|(`(?:\\.|[^\\])*?`)/g,comment:/(\/\/.*?$)|(\/\*[\s\S]*?\*\/)/gm,function:/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g,number:/\b(\d+(?:\.\d+)?)\b/g,tag:/(&lt;[^>]*&gt;)/g,compomintTemplate:/(##[=%\-!*]?[\s\S]*?##)/g},a={keyword:"text-pink-500",compomintKeyword:"text-purple-400",string:"text-green-400",comment:"text-gray-500",function:"text-blue-400",number:"text-yellow-500",tag:"text-cyan-400",compomintTemplate:"text-orange-400"};e=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");for(const[i,c]of Object.entries(r))e=e.replace(c,function(l){if(i==="function"){const f=l.slice(0,-1);return`<span class="${a[i]}">${f}</span>(`}return`<span class="${a[i]}">${l}</span>`});t.innerHTML=e})}n(),setTimeout(n,500)});document.addEventListener("DOMContentLoaded",function(){window.updateMetaTags=function(){document.documentElement.lang;function t(a){const i=a.split(".");if(i.length!==2)return null;const c=E.i18n[i[0]];if(!c||!c[i[1]])return null;const l=c[i[1]];return typeof l=="function"?l():null}const r=t("app.page-title");r&&(document.title=r),document.querySelectorAll("[data-i18n-content]").forEach(a=>{const i=a.getAttribute("data-i18n-content"),c=t(i);c&&(a.hasAttribute("content")?a.setAttribute("content",c):a.textContent=c)});try{document.querySelectorAll('script[type="application/ld+json"]').forEach(i=>{try{const c=JSON.parse(i.textContent);if(c["@type"]==="SoftwareApplication"){const l=t("app.meta-description");l&&(c.description=l),i.textContent=JSON.stringify(c,null,2)}}catch(c){console.warn("Failed to parse schema JSON:",c)}})}catch(a){console.warn("Error updating schema.org data:",a)}},E.addI18ns({app:{title:{en:"How to Create Web Components Easily",ko:"웹 컴포넌트를 간단하게 만드는 방법",ja:"Webコンポーネントを簡単に作成する方法",zh:"如何轻松创建Web组件"},subtitle:{en:"Compomint is a lightweight JavaScript framework that provides a template-based component system.",ko:"Compomint는 템플릿 기반 컴포넌트 시스템을 제공하는 경량 JavaScript 프레임워크입니다.",ja:"Compomintは、テンプレートベースのコンポーネントシステムを提供する軽量JavaScriptフレームワークです。",zh:"Compomint是一个轻量级JavaScript框架，提供基于模板的组件系统。"},"page-title":{en:"Compomint - Lightweight Component Engine",ko:"Compomint - 경량 컴포넌트 엔진",ja:"Compomint - 軽量コンポーネントエンジン",zh:"Compomint - 轻量级组件引擎"},"meta-description":{en:"Compomint is a lightweight JavaScript template-based component engine for web applications",ko:"Compomint는 웹 애플리케이션을 위한 경량 JavaScript 템플릿 기반 컴포넌트 엔진입니다",ja:"Compomintは、Webアプリケーション向けの軽量JavaScriptテンプレートベースコンポーネントエンジンです",zh:"Compomint是一个用于Web应用程序的轻量级JavaScript模板组件引擎"},"og-image-alt":{en:"Compomint logo and code example screen",ko:"Compomint 로고 및 코드 예제 화면",ja:"Compomintロゴとコード例の画面",zh:"Compomint标志和代码示例屏幕"},getStarted:{en:"Get Started",ko:"시작하기",ja:"始めましょう",zh:"开始使用"},featuresTitle:{en:"Why Use Compomint?",ko:"왜 Compomint를 사용해야 할까요?",ja:"なぜCompomintを使用するのですか？",zh:"为什么使用Compomint？"},examplesTitle:{en:"Code Examples",ko:"코드 예제",ja:"コード例",zh:"代码示例"},docTitle:{en:"Learn More",ko:"더 알아보기",ja:"もっと詳しく",zh:"了解更多"},docDescription:{en:"Check out detailed documentation and resources for Compomint.",ko:"Compomint에 대한 자세한 정보와 문서를 확인하세요.",ja:"Compomintの詳細なドキュメントとリソースをご覧ください。",zh:"查看Compomint的详细文档和资源。"}},features:{lightweight:{title:{en:"Lightweight Size",ko:"가벼운 크기",ja:"軽量サイズ",zh:"轻量级大小"},description:{en:"Fast loading and execution with a small footprint (~14KB gzipped).",ko:"약 14KB(gzip 압축)의 작은 크기로 빠른 로딩과 실행이 가능합니다.",ja:"小さなフットプリント（gzip圧縮で約14KB）で高速なロードと実行が可能です。",zh:"小体积（gzip压缩后约14KB）实现快速加载和执行。"}},template:{title:{en:"Template-Based",ko:"템플릿 기반",ja:"テンプレートベース",zh:"基于模板"},description:{en:"Use a simple yet powerful string-based template syntax with JavaScript evaluation.",ko:"JavaScript 평가가 가능한 간단하고 강력한 문자열 기반 템플릿 구문을 사용합니다.",ja:"JavaScript評価が可能なシンプルで強力な文字列ベースのテンプレート構文を使用します。",zh:"使用简单而强大的基于字符串的模板语法，支持JavaScript评估。"}},component:{title:{en:"Component-Oriented",ko:"컴포넌트 지향",ja:"コンポーネント指向",zh:"组件导向"},description:{en:"Build reusable UI components with proper encapsulation.",ko:"적절한 캡슐화와 함께 재사용 가능한 UI 컴포넌트를 구축합니다.",ja:"適切なカプセル化を備えた再利用可能なUIコンポーネントを構築します。",zh:"构建具有适当封装的可重用UI组件。"}},easy:{title:{en:"Component Composition",ko:"컴포넌트 구성",ja:"コンポーネントの構成",zh:"组件组合"},description:{en:"Combine components like building blocks to create complex UIs.",ko:"복잡한 UI를 구성하기 위해 블록처럼 컴포넌트를 조합할 수 있습니다.",ja:"複雑なUIを作成するために、ビルディングブロックのようにコンポーネントを組み合わせます。",zh:"像积木一样组合组件，创建复杂的UI。"}},responsive:{title:{en:"State Management",ko:"상태 관리",ja:"状態管理",zh:"状态管理"},description:{en:"Manage component state efficiently with automatic updates.",ko:"자동 업데이트와 함께 컴포넌트 상태를 효율적으로 관리합니다.",ja:"自動更新でコンポーネントの状態を効率的に管理します。",zh:"通过自动更新高效管理组件状态。"}},i18n:{title:{en:"Internationalization",ko:"다국어 지원",ja:"国際化",zh:"国际化"},description:{en:"Built-in support for multiple languages with i18n system.",ko:"여러 언어를 지원하는 내장된 국제화(i18n) 시스템을 제공합니다.",ja:"複数言語をサポートする組み込みの国際化（i18n）システムを提供します。",zh:"内置的i18n系统支持多种语言。"}}},examples:{result:{en:"Result:",ko:"결과:",ja:"結果:",zh:"结果:"},basicComponent:{title:{en:"Basic Component",ko:"기본 컴포넌트",ja:"基本的なコンポーネント",zh:"基础组件"},description:{en:"Simple template definition and usage",ko:"간단한 템플릿 정의와 사용 방법",ja:"シンプルなテンプレート定義と使用方法",zh:"简单的模板定义和使用方法"}},stateManagement:{title:{en:"State Management",ko:"상태 관리",ja:"状態管理",zh:"状态管理"},description:{en:"How to manage internal component state and respond to events",ko:"컴포넌트 내부 상태를 관리하고 이벤트에 반응하는 방법",ja:"コンポーネントの内部状態を管理しイベントに応答する方法",zh:"如何管理组件内部状态并响应事件"}},complexComponent:{title:{en:"Complex Component",ko:"복잡한 컴포넌트",ja:"複雑なコンポーネント",zh:"复杂组件"},description:{en:"A more complex component example: Todo List",ko:"더 복잡한 컴포넌트 예제: Todo 리스트",ja:"より複雑なコンポーネントの例：Todoリスト",zh:"更复杂的组件示例：待办事项列表"}},multiTemplate:{title:{en:"Multi-Template Application",ko:"다중 템플릿 애플리케이션",ja:"マルチテンプレートアプリケーション",zh:"多模板应用程序"},description:{en:"Complete application example combining multiple templates",ko:"여러 템플릿을 결합한 완전한 애플리케이션 예제",ja:"複数のテンプレートを組み合わせた完全なアプリケーション例",zh:"结合多个模板的完整应用程序示例"}}},vscode:{title:{en:"VSCode Extension",ko:"VSCode 확장 기능",ja:"VSCode拡張機能",zh:"VSCode扩展"},subtitle:{en:"Boost your Compomint development with powerful VSCode extension that provides syntax highlighting, auto-completion, and live preview.",ko:"구문 하이라이팅, 자동 완성, 라이브 미리보기를 제공하는 강력한 VSCode 확장 기능으로 Compomint 개발을 향상시키세요.",ja:"構文ハイライト、自動補完、ライブプレビューを提供する強力なVSCode拡張機能でCompomint開発を向上させましょう。",zh:"使用提供语法高亮、自动完成和实时预览的强大VSCode扩展来提升您的Compomint开发体验。"},install:{en:"Install Extension",ko:"확장 기능 설치",ja:"拡張機能をインストール",zh:"安装扩展"},features:{syntax:{title:{en:"Syntax Highlighting",ko:"구문 하이라이팅",ja:"構文ハイライト",zh:"语法高亮"},description:{en:"Colored syntax highlighting for Compomint templates and expressions.",ko:"Compomint 템플릿과 표현식을 위한 컬러 구문 하이라이팅을 제공합니다.",ja:"Compomintテンプレートと式のカラー構文ハイライトを提供します。",zh:"为Compomint模板和表达式提供彩色语法高亮。"}},autocomplete:{title:{en:"Auto-completion",ko:"자동 완성",ja:"自動補完",zh:"自动完成"},description:{en:"Smart auto-completion for Compomint APIs and template syntax.",ko:"Compomint API와 템플릿 구문을 위한 스마트 자동 완성 기능을 제공합니다.",ja:"Compomint APIとテンプレート構文のスマート自動補完を提供します。",zh:"为Compomint API和模板语法提供智能自动完成。"}},snippets:{title:{en:"Code Snippets",ko:"코드 스니펫",ja:"コードスニペット",zh:"代码片段"},description:{en:"Ready-to-use code snippets for common Compomint patterns.",ko:"일반적인 Compomint 패턴을 위한 즉시 사용 가능한 코드 스니펫을 제공합니다.",ja:"一般的なCompomintパターン用のすぐに使えるコードスニペットを提供します。",zh:"为常见的Compomint模式提供即用型代码片段。"}},preview:{title:{en:"Live Preview",ko:"라이브 미리보기",ja:"ライブプレビュー",zh:"实时预览"},description:{en:"Real-time preview of your Compomint templates and components.",ko:"Compomint 템플릿과 컴포넌트의 실시간 미리보기를 제공합니다.",ja:"Compomintテンプレートとコンポーネントのリアルタイムプレビューを提供します。",zh:"为您的Compomint模板和组件提供实时预览。"}}},screenshots:{template:{title:{en:"Template Support",ko:"템플릿 지원",ja:"テンプレートサポート",zh:"模板支持"},description:{en:"Advanced template editing with syntax highlighting and IntelliSense.",ko:"구문 하이라이팅과 IntelliSense를 통한 고급 템플릿 편집 기능입니다.",ja:"構文ハイライトとIntelliSenseによる高度なテンプレート編集機能です。",zh:"通过语法高亮和IntelliSense提供高级模板编辑功能。"}},preview:{title:{en:"Live Preview",ko:"라이브 미리보기",ja:"ライブプレビュー",zh:"实时预览"},description:{en:"See your components rendered in real-time as you code.",ko:"코딩하는 동시에 컴포넌트가 실시간으로 렌더링되는 것을 확인할 수 있습니다.",ja:"コーディング中にコンポーネントがリアルタイムでレンダリングされるのを確認できます。",zh:"在编码时实时查看组件的渲染效果。"}}}},footer:{description:{en:"Compomint is a lightweight JavaScript framework for creating web applications with a component-based architecture.",ko:"Compomint는 웹 애플리케이션 개발을 위한 경량 JavaScript 프레임워크로, 컴포넌트 기반 아키텍처에 중점을 둡니다.",ja:"Compomintは、コンポーネントベースのアーキテクチャでウェブアプリケーションを作成するための軽量JavaScriptフレームワークです。",zh:"Compomint是一个用于创建基于组件架构的Web应用程序的轻量级JavaScript框架。"},links:{home:{en:"Home",ko:"홈",ja:"ホーム",zh:"首页"},features:{en:"Features",ko:"특징",ja:"機能",zh:"特性"},examples:{en:"Examples",ko:"예제",ja:"例",zh:"示例"},docs:{en:"Documentation",ko:"문서",ja:"ドキュメント",zh:"文档"}},links_section:{en:"Links",ko:"링크",ja:"リンク",zh:"链接"},contact_section:{en:"Contact",ko:"연락처",ja:"お問い合わせ",zh:"联系我们"},license_text:{en:"Available under MIT License.",ko:"MIT 라이센스에 따라 사용 가능합니다.",ja:"MITライセンスの下で利用可能です。",zh:"根据MIT许可证可用。"}},pg:{fullscreen:{en:"FULLSCREEN",ko:"전체화면",ja:"フルスクリーン",zh:"全屏"},exitFull:{en:"EXIT FULL",ko:"전체화면 해제",ja:"フルスクリーン解除",zh:"退出全屏"},autoRefresh:{en:"AUTO REFRESH",ko:"자동 새로고침",ja:"自動更新",zh:"自动刷新"},codeReset:{en:"CODE RESET",ko:"코드 초기화",ja:"コードリセット",zh:"代码重置"},run:{en:"RUN",ko:"실행",ja:"実行",zh:"运行"},console:{en:"CONSOLE",ko:"콘솔",ja:"コンソール",zh:"控制台"},autoScroll:{en:"AUTO SCROLL",ko:"자동 스크롤",ja:"自動スクロール",zh:"自动滚动"},clear:{en:"CLEAR",ko:"지우기",ja:"クリア",zh:"清除"}},"ui-LanguageSwitcher":{language:{en:"Language",ko:"언어",ja:"言語",zh:"语言"},en:{en:"English",ko:"English",ja:"English",zh:"English"},ko:{en:"한국어",ko:"한국어",ja:"한국어",zh:"한국어"},ja:{en:"日本語",ko:"日本語",ja:"日本語",zh:"日本語"},zh:{en:"中文",ko:"中文",ja:"中文",zh:"中文"}}}),E.addTmpls(`
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
  `);const n=["en","ko","ja","zh"];function o(){let t;try{t=localStorage.getItem("compomint-lang")}catch(a){console.warn("Failed to read language preference from localStorage:",a)}if(!t){const a=navigator.language.split("-")[0];t=n.includes(a)?a:"en"}const r=new URLSearchParams(window.location.search).get("lang");r&&n.includes(r)&&(t=r),document.documentElement.lang=t,setTimeout(function(){try{typeof window.updateMetaTags=="function"&&window.updateMetaTags()}catch(a){console.warn("Failed to update meta tags:",a)}},100)}o()});document.addEventListener("DOMContentLoaded",async function(){const n=E.addTmplByUrl(["templates/layout.cmint","templates/header.cmint","templates/hero.cmint","templates/features.cmint","templates/vscode-extension.cmint","templates/examples.cmint","templates/documentation.cmint","templates/footer.cmint","templates/ui-components.cmint","templates/ui.components.cmint","templates/pg.components.cmint","templates/demo-components.cmint","templates/ui-cookie-consent.cmint"]);n?n.then(()=>{console.log("loaded templates, now initialize app"),me()}):(console.error("Failed to load templates, cannot initialize app"),document.getElementById("app-container").innerHTML='<div class="text-center p-8"><h1 class="text-2xl text-red-600">Error loading application templates</h1></div>'),de()});function de(){let n;try{n=localStorage.getItem("compomint-theme")}catch(e){console.warn("Couldn't access localStorage:",e)}const o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;n==="dark"||n===null&&o?(document.documentElement.classList.add("dark"),document.body.classList.add("dark-mode")):(document.documentElement.classList.remove("dark"),document.body.classList.remove("dark-mode"))}async function me(){const n=L.ui.Header({}),o=L.ui.Hero({}),t=L.ui.Features({}),e=L.ui.VSCodeExtension({}),r=L.ui.Examples({title:E.i18n.app.examplesTitle("Code Examples"),examples:[{class:"h-[500px]",interactive:!0,title:E.i18n.examples.basicComponent.title("Basic Component"),description:E.i18n.examples.basicComponent.description("Simple template definition and usage"),code:`// Template definition
compomint.addTmpl('ui-Button', \` // Template definition
  <button class="ui-Button p-2 ##=data.color ? 'bg-' + data.color + '-50' : ''##"
    data-co-event="##:data.onClick##">
    ##=data.label##
  </button>
\`);

// Create and use component
const button = tmpl.ui.Button({
  label: 'Click here',
  color: 'indigo',
  onClick: function() {
    alert('The button has been clicked!');
  }
});
document.body.appendChild(button.element);`},{class:"h-[700px]",interactive:!0,title:E.i18n.examples.stateManagement.title("State Management"),description:E.i18n.examples.stateManagement.description("How to manage internal component state and respond to events"),type:"codeIsTemplateFile",template:await(await fetch("templates/demo/ui.Counter.cmint")).text(),code:`// Create a counter component for an example
  const counter = tmpl.ui.Counter({
    initialCount: 1,
  });
  document.body.appendChild(counter.element);`},{class:"h-[1000px]",interactive:!0,title:E.i18n.examples.complexComponent.title("Complex Component"),description:E.i18n.examples.complexComponent.description("A more complex component example: Todo List"),type:"codeIsTemplateFile",template:await(await fetch("templates/demo/ui.TodoList.cmint")).text(),code:`// Create a todo list component for an example
  const todoList = tmpl.ui.TodoList({
    initialTodos: [
      { text: "Read Compomint documentation", completed: true },
      { text: "Create your first component", completed: false },
      { text: "Apply to website", completed: false },
    ],
  });
  document.body.appendChild(todoList.element);`},{class:"h-[1400px]",interactive:!0,title:E.i18n.examples.multiTemplate.title("Multi-Template Application"),description:E.i18n.examples.multiTemplate.description("Complete application example combining multiple templates"),type:"codeIsTemplateFile",template:await(await fetch("templates/demo/ui.UserManagement.cmint")).text(),imports:[],code:`// Create a user management system for an example
const userManagement = tmpl.ui.UserManagement({
  users: [
    { id: 1, name: 'Kim Chul-su', email: 'kim@example.com', role: 'admin', active: true, joinDate: '2024-01-15' },
    { id: 2, name: 'Lee Young-hee', email: 'lee@example.com', role: 'moderator', active: true, joinDate: '2024-02-10' },
    { id: 3, name: 'Park Min-su', email: 'park@example.com', role: 'user', active: false, joinDate: '2024-03-05' },
    { id: 4, name: 'Choi Ji-eun', email: 'choi@example.com', role: 'user', active: true, joinDate: '2024-06-20' }
  ]
});
document.body.appendChild(userManagement.element);`}]}),a=L.ui.Documentation({}),i=L.ui.Footer({}),c=L.app.Layout({header:n,hero:o,features:t,vscodeExtension:e,examples:r,documentation:a,footer:i});document.getElementById("app-container").appendChild(c.element),document.querySelectorAll('a[href^="#"]').forEach(f=>{f.addEventListener("click",function(u){u.preventDefault();const p=this.getAttribute("href");if(p==="#")return;const d=document.querySelector(p);console.log("Target ID:",p,"Target Element:",d),d?window.scrollTo({top:d.offsetTop-70,behavior:"smooth"}):console.warn("Target element not found:",p)})})}
