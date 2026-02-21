import{S as d,N as u,P as p,a as f}from"./assets/vendor-fJp_pnmi.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();new d(".swiper",{spaceBetween:20,speed:500,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",dynamicBullets:!0,type:"bullets",clickable:!0},modules:[u,p]});const c=f.create({baseURL:"https://sound-wave.b.goit.study/api"});async function m(n){return(await c.get("/artists",{params:{limit:8,...n}})).data}const l={learnMoteBtn:document,listArtists:document.querySelector(".artists-list"),listFeedbacks:document.querySelector(".js-list-feedbacks")},g="/project-artist-hub/assets/symbol-defs-CxF1Hgjl.svg";async function b(){const{artists:n}=await m(),a=n.map(({_id:o,strArtist:i,strBiographyEN:t,strArtistThumb:e,genres:s})=>`
        <li class="artists-list-item" data-artist-id="${o}">
          <div class="list-item-img">
            <img src="${e}" alt="${i}" />
          </div>
          <ul class="artists-tags-list">
            ${s.map(r=>`
                <li class="tags-list-item">${r}</li>
              `).join("")}
          </ul>
          <h3 class="list-item-title">${i}</h3>
          <p class="list-item-descr">
            ${t}
          </p>
          <button class="list-item-btn">
            Load More
            <span>
              <svg width="8" height="14">
                <use href="${g}#learn-more"></use>
              </svg>
            </span>
          </button>
        </li>
      `).join("");l.listArtists.insertAdjacentHTML("beforeend",a)}b();async function v(){return(await c.get("/feedbacks",{params:{limit:10,page:1}})).data}async function y(){const a=(await v()).data.map(({name:o,rating:i,descr:t})=>{const e=i-Math.floor(i),s=Math.floor(i);let r;return e>=.1&&e<=.2?r=s:e>.2&&e<.8?r=`${s}-5`:e>=.8&&e<=.9?r=s+1:r=s,`
         <li class="swiper-slide">
            <div class="wrapper">
              <div class="stars-static rating-set-${r}">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
              </div>
              <p class="user-feedback">
              ${t}
              </p>
              <p class="user-name">${o}</p>
            </div>
          </li>`}).join("");l.listFeedbacks.insertAdjacentHTML("beforeend",a)}y();
//# sourceMappingURL=index.js.map
