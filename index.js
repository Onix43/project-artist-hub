import{a as c}from"./assets/vendor-BJ9gahTP.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const i of e.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function r(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const l=c.create({baseURL:"https://sound-wave.b.goit.study/api"});async function u(o){return(await l.get("/artists",{params:{limit:8,...o}})).data}const d={learnMoteBtn:document,listArtists:document.querySelector(".artists-list")},f="/project-artist-hub/assets/symbol-defs-CjLODlaq.svg";async function m(){const{artists:o}=await u(),s=o.map(({_id:n,strArtist:r,strBiographyEN:t,strArtistThumb:e,genres:i})=>`
        <li class="artists-list-item" data-artist-id="${n}">
          <div class="list-item-img">
            <img src="${e}" alt="${r}" />
          </div>
          <ul class="artists-tags-list">
            ${i.map(a=>`
                <li class="tags-list-item">${a}</li>
              `).join("")}
          </ul>
          <h3 class="list-item-title">${r}</h3>
          <p class="list-item-descr">
            ${t}
          </p>
          <button class="list-item-btn">
            Load More
            <span>
              <svg width="8" height="14">
                <use href="${f}#learn-more"></use>
              </svg>
            </span>
          </button>
        </li>
      `).join("");d.listArtists.insertAdjacentHTML("beforeend",s)}m();
//# sourceMappingURL=index.js.map
