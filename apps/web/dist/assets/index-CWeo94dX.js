var cn=Object.defineProperty;var ln=(e,t,n)=>t in e?cn(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var b=(e,t,n)=>ln(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=(e,t,n=[])=>{const r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(o=>{r.setAttribute(o,String(t[o]))}),n.length&&n.forEach(o=>{const i=It(...o);r.appendChild(i)}),r};var un=([e,t,n])=>It(e,t,n);/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dn=e=>Array.from(e.attributes).reduce((t,n)=>(t[n.name]=n.value,t),{}),pn=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",hn=e=>e.flatMap(pn).map(n=>n.trim()).filter(Boolean).filter((n,r,o)=>o.indexOf(n)===r).join(" "),fn=e=>e.replace(/(\w)(\w*)(_|-|\s*)/g,(t,n,r)=>n.toUpperCase()+r.toLowerCase()),Ve=(e,{nameAttr:t,icons:n,attrs:r})=>{var m;const o=e.getAttribute(t);if(o==null)return;const i=fn(o),s=n[i];if(!s)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);const a=dn(e),[c,l,u]=s,d={...l,"data-lucide":o,...r,...a},h=hn(["lucide",`lucide-${o}`,a,r]);h&&Object.assign(d,{class:h});const f=un([c,d,u]);return(m=e.parentNode)==null?void 0:m.replaceChild(f,e)};/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mn=["svg",N,[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gn=["svg",N,[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"}],["circle",{cx:"12",cy:"8",r:"6"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yn=["svg",N,[["path",{d:"M20 6 9 17l-5-5"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bn=["svg",N,[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 14"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vn=["svg",N,[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"}],["circle",{cx:"12",cy:"12",r:"10"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wn=["svg",N,[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _n=["svg",N,[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kn=["svg",N,[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sn=["svg",N,[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"M12 8v4"}],["path",{d:"M12 16h.01"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=["svg",N,[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}],["path",{d:"M20 3v4"}],["path",{d:"M22 5h-4"}],["path",{d:"M4 17v2"}],["path",{d:"M5 18H3"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xn=["svg",N,[["path",{d:"M3 6h18"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zn=["svg",N,[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const In=["svg",N,[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]]];/**
 * @license lucide v0.473.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=({icons:e={},nameAttr:t="data-lucide",attrs:n={}}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof document>"u")throw new Error("`createIcons()` only works in a browser environment.");const r=document.querySelectorAll(`[${t}]`);if(Array.from(r).forEach(o=>Ve(o,{nameAttr:t,icons:e,attrs:n})),t==="data-lucide"){const o=document.querySelectorAll("[icon-name]");o.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(o).forEach(i=>Ve(i,{nameAttr:"icon-name",icons:e,attrs:n})))}},Ie=(e,t)=>t.some(n=>e instanceof n);let Je,Ye;function $n(){return Je||(Je=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function En(){return Ye||(Ye=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const $e=new WeakMap,_e=new WeakMap,ye=new WeakMap;function Tn(e){const t=new Promise((n,r)=>{const o=()=>{e.removeEventListener("success",i),e.removeEventListener("error",s)},i=()=>{n(V(e.result)),o()},s=()=>{r(e.error),o()};e.addEventListener("success",i),e.addEventListener("error",s)});return ye.set(t,e),t}function Pn(e){if($e.has(e))return;const t=new Promise((n,r)=>{const o=()=>{e.removeEventListener("complete",i),e.removeEventListener("error",s),e.removeEventListener("abort",s)},i=()=>{n(),o()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),o()};e.addEventListener("complete",i),e.addEventListener("error",s),e.addEventListener("abort",s)});$e.set(e,t)}let Ee={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return $e.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return V(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Et(e){Ee=e(Ee)}function On(e){return En().includes(e)?function(...t){return e.apply(Te(this),t),V(this.request)}:function(...t){return V(e.apply(Te(this),t))}}function An(e){return typeof e=="function"?On(e):(e instanceof IDBTransaction&&Pn(e),Ie(e,$n())?new Proxy(e,Ee):e)}function V(e){if(e instanceof IDBRequest)return Tn(e);if(_e.has(e))return _e.get(e);const t=An(e);return t!==e&&(_e.set(e,t),ye.set(t,e)),t}const Te=e=>ye.get(e);function Mn(e,t,{blocked:n,upgrade:r,blocking:o,terminated:i}={}){const s=indexedDB.open(e,t),a=V(s);return r&&s.addEventListener("upgradeneeded",c=>{r(V(s.result),c.oldVersion,c.newVersion,V(s.transaction),c)}),n&&s.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),o&&c.addEventListener("versionchange",l=>o(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}const Rn=["get","getKey","getAll","getAllKeys","count"],Cn=["put","add","delete","clear"],ke=new Map;function He(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(ke.get(t))return ke.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,o=Cn.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(o||Rn.includes(n)))return;const i=async function(s,...a){const c=this.transaction(s,o?"readwrite":"readonly");let l=c.store;return r&&(l=l.index(a.shift())),(await Promise.all([l[n](...a),o&&c.done]))[0]};return ke.set(t,i),i}Et(e=>({...e,get:(t,n,r)=>He(t,n)||e.get(t,n,r),has:(t,n)=>!!He(t,n)||e.has(t,n)}));const Zn=["continue","continuePrimaryKey","advance"],We={},Pe=new WeakMap,Tt=new WeakMap,Fn={get(e,t){if(!Zn.includes(t))return e[t];let n=We[t];return n||(n=We[t]=function(...r){Pe.set(this,Tt.get(this)[t](...r))}),n}};async function*Nn(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const n=new Proxy(t,Fn);for(Tt.set(n,t),ye.set(n,Te(t));t;)yield n,t=await(Pe.get(n)||t.continue()),Pe.delete(n)}function Ke(e,t){return t===Symbol.asyncIterator&&Ie(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&Ie(e,[IDBIndex,IDBObjectStore])}Et(e=>({...e,get(t,n,r){return Ke(t,n)?Nn:e.get(t,n,r)},has(t,n){return Ke(t,n)||e.has(t,n)}}));const Dn="yumyuck_db",Ln=1;let Se=null;function J(){return typeof window>"u"?new Promise(()=>{}):(Se||(Se=Mn(Dn,Ln,{upgrade(e){e.objectStoreNames.contains("catalog")||e.createObjectStore("catalog",{keyPath:"id"}),e.objectStoreNames.contains("sessions")||e.createObjectStore("sessions",{keyPath:"id"}),e.objectStoreNames.contains("events")||e.createObjectStore("events",{keyPath:"id"}).createIndex("sessionId","sessionId",{unique:!1}),e.objectStoreNames.contains("preference_signals")||e.createObjectStore("preference_signals",{keyPath:"id"}).createIndex("userId","userId",{unique:!1})}})),Se)}async function Pt(e){const n=(await J()).transaction("catalog","readwrite"),r=n.objectStore("catalog");for(const o of e)await r.put(o);await n.done}async function jn(){return(await J()).getAll("catalog")}async function Oe(e){await(await J()).put("preference_signals",e)}async function W(e){const o=await(await J()).transaction("preference_signals","readonly").store.index("userId").getAll(e),i=new Date().toISOString();return o.filter(s=>!s.expiresAt||s.expiresAt>i)}async function Ae(e){await(await J()).delete("preference_signals",e)}async function qn(){const n=(await J()).transaction("preference_signals","readwrite").objectStore("preference_signals"),r=await n.getAll();for(const o of r)o.scope==="session"&&await n.delete(o.id)}async function Un(){const t=(await J()).transaction("catalog","readwrite");await t.objectStore("catalog").clear(),await t.done}class Bn extends HTMLElement{static get observedAttributes(){return["current","total"]}constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.render()}attributeChangedCallback(){this.render()}render(){const t=parseInt(this.getAttribute("current")||"0",10),n=parseInt(this.getAttribute("total")||"8",10),r=`
      :host {
        display: flex;
        gap: 6px;
        align-items: center;
        justify-content: center;
        width: 100%;
        max-width: 180px;
      }
      .capsule {
        flex: 1;
        height: 6px;
        border-radius: 9999px;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .capsule.filled {
        background-color: #2C5E43; /* primary-green */
        transform: scaleY(1.1);
      }
      .capsule.empty {
        background-color: rgba(30, 32, 30, 0.1);
      }
    `;let o="";for(let i=0;i<n;i++){const s=i<t;o+=`<div class="capsule ${s?"filled":"empty"}"></div>`}this.shadowRoot.innerHTML=`
      <style>${r}</style>
      ${o}
    `}}customElements.define("capsule-indicator",Bn);function de(e){return{"meal-1":"https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600","meal-2":"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600","meal-3":"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600","meal-4":"https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600","meal-5":"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600","meal-6":"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=600","meal-7":"https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=600","meal-8":"https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600","meal-9":"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600","meal-10":"https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600","meal-11":"https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=600","meal-12":"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600","meal-13":"https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600","meal-14":"https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&q=80&w=600","meal-15":"https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600","meal-16":"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600","meal-17":"https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600","meal-18":"https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=600","meal-19":"https://images.unsplash.com/photo-1559742811-8242895411b8?auto=format&fit=crop&q=80&w=600","meal-20":"https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600","meal-21":"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600","meal-22":"https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600","meal-23":"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=600","meal-24":"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600","meal-25":"https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600","meal-26":"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600","meal-27":"https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=600","meal-28":"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600","meal-29":"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600","meal-30":"https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600"}[e]||"https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600"}class Gn extends HTMLElement{constructor(){super();b(this,"_meal",null);b(this,"_active",!1);b(this,"isDragging",!1);b(this,"isLifted",!1);b(this,"isPressed",!1);b(this,"startX",0);b(this,"startY",0);b(this,"currentX",0);b(this,"currentY",0);b(this,"liftTimeout",null);b(this,"lastTap",0);this.attachShadow({mode:"open"}),this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this)}set meal(n){this._meal=n,this.render()}get meal(){return this._meal}set active(n){this._active=n,this.updateActiveState()}get active(){return this._active}connectedCallback(){this.render(),this.addEventListener("pointerdown",this.onPointerDown)}disconnectedCallback(){this.removeEventListener("pointerdown",this.onPointerDown),this.cleanupWindowListeners()}updateActiveState(){var r;const n=(r=this.shadowRoot)==null?void 0:r.querySelector(".card-container");n&&(this._active?(n.classList.remove("inactive"),n.classList.add("active")):(n.classList.remove("active"),n.classList.add("inactive")))}onPointerDown(n){var a;if(!this._active)return;this.isPressed=!0,this.isDragging=!1;const r=Date.now();if(r-this.lastTap<300){this.handleDoubleTap(),this.lastTap=0;return}if(this.lastTap=r,n.composedPath().some(c=>c.classList&&c.classList.contains("info-area")))return;this.startX=n.clientX,this.startY=n.clientY,this.currentX=0,this.currentY=0;const s=(a=this.shadowRoot)==null?void 0:a.querySelector(".card-container");s&&(s.classList.remove("snapping"),s.style.transform="scale(0.99)"),this.clearLiftTimeout(),this.liftTimeout=setTimeout(()=>{this.triggerLift()},300),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("pointercancel",this.onPointerUp)}onPointerMove(n){var a;if(!this.isPressed)return;const r=n.clientX-this.startX,o=n.clientY-this.startY;(Math.abs(r)>8||Math.abs(o)>8)&&(this.clearLiftTimeout(),this.isDragging=!0),this.currentX=r,this.currentY=o;const i=r*.05,s=(a=this.shadowRoot)==null?void 0:a.querySelector(".card-container");s&&(s.style.transform=`translate3d(${r}px, ${o}px, 0) rotate(${i}deg) scale(${this.isLifted?1.02:.99})`),this.dispatchEvent(new CustomEvent("card-drag",{bubbles:!0,composed:!0,detail:{x:r,y:o}})),this.updateFeedback(r,o)}onPointerUp(n){var i;this.isPressed=!1,this.clearLiftTimeout(),this.cleanupWindowListeners();const r=120,o=(i=this.shadowRoot)==null?void 0:i.querySelector(".card-container");if(o)if(this.isDragging&&(Math.abs(this.currentX)>r||this.currentY<-r)){let s="maybe",a=0,c=0;this.currentY<-r&&Math.abs(this.currentX)<r?(s="maybe",c=-800):this.currentX>r?(s="yum",a=800):(s="nope",a=-800),this.animateExit(o,a,c,s)}else this.isLifted=!1,o.classList.add("snapping"),o.style.transform="translate3d(0px, 0px, 0) rotate(0deg) scale(1.0)",this.resetFeedback(o),this.dispatchEvent(new CustomEvent("card-release",{bubbles:!0,composed:!0}))}triggerLift(){var r;this.isLifted=!0,navigator.vibrate&&navigator.vibrate(12);const n=(r=this.shadowRoot)==null?void 0:r.querySelector(".card-container");n&&(n.classList.add("lifted"),n.style.transform=`translate3d(${this.currentX}px, ${this.currentY}px, 0) scale(1.02)`),this.dispatchEvent(new CustomEvent("card-lift",{bubbles:!0,composed:!0}))}handleDoubleTap(){var r;navigator.vibrate&&navigator.vibrate([10,30]);const n=(r=this.shadowRoot)==null?void 0:r.querySelector(".double-tap-heart");n&&(n.classList.remove("animate-heart"),n.offsetWidth,n.classList.add("animate-heart")),this.dispatchEvent(new CustomEvent("card-favorite",{bubbles:!0,composed:!0,detail:{meal:this._meal}}))}clearLiftTimeout(){this.liftTimeout&&(clearTimeout(this.liftTimeout),this.liftTimeout=null)}cleanupWindowListeners(){window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("pointercancel",this.onPointerUp)}updateFeedback(n,r){var h;const o=(h=this.shadowRoot)==null?void 0:h.querySelector(".card-container");if(!o)return;const i=o.querySelector(".overlay-nope"),s=o.querySelector(".overlay-yum"),a=o.querySelector(".overlay-maybe"),c=o.querySelector(".stamp-nope"),l=o.querySelector(".stamp-yum"),u=o.querySelector(".stamp-maybe"),d=150;if(i&&(i.style.opacity="0"),s&&(s.style.opacity="0"),a&&(a.style.opacity="0"),c&&(c.style.opacity="0",c.style.transform="scale(0.8) rotate(-15deg)"),l&&(l.style.opacity="0",l.style.transform="scale(0.8) rotate(15deg)"),u&&(u.style.opacity="0",u.style.transform="scale(0.8) rotate(0deg)"),r<0&&Math.abs(n)<Math.abs(r)){const f=Math.min(Math.abs(r)/d,.7).toString();a&&(a.style.opacity=f),u&&(u.style.opacity=Math.min(Math.abs(r)/d,1).toString(),u.style.transform=`scale(${.8+.2*Math.min(Math.abs(r)/d,1)}) rotate(0deg)`)}else if(n>0){const f=Math.min(n/d,.7).toString();s&&(s.style.opacity=f),l&&(l.style.opacity=Math.min(n/d,1).toString(),l.style.transform=`scale(${.8+.2*Math.min(n/d,1)}) rotate(${15-5*Math.min(n/d,1)}deg)`)}else if(n<0){const f=Math.min(Math.abs(n)/d,.7).toString();i&&(i.style.opacity=f),c&&(c.style.opacity=Math.min(Math.abs(n)/d,1).toString(),c.style.transform=`scale(${.8+.2*Math.min(Math.abs(n)/d,1)}) rotate(${-15+5*Math.min(n/d,1)}deg)`)}}resetFeedback(n){const r=n.querySelector(".overlay-nope"),o=n.querySelector(".overlay-yum"),i=n.querySelector(".overlay-maybe"),s=n.querySelector(".stamp-nope"),a=n.querySelector(".stamp-yum"),c=n.querySelector(".stamp-maybe");r&&(r.style.opacity="0"),o&&(o.style.opacity="0"),i&&(i.style.opacity="0"),s&&(s.style.opacity="0",s.style.transform="scale(0.8) rotate(-15deg)"),a&&(a.style.opacity="0",a.style.transform="scale(0.8) rotate(15deg)"),c&&(c.style.opacity="0",c.style.transform="scale(0.8) rotate(0deg)"),n.classList.remove("lifted")}animateExit(n,r,o,i){n.style.transition="transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s ease",n.style.transform=`translate3d(${r}px, ${o}px, 0) rotate(${r*.05}deg) scale(0.9)`,n.style.opacity="0",setTimeout(()=>{this.dispatchEvent(new CustomEvent("swipe",{bubbles:!0,composed:!0,detail:{meal:this._meal,response:i}}))},250)}render(){if(!this._meal){this.shadowRoot.innerHTML="";return}const n=this._meal.experienceTags.map(s=>`<span class="tag-chip">${s}</span>`).join('<span class="tag-dot">•</span>'),r=`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
        touch-action: none;
      }
      .card-container {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
        border-radius: 32px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 12px 32px -8px rgba(30, 32, 30, 0.08), 0 4px 12px -2px rgba(30, 32, 30, 0.04);
        transform-origin: center bottom;
      }
      .card-container.lifted {
        box-shadow: 0 32px 64px -16px rgba(30,32,30,0.14), 0 12px 28px -4px rgba(30,32,30,0.08);
      }
      .card-container.inactive {
        pointer-events: none;
      }
      .card-container.inactive .info-area,
      .card-container.inactive .vignette {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
      .card-container.inactive .food-image {
        opacity: 0.35;
        filter: brightness(0.7) contrast(0.9);
      }
      .card-container.snapping {
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25);
      }

      /* Editorial Image */
      .food-image {
        width: 100%;
        height: 100%;
        object-cover: cover;
        pointer-events: none;
        object-fit: cover;
        transition: filter 0.3s ease;
      }
      
      /* Color Overlays (Multiply blend) */
      .overlay {
        position: absolute;
        inset: 0;
        mix-blend-mode: multiply;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease;
      }
      .overlay-nope { background-color: #FAF2F0; }
      .overlay-yum { background-color: #EFF6F2; }
      .overlay-maybe { background-color: #FFF9E6; }

      /* Visual stamps */
      .stamp {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.8);
        font-family: var(--font-sans);
        font-size: 32px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 2px;
        padding: 10px 24px;
        border-radius: 12px;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        transition: opacity 0.1s ease, transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.2);
      }
      .stamp-nope {
        color: #C84B31;
        border: 4px solid #C84B31;
        transform: translate(-50%, -50%) rotate(-15deg);
      }
      .stamp-yum {
        color: #2C5E43;
        border: 4px solid #2C5E43;
        transform: translate(-50%, -50%) rotate(15deg);
      }
      .stamp-maybe {
        color: #D9822B;
        border: 4px solid #D9822B;
        transform: translate(-50%, -50%) rotate(0deg);
      }

      /* Double tap heart pop */
      .double-tap-heart {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 80px;
        color: rgba(44, 94, 67, 0.9);
        pointer-events: none;
        z-index: 15;
      }
      .animate-heart {
        animation: heartPop 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.25) forwards;
      }
      @keyframes heartPop {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        25% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
        50% { transform: translate(-50%, -50%) scale(1.0); opacity: 1; }
        100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
      }

      /* Gradient vignette overlay */
      .vignette {
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%);
        pointer-events: none;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }

      /* Text Meta Overlay */
      .info-area {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 24px;
        color: #F8F5EF;
        cursor: pointer;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      .meal-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 24px;
        font-weight: 700;
        line-height: 1.2;
        margin-bottom: 8px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.4);
      }
      .tags-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        color: rgba(248, 245, 239, 0.85);
        text-shadow: 0 1px 2px rgba(0,0,0,0.4);
      }
      .tag-chip {
        background-color: rgba(255,255,255,0.12);
        padding: 2px 8px;
        border-radius: 4px;
        backdrop-filter: blur(4px);
      }
      .tag-dot {
        opacity: 0.5;
        font-size: 8px;
      }
    `,o=this._meal.imageAssetId||de(this._meal.id);this.shadowRoot.innerHTML=`
      <style>${r}</style>
      <div class="card-container ${this._active?"active":"inactive"}">
        <img class="food-image" src="${o}" alt="${this._meal.name}" />
        <div class="vignette"></div>
        
        <!-- Overlays -->
        <div class="overlay overlay-nope"></div>
        <div class="overlay overlay-yum"></div>
        <div class="overlay overlay-maybe"></div>
        
        <!-- Stamps -->
        <div class="stamp stamp-nope">Nope</div>
        <div class="stamp stamp-yum">Yum</div>
        <div class="stamp stamp-maybe">Maybe</div>
        
        <!-- Double Tap Heart -->
        <div class="double-tap-heart">💚</div>

        <!-- Meta Area -->
        <div class="info-area">
          <h2 class="meal-title">${this._meal.name}</h2>
          <div class="tags-row">
            ${n}
          </div>
        </div>
      </div>
    `;const i=this.shadowRoot.querySelector(".info-area");i&&i.addEventListener("click",s=>{s.stopPropagation(),this.dispatchEvent(new CustomEvent("card-click",{bubbles:!0,composed:!0,detail:{meal:this._meal}}))}),this.updateActiveState()}}customElements.define("meal-card",Gn);class Vn extends HTMLElement{constructor(){super();b(this,"_meals",[]);b(this,"cards",[]);this.attachShadow({mode:"open"}),this.handleCardDrag=this.handleCardDrag.bind(this),this.handleCardRelease=this.handleCardRelease.bind(this)}set meals(n){this._meals=n,this.render()}get meals(){return this._meals}connectedCallback(){this.addEventListener("card-drag",this.handleCardDrag),this.addEventListener("card-release",this.handleCardRelease),this.render()}disconnectedCallback(){this.removeEventListener("card-drag",this.handleCardDrag),this.removeEventListener("card-release",this.handleCardRelease)}handleCardDrag(n){var l,u,d,h;const{x:r,y:o}=n.detail,s=Math.min(Math.sqrt(r*r+o*o),150)/150,a=(u=(l=this.cards[1])==null?void 0:l.shadowRoot)==null?void 0:u.querySelector(".card-container"),c=(h=(d=this.cards[2])==null?void 0:d.shadowRoot)==null?void 0:h.querySelector(".card-container");if(a){const f=.97+.03*s,m=10-10*s;a.style.transform=`translate3d(0, ${m}px, 0) scale(${f})`,a.style.transition="none"}if(c){const f=.94+.03*s,m=20-10*s;c.style.transform=`translate3d(0, ${m}px, 0) scale(${f})`,c.style.transition="none"}}handleCardRelease(){var o,i,s,a;const n=(i=(o=this.cards[1])==null?void 0:o.shadowRoot)==null?void 0:i.querySelector(".card-container"),r=(a=(s=this.cards[2])==null?void 0:s.shadowRoot)==null?void 0:a.querySelector(".card-container");n&&(n.style.transition="transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25)",n.style.transform="translate3d(0, 10px, 0) scale(0.97)"),r&&(r.style.transition="transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.25)",r.style.transform="translate3d(0, 20px, 0) scale(0.94)")}render(){var i;this.shadowRoot.querySelector(".stack-container"),this.cards=[];const n=`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        position: relative;
      }
      .stack-container {
        width: 100%;
        height: 100%;
        position: relative;
      }
      .stack-card {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
      }
      .stack-card:nth-child(1) {
        z-index: 10;
      }
      .stack-card:nth-child(2) {
        z-index: 9;
      }
      .stack-card:nth-child(3) {
        z-index: 8;
      }
    `;this.shadowRoot.innerHTML=`
      <style>${n}</style>
      <div class="stack-container"></div>
    `;const r=this.shadowRoot.querySelector(".stack-container"),o=Math.min(this._meals.length,3);for(let s=0;s<o;s++){const a=document.createElement("meal-card");a.className="stack-card",a.meal=this._meals[s],a.active=s===0,r.appendChild(a),this.cards.push(a);const c=(i=a.shadowRoot)==null?void 0:i.querySelector(".card-container");c&&(s===1?c.style.transform="translate3d(0, 10px, 0) scale(0.97)":s===2&&(c.style.transform="translate3d(0, 20px, 0) scale(0.94)"))}this._meals.length===0&&(r.innerHTML=`
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); font-size: 16px; font-weight: 500; font-family: var(--font-sans);">
          <div style="font-size: 40px; margin-bottom: 12px;">🍽</div>
          Let's find more.
        </div>
      `)}}customElements.define("card-stack",Vn);const Xe=[{id:"vegetarian",label:"Vegetarian",type:"dietary",icon:"🌱"},{id:"vegan",label:"Vegan",type:"dietary",icon:"🟢"},{id:"gluten_free",label:"Gluten-Free",type:"dietary",icon:"🌾"},{id:"dairy_free",label:"Dairy-Free",type:"dietary",icon:"🥛"},{id:"soy_free",label:"Soy-Free",type:"dietary",icon:"🫘"},{id:"nut_free",label:"Nut-Free",type:"dietary",icon:"🥜"}],Qe=[{id:"seafood",label:"Seafood",type:"protein",icon:"🐟"},{id:"poultry",label:"Poultry",type:"protein",icon:"🍗"},{id:"red_meat",label:"Red Meat",type:"protein",icon:"🥩"},{id:"pork",label:"Pork",type:"protein",icon:"🥓"},{id:"shellfish",label:"Shellfish",type:"protein",icon:"🍤"},{id:"vegetarian_protein",label:"Vegetarian Protein",type:"protein",icon:"🥚"},{id:"plant_based",label:"Plant-Based",type:"protein",icon:"🌿"}],et=[{id:"plate",label:"Plated",type:"format",icon:"🍽"},{id:"bowl",label:"Bowl",type:"format",icon:"🥣"},{id:"handheld",label:"Handheld",type:"format",icon:"🌮"},{id:"pasta",label:"Pasta",type:"format",icon:"🍝"},{id:"sushi",label:"Sushi",type:"format",icon:"🍣"},{id:"skewers",label:"Skewers",type:"format",icon:"🍢"},{id:"soup",label:"Soup",type:"format",icon:"🍲"}],tt=[{id:"light",label:"Fresh & Light",type:"flavor",icon:"🍋"},{id:"garlic",label:"Garlic & Herb",type:"flavor",icon:"🧄"},{id:"savory",label:"Savory & Earthy",type:"flavor",icon:"🍄"},{id:"buttery",label:"Rich & Buttery",type:"flavor",icon:"🧈"},{id:"spicy",label:"Spicy",type:"flavor",icon:"🌶"},{id:"citrus",label:"Citrus",type:"flavor",icon:"🍊"},{id:"umami",label:"Umami",type:"flavor",icon:"🥢"}];class Jn extends HTMLElement{constructor(){super();b(this,"_preferenceSignals",[]);this.attachShadow({mode:"open"})}set preferenceSignals(n){this._preferenceSignals=n,this.render()}get preferenceSignals(){return this._preferenceSignals}connectedCallback(){this.render()}getSignalState(n){const o=this._preferenceSignals.filter(i=>i.scope==="persistent").find(i=>i.target.entityId===n);return o?o.sentiment==="yum"?"yum":"nope":"neutral"}async handleChipClick(n){const r=this.getSignalState(n.id),i=this._preferenceSignals.filter(s=>s.scope==="persistent").find(s=>s.target.entityId===n.id);if(r==="neutral"){const s={id:`sig-persistent-${n.id}-${Math.random().toString(36).substr(2,5)}`,userId:"partner-user",target:{entityType:n.type,entityId:n.id},sentiment:"yum",strength:1,scope:"persistent",source:"explicit-profile",confidence:1,createdAt:new Date().toISOString(),evidenceIds:[],reversible:!0};await Oe(s)}else if(r==="yum"){i&&await Ae(i.id);const s={id:`sig-persistent-${n.id}-${Math.random().toString(36).substr(2,5)}`,userId:"partner-user",target:{entityType:n.type,entityId:n.id},sentiment:"nope",strength:1,scope:"persistent",source:"explicit-profile",confidence:1,createdAt:new Date().toISOString(),evidenceIds:[],reversible:!0};await Oe(s)}else i&&await Ae(i.id);this.dispatchEvent(new CustomEvent("preferences-updated",{bubbles:!0,composed:!0}))}renderChipsSection(n,r){const o=r.map(i=>{const s=this.getSignalState(i.id);let a="neutral",c="";return s==="yum"?(a="yum",c="💚"):s==="nope"&&(a="nope",c="🚫"),`
        <button class="chip ${a}" data-id="${i.id}">
          <span class="chip-emoji">${i.icon||""}</span>
          <span class="chip-label">${i.label}</span>
          ${c?`<span class="chip-status">${c}</span>`:""}
        </button>
      `}).join("");return`
      <div class="section-container">
        <h4 class="section-title">${n}</h4>
        <div class="chips-grid">
          ${o}
        </div>
      </div>
    `}render(){const n=`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .profile-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #F8F5EF;
      }
      
      /* Header */
      .header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid rgba(30, 32, 30, 0.08);
      }
      .header-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 20px;
        font-weight: 700;
        color: #2C5E43;
      }
      .close-button {
        background: none;
        border: none;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
        color: #1E201E;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .close-button:active {
        background-color: rgba(0,0,0,0.05);
      }

      /* Content Scroll Area */
      .content-scroll {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        -webkit-overflow-scrolling: touch;
      }

      .section-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .section-title {
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #5A5D5A;
      }
      .chips-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      /* Toggle Chips styling */
      .chip {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        border-radius: 20px;
        border: 1px solid rgba(30, 32, 30, 0.1);
        background-color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        font-weight: 500;
        color: #1E201E;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .chip:active {
        transform: scale(0.96);
      }
      .chip.neutral {
        border-color: rgba(30, 32, 30, 0.1);
      }
      .chip.yum {
        background-color: rgba(44, 94, 67, 0.08);
        border-color: #2C5E43;
        color: #2C5E43;
        font-weight: 600;
      }
      .chip.nope {
        background-color: rgba(200, 75, 49, 0.06);
        border-color: #C84B31;
        color: #C84B31;
        font-weight: 600;
      }
      .chip-emoji {
        font-size: 14px;
      }
      .chip-status {
        margin-left: 2px;
        font-size: 11px;
      }

      /* Footer / Actions */
      .footer-actions {
        padding: 16px 20px;
        border-top: 1px solid rgba(30, 32, 30, 0.08);
        display: flex;
        flex-direction: column;
        gap: 12px;
        background-color: #FFFFFF;
      }
      .regen-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 14px;
        border-radius: 14px;
        border: none;
        background-color: #2C5E43;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .regen-button:active {
        transform: scale(0.98);
        background-color: #204531;
      }
      .regen-icon {
        width: 16px;
        height: 16px;
      }
    `;this.shadowRoot.innerHTML=`
      <style>${n}</style>
      <div class="profile-wrapper">
        <div class="header-bar">
          <h3 class="header-title">Personal Settings</h3>
          <button class="close-button" id="btn-close">
            <i data-lucide="x"></i>
          </button>
        </div>

        <div class="content-scroll">
          <div style="background-color: #FFFFFF; border-radius: 16px; padding: 16px; border: 1px dashed rgba(44, 94, 67, 0.2); font-size: 12px; line-height: 1.5; color: #5A5D5A;">
            💡 Tap chips to cycle between <strong style="color:#2C5E43">Preferred 💚</strong>, <strong style="color:#C84B31">Avoided 🚫</strong>, and <strong>Neutral</strong> states. Avoided dietary flags will never be generated.
          </div>

          ${this.renderChipsSection("Dietary Filters",Xe)}
          ${this.renderChipsSection("Proteins",Qe)}
          ${this.renderChipsSection("Formats",et)}
          ${this.renderChipsSection("Flavors",tt)}
        </div>

        <div class="footer-actions">
          <button class="regen-button" id="btn-regen">
            <i data-lucide="rotate-ccw" class="regen-icon"></i>
            Regenerate Meal Catalog
          </button>
        </div>
      </div>
    `,ge({icons:{X:In,RotateCcw:_n},nameAttr:"data-lucide",root:this.shadowRoot});const r=this.shadowRoot.querySelector("#btn-close");r&&r.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("profile-close",{bubbles:!0,composed:!0}))});const o=this.shadowRoot.querySelector("#btn-regen");o&&o.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("regenerate-catalog",{bubbles:!0,composed:!0}))}),this.shadowRoot.querySelectorAll(".chip").forEach(s=>{s.addEventListener("click",async a=>{const c=a.currentTarget.getAttribute("data-id"),l=[...Xe,...Qe,...et,...tt].find(u=>u.id===c);await this.handleChipClick(l)})})}}customElements.define("user-profile-view",Jn);var nt;function p(e,t,n){function r(a,c){if(a._zod||Object.defineProperty(a,"_zod",{value:{def:c,constr:s,traits:new Set},enumerable:!1}),a._zod.traits.has(e))return;a._zod.traits.add(e),t(a,c);const l=s.prototype,u=Object.keys(l);for(let d=0;d<u.length;d++){const h=u[d];h in a||(a[h]=l[h].bind(a))}}const o=(n==null?void 0:n.Parent)??Object;class i extends o{}Object.defineProperty(i,"name",{value:e});function s(a){var c;const l=n!=null&&n.Parent?new i:this;r(l,a),(c=l._zod).deferred??(c.deferred=[]);for(const u of l._zod.deferred)u();return l}return Object.defineProperty(s,"init",{value:r}),Object.defineProperty(s,Symbol.hasInstance,{value:a=>{var c,l;return n!=null&&n.Parent&&a instanceof n.Parent?!0:(l=(c=a==null?void 0:a._zod)==null?void 0:c.traits)==null?void 0:l.has(e)}}),Object.defineProperty(s,"name",{value:e}),s}class ee extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}class Ot extends Error{constructor(t){super(`Encountered unidirectional transform during encode: ${t}`),this.name="ZodEncodeError"}}(nt=globalThis).__zod_globalConfig??(nt.__zod_globalConfig={});const Fe=globalThis.__zod_globalConfig;function q(e){return Fe}function At(e){const t=Object.values(e).filter(r=>typeof r=="number");return Object.entries(e).filter(([r,o])=>t.indexOf(+r)===-1).map(([r,o])=>o)}function Me(e,t){return typeof t=="bigint"?t.toString():t}function Ne(e){return{get value(){{const t=e();return Object.defineProperty(this,"value",{value:t}),t}}}}function De(e){return e==null}function Le(e){const t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}function Yn(e,t){const n=e/t,r=Math.round(n),o=Number.EPSILON*Math.max(Math.abs(n),1);return Math.abs(n-r)<o?0:n-r}const rt=Symbol("evaluating");function w(e,t,n){let r;Object.defineProperty(e,t,{get(){if(r!==rt)return r===void 0&&(r=rt,r=n()),r},set(o){Object.defineProperty(e,t,{value:o})},configurable:!0})}function Y(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function B(...e){const t={};for(const n of e){const r=Object.getOwnPropertyDescriptors(n);Object.assign(t,r)}return Object.defineProperties({},t)}function ot(e){return JSON.stringify(e)}function Hn(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}const Mt="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function pe(e){return typeof e=="object"&&e!==null&&!Array.isArray(e)}const Wn=Ne(()=>{var e;if(Fe.jitless||typeof navigator<"u"&&((e=navigator==null?void 0:navigator.userAgent)!=null&&e.includes("Cloudflare")))return!1;try{const t=Function;return new t(""),!0}catch{return!1}});function te(e){if(pe(e)===!1)return!1;const t=e.constructor;if(t===void 0||typeof t!="function")return!0;const n=t.prototype;return!(pe(n)===!1||Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)}function Rt(e){return te(e)?{...e}:Array.isArray(e)?[...e]:e instanceof Map?new Map(e):e instanceof Set?new Set(e):e}const Kn=new Set(["string","number","symbol"]);function ne(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function G(e,t,n){const r=new e._zod.constr(t??e._zod.def);return(!t||n!=null&&n.parent)&&(r._zod.parent=e),r}function g(e){const t=e;if(!t)return{};if(typeof t=="string")return{error:()=>t};if((t==null?void 0:t.message)!==void 0){if((t==null?void 0:t.error)!==void 0)throw new Error("Cannot specify both `message` and `error` params");t.error=t.message}return delete t.message,typeof t.error=="string"?{...t,error:()=>t.error}:t}function Xn(e){return Object.keys(e).filter(t=>e[t]._zod.optin==="optional"&&e[t]._zod.optout==="optional")}const Qn={safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-34028234663852886e22,34028234663852886e22],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]};function er(e,t){const n=e._zod.def,r=n.checks;if(r&&r.length>0)throw new Error(".pick() cannot be used on object schemas containing refinements");const i=B(e._zod.def,{get shape(){const s={};for(const a in t){if(!(a in n.shape))throw new Error(`Unrecognized key: "${a}"`);t[a]&&(s[a]=n.shape[a])}return Y(this,"shape",s),s},checks:[]});return G(e,i)}function tr(e,t){const n=e._zod.def,r=n.checks;if(r&&r.length>0)throw new Error(".omit() cannot be used on object schemas containing refinements");const i=B(e._zod.def,{get shape(){const s={...e._zod.def.shape};for(const a in t){if(!(a in n.shape))throw new Error(`Unrecognized key: "${a}"`);t[a]&&delete s[a]}return Y(this,"shape",s),s},checks:[]});return G(e,i)}function nr(e,t){if(!te(t))throw new Error("Invalid input to extend: expected a plain object");const n=e._zod.def.checks;if(n&&n.length>0){const i=e._zod.def.shape;for(const s in t)if(Object.getOwnPropertyDescriptor(i,s)!==void 0)throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}const o=B(e._zod.def,{get shape(){const i={...e._zod.def.shape,...t};return Y(this,"shape",i),i}});return G(e,o)}function rr(e,t){if(!te(t))throw new Error("Invalid input to safeExtend: expected a plain object");const n=B(e._zod.def,{get shape(){const r={...e._zod.def.shape,...t};return Y(this,"shape",r),r}});return G(e,n)}function or(e,t){var r;if((r=e._zod.def.checks)!=null&&r.length)throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");const n=B(e._zod.def,{get shape(){const o={...e._zod.def.shape,...t._zod.def.shape};return Y(this,"shape",o),o},get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]});return G(e,n)}function ir(e,t,n){const o=t._zod.def.checks;if(o&&o.length>0)throw new Error(".partial() cannot be used on object schemas containing refinements");const s=B(t._zod.def,{get shape(){const a=t._zod.def.shape,c={...a};if(n)for(const l in n){if(!(l in a))throw new Error(`Unrecognized key: "${l}"`);n[l]&&(c[l]=e?new e({type:"optional",innerType:a[l]}):a[l])}else for(const l in a)c[l]=e?new e({type:"optional",innerType:a[l]}):a[l];return Y(this,"shape",c),c},checks:[]});return G(t,s)}function sr(e,t,n){const r=B(t._zod.def,{get shape(){const o=t._zod.def.shape,i={...o};if(n)for(const s in n){if(!(s in i))throw new Error(`Unrecognized key: "${s}"`);n[s]&&(i[s]=new e({type:"nonoptional",innerType:o[s]}))}else for(const s in o)i[s]=new e({type:"nonoptional",innerType:o[s]});return Y(this,"shape",i),i}});return G(t,r)}function X(e,t=0){var n;if(e.aborted===!0)return!0;for(let r=t;r<e.issues.length;r++)if(((n=e.issues[r])==null?void 0:n.continue)!==!0)return!0;return!1}function ar(e,t=0){var n;if(e.aborted===!0)return!0;for(let r=t;r<e.issues.length;r++)if(((n=e.issues[r])==null?void 0:n.continue)===!1)return!0;return!1}function Q(e,t){return t.map(n=>{var r;return(r=n).path??(r.path=[]),n.path.unshift(e),n})}function ce(e){return typeof e=="string"?e:e==null?void 0:e.message}function U(e,t,n){var c,l,u,d,h,f;const r=e.message?e.message:ce((u=(l=(c=e.inst)==null?void 0:c._zod.def)==null?void 0:l.error)==null?void 0:u.call(l,e))??ce((d=t==null?void 0:t.error)==null?void 0:d.call(t,e))??ce((h=n.customError)==null?void 0:h.call(n,e))??ce((f=n.localeError)==null?void 0:f.call(n,e))??"Invalid input",{inst:o,continue:i,input:s,...a}=e;return a.path??(a.path=[]),a.message=r,t!=null&&t.reportInput&&(a.input=s),a}function je(e){return Array.isArray(e)?"array":typeof e=="string"?"string":"unknown"}function se(...e){const[t,n,r]=e;return typeof t=="string"?{message:t,code:"custom",input:n,inst:r}:{...t}}const Ct=(e,t)=>{e.name="$ZodError",Object.defineProperty(e,"_zod",{value:e._zod,enumerable:!1}),Object.defineProperty(e,"issues",{value:t,enumerable:!1}),e.message=JSON.stringify(t,Me,2),Object.defineProperty(e,"toString",{value:()=>e.message,enumerable:!1})},Zt=p("$ZodError",Ct),Ft=p("$ZodError",Ct,{Parent:Error});function cr(e,t=n=>n.message){const n={},r=[];for(const o of e.issues)o.path.length>0?(n[o.path[0]]=n[o.path[0]]||[],n[o.path[0]].push(t(o))):r.push(t(o));return{formErrors:r,fieldErrors:n}}function lr(e,t=n=>n.message){const n={_errors:[]},r=(o,i=[])=>{for(const s of o.issues)if(s.code==="invalid_union"&&s.errors.length)s.errors.map(a=>r({issues:a},[...i,...s.path]));else if(s.code==="invalid_key")r({issues:s.issues},[...i,...s.path]);else if(s.code==="invalid_element")r({issues:s.issues},[...i,...s.path]);else{const a=[...i,...s.path];if(a.length===0)n._errors.push(t(s));else{let c=n,l=0;for(;l<a.length;){const u=a[l];l===a.length-1?(c[u]=c[u]||{_errors:[]},c[u]._errors.push(t(s))):c[u]=c[u]||{_errors:[]},c=c[u],l++}}}};return r(e),n}const qe=e=>(t,n,r,o)=>{const i=r?{...r,async:!1}:{async:!1},s=t._zod.run({value:n,issues:[]},i);if(s instanceof Promise)throw new ee;if(s.issues.length){const a=new((o==null?void 0:o.Err)??e)(s.issues.map(c=>U(c,i,q())));throw Mt(a,o==null?void 0:o.callee),a}return s.value},Ue=e=>async(t,n,r,o)=>{const i=r?{...r,async:!0}:{async:!0};let s=t._zod.run({value:n,issues:[]},i);if(s instanceof Promise&&(s=await s),s.issues.length){const a=new((o==null?void 0:o.Err)??e)(s.issues.map(c=>U(c,i,q())));throw Mt(a,o==null?void 0:o.callee),a}return s.value},be=e=>(t,n,r)=>{const o=r?{...r,async:!1}:{async:!1},i=t._zod.run({value:n,issues:[]},o);if(i instanceof Promise)throw new ee;return i.issues.length?{success:!1,error:new(e??Zt)(i.issues.map(s=>U(s,o,q())))}:{success:!0,data:i.value}},ur=be(Ft),ve=e=>async(t,n,r)=>{const o=r?{...r,async:!0}:{async:!0};let i=t._zod.run({value:n,issues:[]},o);return i instanceof Promise&&(i=await i),i.issues.length?{success:!1,error:new e(i.issues.map(s=>U(s,o,q())))}:{success:!0,data:i.value}},dr=ve(Ft),pr=e=>(t,n,r)=>{const o=r?{...r,direction:"backward"}:{direction:"backward"};return qe(e)(t,n,o)},hr=e=>(t,n,r)=>qe(e)(t,n,r),fr=e=>async(t,n,r)=>{const o=r?{...r,direction:"backward"}:{direction:"backward"};return Ue(e)(t,n,o)},mr=e=>async(t,n,r)=>Ue(e)(t,n,r),gr=e=>(t,n,r)=>{const o=r?{...r,direction:"backward"}:{direction:"backward"};return be(e)(t,n,o)},yr=e=>(t,n,r)=>be(e)(t,n,r),br=e=>async(t,n,r)=>{const o=r?{...r,direction:"backward"}:{direction:"backward"};return ve(e)(t,n,o)},vr=e=>async(t,n,r)=>ve(e)(t,n,r),wr=/^[cC][0-9a-z]{6,}$/,_r=/^[0-9a-z]+$/,kr=/^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/,Sr=/^[0-9a-vA-V]{20}$/,xr=/^[A-Za-z0-9]{27}$/,zr=/^[a-zA-Z0-9_-]{21}$/,Ir=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/,$r=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,it=e=>e?new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`):/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/,Er=/^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/,Tr="^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";function Pr(){return new RegExp(Tr,"u")}const Or=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Ar=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/,Mr=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Rr=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Cr=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Nt=/^[A-Za-z0-9_-]*$/,Zr=/^https?$/,Fr=/^\+[1-9]\d{6,14}$/,Dt="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))",Nr=new RegExp(`^${Dt}$`);function Lt(e){const t="(?:[01]\\d|2[0-3]):[0-5]\\d";return typeof e.precision=="number"?e.precision===-1?`${t}`:e.precision===0?`${t}:[0-5]\\d`:`${t}:[0-5]\\d\\.\\d{${e.precision}}`:`${t}(?::[0-5]\\d(?:\\.\\d+)?)?`}function Dr(e){return new RegExp(`^${Lt(e)}$`)}function Lr(e){const t=Lt({precision:e.precision}),n=["Z"];e.local&&n.push(""),e.offset&&n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");const r=`${t}(?:${n.join("|")})`;return new RegExp(`^${Dt}T(?:${r})$`)}const jr=e=>{const t=e?`[\\s\\S]{${(e==null?void 0:e.minimum)??0},${(e==null?void 0:e.maximum)??""}}`:"[\\s\\S]*";return new RegExp(`^${t}$`)},qr=/^-?\d+$/,jt=/^-?\d+(?:\.\d+)?$/,Ur=/^(?:true|false)$/i,Br=/^[^A-Z]*$/,Gr=/^[^a-z]*$/,F=p("$ZodCheck",(e,t)=>{var n;e._zod??(e._zod={}),e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])}),qt={number:"number",bigint:"bigint",object:"date"},Ut=p("$ZodCheckLessThan",(e,t)=>{F.init(e,t);const n=qt[typeof t.value];e._zod.onattach.push(r=>{const o=r._zod.bag,i=(t.inclusive?o.maximum:o.exclusiveMaximum)??Number.POSITIVE_INFINITY;t.value<i&&(t.inclusive?o.maximum=t.value:o.exclusiveMaximum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value<=t.value:r.value<t.value)||r.issues.push({origin:n,code:"too_big",maximum:typeof t.value=="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Bt=p("$ZodCheckGreaterThan",(e,t)=>{F.init(e,t);const n=qt[typeof t.value];e._zod.onattach.push(r=>{const o=r._zod.bag,i=(t.inclusive?o.minimum:o.exclusiveMinimum)??Number.NEGATIVE_INFINITY;t.value>i&&(t.inclusive?o.minimum=t.value:o.exclusiveMinimum=t.value)}),e._zod.check=r=>{(t.inclusive?r.value>=t.value:r.value>t.value)||r.issues.push({origin:n,code:"too_small",minimum:typeof t.value=="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Vr=p("$ZodCheckMultipleOf",(e,t)=>{F.init(e,t),e._zod.onattach.push(n=>{var r;(r=n._zod.bag).multipleOf??(r.multipleOf=t.value)}),e._zod.check=n=>{if(typeof n.value!=typeof t.value)throw new Error("Cannot mix number and bigint in multiple_of check.");(typeof n.value=="bigint"?n.value%t.value===BigInt(0):Yn(n.value,t.value)===0)||n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),Jr=p("$ZodCheckNumberFormat",(e,t)=>{var s;F.init(e,t),t.format=t.format||"float64";const n=(s=t.format)==null?void 0:s.includes("int"),r=n?"int":"number",[o,i]=Qn[t.format];e._zod.onattach.push(a=>{const c=a._zod.bag;c.format=t.format,c.minimum=o,c.maximum=i,n&&(c.pattern=qr)}),e._zod.check=a=>{const c=a.value;if(n){if(!Number.isInteger(c)){a.issues.push({expected:r,format:t.format,code:"invalid_type",continue:!1,input:c,inst:e});return}if(!Number.isSafeInteger(c)){c>0?a.issues.push({input:c,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort}):a.issues.push({input:c,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}c<o&&a.issues.push({origin:"number",input:c,code:"too_small",minimum:o,inclusive:!0,inst:e,continue:!t.abort}),c>i&&a.issues.push({origin:"number",input:c,code:"too_big",maximum:i,inclusive:!0,inst:e,continue:!t.abort})}}),Yr=p("$ZodCheckMaxLength",(e,t)=>{var n;F.init(e,t),(n=e._zod.def).when??(n.when=r=>{const o=r.value;return!De(o)&&o.length!==void 0}),e._zod.onattach.push(r=>{const o=r._zod.bag.maximum??Number.POSITIVE_INFINITY;t.maximum<o&&(r._zod.bag.maximum=t.maximum)}),e._zod.check=r=>{const o=r.value;if(o.length<=t.maximum)return;const s=je(o);r.issues.push({origin:s,code:"too_big",maximum:t.maximum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),Hr=p("$ZodCheckMinLength",(e,t)=>{var n;F.init(e,t),(n=e._zod.def).when??(n.when=r=>{const o=r.value;return!De(o)&&o.length!==void 0}),e._zod.onattach.push(r=>{const o=r._zod.bag.minimum??Number.NEGATIVE_INFINITY;t.minimum>o&&(r._zod.bag.minimum=t.minimum)}),e._zod.check=r=>{const o=r.value;if(o.length>=t.minimum)return;const s=je(o);r.issues.push({origin:s,code:"too_small",minimum:t.minimum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),Wr=p("$ZodCheckLengthEquals",(e,t)=>{var n;F.init(e,t),(n=e._zod.def).when??(n.when=r=>{const o=r.value;return!De(o)&&o.length!==void 0}),e._zod.onattach.push(r=>{const o=r._zod.bag;o.minimum=t.length,o.maximum=t.length,o.length=t.length}),e._zod.check=r=>{const o=r.value,i=o.length;if(i===t.length)return;const s=je(o),a=i>t.length;r.issues.push({origin:s,...a?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:r.value,inst:e,continue:!t.abort})}}),we=p("$ZodCheckStringFormat",(e,t)=>{var n,r;F.init(e,t),e._zod.onattach.push(o=>{const i=o._zod.bag;i.format=t.format,t.pattern&&(i.patterns??(i.patterns=new Set),i.patterns.add(t.pattern))}),t.pattern?(n=e._zod).check??(n.check=o=>{t.pattern.lastIndex=0,!t.pattern.test(o.value)&&o.issues.push({origin:"string",code:"invalid_format",format:t.format,input:o.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})}):(r=e._zod).check??(r.check=()=>{})}),Kr=p("$ZodCheckRegex",(e,t)=>{we.init(e,t),e._zod.check=n=>{t.pattern.lastIndex=0,!t.pattern.test(n.value)&&n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),Xr=p("$ZodCheckLowerCase",(e,t)=>{t.pattern??(t.pattern=Br),we.init(e,t)}),Qr=p("$ZodCheckUpperCase",(e,t)=>{t.pattern??(t.pattern=Gr),we.init(e,t)}),eo=p("$ZodCheckIncludes",(e,t)=>{F.init(e,t);const n=ne(t.includes),r=new RegExp(typeof t.position=="number"?`^.{${t.position}}${n}`:n);t.pattern=r,e._zod.onattach.push(o=>{const i=o._zod.bag;i.patterns??(i.patterns=new Set),i.patterns.add(r)}),e._zod.check=o=>{o.value.includes(t.includes,t.position)||o.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:t.includes,input:o.value,inst:e,continue:!t.abort})}}),to=p("$ZodCheckStartsWith",(e,t)=>{F.init(e,t);const n=new RegExp(`^${ne(t.prefix)}.*`);t.pattern??(t.pattern=n),e._zod.onattach.push(r=>{const o=r._zod.bag;o.patterns??(o.patterns=new Set),o.patterns.add(n)}),e._zod.check=r=>{r.value.startsWith(t.prefix)||r.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:t.prefix,input:r.value,inst:e,continue:!t.abort})}}),no=p("$ZodCheckEndsWith",(e,t)=>{F.init(e,t);const n=new RegExp(`.*${ne(t.suffix)}$`);t.pattern??(t.pattern=n),e._zod.onattach.push(r=>{const o=r._zod.bag;o.patterns??(o.patterns=new Set),o.patterns.add(n)}),e._zod.check=r=>{r.value.endsWith(t.suffix)||r.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:t.suffix,input:r.value,inst:e,continue:!t.abort})}}),ro=p("$ZodCheckOverwrite",(e,t)=>{F.init(e,t),e._zod.check=n=>{n.value=t.tx(n.value)}});class oo{constructor(t=[]){this.content=[],this.indent=0,this&&(this.args=t)}indented(t){this.indent+=1,t(this),this.indent-=1}write(t){if(typeof t=="function"){t(this,{execution:"sync"}),t(this,{execution:"async"});return}const r=t.split(`
`).filter(s=>s),o=Math.min(...r.map(s=>s.length-s.trimStart().length)),i=r.map(s=>s.slice(o)).map(s=>" ".repeat(this.indent*2)+s);for(const s of i)this.content.push(s)}compile(){const t=Function,n=this==null?void 0:this.args,o=[...((this==null?void 0:this.content)??[""]).map(i=>`  ${i}`)];return new t(...n,o.join(`
`))}}const io={major:4,minor:4,patch:3},x=p("$ZodType",(e,t)=>{var o;var n;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=io;const r=[...e._zod.def.checks??[]];e._zod.traits.has("$ZodCheck")&&r.unshift(e);for(const i of r)for(const s of i._zod.onattach)s(e);if(r.length===0)(n=e._zod).deferred??(n.deferred=[]),(o=e._zod.deferred)==null||o.push(()=>{e._zod.run=e._zod.parse});else{const i=(a,c,l)=>{let u=X(a),d;for(const h of c){if(h._zod.def.when){if(ar(a)||!h._zod.def.when(a))continue}else if(u)continue;const f=a.issues.length,m=h._zod.check(a);if(m instanceof Promise&&(l==null?void 0:l.async)===!1)throw new ee;if(d||m instanceof Promise)d=(d??Promise.resolve()).then(async()=>{await m,a.issues.length!==f&&(u||(u=X(a,f)))});else{if(a.issues.length===f)continue;u||(u=X(a,f))}}return d?d.then(()=>a):a},s=(a,c,l)=>{if(X(a))return a.aborted=!0,a;const u=i(c,r,l);if(u instanceof Promise){if(l.async===!1)throw new ee;return u.then(d=>e._zod.parse(d,l))}return e._zod.parse(u,l)};e._zod.run=(a,c)=>{if(c.skipChecks)return e._zod.parse(a,c);if(c.direction==="backward"){const u=e._zod.parse({value:a.value,issues:[]},{...c,skipChecks:!0});return u instanceof Promise?u.then(d=>s(d,a,c)):s(u,a,c)}const l=e._zod.parse(a,c);if(l instanceof Promise){if(c.async===!1)throw new ee;return l.then(u=>i(u,r,c))}return i(l,r,c)}}w(e,"~standard",()=>({validate:i=>{var s;try{const a=ur(e,i);return a.success?{value:a.data}:{issues:(s=a.error)==null?void 0:s.issues}}catch{return dr(e,i).then(c=>{var l;return c.success?{value:c.data}:{issues:(l=c.error)==null?void 0:l.issues}})}},vendor:"zod",version:1}))}),Be=p("$ZodString",(e,t)=>{var n;x.init(e,t),e._zod.pattern=[...((n=e==null?void 0:e._zod.bag)==null?void 0:n.patterns)??[]].pop()??jr(e._zod.bag),e._zod.parse=(r,o)=>{if(t.coerce)try{r.value=String(r.value)}catch{}return typeof r.value=="string"||r.issues.push({expected:"string",code:"invalid_type",input:r.value,inst:e}),r}}),k=p("$ZodStringFormat",(e,t)=>{we.init(e,t),Be.init(e,t)}),so=p("$ZodGUID",(e,t)=>{t.pattern??(t.pattern=$r),k.init(e,t)}),ao=p("$ZodUUID",(e,t)=>{if(t.version){const r={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(r===void 0)throw new Error(`Invalid UUID version: "${t.version}"`);t.pattern??(t.pattern=it(r))}else t.pattern??(t.pattern=it());k.init(e,t)}),co=p("$ZodEmail",(e,t)=>{t.pattern??(t.pattern=Er),k.init(e,t)}),lo=p("$ZodURL",(e,t)=>{k.init(e,t),e._zod.check=n=>{var r;try{const o=n.value.trim();if(!t.normalize&&((r=t.protocol)==null?void 0:r.source)===Zr.source&&!/^https?:\/\//i.test(o)){n.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:n.value,inst:e,continue:!t.abort});return}const i=new URL(o);t.hostname&&(t.hostname.lastIndex=0,t.hostname.test(i.hostname)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:t.hostname.source,input:n.value,inst:e,continue:!t.abort})),t.protocol&&(t.protocol.lastIndex=0,t.protocol.test(i.protocol.endsWith(":")?i.protocol.slice(0,-1):i.protocol)||n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort})),t.normalize?n.value=i.href:n.value=o;return}catch{n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort})}}}),uo=p("$ZodEmoji",(e,t)=>{t.pattern??(t.pattern=Pr()),k.init(e,t)}),po=p("$ZodNanoID",(e,t)=>{t.pattern??(t.pattern=zr),k.init(e,t)}),ho=p("$ZodCUID",(e,t)=>{t.pattern??(t.pattern=wr),k.init(e,t)}),fo=p("$ZodCUID2",(e,t)=>{t.pattern??(t.pattern=_r),k.init(e,t)}),mo=p("$ZodULID",(e,t)=>{t.pattern??(t.pattern=kr),k.init(e,t)}),go=p("$ZodXID",(e,t)=>{t.pattern??(t.pattern=Sr),k.init(e,t)}),yo=p("$ZodKSUID",(e,t)=>{t.pattern??(t.pattern=xr),k.init(e,t)}),bo=p("$ZodISODateTime",(e,t)=>{t.pattern??(t.pattern=Lr(t)),k.init(e,t)}),vo=p("$ZodISODate",(e,t)=>{t.pattern??(t.pattern=Nr),k.init(e,t)}),wo=p("$ZodISOTime",(e,t)=>{t.pattern??(t.pattern=Dr(t)),k.init(e,t)}),_o=p("$ZodISODuration",(e,t)=>{t.pattern??(t.pattern=Ir),k.init(e,t)}),ko=p("$ZodIPv4",(e,t)=>{t.pattern??(t.pattern=Or),k.init(e,t),e._zod.bag.format="ipv4"}),So=p("$ZodIPv6",(e,t)=>{t.pattern??(t.pattern=Ar),k.init(e,t),e._zod.bag.format="ipv6",e._zod.check=n=>{try{new URL(`http://[${n.value}]`)}catch{n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:e,continue:!t.abort})}}}),xo=p("$ZodCIDRv4",(e,t)=>{t.pattern??(t.pattern=Mr),k.init(e,t)}),zo=p("$ZodCIDRv6",(e,t)=>{t.pattern??(t.pattern=Rr),k.init(e,t),e._zod.check=n=>{const r=n.value.split("/");try{if(r.length!==2)throw new Error;const[o,i]=r;if(!i)throw new Error;const s=Number(i);if(`${s}`!==i)throw new Error;if(s<0||s>128)throw new Error;new URL(`http://[${o}]`)}catch{n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:e,continue:!t.abort})}}});function Gt(e){if(e==="")return!0;if(/\s/.test(e)||e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}const Io=p("$ZodBase64",(e,t)=>{t.pattern??(t.pattern=Cr),k.init(e,t),e._zod.bag.contentEncoding="base64",e._zod.check=n=>{Gt(n.value)||n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:e,continue:!t.abort})}});function $o(e){if(!Nt.test(e))return!1;const t=e.replace(/[-_]/g,r=>r==="-"?"+":"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return Gt(n)}const Eo=p("$ZodBase64URL",(e,t)=>{t.pattern??(t.pattern=Nt),k.init(e,t),e._zod.bag.contentEncoding="base64url",e._zod.check=n=>{$o(n.value)||n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:e,continue:!t.abort})}}),To=p("$ZodE164",(e,t)=>{t.pattern??(t.pattern=Fr),k.init(e,t)});function Po(e,t=null){try{const n=e.split(".");if(n.length!==3)return!1;const[r]=n;if(!r)return!1;const o=JSON.parse(atob(r));return!("typ"in o&&(o==null?void 0:o.typ)!=="JWT"||!o.alg||t&&(!("alg"in o)||o.alg!==t))}catch{return!1}}const Oo=p("$ZodJWT",(e,t)=>{k.init(e,t),e._zod.check=n=>{Po(n.value,t.alg)||n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:e,continue:!t.abort})}}),Vt=p("$ZodNumber",(e,t)=>{x.init(e,t),e._zod.pattern=e._zod.bag.pattern??jt,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch{}const o=n.value;if(typeof o=="number"&&!Number.isNaN(o)&&Number.isFinite(o))return n;const i=typeof o=="number"?Number.isNaN(o)?"NaN":Number.isFinite(o)?void 0:"Infinity":void 0;return n.issues.push({expected:"number",code:"invalid_type",input:o,inst:e,...i?{received:i}:{}}),n}}),Ao=p("$ZodNumberFormat",(e,t)=>{Jr.init(e,t),Vt.init(e,t)}),Mo=p("$ZodBoolean",(e,t)=>{x.init(e,t),e._zod.pattern=Ur,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=!!n.value}catch{}const o=n.value;return typeof o=="boolean"||n.issues.push({expected:"boolean",code:"invalid_type",input:o,inst:e}),n}}),Ro=p("$ZodUnknown",(e,t)=>{x.init(e,t),e._zod.parse=n=>n}),Co=p("$ZodNever",(e,t)=>{x.init(e,t),e._zod.parse=(n,r)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:e}),n)});function st(e,t,n){e.issues.length&&t.issues.push(...Q(n,e.issues)),t.value[n]=e.value}const Zo=p("$ZodArray",(e,t)=>{x.init(e,t),e._zod.parse=(n,r)=>{const o=n.value;if(!Array.isArray(o))return n.issues.push({expected:"array",code:"invalid_type",input:o,inst:e}),n;n.value=Array(o.length);const i=[];for(let s=0;s<o.length;s++){const a=o[s],c=t.element._zod.run({value:a,issues:[]},r);c instanceof Promise?i.push(c.then(l=>st(l,n,s))):st(c,n,s)}return i.length?Promise.all(i).then(()=>n):n}});function he(e,t,n,r,o,i){const s=n in r;if(e.issues.length){if(o&&i&&!s)return;t.issues.push(...Q(n,e.issues))}if(!s&&!o){e.issues.length||t.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[n]});return}e.value===void 0?s&&(t.value[n]=void 0):t.value[n]=e.value}function Jt(e){var r,o,i,s;const t=Object.keys(e.shape);for(const a of t)if(!((s=(i=(o=(r=e.shape)==null?void 0:r[a])==null?void 0:o._zod)==null?void 0:i.traits)!=null&&s.has("$ZodType")))throw new Error(`Invalid element at key "${a}": expected a Zod schema`);const n=Xn(e.shape);return{...e,keys:t,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(n)}}function Yt(e,t,n,r,o,i){const s=[],a=o.keySet,c=o.catchall._zod,l=c.def.type,u=c.optin==="optional",d=c.optout==="optional";for(const h in t){if(h==="__proto__"||a.has(h))continue;if(l==="never"){s.push(h);continue}const f=c.run({value:t[h],issues:[]},r);f instanceof Promise?e.push(f.then(m=>he(m,n,h,t,u,d))):he(f,n,h,t,u,d)}return s.length&&n.issues.push({code:"unrecognized_keys",keys:s,input:t,inst:i}),e.length?Promise.all(e).then(()=>n):n}const Fo=p("$ZodObject",(e,t)=>{x.init(e,t);const n=Object.getOwnPropertyDescriptor(t,"shape");if(!(n!=null&&n.get)){const a=t.shape;Object.defineProperty(t,"shape",{get:()=>{const c={...a};return Object.defineProperty(t,"shape",{value:c}),c}})}const r=Ne(()=>Jt(t));w(e._zod,"propValues",()=>{const a=t.shape,c={};for(const l in a){const u=a[l]._zod;if(u.values){c[l]??(c[l]=new Set);for(const d of u.values)c[l].add(d)}}return c});const o=pe,i=t.catchall;let s;e._zod.parse=(a,c)=>{s??(s=r.value);const l=a.value;if(!o(l))return a.issues.push({expected:"object",code:"invalid_type",input:l,inst:e}),a;a.value={};const u=[],d=s.shape;for(const h of s.keys){const f=d[h],m=f._zod.optin==="optional",v=f._zod.optout==="optional",_=f._zod.run({value:l[h],issues:[]},c);_ instanceof Promise?u.push(_.then(S=>he(S,a,h,l,m,v))):he(_,a,h,l,m,v)}return i?Yt(u,l,a,c,r.value,e):u.length?Promise.all(u).then(()=>a):a}}),No=p("$ZodObjectJIT",(e,t)=>{Fo.init(e,t);const n=e._zod.parse,r=Ne(()=>Jt(t)),o=h=>{var oe,C;const f=new oo(["shape","payload","ctx"]),m=r.value,v=j=>{const $=ot(j);return`shape[${$}]._zod.run({ value: input[${$}], issues: [] }, ctx)`};f.write("const input = payload.value;");const _=Object.create(null);let S=0;for(const j of m.keys)_[j]=`key_${S++}`;f.write("const newResult = {};");for(const j of m.keys){const $=_[j],A=ot(j),H=h[j],Ge=((oe=H==null?void 0:H._zod)==null?void 0:oe.optin)==="optional",an=((C=H==null?void 0:H._zod)==null?void 0:C.optout)==="optional";f.write(`const ${$} = ${v(j)};`),Ge&&an?f.write(`
        if (${$}.issues.length) {
          if (${A} in input) {
            payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${A}, ...iss.path] : [${A}]
            })));
          }
        }
        
        if (${$}.value === undefined) {
          if (${A} in input) {
            newResult[${A}] = undefined;
          }
        } else {
          newResult[${A}] = ${$}.value;
        }
        
      `):Ge?f.write(`
        if (${$}.issues.length) {
          payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${A}, ...iss.path] : [${A}]
          })));
        }
        
        if (${$}.value === undefined) {
          if (${A} in input) {
            newResult[${A}] = undefined;
          }
        } else {
          newResult[${A}] = ${$}.value;
        }
        
      `):f.write(`
        const ${$}_present = ${A} in input;
        if (${$}.issues.length) {
          payload.issues = payload.issues.concat(${$}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${A}, ...iss.path] : [${A}]
          })));
        }
        if (!${$}_present && !${$}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${A}]
          });
        }

        if (${$}_present) {
          if (${$}.value === undefined) {
            newResult[${A}] = undefined;
          } else {
            newResult[${A}] = ${$}.value;
          }
        }

      `)}f.write("payload.value = newResult;"),f.write("return payload;");const E=f.compile();return(j,$)=>E(h,j,$)};let i;const s=pe,a=!Fe.jitless,l=a&&Wn.value,u=t.catchall;let d;e._zod.parse=(h,f)=>{d??(d=r.value);const m=h.value;return s(m)?a&&l&&(f==null?void 0:f.async)===!1&&f.jitless!==!0?(i||(i=o(t.shape)),h=i(h,f),u?Yt([],m,h,f,d,e):h):n(h,f):(h.issues.push({expected:"object",code:"invalid_type",input:m,inst:e}),h)}});function at(e,t,n,r){for(const i of e)if(i.issues.length===0)return t.value=i.value,t;const o=e.filter(i=>!X(i));return o.length===1?(t.value=o[0].value,o[0]):(t.issues.push({code:"invalid_union",input:t.value,inst:n,errors:e.map(i=>i.issues.map(s=>U(s,r,q())))}),t)}const Do=p("$ZodUnion",(e,t)=>{x.init(e,t),w(e._zod,"optin",()=>t.options.some(r=>r._zod.optin==="optional")?"optional":void 0),w(e._zod,"optout",()=>t.options.some(r=>r._zod.optout==="optional")?"optional":void 0),w(e._zod,"values",()=>{if(t.options.every(r=>r._zod.values))return new Set(t.options.flatMap(r=>Array.from(r._zod.values)))}),w(e._zod,"pattern",()=>{if(t.options.every(r=>r._zod.pattern)){const r=t.options.map(o=>o._zod.pattern);return new RegExp(`^(${r.map(o=>Le(o.source)).join("|")})$`)}});const n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(r,o)=>{if(n)return n(r,o);let i=!1;const s=[];for(const a of t.options){const c=a._zod.run({value:r.value,issues:[]},o);if(c instanceof Promise)s.push(c),i=!0;else{if(c.issues.length===0)return c;s.push(c)}}return i?Promise.all(s).then(a=>at(a,r,e,o)):at(s,r,e,o)}}),Lo=p("$ZodIntersection",(e,t)=>{x.init(e,t),e._zod.parse=(n,r)=>{const o=n.value,i=t.left._zod.run({value:o,issues:[]},r),s=t.right._zod.run({value:o,issues:[]},r);return i instanceof Promise||s instanceof Promise?Promise.all([i,s]).then(([c,l])=>ct(n,c,l)):ct(n,i,s)}});function Re(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e==+t)return{valid:!0,data:e};if(te(e)&&te(t)){const n=Object.keys(t),r=Object.keys(e).filter(i=>n.indexOf(i)!==-1),o={...e,...t};for(const i of r){const s=Re(e[i],t[i]);if(!s.valid)return{valid:!1,mergeErrorPath:[i,...s.mergeErrorPath]};o[i]=s.data}return{valid:!0,data:o}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};const n=[];for(let r=0;r<e.length;r++){const o=e[r],i=t[r],s=Re(o,i);if(!s.valid)return{valid:!1,mergeErrorPath:[r,...s.mergeErrorPath]};n.push(s.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function ct(e,t,n){const r=new Map;let o;for(const a of t.issues)if(a.code==="unrecognized_keys"){o??(o=a);for(const c of a.keys)r.has(c)||r.set(c,{}),r.get(c).l=!0}else e.issues.push(a);for(const a of n.issues)if(a.code==="unrecognized_keys")for(const c of a.keys)r.has(c)||r.set(c,{}),r.get(c).r=!0;else e.issues.push(a);const i=[...r].filter(([,a])=>a.l&&a.r).map(([a])=>a);if(i.length&&o&&e.issues.push({...o,keys:i}),X(e))return e;const s=Re(t.value,n.value);if(!s.valid)throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(s.mergeErrorPath)}`);return e.value=s.data,e}const jo=p("$ZodRecord",(e,t)=>{x.init(e,t),e._zod.parse=(n,r)=>{const o=n.value;if(!te(o))return n.issues.push({expected:"record",code:"invalid_type",input:o,inst:e}),n;const i=[],s=t.keyType._zod.values;if(s){n.value={};const a=new Set;for(const l of s)if(typeof l=="string"||typeof l=="number"||typeof l=="symbol"){a.add(typeof l=="number"?l.toString():l);const u=t.keyType._zod.run({value:l,issues:[]},r);if(u instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(u.issues.length){n.issues.push({code:"invalid_key",origin:"record",issues:u.issues.map(f=>U(f,r,q())),input:l,path:[l],inst:e});continue}const d=u.value,h=t.valueType._zod.run({value:o[l],issues:[]},r);h instanceof Promise?i.push(h.then(f=>{f.issues.length&&n.issues.push(...Q(l,f.issues)),n.value[d]=f.value})):(h.issues.length&&n.issues.push(...Q(l,h.issues)),n.value[d]=h.value)}let c;for(const l in o)a.has(l)||(c=c??[],c.push(l));c&&c.length>0&&n.issues.push({code:"unrecognized_keys",input:o,inst:e,keys:c})}else{n.value={};for(const a of Reflect.ownKeys(o)){if(a==="__proto__"||!Object.prototype.propertyIsEnumerable.call(o,a))continue;let c=t.keyType._zod.run({value:a,issues:[]},r);if(c instanceof Promise)throw new Error("Async schemas not supported in object keys currently");if(typeof a=="string"&&jt.test(a)&&c.issues.length){const d=t.keyType._zod.run({value:Number(a),issues:[]},r);if(d instanceof Promise)throw new Error("Async schemas not supported in object keys currently");d.issues.length===0&&(c=d)}if(c.issues.length){t.mode==="loose"?n.value[a]=o[a]:n.issues.push({code:"invalid_key",origin:"record",issues:c.issues.map(d=>U(d,r,q())),input:a,path:[a],inst:e});continue}const u=t.valueType._zod.run({value:o[a],issues:[]},r);u instanceof Promise?i.push(u.then(d=>{d.issues.length&&n.issues.push(...Q(a,d.issues)),n.value[c.value]=d.value})):(u.issues.length&&n.issues.push(...Q(a,u.issues)),n.value[c.value]=u.value)}}return i.length?Promise.all(i).then(()=>n):n}}),qo=p("$ZodEnum",(e,t)=>{x.init(e,t);const n=At(t.entries),r=new Set(n);e._zod.values=r,e._zod.pattern=new RegExp(`^(${n.filter(o=>Kn.has(typeof o)).map(o=>typeof o=="string"?ne(o):o.toString()).join("|")})$`),e._zod.parse=(o,i)=>{const s=o.value;return r.has(s)||o.issues.push({code:"invalid_value",values:n,input:s,inst:e}),o}}),Uo=p("$ZodLiteral",(e,t)=>{if(x.init(e,t),t.values.length===0)throw new Error("Cannot create literal schema with no valid values");const n=new Set(t.values);e._zod.values=n,e._zod.pattern=new RegExp(`^(${t.values.map(r=>typeof r=="string"?ne(r):r?ne(r.toString()):String(r)).join("|")})$`),e._zod.parse=(r,o)=>{const i=r.value;return n.has(i)||r.issues.push({code:"invalid_value",values:t.values,input:i,inst:e}),r}}),Bo=p("$ZodTransform",(e,t)=>{x.init(e,t),e._zod.optin="optional",e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new Ot(e.constructor.name);const o=t.transform(n.value,n);if(r.async)return(o instanceof Promise?o:Promise.resolve(o)).then(s=>(n.value=s,n.fallback=!0,n));if(o instanceof Promise)throw new ee;return n.value=o,n.fallback=!0,n}});function lt(e,t){return t===void 0&&(e.issues.length||e.fallback)?{issues:[],value:void 0}:e}const Ht=p("$ZodOptional",(e,t)=>{x.init(e,t),e._zod.optin="optional",e._zod.optout="optional",w(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,void 0]):void 0),w(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${Le(n.source)})?$`):void 0}),e._zod.parse=(n,r)=>{if(t.innerType._zod.optin==="optional"){const o=n.value,i=t.innerType._zod.run(n,r);return i instanceof Promise?i.then(s=>lt(s,o)):lt(i,o)}return n.value===void 0?n:t.innerType._zod.run(n,r)}}),Go=p("$ZodExactOptional",(e,t)=>{Ht.init(e,t),w(e._zod,"values",()=>t.innerType._zod.values),w(e._zod,"pattern",()=>t.innerType._zod.pattern),e._zod.parse=(n,r)=>t.innerType._zod.run(n,r)}),Vo=p("$ZodNullable",(e,t)=>{x.init(e,t),w(e._zod,"optin",()=>t.innerType._zod.optin),w(e._zod,"optout",()=>t.innerType._zod.optout),w(e._zod,"pattern",()=>{const n=t.innerType._zod.pattern;return n?new RegExp(`^(${Le(n.source)}|null)$`):void 0}),w(e._zod,"values",()=>t.innerType._zod.values?new Set([...t.innerType._zod.values,null]):void 0),e._zod.parse=(n,r)=>n.value===null?n:t.innerType._zod.run(n,r)}),Jo=p("$ZodDefault",(e,t)=>{x.init(e,t),e._zod.optin="optional",w(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);if(n.value===void 0)return n.value=t.defaultValue,n;const o=t.innerType._zod.run(n,r);return o instanceof Promise?o.then(i=>ut(i,t)):ut(o,t)}});function ut(e,t){return e.value===void 0&&(e.value=t.defaultValue),e}const Yo=p("$ZodPrefault",(e,t)=>{x.init(e,t),e._zod.optin="optional",w(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,r)=>(r.direction==="backward"||n.value===void 0&&(n.value=t.defaultValue),t.innerType._zod.run(n,r))}),Ho=p("$ZodNonOptional",(e,t)=>{x.init(e,t),w(e._zod,"values",()=>{const n=t.innerType._zod.values;return n?new Set([...n].filter(r=>r!==void 0)):void 0}),e._zod.parse=(n,r)=>{const o=t.innerType._zod.run(n,r);return o instanceof Promise?o.then(i=>dt(i,e)):dt(o,e)}});function dt(e,t){return!e.issues.length&&e.value===void 0&&e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t}),e}const Wo=p("$ZodCatch",(e,t)=>{x.init(e,t),e._zod.optin="optional",w(e._zod,"optout",()=>t.innerType._zod.optout),w(e._zod,"values",()=>t.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);const o=t.innerType._zod.run(n,r);return o instanceof Promise?o.then(i=>(n.value=i.value,i.issues.length&&(n.value=t.catchValue({...n,error:{issues:i.issues.map(s=>U(s,r,q()))},input:n.value}),n.issues=[],n.fallback=!0),n)):(n.value=o.value,o.issues.length&&(n.value=t.catchValue({...n,error:{issues:o.issues.map(i=>U(i,r,q()))},input:n.value}),n.issues=[],n.fallback=!0),n)}}),Ko=p("$ZodPipe",(e,t)=>{x.init(e,t),w(e._zod,"values",()=>t.in._zod.values),w(e._zod,"optin",()=>t.in._zod.optin),w(e._zod,"optout",()=>t.out._zod.optout),w(e._zod,"propValues",()=>t.in._zod.propValues),e._zod.parse=(n,r)=>{if(r.direction==="backward"){const i=t.out._zod.run(n,r);return i instanceof Promise?i.then(s=>le(s,t.in,r)):le(i,t.in,r)}const o=t.in._zod.run(n,r);return o instanceof Promise?o.then(i=>le(i,t.out,r)):le(o,t.out,r)}});function le(e,t,n){return e.issues.length?(e.aborted=!0,e):t._zod.run({value:e.value,issues:e.issues,fallback:e.fallback},n)}const Xo=p("$ZodReadonly",(e,t)=>{x.init(e,t),w(e._zod,"propValues",()=>t.innerType._zod.propValues),w(e._zod,"values",()=>t.innerType._zod.values),w(e._zod,"optin",()=>{var n,r;return(r=(n=t.innerType)==null?void 0:n._zod)==null?void 0:r.optin}),w(e._zod,"optout",()=>{var n,r;return(r=(n=t.innerType)==null?void 0:n._zod)==null?void 0:r.optout}),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);const o=t.innerType._zod.run(n,r);return o instanceof Promise?o.then(pt):pt(o)}});function pt(e){return e.value=Object.freeze(e.value),e}const Qo=p("$ZodCustom",(e,t)=>{F.init(e,t),x.init(e,t),e._zod.parse=(n,r)=>n,e._zod.check=n=>{const r=n.value,o=t.fn(r);if(o instanceof Promise)return o.then(i=>ht(i,n,r,e));ht(o,n,r,e)}});function ht(e,t,n,r){if(!e){const o={code:"custom",input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};r._zod.def.params&&(o.params=r._zod.def.params),t.issues.push(se(o))}}var ft;class ei{constructor(){this._map=new WeakMap,this._idmap=new Map}add(t,...n){const r=n[0];return this._map.set(t,r),r&&typeof r=="object"&&"id"in r&&this._idmap.set(r.id,t),this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(t){const n=this._map.get(t);return n&&typeof n=="object"&&"id"in n&&this._idmap.delete(n.id),this._map.delete(t),this}get(t){const n=t._zod.parent;if(n){const r={...this.get(n)??{}};delete r.id;const o={...r,...this._map.get(t)};return Object.keys(o).length?o:void 0}return this._map.get(t)}has(t){return this._map.has(t)}}function ti(){return new ei}(ft=globalThis).__zod_globalRegistry??(ft.__zod_globalRegistry=ti());const ie=globalThis.__zod_globalRegistry;function ni(e,t){return new e({type:"string",...g(t)})}function ri(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...g(t)})}function mt(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...g(t)})}function oi(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...g(t)})}function ii(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...g(t)})}function si(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...g(t)})}function ai(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...g(t)})}function ci(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...g(t)})}function li(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...g(t)})}function ui(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...g(t)})}function di(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...g(t)})}function pi(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...g(t)})}function hi(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...g(t)})}function fi(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...g(t)})}function mi(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...g(t)})}function gi(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...g(t)})}function yi(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...g(t)})}function bi(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...g(t)})}function vi(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...g(t)})}function wi(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...g(t)})}function _i(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...g(t)})}function ki(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...g(t)})}function Si(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...g(t)})}function xi(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...g(t)})}function zi(e,t){return new e({type:"string",format:"date",check:"string_format",...g(t)})}function Ii(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...g(t)})}function $i(e,t){return new e({type:"string",format:"duration",check:"string_format",...g(t)})}function Ei(e,t){return new e({type:"number",checks:[],...g(t)})}function Ti(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...g(t)})}function Pi(e,t){return new e({type:"boolean",...g(t)})}function Oi(e){return new e({type:"unknown"})}function Ai(e,t){return new e({type:"never",...g(t)})}function gt(e,t){return new Ut({check:"less_than",...g(t),value:e,inclusive:!1})}function xe(e,t){return new Ut({check:"less_than",...g(t),value:e,inclusive:!0})}function yt(e,t){return new Bt({check:"greater_than",...g(t),value:e,inclusive:!1})}function ze(e,t){return new Bt({check:"greater_than",...g(t),value:e,inclusive:!0})}function bt(e,t){return new Vr({check:"multiple_of",...g(t),value:e})}function Wt(e,t){return new Yr({check:"max_length",...g(t),maximum:e})}function fe(e,t){return new Hr({check:"min_length",...g(t),minimum:e})}function Kt(e,t){return new Wr({check:"length_equals",...g(t),length:e})}function Mi(e,t){return new Kr({check:"string_format",format:"regex",...g(t),pattern:e})}function Ri(e){return new Xr({check:"string_format",format:"lowercase",...g(e)})}function Ci(e){return new Qr({check:"string_format",format:"uppercase",...g(e)})}function Zi(e,t){return new eo({check:"string_format",format:"includes",...g(t),includes:e})}function Fi(e,t){return new to({check:"string_format",format:"starts_with",...g(t),prefix:e})}function Ni(e,t){return new no({check:"string_format",format:"ends_with",...g(t),suffix:e})}function re(e){return new ro({check:"overwrite",tx:e})}function Di(e){return re(t=>t.normalize(e))}function Li(){return re(e=>e.trim())}function ji(){return re(e=>e.toLowerCase())}function qi(){return re(e=>e.toUpperCase())}function Ui(){return re(e=>Hn(e))}function Bi(e,t,n){return new e({type:"array",element:t,...g(n)})}function Gi(e,t,n){return new e({type:"custom",check:"custom",fn:t,...g(n)})}function Vi(e,t){const n=Ji(r=>(r.addIssue=o=>{if(typeof o=="string")r.issues.push(se(o,r.value,n._zod.def));else{const i=o;i.fatal&&(i.continue=!1),i.code??(i.code="custom"),i.input??(i.input=r.value),i.inst??(i.inst=n),i.continue??(i.continue=!n._zod.def.abort),r.issues.push(se(i))}},e(r.value,r)),t);return n}function Ji(e,t){const n=new F({check:"custom",...g(t)});return n._zod.check=e,n}function Xt(e){let t=(e==null?void 0:e.target)??"draft-2020-12";return t==="draft-4"&&(t="draft-04"),t==="draft-7"&&(t="draft-07"),{processors:e.processors??{},metadataRegistry:(e==null?void 0:e.metadata)??ie,target:t,unrepresentable:(e==null?void 0:e.unrepresentable)??"throw",override:(e==null?void 0:e.override)??(()=>{}),io:(e==null?void 0:e.io)??"output",counter:0,seen:new Map,cycles:(e==null?void 0:e.cycles)??"ref",reused:(e==null?void 0:e.reused)??"inline",external:(e==null?void 0:e.external)??void 0}}function P(e,t,n={path:[],schemaPath:[]}){var u,d;var r;const o=e._zod.def,i=t.seen.get(e);if(i)return i.count++,n.schemaPath.includes(e)&&(i.cycle=n.path),i.schema;const s={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,s);const a=(d=(u=e._zod).toJSONSchema)==null?void 0:d.call(u);if(a)s.schema=a;else{const h={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,s.schema,h);else{const m=s.schema,v=t.processors[o.type];if(!v)throw new Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);v(e,t,m,h)}const f=e._zod.parent;f&&(s.ref||(s.ref=f),P(f,t,h),t.seen.get(f).isParent=!0)}const c=t.metadataRegistry.get(e);return c&&Object.assign(s.schema,c),t.io==="input"&&R(e)&&(delete s.schema.examples,delete s.schema.default),t.io==="input"&&"_prefault"in s.schema&&((r=s.schema).default??(r.default=s.schema._prefault)),delete s.schema._prefault,t.seen.get(e).schema}function Qt(e,t){var s,a,c,l;const n=e.seen.get(t);if(!n)throw new Error("Unprocessed schema. This is a bug in Zod.");const r=new Map;for(const u of e.seen.entries()){const d=(s=e.metadataRegistry.get(u[0]))==null?void 0:s.id;if(d){const h=r.get(d);if(h&&h!==u[0])throw new Error(`Duplicate schema id "${d}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(d,u[0])}}const o=u=>{var v;const d=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){const _=(v=e.external.registry.get(u[0]))==null?void 0:v.id,S=e.external.uri??(oe=>oe);if(_)return{ref:S(_)};const E=u[1].defId??u[1].schema.id??`schema${e.counter++}`;return u[1].defId=E,{defId:E,ref:`${S("__shared")}#/${d}/${E}`}}if(u[1]===n)return{ref:"#"};const f=`#/${d}/`,m=u[1].schema.id??`__schema${e.counter++}`;return{defId:m,ref:f+m}},i=u=>{if(u[1].schema.$ref)return;const d=u[1],{ref:h,defId:f}=o(u);d.def={...d.schema},f&&(d.defId=f);const m=d.schema;for(const v in m)delete m[v];m.$ref=h};if(e.cycles==="throw")for(const u of e.seen.entries()){const d=u[1];if(d.cycle)throw new Error(`Cycle detected: #/${(a=d.cycle)==null?void 0:a.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(const u of e.seen.entries()){const d=u[1];if(t===u[0]){i(u);continue}if(e.external){const f=(c=e.external.registry.get(u[0]))==null?void 0:c.id;if(t!==u[0]&&f){i(u);continue}}if((l=e.metadataRegistry.get(u[0]))==null?void 0:l.id){i(u);continue}if(d.cycle){i(u);continue}if(d.count>1&&e.reused==="ref"){i(u);continue}}}function en(e,t){var a,c,l,u;const n=e.seen.get(t);if(!n)throw new Error("Unprocessed schema. This is a bug in Zod.");const r=d=>{const h=e.seen.get(d);if(h.ref===null)return;const f=h.def??h.schema,m={...f},v=h.ref;if(h.ref=null,v){r(v);const S=e.seen.get(v),E=S.schema;if(E.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0")?(f.allOf=f.allOf??[],f.allOf.push(E)):Object.assign(f,E),Object.assign(f,m),d._zod.parent===v)for(const C in f)C==="$ref"||C==="allOf"||C in m||delete f[C];if(E.$ref&&S.def)for(const C in f)C==="$ref"||C==="allOf"||C in S.def&&JSON.stringify(f[C])===JSON.stringify(S.def[C])&&delete f[C]}const _=d._zod.parent;if(_&&_!==v){r(_);const S=e.seen.get(_);if(S!=null&&S.schema.$ref&&(f.$ref=S.schema.$ref,S.def))for(const E in f)E==="$ref"||E==="allOf"||E in S.def&&JSON.stringify(f[E])===JSON.stringify(S.def[E])&&delete f[E]}e.override({zodSchema:d,jsonSchema:f,path:h.path??[]})};for(const d of[...e.seen.entries()].reverse())r(d[0]);const o={};if(e.target==="draft-2020-12"?o.$schema="https://json-schema.org/draft/2020-12/schema":e.target==="draft-07"?o.$schema="http://json-schema.org/draft-07/schema#":e.target==="draft-04"?o.$schema="http://json-schema.org/draft-04/schema#":e.target,(a=e.external)!=null&&a.uri){const d=(c=e.external.registry.get(t))==null?void 0:c.id;if(!d)throw new Error("Schema is missing an `id` property");o.$id=e.external.uri(d)}Object.assign(o,n.def??n.schema);const i=(l=e.metadataRegistry.get(t))==null?void 0:l.id;i!==void 0&&o.id===i&&delete o.id;const s=((u=e.external)==null?void 0:u.defs)??{};for(const d of e.seen.entries()){const h=d[1];h.def&&h.defId&&(h.def.id===h.defId&&delete h.def.id,s[h.defId]=h.def)}e.external||Object.keys(s).length>0&&(e.target==="draft-2020-12"?o.$defs=s:o.definitions=s);try{const d=JSON.parse(JSON.stringify(o));return Object.defineProperty(d,"~standard",{value:{...t["~standard"],jsonSchema:{input:me(t,"input",e.processors),output:me(t,"output",e.processors)}},enumerable:!1,writable:!1}),d}catch{throw new Error("Error converting schema to JSON.")}}function R(e,t){const n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);const r=e._zod.def;if(r.type==="transform")return!0;if(r.type==="array")return R(r.element,n);if(r.type==="set")return R(r.valueType,n);if(r.type==="lazy")return R(r.getter(),n);if(r.type==="promise"||r.type==="optional"||r.type==="nonoptional"||r.type==="nullable"||r.type==="readonly"||r.type==="default"||r.type==="prefault")return R(r.innerType,n);if(r.type==="intersection")return R(r.left,n)||R(r.right,n);if(r.type==="record"||r.type==="map")return R(r.keyType,n)||R(r.valueType,n);if(r.type==="pipe")return e._zod.traits.has("$ZodCodec")?!0:R(r.in,n)||R(r.out,n);if(r.type==="object"){for(const o in r.shape)if(R(r.shape[o],n))return!0;return!1}if(r.type==="union"){for(const o of r.options)if(R(o,n))return!0;return!1}if(r.type==="tuple"){for(const o of r.items)if(R(o,n))return!0;return!!(r.rest&&R(r.rest,n))}return!1}const Yi=(e,t={})=>n=>{const r=Xt({...n,processors:t});return P(e,r),Qt(r,e),en(r,e)},me=(e,t,n={})=>r=>{const{libraryOptions:o,target:i}=r??{},s=Xt({...o??{},target:i,io:t,processors:n});return P(e,s),Qt(s,e),en(s,e)},Hi={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},Wi=(e,t,n,r)=>{const o=n;o.type="string";const{minimum:i,maximum:s,format:a,patterns:c,contentEncoding:l}=e._zod.bag;if(typeof i=="number"&&(o.minLength=i),typeof s=="number"&&(o.maxLength=s),a&&(o.format=Hi[a]??a,o.format===""&&delete o.format,a==="time"&&delete o.format),l&&(o.contentEncoding=l),c&&c.size>0){const u=[...c];u.length===1?o.pattern=u[0].source:u.length>1&&(o.allOf=[...u.map(d=>({...t.target==="draft-07"||t.target==="draft-04"||t.target==="openapi-3.0"?{type:"string"}:{},pattern:d.source}))])}},Ki=(e,t,n,r)=>{const o=n,{minimum:i,maximum:s,format:a,multipleOf:c,exclusiveMaximum:l,exclusiveMinimum:u}=e._zod.bag;typeof a=="string"&&a.includes("int")?o.type="integer":o.type="number";const d=typeof u=="number"&&u>=(i??Number.NEGATIVE_INFINITY),h=typeof l=="number"&&l<=(s??Number.POSITIVE_INFINITY),f=t.target==="draft-04"||t.target==="openapi-3.0";d?f?(o.minimum=u,o.exclusiveMinimum=!0):o.exclusiveMinimum=u:typeof i=="number"&&(o.minimum=i),h?f?(o.maximum=l,o.exclusiveMaximum=!0):o.exclusiveMaximum=l:typeof s=="number"&&(o.maximum=s),typeof c=="number"&&(o.multipleOf=c)},Xi=(e,t,n,r)=>{n.type="boolean"},Qi=(e,t,n,r)=>{n.not={}},es=(e,t,n,r)=>{},ts=(e,t,n,r)=>{const o=e._zod.def,i=At(o.entries);i.every(s=>typeof s=="number")&&(n.type="number"),i.every(s=>typeof s=="string")&&(n.type="string"),n.enum=i},ns=(e,t,n,r)=>{const o=e._zod.def,i=[];for(const s of o.values)if(s===void 0){if(t.unrepresentable==="throw")throw new Error("Literal `undefined` cannot be represented in JSON Schema")}else if(typeof s=="bigint"){if(t.unrepresentable==="throw")throw new Error("BigInt literals cannot be represented in JSON Schema");i.push(Number(s))}else i.push(s);if(i.length!==0)if(i.length===1){const s=i[0];n.type=s===null?"null":typeof s,t.target==="draft-04"||t.target==="openapi-3.0"?n.enum=[s]:n.const=s}else i.every(s=>typeof s=="number")&&(n.type="number"),i.every(s=>typeof s=="string")&&(n.type="string"),i.every(s=>typeof s=="boolean")&&(n.type="boolean"),i.every(s=>s===null)&&(n.type="null"),n.enum=i},rs=(e,t,n,r)=>{if(t.unrepresentable==="throw")throw new Error("Custom types cannot be represented in JSON Schema")},os=(e,t,n,r)=>{if(t.unrepresentable==="throw")throw new Error("Transforms cannot be represented in JSON Schema")},is=(e,t,n,r)=>{const o=n,i=e._zod.def,{minimum:s,maximum:a}=e._zod.bag;typeof s=="number"&&(o.minItems=s),typeof a=="number"&&(o.maxItems=a),o.type="array",o.items=P(i.element,t,{...r,path:[...r.path,"items"]})},ss=(e,t,n,r)=>{var l;const o=n,i=e._zod.def;o.type="object",o.properties={};const s=i.shape;for(const u in s)o.properties[u]=P(s[u],t,{...r,path:[...r.path,"properties",u]});const a=new Set(Object.keys(s)),c=new Set([...a].filter(u=>{const d=i.shape[u]._zod;return t.io==="input"?d.optin===void 0:d.optout===void 0}));c.size>0&&(o.required=Array.from(c)),((l=i.catchall)==null?void 0:l._zod.def.type)==="never"?o.additionalProperties=!1:i.catchall?i.catchall&&(o.additionalProperties=P(i.catchall,t,{...r,path:[...r.path,"additionalProperties"]})):t.io==="output"&&(o.additionalProperties=!1)},as=(e,t,n,r)=>{const o=e._zod.def,i=o.inclusive===!1,s=o.options.map((a,c)=>P(a,t,{...r,path:[...r.path,i?"oneOf":"anyOf",c]}));i?n.oneOf=s:n.anyOf=s},cs=(e,t,n,r)=>{const o=e._zod.def,i=P(o.left,t,{...r,path:[...r.path,"allOf",0]}),s=P(o.right,t,{...r,path:[...r.path,"allOf",1]}),a=l=>"allOf"in l&&Object.keys(l).length===1,c=[...a(i)?i.allOf:[i],...a(s)?s.allOf:[s]];n.allOf=c},ls=(e,t,n,r)=>{const o=n,i=e._zod.def;o.type="object";const s=i.keyType,a=s._zod.bag,c=a==null?void 0:a.patterns;if(i.mode==="loose"&&c&&c.size>0){const u=P(i.valueType,t,{...r,path:[...r.path,"patternProperties","*"]});o.patternProperties={};for(const d of c)o.patternProperties[d.source]=u}else(t.target==="draft-07"||t.target==="draft-2020-12")&&(o.propertyNames=P(i.keyType,t,{...r,path:[...r.path,"propertyNames"]})),o.additionalProperties=P(i.valueType,t,{...r,path:[...r.path,"additionalProperties"]});const l=s._zod.values;if(l){const u=[...l].filter(d=>typeof d=="string"||typeof d=="number");u.length>0&&(o.required=u)}},us=(e,t,n,r)=>{const o=e._zod.def,i=P(o.innerType,t,r),s=t.seen.get(e);t.target==="openapi-3.0"?(s.ref=o.innerType,n.nullable=!0):n.anyOf=[i,{type:"null"}]},ds=(e,t,n,r)=>{const o=e._zod.def;P(o.innerType,t,r);const i=t.seen.get(e);i.ref=o.innerType},ps=(e,t,n,r)=>{const o=e._zod.def;P(o.innerType,t,r);const i=t.seen.get(e);i.ref=o.innerType,n.default=JSON.parse(JSON.stringify(o.defaultValue))},hs=(e,t,n,r)=>{const o=e._zod.def;P(o.innerType,t,r);const i=t.seen.get(e);i.ref=o.innerType,t.io==="input"&&(n._prefault=JSON.parse(JSON.stringify(o.defaultValue)))},fs=(e,t,n,r)=>{const o=e._zod.def;P(o.innerType,t,r);const i=t.seen.get(e);i.ref=o.innerType;let s;try{s=o.catchValue(void 0)}catch{throw new Error("Dynamic catch values are not supported in JSON Schema")}n.default=s},ms=(e,t,n,r)=>{const o=e._zod.def,i=o.in._zod.traits.has("$ZodTransform"),s=t.io==="input"?i?o.out:o.in:o.out;P(s,t,r);const a=t.seen.get(e);a.ref=s},gs=(e,t,n,r)=>{const o=e._zod.def;P(o.innerType,t,r);const i=t.seen.get(e);i.ref=o.innerType,n.readOnly=!0},tn=(e,t,n,r)=>{const o=e._zod.def;P(o.innerType,t,r);const i=t.seen.get(e);i.ref=o.innerType},ys=p("ZodISODateTime",(e,t)=>{bo.init(e,t),I.init(e,t)});function bs(e){return xi(ys,e)}const vs=p("ZodISODate",(e,t)=>{vo.init(e,t),I.init(e,t)});function ws(e){return zi(vs,e)}const _s=p("ZodISOTime",(e,t)=>{wo.init(e,t),I.init(e,t)});function ks(e){return Ii(_s,e)}const Ss=p("ZodISODuration",(e,t)=>{_o.init(e,t),I.init(e,t)});function xs(e){return $i(Ss,e)}const zs=(e,t)=>{Zt.init(e,t),e.name="ZodError",Object.defineProperties(e,{format:{value:n=>lr(e,n)},flatten:{value:n=>cr(e,n)},addIssue:{value:n=>{e.issues.push(n),e.message=JSON.stringify(e.issues,Me,2)}},addIssues:{value:n=>{e.issues.push(...n),e.message=JSON.stringify(e.issues,Me,2)}},isEmpty:{get(){return e.issues.length===0}}})},D=p("ZodError",zs,{Parent:Error}),Is=qe(D),$s=Ue(D),Es=be(D),Ts=ve(D),Ps=pr(D),Os=hr(D),As=fr(D),Ms=mr(D),Rs=gr(D),Cs=yr(D),Zs=br(D),Fs=vr(D),vt=new WeakMap;function ae(e,t,n){const r=Object.getPrototypeOf(e);let o=vt.get(r);if(o||(o=new Set,vt.set(r,o)),!o.has(t)){o.add(t);for(const i in n){const s=n[i];Object.defineProperty(r,i,{configurable:!0,enumerable:!1,get(){const a=s.bind(this);return Object.defineProperty(this,i,{configurable:!0,writable:!0,enumerable:!0,value:a}),a},set(a){Object.defineProperty(this,i,{configurable:!0,writable:!0,enumerable:!0,value:a})}})}}}const z=p("ZodType",(e,t)=>(x.init(e,t),Object.assign(e["~standard"],{jsonSchema:{input:me(e,"input"),output:me(e,"output")}}),e.toJSONSchema=Yi(e,{}),e.def=t,e.type=t.type,Object.defineProperty(e,"_def",{value:t}),e.parse=(n,r)=>Is(e,n,r,{callee:e.parse}),e.safeParse=(n,r)=>Es(e,n,r),e.parseAsync=async(n,r)=>$s(e,n,r,{callee:e.parseAsync}),e.safeParseAsync=async(n,r)=>Ts(e,n,r),e.spa=e.safeParseAsync,e.encode=(n,r)=>Ps(e,n,r),e.decode=(n,r)=>Os(e,n,r),e.encodeAsync=async(n,r)=>As(e,n,r),e.decodeAsync=async(n,r)=>Ms(e,n,r),e.safeEncode=(n,r)=>Rs(e,n,r),e.safeDecode=(n,r)=>Cs(e,n,r),e.safeEncodeAsync=async(n,r)=>Zs(e,n,r),e.safeDecodeAsync=async(n,r)=>Fs(e,n,r),ae(e,"ZodType",{check(...n){const r=this.def;return this.clone(B(r,{checks:[...r.checks??[],...n.map(o=>typeof o=="function"?{_zod:{check:o,def:{check:"custom"},onattach:[]}}:o)]}),{parent:!0})},with(...n){return this.check(...n)},clone(n,r){return G(this,n,r)},brand(){return this},register(n,r){return n.add(this,r),this},refine(n,r){return this.check(Aa(n,r))},superRefine(n,r){return this.check(Ma(n,r))},overwrite(n){return this.check(re(n))},optional(){return St(this)},exactOptional(){return va(this)},nullable(){return xt(this)},nullish(){return St(xt(this))},nonoptional(n){return za(this,n)},array(){return O(this)},or(n){return ua([this,n])},and(n){return pa(this,n)},transform(n){return zt(this,ya(n))},default(n){return ka(this,n)},prefault(n){return xa(this,n)},catch(n){return $a(this,n)},pipe(n){return zt(this,n)},readonly(){return Pa(this)},describe(n){const r=this.clone();return ie.add(r,{description:n}),r},meta(...n){if(n.length===0)return ie.get(this);const r=this.clone();return ie.add(r,n[0]),r},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(n){return n(this)}}),Object.defineProperty(e,"description",{get(){var n;return(n=ie.get(e))==null?void 0:n.description},configurable:!0}),e)),nn=p("_ZodString",(e,t)=>{Be.init(e,t),z.init(e,t),e._zod.processJSONSchema=(r,o,i)=>Wi(e,r,o);const n=e._zod.bag;e.format=n.format??null,e.minLength=n.minimum??null,e.maxLength=n.maximum??null,ae(e,"_ZodString",{regex(...r){return this.check(Mi(...r))},includes(...r){return this.check(Zi(...r))},startsWith(...r){return this.check(Fi(...r))},endsWith(...r){return this.check(Ni(...r))},min(...r){return this.check(fe(...r))},max(...r){return this.check(Wt(...r))},length(...r){return this.check(Kt(...r))},nonempty(...r){return this.check(fe(1,...r))},lowercase(r){return this.check(Ri(r))},uppercase(r){return this.check(Ci(r))},trim(){return this.check(Li())},normalize(...r){return this.check(Di(...r))},toLowerCase(){return this.check(ji())},toUpperCase(){return this.check(qi())},slugify(){return this.check(Ui())}})}),Ns=p("ZodString",(e,t)=>{Be.init(e,t),nn.init(e,t),e.email=n=>e.check(ri(Ds,n)),e.url=n=>e.check(ci(Ls,n)),e.jwt=n=>e.check(Si(ta,n)),e.emoji=n=>e.check(li(js,n)),e.guid=n=>e.check(mt(wt,n)),e.uuid=n=>e.check(oi(ue,n)),e.uuidv4=n=>e.check(ii(ue,n)),e.uuidv6=n=>e.check(si(ue,n)),e.uuidv7=n=>e.check(ai(ue,n)),e.nanoid=n=>e.check(ui(qs,n)),e.guid=n=>e.check(mt(wt,n)),e.cuid=n=>e.check(di(Us,n)),e.cuid2=n=>e.check(pi(Bs,n)),e.ulid=n=>e.check(hi(Gs,n)),e.base64=n=>e.check(wi(Xs,n)),e.base64url=n=>e.check(_i(Qs,n)),e.xid=n=>e.check(fi(Vs,n)),e.ksuid=n=>e.check(mi(Js,n)),e.ipv4=n=>e.check(gi(Ys,n)),e.ipv6=n=>e.check(yi(Hs,n)),e.cidrv4=n=>e.check(bi(Ws,n)),e.cidrv6=n=>e.check(vi(Ks,n)),e.e164=n=>e.check(ki(ea,n)),e.datetime=n=>e.check(bs(n)),e.date=n=>e.check(ws(n)),e.time=n=>e.check(ks(n)),e.duration=n=>e.check(xs(n))});function y(e){return ni(Ns,e)}const I=p("ZodStringFormat",(e,t)=>{k.init(e,t),nn.init(e,t)}),Ds=p("ZodEmail",(e,t)=>{co.init(e,t),I.init(e,t)}),wt=p("ZodGUID",(e,t)=>{so.init(e,t),I.init(e,t)}),ue=p("ZodUUID",(e,t)=>{ao.init(e,t),I.init(e,t)}),Ls=p("ZodURL",(e,t)=>{lo.init(e,t),I.init(e,t)}),js=p("ZodEmoji",(e,t)=>{uo.init(e,t),I.init(e,t)}),qs=p("ZodNanoID",(e,t)=>{po.init(e,t),I.init(e,t)}),Us=p("ZodCUID",(e,t)=>{ho.init(e,t),I.init(e,t)}),Bs=p("ZodCUID2",(e,t)=>{fo.init(e,t),I.init(e,t)}),Gs=p("ZodULID",(e,t)=>{mo.init(e,t),I.init(e,t)}),Vs=p("ZodXID",(e,t)=>{go.init(e,t),I.init(e,t)}),Js=p("ZodKSUID",(e,t)=>{yo.init(e,t),I.init(e,t)}),Ys=p("ZodIPv4",(e,t)=>{ko.init(e,t),I.init(e,t)}),Hs=p("ZodIPv6",(e,t)=>{So.init(e,t),I.init(e,t)}),Ws=p("ZodCIDRv4",(e,t)=>{xo.init(e,t),I.init(e,t)}),Ks=p("ZodCIDRv6",(e,t)=>{zo.init(e,t),I.init(e,t)}),Xs=p("ZodBase64",(e,t)=>{Io.init(e,t),I.init(e,t)}),Qs=p("ZodBase64URL",(e,t)=>{Eo.init(e,t),I.init(e,t)}),ea=p("ZodE164",(e,t)=>{To.init(e,t),I.init(e,t)}),ta=p("ZodJWT",(e,t)=>{Oo.init(e,t),I.init(e,t)}),rn=p("ZodNumber",(e,t)=>{Vt.init(e,t),z.init(e,t),e._zod.processJSONSchema=(r,o,i)=>Ki(e,r,o),ae(e,"ZodNumber",{gt(r,o){return this.check(yt(r,o))},gte(r,o){return this.check(ze(r,o))},min(r,o){return this.check(ze(r,o))},lt(r,o){return this.check(gt(r,o))},lte(r,o){return this.check(xe(r,o))},max(r,o){return this.check(xe(r,o))},int(r){return this.check(_t(r))},safe(r){return this.check(_t(r))},positive(r){return this.check(yt(0,r))},nonnegative(r){return this.check(ze(0,r))},negative(r){return this.check(gt(0,r))},nonpositive(r){return this.check(xe(0,r))},multipleOf(r,o){return this.check(bt(r,o))},step(r,o){return this.check(bt(r,o))},finite(){return this}});const n=e._zod.bag;e.minValue=Math.max(n.minimum??Number.NEGATIVE_INFINITY,n.exclusiveMinimum??Number.NEGATIVE_INFINITY)??null,e.maxValue=Math.min(n.maximum??Number.POSITIVE_INFINITY,n.exclusiveMaximum??Number.POSITIVE_INFINITY)??null,e.isInt=(n.format??"").includes("int")||Number.isSafeInteger(n.multipleOf??.5),e.isFinite=!0,e.format=n.format??null});function T(e){return Ei(rn,e)}const na=p("ZodNumberFormat",(e,t)=>{Ao.init(e,t),rn.init(e,t)});function _t(e){return Ti(na,e)}const ra=p("ZodBoolean",(e,t)=>{Mo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Xi(e,n,r)});function L(e){return Pi(ra,e)}const oa=p("ZodUnknown",(e,t)=>{Ro.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>es()});function Ce(){return Oi(oa)}const ia=p("ZodNever",(e,t)=>{Co.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Qi(e,n,r)});function sa(e){return Ai(ia,e)}const aa=p("ZodArray",(e,t)=>{Zo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>is(e,n,r,o),e.element=t.element,ae(e,"ZodArray",{min(n,r){return this.check(fe(n,r))},nonempty(n){return this.check(fe(1,n))},max(n,r){return this.check(Wt(n,r))},length(n,r){return this.check(Kt(n,r))},unwrap(){return this.element}})});function O(e,t){return Bi(aa,e,t)}const ca=p("ZodObject",(e,t)=>{No.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ss(e,n,r,o),w(e,"shape",()=>t.shape),ae(e,"ZodObject",{keyof(){return Z(Object.keys(this._zod.def.shape))},catchall(n){return this.clone({...this._zod.def,catchall:n})},passthrough(){return this.clone({...this._zod.def,catchall:Ce()})},loose(){return this.clone({...this._zod.def,catchall:Ce()})},strict(){return this.clone({...this._zod.def,catchall:sa()})},strip(){return this.clone({...this._zod.def,catchall:void 0})},extend(n){return nr(this,n)},safeExtend(n){return rr(this,n)},merge(n){return or(this,n)},pick(n){return er(this,n)},omit(n){return tr(this,n)},partial(...n){return ir(on,this,n[0])},required(...n){return sr(sn,this,n[0])}})});function M(e,t){const n={type:"object",shape:e??{},...g(t)};return new ca(n)}const la=p("ZodUnion",(e,t)=>{Do.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>as(e,n,r,o),e.options=t.options});function ua(e,t){return new la({type:"union",options:e,...g(t)})}const da=p("ZodIntersection",(e,t)=>{Lo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>cs(e,n,r,o)});function pa(e,t){return new da({type:"intersection",left:e,right:t})}const kt=p("ZodRecord",(e,t)=>{jo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ls(e,n,r,o),e.keyType=t.keyType,e.valueType=t.valueType});function ha(e,t,n){return!t||!t._zod?new kt({type:"record",keyType:y(),valueType:e,...g(t)}):new kt({type:"record",keyType:e,valueType:t,...g(n)})}const Ze=p("ZodEnum",(e,t)=>{qo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(r,o,i)=>ts(e,r,o),e.enum=t.entries,e.options=Object.values(t.entries);const n=new Set(Object.keys(t.entries));e.extract=(r,o)=>{const i={};for(const s of r)if(n.has(s))i[s]=t.entries[s];else throw new Error(`Key ${s} not found in enum`);return new Ze({...t,checks:[],...g(o),entries:i})},e.exclude=(r,o)=>{const i={...t.entries};for(const s of r)if(n.has(s))delete i[s];else throw new Error(`Key ${s} not found in enum`);return new Ze({...t,checks:[],...g(o),entries:i})}});function Z(e,t){const n=Array.isArray(e)?Object.fromEntries(e.map(r=>[r,r])):e;return new Ze({type:"enum",entries:n,...g(t)})}const fa=p("ZodLiteral",(e,t)=>{Uo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ns(e,n,r),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function ma(e,t){return new fa({type:"literal",values:Array.isArray(e)?e:[e],...g(t)})}const ga=p("ZodTransform",(e,t)=>{Bo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>os(e,n),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new Ot(e.constructor.name);n.addIssue=i=>{if(typeof i=="string")n.issues.push(se(i,n.value,t));else{const s=i;s.fatal&&(s.continue=!1),s.code??(s.code="custom"),s.input??(s.input=n.value),s.inst??(s.inst=e),n.issues.push(se(s))}};const o=t.transform(n.value,n);return o instanceof Promise?o.then(i=>(n.value=i,n.fallback=!0,n)):(n.value=o,n.fallback=!0,n)}});function ya(e){return new ga({type:"transform",transform:e})}const on=p("ZodOptional",(e,t)=>{Ht.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>tn(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function St(e){return new on({type:"optional",innerType:e})}const ba=p("ZodExactOptional",(e,t)=>{Go.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>tn(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function va(e){return new ba({type:"optional",innerType:e})}const wa=p("ZodNullable",(e,t)=>{Vo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>us(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function xt(e){return new wa({type:"nullable",innerType:e})}const _a=p("ZodDefault",(e,t)=>{Jo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ps(e,n,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function ka(e,t){return new _a({type:"default",innerType:e,get defaultValue(){return typeof t=="function"?t():Rt(t)}})}const Sa=p("ZodPrefault",(e,t)=>{Yo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>hs(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function xa(e,t){return new Sa({type:"prefault",innerType:e,get defaultValue(){return typeof t=="function"?t():Rt(t)}})}const sn=p("ZodNonOptional",(e,t)=>{Ho.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ds(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function za(e,t){return new sn({type:"nonoptional",innerType:e,...g(t)})}const Ia=p("ZodCatch",(e,t)=>{Wo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>fs(e,n,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function $a(e,t){return new Ia({type:"catch",innerType:e,catchValue:typeof t=="function"?t:()=>t})}const Ea=p("ZodPipe",(e,t)=>{Ko.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ms(e,n,r,o),e.in=t.in,e.out=t.out});function zt(e,t){return new Ea({type:"pipe",in:e,out:t})}const Ta=p("ZodReadonly",(e,t)=>{Xo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>gs(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Pa(e){return new Ta({type:"readonly",innerType:e})}const Oa=p("ZodCustom",(e,t)=>{Qo.init(e,t),z.init(e,t),e._zod.processJSONSchema=(n,r,o)=>rs(e,n)});function Aa(e,t={}){return Gi(Oa,e,t)}function Ma(e,t){return Vi(e,t)}const K=M({domainValid:L(),permitted:L(),enabled:L(),exposed:L(),signaled:L(),reversible:L()});M({promptId:y(),candidateSetBefore:O(y()),actions:M({yum:K,maybe:K,nope:K,skip:K,undo:K,inspect:K})});M({id:y(),version:y(),participants:M({chooserUserIds:O(y()),recommendationEngineVersion:y(),aiModelVersion:y().optional()}),boundary:M({mealType:Z(["breakfast","lunch","dinner","snack"]),startedAt:y(),endsWhen:Z(["meal-selected","session-abandoned","session-expired"])}),context:M({diningMode:Z(["cook","delivery","restaurant"]).optional(),people:T().optional(),budget:T().optional(),maxTimeMinutes:T().optional(),availableEquipment:O(y()).optional(),locationId:y().optional()}),initiatingConditions:M({candidateMealIds:O(y()),activeRestrictions:O(y()),permanentPreferences:O(y()),temporaryPreferences:O(y())}),completionConditions:M({selectedMealId:y().optional(),explicitNoDecision:L().optional()}),failureConditions:M({noEligibleMeals:L(),restrictionConflict:L(),recommendationExhaustion:L()})});M({id:y(),userId:y(),target:M({entityType:Z(["ingredient","meal","protein","preparation","texture","flavor","format","mood","temperature","dietary"]),entityId:y()}),sentiment:Z(["yum","maybe","nope"]),strength:T(),scope:Z(["session","meal","day","week","persistent"]),source:Z(["explicit-profile","session-response","meal-selection","post-meal-feedback","inferred"]),confidence:T(),createdAt:y(),expiresAt:y().optional(),evidenceIds:O(y()),reversible:ma(!0)});M({mealId:y(),eligible:L(),blockingConflicts:O(y()),dimensions:M({permanentPreference:T(),currentSession:T(),mood:T(),ingredient:T(),preparation:T(),texture:T(),context:T(),historicalOutcome:T(),novelty:T()}),uncertainty:T(),weightedScore:T(),displayPercentage:T(),supportingSignals:O(y()),conflictingSignals:O(y()),avoidedConflicts:O(y())});M({id:y(),sessionId:y(),timestamp:y(),eventType:Z(["session_started","prompt_presented","prompt_inspected","response_selected","response_reversed","summary_presented","signal_removed","recommendations_presented","meal_inspected","meal_rejected","meal_selected","session_abandoned","outcome_recorded"]),promptId:y().optional(),mealId:y().optional(),response:Z(["yum","maybe","nope","skip"]).optional(),projectionVersion:y(),opportunityId:y().optional(),candidateSetHash:y(),preferenceStateHash:y(),metadata:ha(y(),Ce()),experimentCondition:Z(["A","B"]),protocolVersion:y()});const Ra=M({id:y(),familyId:y(),name:y(),description:y(),primaryProteinId:y().nullable(),ingredientIds:O(y()),sideIngredientIds:O(y()),substitutionIds:O(y()),dietaryFlags:O(y()),allergenFlags:O(y()),richnessScore:T(),healthScore:T(),imageAssetId:y().nullable(),status:Z(["candidate","validated","proven","archived"]),temperature:Z(["hot","warm","cold","room_temperature"]),format:Z(["plate","bowl","pasta","soup","salad","handheld"]),estimatedMinutes:T(),difficulty:T(),experienceTags:O(y())});class Ca extends HTMLElement{constructor(){super();b(this,"_meal",null);b(this,"_preferenceSignals",[]);b(this,"_avoidAllergens",[]);b(this,"modifiedMeal",null);b(this,"isGenerating",!1);this.attachShadow({mode:"open"})}set meal(n){this._meal=n,this.modifiedMeal=null,this.render()}get meal(){return this._meal}set preferenceSignals(n){this._preferenceSignals=n}set avoidAllergens(n){this._avoidAllergens=n}connectedCallback(){this.render()}getMatchingSignals(n){const r=n.primaryProteinId||"vegetarian",o=this._preferenceSignals.filter(s=>s.target.entityId===r&&s.sentiment==="yum"||n.ingredientIds.includes(s.target.entityId)&&s.sentiment==="yum"),i=this._preferenceSignals.filter(s=>s.target.entityId===r&&s.sentiment==="nope"||n.ingredientIds.includes(s.target.entityId)&&s.sentiment==="nope");return{supporting:o,conflicting:i}}async handleModifyRecipe(n){if(!this._meal||this.isGenerating)return;this.isGenerating=!0,this.render();const r=this.modifiedMeal||this._meal;try{const o=await fetch("/api/gemini",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:`You are a premium culinary AI assistant for "YumYuck". Modify the provided meal according to the modification request.
Ensure that the modifications use vocabulary from our official reference sheets:
- Proteins (ingredients.png): salmon, cod, halibut, shrimp, scallops, chicken, turkey, beef, pork, tofu.
- Vegetables: green_beans, zucchini, broccoli, asparagus, mushrooms, bell_peppers, onions, garlic, spinach, kale, cabbage.
- Starches: potatoes, sweet_potatoes, rice, quinoa, pasta, udon_noodles, angel_hair.
- Preparations (preperation.png): grilled, seared, pan_seared, roasted, braised, stir_fried, baked, sauteed, steamed.
- Flavors (meal-type.png): fresh_light, garlic_herb, savory_earthy, rich_buttery, spicy, citrus, umami.

For matching rules, you MUST set primaryProteinId to exactly one of the official protein category keys: 'seafood', 'poultry', 'red_meat', 'pork', 'shellfish', 'vegetarian_protein', 'plant_based'.
Return exactly ONE JSON object conforming to the MealVariant schema. Ensure that it remains culinary-sound and appealing. Keep the id matching family guidelines (e.g. family-salmon). Set status to 'candidate'.`,prompt:`Parent Meal: ${JSON.stringify(r)}
Modification Request: "${n}"`,schema:{type:"OBJECT",properties:{id:{type:"STRING"},familyId:{type:"STRING"},name:{type:"STRING"},description:{type:"STRING"},primaryProteinId:{type:"STRING",nullable:!0},ingredientIds:{type:"ARRAY",items:{type:"STRING"}},sideIngredientIds:{type:"ARRAY",items:{type:"STRING"}},substitutionIds:{type:"ARRAY",items:{type:"STRING"}},dietaryFlags:{type:"ARRAY",items:{type:"STRING"}},allergenFlags:{type:"ARRAY",items:{type:"STRING"}},richnessScore:{type:"NUMBER"},healthScore:{type:"NUMBER"},temperature:{type:"STRING",enum:["hot","warm","cold","room_temperature"]},format:{type:"STRING",enum:["plate","bowl","pasta","soup","salad","handheld"]},estimatedMinutes:{type:"NUMBER"},difficulty:{type:"NUMBER"},experienceTags:{type:"ARRAY",items:{type:"STRING"}}},required:["id","familyId","name","description","ingredientIds","sideIngredientIds","substitutionIds","dietaryFlags","allergenFlags","richnessScore","healthScore","temperature","format","estimatedMinutes","difficulty","experienceTags"]}})});if(!o.ok)throw new Error("Gemini generation failed");const i=await o.json(),s=Ra.safeParse({...i,imageAssetId:i.imageAssetId||r.imageAssetId||"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600",status:"candidate"});if(!s.success){console.error("Zod Schema conformance failure:",s.error.format()),alert("Sorry, could not apply the modification due to format validation error."),this.isGenerating=!1,this.render();return}const a=s.data;if(this._avoidAllergens.some(l=>a.allergenFlags.includes(l))){alert("⚠️ Allergen Safety Block: The modified recipe contains avoided allergens and cannot be generated."),this.isGenerating=!1,this.render();return}await Pt([a]),this.modifiedMeal=a,this.dispatchEvent(new CustomEvent("recipe-modified",{bubbles:!0,composed:!0,detail:{originalMealId:this._meal.id,newMeal:a}}))}catch(o){console.error(o),alert("Error occurred while generating modification.")}finally{this.isGenerating=!1,this.render()}}render(){if(!this._meal){this.shadowRoot.innerHTML="";return}const n=this.modifiedMeal||this._meal,{supporting:r,conflicting:o}=this.getMatchingSignals(n);let i="";r.length>0&&o.length===0?i=`Perfect fit based on your preferences for ${r.map(h=>h.target.entityId).join(", ")}.`:o.length>0?i=`Contains ${o.map(h=>h.target.entityId).join(", ")}, which you marked as avoid.`:i="Gourmet recipe matched to your tastes.";const s=`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .details-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #F8F5EF;
      }
      
      /* Navigation Bar */
      .nav-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid rgba(30, 32, 30, 0.08);
      }
      .nav-bar h3 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 18px;
        font-weight: 700;
        color: #2C5E43;
      }
      .back-btn {
        background: none;
        border: none;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      .back-btn:active {
        background-color: rgba(0,0,0,0.05);
      }

      /* Scroll Panel */
      .panel-scroll {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        -webkit-overflow-scrolling: touch;
      }

      /* Food Hero Image */
      .hero-container {
        width: 100%;
        aspect-ratio: 4/3;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 4px 12px rgba(30,32,30,0.06);
        background-color: #FAF7F0;
      }
      .hero-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .ai-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background-color: #2C5E43;
        color: #FFFFFF;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 4px 10px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      }

      /* Titles */
      .title-container h2 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 24px;
        font-weight: 700;
        color: #1E201E;
        line-height: 1.25;
      }
      .description {
        font-size: 13px;
        line-height: 1.5;
        color: #5A5D5A;
        margin-top: 6px;
      }

      /* Attributes Grid */
      .meta-row {
        display: flex;
        gap: 16px;
        padding: 12px 16px;
        background-color: #FFFFFF;
        border-radius: 14px;
        border: 1px solid rgba(30,32,30,0.06);
      }
      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 600;
        color: #5A5D5A;
      }
      .meta-icon {
        width: 16px;
        height: 16px;
        color: #2C5E43;
      }

      /* Match score explanation box */
      .explanation-box {
        display: flex;
        gap: 10px;
        padding: 14px 16px;
        background-color: ${o.length>0?"rgba(200, 75, 49, 0.06)":"rgba(44, 94, 67, 0.06)"};
        border-radius: 14px;
        border: 1px solid ${o.length>0?"#C84B31":"#2C5E43"};
        font-size: 12px;
        line-height: 1.45;
        color: ${o.length>0?"#C84B31":"#2C5E43"};
        font-weight: 500;
      }
      .explanation-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }

      /* Drill Down UI */
      .modification-section {
        background-color: #FFFFFF;
        border-radius: 16px;
        padding: 16px;
        border: 1px solid rgba(30,32,30,0.06);
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .section-heading {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: #5A5D5A;
      }
      .presets-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .preset-btn {
        background-color: rgba(30,32,30,0.04);
        border: none;
        padding: 6px 12px;
        border-radius: 14px;
        font-family: 'Inter', sans-serif;
        font-size: 11px;
        font-weight: 500;
        color: #1E201E;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .preset-btn:active {
        background-color: rgba(30,32,30,0.08);
      }
      .input-wrapper {
        display: flex;
        gap: 8px;
      }
      .custom-input {
        flex: 1;
        background-color: #FAF9F6;
        border: 1px solid rgba(30,32,30,0.1);
        border-radius: 12px;
        padding: 10px 14px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        color: #1E201E;
        outline: none;
      }
      .custom-input:focus {
        border-color: #2C5E43;
      }
      .modify-btn {
        background-color: #2C5E43;
        border: none;
        border-radius: 12px;
        padding: 10px 18px;
        color: #FFFFFF;
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      .modify-btn:active {
        background-color: #204531;
      }
      .modify-btn:disabled {
        background-color: rgba(30,32,30,0.15);
        color: rgba(30,32,30,0.3);
        cursor: not-allowed;
      }
      .spinner {
        border: 2px solid rgba(255,255,255,0.3);
        border-top: 2px solid #FFFFFF;
        border-radius: 50%;
        width: 14px;
        height: 14px;
        animation: spin 0.8s linear infinite;
        display: inline-block;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,a=n.imageAssetId||de(n.id);this.shadowRoot.innerHTML=`
      <style>${s}</style>
      <div class="details-wrapper">
        <div class="nav-bar">
          <button class="back-btn" id="btn-back">
            <i data-lucide="arrow-left"></i>
          </button>
          <h3>Meal Details</h3>
          <div style="width:36px"></div>
        </div>

        <div class="panel-scroll">
          <!-- Food Image -->
          <div class="hero-container">
            <img class="hero-image" src="${a}" alt="${n.name}" />
            ${this.modifiedMeal?`
              <div class="ai-badge">
                <i data-lucide="sparkles" style="width:10px;height:10px;"></i>
                AI Generated
              </div>
            `:""}
          </div>

          <!-- Description -->
          <div class="title-container">
            <h2>${n.name}</h2>
            <p class="description">${n.description}</p>
          </div>

          <!-- Meta Grid -->
          <div class="meta-row">
            <div class="meta-item">
              <i data-lucide="clock" class="meta-icon"></i>
              ${n.estimatedMinutes} Mins
            </div>
            <div class="meta-item">
              <i data-lucide="flame" class="meta-icon"></i>
              ${n.richnessScore>6?"Rich Choice":"Light Choice"}
            </div>
          </div>

          <!-- Match Box -->
          <div class="explanation-box">
            <i data-lucide="${o.length>0?"shield-alert":"sparkles"}" class="explanation-icon"></i>
            <div>${i}</div>
          </div>

          <!-- Drill Down Section -->
          <div class="modification-section">
            <h4 class="section-heading">Modify this recipe</h4>
            <div class="presets-row">
              <button class="preset-btn" data-mod="Make it spicier">🔥 Make it spicier</button>
              <button class="preset-btn" data-mod="Swap potatoes for rice">🍚 Swap potatoes for rice</button>
              <button class="preset-btn" data-mod="Add a citrus kick">🍋 Add a citrus kick</button>
            </div>
            <div class="input-wrapper">
              <input class="custom-input" id="input-custom" type="text" placeholder="Type custom change..." />
              <button class="modify-btn" id="btn-modify" ${this.isGenerating?"disabled":""}>
                ${this.isGenerating?'<div class="spinner"></div>':"Modify"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `,ge({icons:{ArrowLeft:mn,Sparkles:$t,Clock:bn,Flame:wn,ShieldAlert:Sn},nameAttr:"data-lucide",root:this.shadowRoot});const c=this.shadowRoot.querySelector("#btn-back");c&&c.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("details-close",{bubbles:!0,composed:!0}))});const l=this.shadowRoot.querySelector("#input-custom"),u=this.shadowRoot.querySelector("#btn-modify");u&&l&&u.addEventListener("click",()=>{const h=l.value.trim();h&&(this.handleModifyRecipe(h),l.value="")}),this.shadowRoot.querySelectorAll(".preset-btn").forEach(h=>{h.addEventListener("click",f=>{const m=f.currentTarget.getAttribute("data-mod");this.handleModifyRecipe(m)})})}}customElements.define("meal-detail-view",Ca);class Za extends HTMLElement{constructor(){super();b(this,"_recommendations",[]);b(this,"_preferenceSignals",[]);b(this,"selectedMeal",null);b(this,"rating",0);b(this,"comments","");this.attachShadow({mode:"open"})}set recommendations(n){this._recommendations=n,this.render()}set preferenceSignals(n){this._preferenceSignals=n,this.render()}connectedCallback(){this.render()}async handleRemoveSignal(n){const r=this._preferenceSignals.filter(o=>o.target.entityId===n);for(const o of r)await Ae(o.id);this.dispatchEvent(new CustomEvent("preferences-updated",{bubbles:!0,composed:!0}))}handleSelectMeal(n){this.selectedMeal=n,this.dispatchEvent(new CustomEvent("meal-selected",{bubbles:!0,composed:!0,detail:{meal:n}})),this.render()}handleSaveFeedback(){this.selectedMeal&&(this.dispatchEvent(new CustomEvent("outcome-recorded",{bubbles:!0,composed:!0,detail:{mealId:this.selectedMeal.id,rating:this.rating,comments:this.comments}})),alert("Feedback recorded! Enjoy your dinner."),this.selectedMeal=null,this.rating=0,this.comments="",this.dispatchEvent(new CustomEvent("session-reset",{bubbles:!0,composed:!0})))}render(){const n=`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .summary-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        background-color: #F8F5EF;
      }

      /* Header */
      .header-bar {
        padding: 20px;
        text-align: center;
        border-bottom: 1px solid rgba(30, 32, 30, 0.08);
      }
      .header-bar h2 {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 24px;
        font-weight: 700;
        color: #2C5E43;
      }
      .header-bar p {
        font-size: 13px;
        color: #5A5D5A;
        margin-top: 4px;
      }

      /* Scroll Panel */
      .panel-scroll {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        -webkit-overflow-scrolling: touch;
      }

      .section-title {
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        color: #5A5D5A;
        letter-spacing: 0.5px;
        margin-bottom: 12px;
      }

      /* Matches Wallet-List */
      .matches-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .match-card {
        display: flex;
        align-items: center;
        background-color: #FFFFFF;
        border-radius: 16px;
        padding: 12px;
        border: 1px solid rgba(30,32,30,0.06);
        gap: 12px;
        position: relative;
        cursor: pointer;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .match-card:active {
        transform: scale(0.98);
        box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      }
      .match-img {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        object-fit: cover;
      }
      .match-info {
        flex: 1;
        min-width: 0;
      }
      .match-name {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 15px;
        font-weight: 700;
        color: #1E201E;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .match-desc {
        font-size: 11px;
        color: #5A5D5A;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 2px;
      }
      .match-percent {
        font-size: 16px;
        font-weight: 700;
        color: #2C5E43;
        padding: 4px 10px;
        background-color: rgba(44,94,67,0.08);
        border-radius: 10px;
      }

      /* Preference Signals List (Reversibility) */
      .signals-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .signal-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #FFFFFF;
        padding: 10px 14px;
        border-radius: 12px;
        border: 1px solid rgba(30,32,30,0.05);
      }
      .signal-text {
        font-size: 12px;
        font-weight: 500;
        color: #1E201E;
      }
      .signal-sentiment {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .sentiment-yum {
        background-color: rgba(44,94,67,0.08);
        color: #2C5E43;
      }
      .sentiment-nope {
        background-color: rgba(200,75,49,0.06);
        color: #C84B31;
      }
      .btn-remove {
        background: none;
        border: none;
        color: rgba(30,32,30,0.4);
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        border-radius: 50%;
      }
      .btn-remove:active {
        color: #C84B31;
        background-color: rgba(200,75,49,0.06);
      }

      /* Selection and Feedback Drawer */
      .feedback-box {
        background-color: #FFFFFF;
        border-radius: 20px;
        padding: 20px;
        border: 1px solid rgba(30,32,30,0.06);
        display: flex;
        flex-direction: column;
        gap: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      }
      .selected-header {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .stars-row {
        display: flex;
        gap: 8px;
        justify-content: center;
      }
      .star-btn {
        background: none;
        border: none;
        font-size: 32px;
        cursor: pointer;
        transition: transform 0.1s ease;
      }
      .star-btn:active {
        transform: scale(1.15);
      }
      .feedback-textarea {
        width: 100%;
        background-color: #FAF9F6;
        border: 1px solid rgba(30,32,30,0.1);
        border-radius: 12px;
        padding: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        outline: none;
        resize: none;
        height: 70px;
      }
      .feedback-textarea:focus {
        border-color: #2C5E43;
      }
      .save-btn {
        width: 100%;
        padding: 14px;
        background-color: #2C5E43;
        border: none;
        color: #FFFFFF;
        border-radius: 12px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
      }
      .save-btn:active {
        background-color: #204531;
      }
    `,r=this._preferenceSignals.filter(m=>m.target.entityId!=="vegetarian"),o=[],i=new Set;for(const m of r){const v=`${m.target.entityId}-${m.sentiment}`;i.has(v)||(i.add(v),o.push(m))}let s="";if(this.selectedMeal){const m=this.selectedMeal.imageAssetId||de(this.selectedMeal.id),v=[1,2,3,4,5].map(_=>{const S=_<=this.rating?"★":"☆",E=_<=this.rating?"#D9822B":"#A2A5A2";return`<button class="star-btn" data-val="${_}" style="color:${E}">${S}</button>`}).join("");s=`
        <div class="feedback-box">
          <div class="selected-header">
            <img class="match-img" src="${m}" />
            <div>
              <div class="section-title" style="margin-bottom:2px">Selected Choice</div>
              <div class="match-name">${this.selectedMeal.name}</div>
            </div>
          </div>

          <div style="text-align:center;">
            <div class="section-title">Rate this dinner</div>
            <div class="stars-row">${v}</div>
          </div>

          <div>
            <div class="section-title">Feedback / Notes</div>
            <textarea class="feedback-textarea" id="txt-comments" placeholder="How did this meal turn out?">${this.comments}</textarea>
          </div>

          <button class="save-btn" id="btn-save">
            Complete Session
          </button>
        </div>
      `}const a=this._recommendations.map(m=>{const v=m.meal.imageAssetId||de(m.meal.id);return`
        <div class="match-card" data-id="${m.meal.id}">
          <img class="match-img" src="${v}" />
          <div class="match-info">
            <div class="match-name">${m.meal.name}</div>
            <div class="match-desc">${m.meal.description}</div>
          </div>
          <div class="match-percent">${m.profile.displayPercentage}%</div>
        </div>
      `}).join(""),c=o.map(m=>`
        <div class="signal-row">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="signal-text">${m.target.entityId}</span>
            <span class="signal-sentiment sentiment-${m.sentiment}">${m.sentiment}</span>
          </div>
          <button class="btn-remove" data-entity-id="${m.target.entityId}">
            <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
          </button>
        </div>
      `).join("");this.shadowRoot.innerHTML=`
      <style>${n}</style>
      <div class="summary-wrapper">
        <div class="header-bar">
          <h2>We've got it.</h2>
          <p>Here are your customized dinner matches</p>
        </div>

        <div class="panel-scroll">
          ${s}

          <!-- Recommendations List -->
          <div>
            <h4 class="section-title">Top Discoveries</h4>
            <div class="matches-list">
              ${a}
            </div>
          </div>

          <!-- preference signals ledger -->
          ${o.length>0?`
            <div>
              <h4 class="section-title">Preference History (Click Trash to Reverse)</h4>
              <div class="signals-list">
                ${c}
              </div>
            </div>
          `:""}
        </div>
      </div>
    `,ge({icons:{Check:yn,Trash2:xn,Award:gn},nameAttr:"data-lucide",root:this.shadowRoot}),this.shadowRoot.querySelectorAll(".star-btn").forEach(m=>{m.addEventListener("click",v=>{this.rating=parseInt(v.currentTarget.getAttribute("data-val"),10),this.render()})});const u=this.shadowRoot.querySelector("#txt-comments");u&&u.addEventListener("input",()=>{this.comments=u.value});const d=this.shadowRoot.querySelector("#btn-save");d&&d.addEventListener("click",()=>{this.handleSaveFeedback()}),this.shadowRoot.querySelectorAll(".btn-remove").forEach(m=>{m.addEventListener("click",v=>{const _=v.currentTarget.getAttribute("data-entity-id");this.handleRemoveSignal(_)})}),this.shadowRoot.querySelectorAll(".match-card").forEach(m=>{m.addEventListener("click",v=>{const _=v.currentTarget.getAttribute("data-id"),S=this._recommendations.find(E=>E.meal.id===_).meal;this.handleSelectMeal(S)})})}}customElements.define("summary-sheet",Za);class Fa extends HTMLElement{constructor(){super();b(this,"session",null);b(this,"catalogMeals",[]);b(this,"currentStackMeals",[]);b(this,"recommendations",[]);b(this,"currentIndex",0);b(this,"showProfile",!1);b(this,"showDetails",!1);b(this,"showSummary",!1);b(this,"isCatalogEmpty",!0);b(this,"isGenerating",!1);b(this,"isLifted",!1);b(this,"activeDetailMeal",null);this.attachShadow({mode:"open"}),this.handleSwipe=this.handleSwipe.bind(this),this.handlePreferencesUpdated=this.handlePreferencesUpdated.bind(this),this.handleRegenerateCatalog=this.handleRegenerateCatalog.bind(this),this.handleModifyRecipe=this.handleModifyRecipe.bind(this),this.handleOutcomeRecorded=this.handleOutcomeRecorded.bind(this),this.handleSessionReset=this.handleSessionReset.bind(this)}async connectedCallback(){this.addEventListener("swipe",this.handleSwipe),this.addEventListener("preferences-updated",this.handlePreferencesUpdated),this.addEventListener("regenerate-catalog",this.handleRegenerateCatalog),this.addEventListener("recipe-modified",this.handleModifyRecipe),this.addEventListener("outcome-recorded",this.handleOutcomeRecorded),this.addEventListener("session-reset",this.handleSessionReset),this.addEventListener("profile-close",()=>{this.showProfile=!1,this.render()}),this.addEventListener("card-click",n=>{this.activeDetailMeal=n.detail.meal,this.showDetails=!0,this.render()}),this.addEventListener("details-close",()=>{this.showDetails=!1,this.activeDetailMeal=null,this.render()}),this.addEventListener("card-lift",()=>{this.isLifted=!0;const n=this.shadowRoot.querySelector(".main-layout");n&&n.classList.add("lifted-blur")}),this.addEventListener("card-release",()=>{this.isLifted=!1;const n=this.shadowRoot.querySelector(".main-layout");n&&n.classList.remove("lifted-blur")}),await this.initApp()}async initApp(){await qn();const n=await jn();n&&n.length>0?(this.catalogMeals=n,this.isCatalogEmpty=!1,await this.startNewSession()):(this.isCatalogEmpty=!0,this.render())}async startNewSession(){const n=`session-${Math.random().toString(36).substr(2,9)}`;this.session={id:n,initiatorId:"partner-user",timestamp:new Date().toISOString(),activeDietaryRestrictions:[],maxOptions:8,status:"active",schemaVersion:"1.0.0"},this.currentIndex=0,this.showSummary=!1,this.showDetails=!1,this.showProfile=!1,await this.postLedgerEvent({id:`evt-${Math.random().toString(36).substr(2,9)}`,sessionId:this.session.id,timestamp:new Date().toISOString(),eventType:"session_started",projectionVersion:"1.0.0",candidateSetHash:this.getSetHash(this.catalogMeals.map(r=>r.id)),preferenceStateHash:"",experimentCondition:"B",protocolVersion:"1.0.0"}),this.currentStackMeals=this.shuffleArray([...this.catalogMeals]).slice(0,8),await this.recalculateRecommendations(),this.render()}async recalculateRecommendations(){const n=await W("partner-user"),r=this.catalogMeals.map(o=>{const{score:i,profile:s}=this.scoreMeal(o,n);return{meal:o,score:i,profile:s}});this.recommendations=r.filter(o=>o.score>=0).sort((o,i)=>i.score-o.score).slice(0,5)}scoreMeal(n,r){const o=r.filter(c=>c.target.entityType==="dietary"&&c.sentiment==="nope");for(const c of o)if(n.dietaryFlags.includes(c.target.entityId))return{score:-1,profile:null};let i=50;const s=r.filter(c=>c.scope==="session");for(const c of s){const l=c.target.entityType==="protein"&&c.target.entityId===n.primaryProteinId,u=c.target.entityType==="ingredient"&&(n.ingredientIds.includes(c.target.entityId)||n.sideIngredientIds.includes(c.target.entityId)),d=c.target.entityType==="format"&&c.target.entityId===n.format,h=c.target.entityType==="flavor"&&n.experienceTags.some(f=>f.toLowerCase().includes(c.target.entityId.toLowerCase()));(l||u||d||h)&&(i+=c.sentiment==="yum"?15:-15)}const a=r.filter(c=>c.scope==="persistent");for(const c of a){const l=c.target.entityType==="protein"&&c.target.entityId===n.primaryProteinId,u=c.target.entityType==="ingredient"&&(n.ingredientIds.includes(c.target.entityId)||n.sideIngredientIds.includes(c.target.entityId)),d=c.target.entityType==="format"&&c.target.entityId===n.format,h=c.target.entityType==="flavor"&&n.experienceTags.some(f=>f.toLowerCase().includes(c.target.entityId.toLowerCase()));(l||u||d||h)&&(i+=c.sentiment==="yum"?10:-10)}return i=Math.max(0,Math.min(100,i)),{score:i,profile:{displayPercentage:i,supportingSignals:r.filter(c=>c.sentiment==="yum"&&(c.target.entityId===n.primaryProteinId||n.ingredientIds.includes(c.target.entityId))),conflictingSignals:r.filter(c=>c.sentiment==="nope"&&(c.target.entityId===n.primaryProteinId||n.ingredientIds.includes(c.target.entityId)))}}}async handleSwipe(n){if(!this.session)return;const{meal:r,response:o}=n.detail,i=await W("partner-user");if(await this.postLedgerEvent({id:`evt-${Math.random().toString(36).substr(2,9)}`,sessionId:this.session.id,timestamp:new Date().toISOString(),eventType:"response_selected",projectionVersion:"1.0.0",opportunityId:`opp-${Math.random().toString(36).substr(2,9)}`,candidateSetHash:this.getSetHash(this.currentStackMeals.map(s=>s.id)),preferenceStateHash:this.getSetHash(i.map(s=>s.id)),response:o,experimentCondition:"B",protocolVersion:"1.0.0",mealId:r.id}),o==="yum"||o==="nope"){const s={id:`sig-session-${r.id}-${Math.random().toString(36).substr(2,5)}`,userId:"partner-user",target:{entityType:"protein",entityId:r.primaryProteinId||"vegetarian_protein"},sentiment:o,strength:1,scope:"session",source:"swipe-interaction",confidence:1,createdAt:new Date().toISOString(),evidenceIds:[],reversible:!0};await Oe(s)}this.currentIndex++,this.isLifted=!1,this.currentIndex>=8&&(this.showSummary=!0),await this.recalculateRecommendations(),this.render()}async handlePreferencesUpdated(){await this.recalculateRecommendations(),this.render()}async handleRegenerateCatalog(){confirm("Are you sure you want to clear your discoveries and rebuild the meal catalog?")&&(await Un(),this.isCatalogEmpty=!0,this.showProfile=!1,this.render())}async handleModifyRecipe(n){const{originalMealId:r,newMeal:o}=n.detail;this.currentStackMeals=this.currentStackMeals.map(i=>i.id===r?o:i),this.activeDetailMeal=o,await this.recalculateRecommendations(),this.render()}async handleOutcomeRecorded(n){if(!this.session)return;const{mealId:r,rating:o,comments:i}=n.detail,s=await W("partner-user");await this.postLedgerEvent({id:`evt-${Math.random().toString(36).substr(2,9)}`,sessionId:this.session.id,timestamp:new Date().toISOString(),eventType:"outcome_recorded",projectionVersion:"1.0.0",candidateSetHash:this.getSetHash(this.currentStackMeals.map(a=>a.id)),preferenceStateHash:this.getSetHash(s.map(a=>a.id)),experimentCondition:"B",protocolVersion:"1.0.0",mealId:r,metadata:{rating:o,comments:i}})}async handleSessionReset(){await this.startNewSession()}async handleGenerateCatalog(){this.isGenerating=!0,this.render();try{const n=await fetch("/api/gemini",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({systemInstruction:`You are a premium culinary research chef and structured data assistant for "YumYuck", an award-winning iOS dinner discovery app.
Your task is to generate exactly 20 diverse, high-quality, gourmet dinner recipes in structured JSON format conforming to the schema of MealVariant[].

Guidelines from YumYuck official reference sheets:
1. PROTEINS (ingredients.png): salmon, cod, halibut, shrimp, scallops, chicken, turkey, beef, pork, tofu.
2. VEGETABLES: green_beans, zucchini, broccoli, asparagus, mushrooms, bell_preppers, onions, garlic, spinach, kale, cabbage.
3. STARCHES: potatoes, sweet_potatoes, rice, quinoa, pasta, udon_noodles, angel_hair.
4. PREPARATION (preperation.png): grilled, seared, pan_seared, roasted, braised, stir_fried, baked, sauteed, steamed.
5. FLAVORS (meal-type.png): fresh_light, garlic_herb, savory_earthy, rich_buttery, spicy, citrus, umami.
6. OCCASIONS: comforting, healthy_choice, special_occasion, quick_easy.
7. FORMATS (food.png): plate, bowl, handheld, pasta, soup, salad.
8. Set primaryProteinId to exactly one of the official protein category keys: 'seafood', 'poultry', 'red_meat', 'pork', 'shellfish', 'vegetarian_protein', 'plant_based'. (Vegetarian or vegan meals without active proteins should set it to 'vegetarian_protein' or 'plant_based').

Visual & Image Mappings Requirements:
To prevent image-content mismatches, each recipe you generate MUST directly correspond to one of the 26 verified images below. You must only generate recipes representing the following dishes, mapping "imageAssetId" to its exact Unsplash URL:
- Grilled Salmon: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600"
- Lemon Garlic Salmon: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600"
- Chicken Piccata: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600"
- Chicken Piccata Pasta: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=600"
- Seared Cod / White Fish: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600"
- Shrimp Scampi: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=600"
- Seared Scallops: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=600"
- Filet Mignon / Steak: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=600"
- Steak with Rosemary: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&q=80&w=600"
- Sesame Ginger Tofu: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
- Creamy Mushroom Pasta: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=600"
- Chicken Teriyaki: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80&w=600"
- Quinoa Salad: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600"
- Herb Chicken: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600"
- Garlic Roasted Chicken: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=600"
- Pesto Pasta: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600"
- Pesto Chicken Pasta: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=600"
- Garlic Shrimp: "https://images.unsplash.com/photo-1559742811-8242895411b8?auto=format&fit=crop&q=80&w=600"
- Tuscan Bean Soup: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600"
- Beef Bowl: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=600"
- Beef Tacos: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600"
- Chickpea Salad: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600"
- Tomato Soup: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600"
- Chicken Skewers: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600"
- Creamy Garlic Pasta: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600"
- Roasted Pork Chop: "https://images.unsplash.com/photo-1632758111956-aa150422dddb?auto=format&fit=crop&q=80&w=600"

DO NOT generate pork recipes mapped to chicken/beef images, and DO NOT generate chicken recipes mapped to salmon/cod images. Each generated recipe name and description must strictly represent the food item of the mapped Unsplash URL.
Ensure the experienceTags array contains exactly 3 elements, consisting of short descriptors like a primary ingredient/prep detail, format/mood, and duration (e.g. ['Lemon', 'Light', '25 min']). Output exactly 20 dinner variants in a single JSON array.`,prompt:"Generate exactly 20 diverse, premium dinner meals for the catalog.",schema:{type:"ARRAY",items:{type:"OBJECT",properties:{id:{type:"STRING"},familyId:{type:"STRING"},name:{type:"STRING"},description:{type:"STRING"},primaryProteinId:{type:"STRING",nullable:!0},ingredientIds:{type:"ARRAY",items:{type:"STRING"}},sideIngredientIds:{type:"ARRAY",items:{type:"STRING"}},substitutionIds:{type:"ARRAY",items:{type:"STRING"}},dietaryFlags:{type:"ARRAY",items:{type:"STRING"}},allergenFlags:{type:"ARRAY",items:{type:"STRING"}},richnessScore:{type:"NUMBER"},healthScore:{type:"NUMBER"},imageAssetId:{type:"STRING"},status:{type:"STRING",enum:["candidate","validated","proven","archived"]},temperature:{type:"STRING",enum:["hot","warm","cold","room_temperature"]},format:{type:"STRING",enum:["plate","bowl","pasta","soup","salad","handheld"]},estimatedMinutes:{type:"NUMBER"},difficulty:{type:"NUMBER"},experienceTags:{type:"ARRAY",items:{type:"STRING"}}},required:["id","familyId","name","description","ingredientIds","sideIngredientIds","substitutionIds","dietaryFlags","allergenFlags","richnessScore","healthScore","imageAssetId","status","temperature","format","estimatedMinutes","difficulty","experienceTags"]}}})});if(!n.ok)throw new Error("Failed to generate catalog from Gemini");const r=await n.json();Array.isArray(r)&&r.length>0&&(await Pt(r),this.catalogMeals=r,this.isCatalogEmpty=!1,await this.startNewSession())}catch(n){console.error(n),alert("Error occurred while generating catalog menu: "+n.message)}finally{this.isGenerating=!1,this.render()}}async postLedgerEvent(n){try{await fetch("/api/log",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})}catch(r){console.warn("Failed to post event to server ledger",r)}}shuffleArray(n){for(let r=n.length-1;r>0;r--){const o=Math.floor(Math.random()*(r+1));[n[r],n[o]]=[n[o],n[r]]}return n}getSetHash(n){return n.sort().join(",")}render(){const n=`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 390px;
        height: 100vh;
        margin: 0 auto;
        position: relative;
        background-color: #F8F5EF;
        overflow: hidden;
      }
      
      .main-layout {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding: 16px 20px;
        position: relative;
        z-index: 10;
        transition: filter 0.3s ease;
      }
      .main-layout.lifted-blur {
        filter: blur(4px);
      }

      /* Header */
      .header-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        width: 100%;
        z-index: 20;
      }
      .icon-btn {
        background: none;
        border: none;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        color: #1E201E;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .icon-btn:active {
        background-color: rgba(0,0,0,0.05);
        transform: scale(0.95);
      }
      .logo-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .logo-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 18px;
        font-weight: 700;
        color: #2C5E43;
        letter-spacing: 0.5px;
      }

      /* Stack Deck */
      .deck-area {
        flex: 1;
        width: 100%;
        position: relative;
        margin-bottom: 24px;
      }

      /* Onboarding On-Demand catalog generator */
      .onboarding-card {
        background-color: #FFFFFF;
        border-radius: 24px;
        padding: 32px 24px;
        box-shadow: 0 12px 32px -8px rgba(30, 32, 30, 0.08);
        border: 1px solid rgba(30,32,30,0.06);
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 80%;
        margin-top: 10%;
        gap: 16px;
      }
      .onboarding-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 24px;
        font-weight: 700;
        color: #2C5E43;
      }
      .onboarding-desc {
        font-size: 13px;
        line-height: 1.5;
        color: #5A5D5A;
      }
      .onboarding-btn {
        background-color: #2C5E43;
        border: none;
        color: #FFFFFF;
        border-radius: 14px;
        padding: 14px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background-color 0.2s ease;
      }
      .onboarding-btn:active {
        background-color: #204531;
      }
      .onboarding-btn:disabled {
        background-color: rgba(30,32,30,0.15);
        color: rgba(30,32,30,0.3);
        cursor: not-allowed;
      }

      /* Sliding Drawers */
      .drawer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 85vh;
        z-index: 100;
        background-color: #F8F5EF;
        border-top-left-radius: 32px;
        border-top-right-radius: 32px;
        box-shadow: 0 -16px 48px rgba(30, 32, 30, 0.15);
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .drawer.open {
        transform: translateY(0);
      }
      .drawer-bar {
        width: 36px;
        height: 5px;
        background-color: rgba(30,32,30,0.15);
        border-radius: 999px;
        margin: 10px auto 0 auto;
      }
      
      .spinner {
        border: 2px solid rgba(255,255,255,0.3);
        border-top: 2px solid #FFFFFF;
        border-radius: 50%;
        width: 16px;
        height: 16px;
        animation: spin 0.8s linear infinite;
        display: inline-block;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,r=Math.min(this.currentIndex+1,8),o=!this.showSummary&&!this.isCatalogEmpty;let i="";this.isCatalogEmpty?i=`
        <div class="logo-row" style="margin: 0 auto;">
          <i data-lucide="compass" style="color:#2C5E43;width:18px;height:18px;"></i>
          <span class="logo-title">YUMYUCK</span>
        </div>
      `:i=`
        <button class="icon-btn" id="btn-settings">
          <i data-lucide="settings" style="width:20px;height:20px;"></i>
        </button>
        ${o?`
          <capsule-indicator current="${r}" total="8"></capsule-indicator>
        `:`
          <div class="logo-row">
            <i data-lucide="compass" style="color:#2C5E43;width:18px;height:18px;" class="animate-pulse"></i>
            <span class="logo-title">YUMYUCK</span>
          </div>
        `}
        <button class="icon-btn" id="btn-user">
          <i data-lucide="user" style="width:20px;height:20px;"></i>
        </button>
      `;let s="";this.isCatalogEmpty?s=`
        <div class="onboarding-card">
          <div style="font-size: 50px;">🍽</div>
          <h3 class="onboarding-title">Create Your Menu</h3>
          <p class="onboarding-desc">
            Let our premium culinary AI compose a dynamic discovery deck of 20 gourmet meals tailored specifically to your taste profile.
          </p>
          <button class="onboarding-btn" id="btn-create-menu" ${this.isGenerating?"disabled":""}>
            ${this.isGenerating?'<div class="spinner"></div>':'<i data-lucide="sparkles" style="width:16px;height:16px"></i> Generate Discoveries'}
          </button>
        </div>
      `:(this.currentStackMeals.slice(this.currentIndex),s='<card-stack id="stack-view"></card-stack>'),this.shadowRoot.innerHTML=`
      <style>${n}</style>
      
      <!-- Main Layout -->
      <div class="main-layout ${this.isLifted?"lifted-blur":""}">
        <header class="header-bar">
          ${i}
        </header>

        <div class="deck-area">
          ${s}
        </div>
      </div>

      <!-- Drawers -->
      
      <!-- Drawer 1: User Profile Settings -->
      <div class="drawer ${this.showProfile?"open":""}" id="drawer-profile">
        <div class="drawer-bar"></div>
        <div style="height:100%">
          <user-profile-view id="profile-view"></user-profile-view>
        </div>
      </div>

      <!-- Drawer 2: Meal Detail View -->
      <div class="drawer ${this.showDetails?"open":""}" id="drawer-details">
        <div class="drawer-bar"></div>
        <div style="height:100%">
          <meal-detail-view id="detail-view"></meal-detail-view>
        </div>
      </div>

      <!-- Drawer 3: Summary Sheet Matches -->
      <div class="drawer ${this.showSummary?"open":""}" id="drawer-summary">
        <div class="drawer-bar"></div>
        <div style="height:100%">
          <summary-sheet id="summary-view"></summary-sheet>
        </div>
      </div>
    `;const a=this.shadowRoot.querySelector("#stack-view");a&&(a.meals=this.currentStackMeals.slice(this.currentIndex));const c=this.shadowRoot.querySelector("#profile-view");c&&W("partner-user").then(m=>{c.preferenceSignals=m});const l=this.shadowRoot.querySelector("#detail-view");l&&this.activeDetailMeal&&(l.meal=this.activeDetailMeal,W("partner-user").then(m=>{l.preferenceSignals=m;const v=m.filter(_=>_.target.entityType==="dietary"&&_.sentiment==="nope").map(_=>_.target.entityId);l.avoidAllergens=v}));const u=this.shadowRoot.querySelector("#summary-view");u&&(u.recommendations=this.recommendations,W("partner-user").then(m=>{u.preferenceSignals=m})),ge({icons:{Compass:vn,Settings:kn,User:zn,Sparkles:$t},nameAttr:"data-lucide",root:this.shadowRoot});const d=this.shadowRoot.querySelector("#btn-create-menu");d&&d.addEventListener("click",()=>{this.handleGenerateCatalog()});const h=this.shadowRoot.querySelector("#btn-settings");h&&h.addEventListener("click",()=>{this.showProfile=!0,this.showDetails=!1,this.render()});const f=this.shadowRoot.querySelector("#btn-user");f&&f.addEventListener("click",()=>{this.showSummary=!0,this.render()})}}customElements.define("yumyuck-app",Fa);
