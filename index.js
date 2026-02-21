import{S as l,N as c,P as u,a as p}from"./assets/vendor-fJp_pnmi.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();new l(".swiper",{spaceBetween:20,loop:!0,speed:500,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",type:"bullets",clickable:!0},modules:[c,u]});const d=p.create({baseURL:"https://sound-wave.b.goit.study/api"});async function m(o){return(await d.get("/artists",{params:{limit:8,...o}})).data}const f={learnMoteBtn:document,listArtists:document.querySelector(".artists-list")},g="/project-artist-hub/assets/symbol-defs-DKNemF2o.svg";async function y(){const{artists:o}=await m(),s=o.map(({_id:n,strArtist:i,strBiographyEN:t,strArtistThumb:e,genres:r})=>`
        <li class="artists-list-item" data-artist-id="${n}">
          <div class="list-item-img">
            <img src="${e}" alt="${i}" />
          </div>
          <ul class="artists-tags-list">
            ${r.map(a=>`
                <li class="tags-list-item">${a}</li>
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
      `).join("");f.listArtists.insertAdjacentHTML("beforeend",s)}y();
//# sourceMappingURL=index.js.map
