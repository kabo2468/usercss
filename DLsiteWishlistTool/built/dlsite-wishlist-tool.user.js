// ==UserScript==
// @name        DLsite Wishlist Tool
// @version     1.0.2
// @author      kabo2468
// @description Tool for DLsite Wishlist
// @supportURL  https://github.com/kabo2468/user-css-script/issues
// @match       https://www.dlsite.com/*/mypage/wishlist*
// @namespace   kabo2468.dlwtujs
// @grant       none
// @require     none
// @downloadURL https://github.com/kabo2468/user-css-script/raw/master/DLsiteWishlistTool/built/dlsite-wishlist-tool.user.js
// @updateURL   https://github.com/kabo2468/user-css-script/raw/master/DLsiteWishlistTool/built/dlsite-wishlist-tool.user.js
// @homepageURL https://github.com/kabo2468/user-css-script/tree/master/DLsiteWishlistTool
// ==/UserScript==

(()=>{"use strict";const e=document.createElement("strong");e.textContent="Wishlist Tool :";const t=document.querySelector("#wishlist_work > table > tbody"),n=document.createElement("div");n.innerHTML="表示中: ";const o=document.createElement("span");o.id="dls_wl_tool-count",o.textContent=String(((null==t?void 0:t.childElementCount)||0)/3),n.append(o);const l=document.querySelector("#wishlist_work > table > tbody"),r=document.createElement("button");function c(e,t){return new Promise((n=>{fetch(`${e}/page/${t}`).then((e=>e.text())).then((e=>(new DOMParser).parseFromString(e,"text/html"))).then((e=>n(e)))}))}function i(e,t){const n=document.createElement("div"),o=document.createElement("label");o.textContent=e;const l=document.createElement("input");return l.setAttribute("type","checkbox"),l.addEventListener("change",(function(){const e=function(e,t){const n=document.getElementById("dls_wl_tool-count");let o=Number(null==n?void 0:n.textContent);const l=document.getElementsByClassName("_favorite_item");return Array.from(l).forEach((function(n){const l=n.querySelector(".icon_lead_01.type_exclusive");if(t){if(null!==l)return}else if(!l)return;n.style.display=e?"none":"",o+=e?-1:1})),o}(l.checked,t),n=document.getElementById("dls_wl_tool-count");n&&(n.textContent=String(e))})),o.insertBefore(l,o.firstChild),n.append(o),n}r.textContent="すべて読み込む",r.addEventListener("click",(function(){return e=this,null,t=function*(){var e,t,n,i;const d=document.getElementById("dls_wl_tool-status");if(!d)return;d.textContent="Fetching...";const s=document.createElement("span");d.append(s),r.disabled=!0;const u=null==(e=document.querySelector("#wishlist > div.sort_box.border_b > div.page_total > strong:nth-child(1)"))?void 0:e.textContent;document.querySelectorAll("#wishlist > table.search_pager").forEach((e=>{var t;null==(t=e.parentNode)||t.removeChild(e)})),null==(t=document.querySelector("#wishlist > table"))||t.remove();const a=null==(n=document.querySelector(".display_num_select > ul > li.on > a"))?void 0:n.textContent,m=Math.ceil(Number(u)/Number(a));let y=0;for(let e=2;e<=m;e++){s.textContent=`${e} / ${m}`,console.log("Get page:",e);const t=null==(i=(yield c(location.href,e)).querySelector("#wishlist_work > table > tbody"))?void 0:i.children;if(!t)return;const n=document.createElement("tr");n.innerHTML=`<p>Page: ${e}</p>`,n.style.fontSize="16px",n.style.display="flex",n.style.justifyContent="center",n.style.backgroundColor="#424242",n.style.borderBottom="1px solid #ccc",y++,null==l||l.append(n,...t),console.log("Append page:",e)}o.textContent=String((((null==l?void 0:l.childElementCount)||0)-y)/3),d.textContent="Done!"},new Promise(((n,o)=>{var l=e=>{try{c(t.next(e))}catch(e){o(e)}},r=e=>{try{c(t.throw(e))}catch(e){o(e)}},c=e=>e.done?n(e.value):Promise.resolve(e.value).then(l,r);c((t=t.apply(e,null)).next())}));var e,t}));const d=i("DLsite専売を非表示",!1),s=i("DLsite専売のみを表示",!0),u=document.createElement("div");let a=f();const m=document.querySelector("#wishlist_work > table > tbody");m&&new MutationObserver((()=>{a=f(),u.innerHTML="",p(a)})).observe(m,{childList:!0,subtree:!0});const y=document.createElement("span");function p(e){u.append(y,...e.map((e=>{const t=document.createElement("div");return t.append(e),t})))}function f(){return[...new Set(Array.from(document.querySelectorAll(".work_category"),(e=>e.children[0].textContent)))].map((e=>{const t=document.createElement("label");t.textContent=e,t.classList.add("dls_wl_tool-cat-label");const n=document.createElement("input");return n.setAttribute("type","checkbox"),t.insertBefore(n,t.firstChild),t}))}y.textContent="カテゴリーフィルター: ",u.addEventListener("change",(function(){const e=a.filter((e=>e.getElementsByTagName("input")[0].checked)).map((e=>e.textContent)),t=document.getElementById("dls_wl_tool-count");if(!t)return;let n=Number(t.textContent);const o=document.getElementsByClassName("_favorite_item");Array.from(o).forEach((t=>{var o;const l=t.style.display,r=(null==(o=t.querySelector(".work_category"))?void 0:o.children[0].textContent)||"";e.length&&!e.includes(r)?(t.style.display="none",""===l&&(n-=1)):(t.style.display="","none"===l&&(n+=1))})),t.textContent=String(n)})),p(a);const b=document.querySelector("#wishlist_work > table > tbody"),h=document.createElement("button");h.textContent="割引終了が早い順にする",h.addEventListener("click",(function(){const e=document.getElementsByClassName("_favorite_item");Array.from(e).map((function(e){const t=e.querySelector(".period_date");return{dom:e,date:(()=>{var e;if(t){const n=null==(e=null==t?void 0:t.textContent)?void 0:e.match(/(\d{4})年(\d{2})月(\d{2})日 (\d{2})?時?/),[,o,l,r,c]=n||[];return new Date(Number(o),Number(l)-1,Number(r),Number(c)||23,59,59).getTime()}return new Date((new Date).getFullYear()+1,0,1).getTime()})()}})).sort((function(e,t){return e.date-t.date})).forEach((function(e){var t;return null==b?void 0:b.append(e.dom,e.dom.nextSibling||"",(null==(t=e.dom.nextSibling)?void 0:t.nextSibling)||"")}))}));const _=document.querySelector("#wishlist_work > table > tbody"),v=document.createElement("button");v.textContent="割引率が高い順にする",v.addEventListener("click",(function(){const e=document.getElementsByClassName("_favorite_item");Array.from(e).map((function(e){const t=e.querySelector(".icon_campaign.type_sale");return{dom:e,percent:(()=>{var e;if(t){const n=null==(e=null==t?void 0:t.textContent)?void 0:e.match(/(\d+)/);return Number((n||[])[1]||0)}return 0})()}})).sort((function(e,t){return t.percent-e.percent})).forEach((function(e){var t;null==_||_.append(e.dom||"",e.dom.nextSibling||"",(null==(t=e.dom.nextSibling)?void 0:t.nextSibling)||"")}))}));const g=document.createElement("span");g.id="dls_wl_tool-status";const E=document.getElementById("showList"),x=document.createElement("style");x.innerHTML="#dls_wl_tool-form>* {margin: 0 .1rem;}",document.getElementsByTagName("body")[0].append(x);const w=document.createElement("div");w.id="dls_wl_tool-form",w.classList.add("border_b","status_select_box"),w.append(e,n,r,g,h,v,d,s,u),null==E||E.after(w)})();