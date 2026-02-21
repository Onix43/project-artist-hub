import{S as E,N as j,P as T,a as x}from"./assets/vendor-fJp_pnmi.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const l of e.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();new E(".swiper",{spaceBetween:20,speed:500,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",dynamicBullets:!0,type:"bullets",clickable:!0},modules:[j,T]});const f=x.create({baseURL:"https://sound-wave.b.goit.study/api"});async function F(r){return(await f.get("/artists",{params:{limit:8,...r}})).data}async function N(r){return(await f.get(`/artists/${r}/albums`)).data}const y={learnMoteBtn:document,listArtists:document.querySelector(".artists-list"),listFeedbacks:document.querySelector(".js-list-feedbacks")},h="/project-artist-hub/assets/symbol-defs-CxF1Hgjl.svg";async function q(){const{artists:r}=await F(),s=r.map(({_id:i,strArtist:a,strBiographyEN:t,strArtistThumb:e,genres:l})=>`
        <li class="artists-list-item" data-artist-id="${i}">
          <div class="list-item-img">
            <img src="${e}" alt="${a}" />
          </div>
          <ul class="artists-tags-list">
            ${l.map(n=>`
                <li class="tags-list-item">${n}</li>
              `).join("")}
          </ul>
          <h3 class="list-item-title">${a}</h3>
          <p class="list-item-descr">
            ${t}
          </p>
          <button class="list-item-btn">
            Load More
            <span>
              <svg width="8" height="14">
                <use href="${h}#learn-more"></use>
              </svg>
            </span>
          </button>
        </li>
      `).join("");y.listArtists.insertAdjacentHTML("beforeend",s)}q();let p=[];async function O(r){const s=document.querySelector(".modal-artist"),i=document.querySelector(".modal-artist-close"),a=document.querySelector(".modal-artist-loader"),t=document.querySelector(".modal-artist-content");if(!s||!i||!a||!t){console.error("Modal elements not found in DOM");return}s.classList.add("is-open"),document.body.style.overflow="hidden",a.style.display="block",t.style.display="none";try{const o=await N(r);B(t,o),a.style.display="none",t.style.display="flex"}catch(o){console.error("Error fetching artist data:",o),a.textContent="Failed to load artist data. Please try again."}const e=()=>u(s),l=o=>{o.target===s&&u(s)},n=o=>{o.key==="Escape"&&u(s)};i.addEventListener("click",e),s.addEventListener("click",l),document.addEventListener("keydown",n),p=[{el:i,event:"click",handler:e},{el:s,event:"click",handler:l},{el:document,event:"keydown",handler:n}]}function u(r){r.classList.remove("is-open"),document.body.style.overflow="",p.forEach(({el:s,event:i,handler:a})=>{s.removeEventListener(i,a)}),p=[]}function B(r,s){const{strArtist:i,strArtistThumb:a,intFormedYear:t,intDiedYear:e,strGender:l,intMembers:n,strCountry:o,strBiographyEN:v,genres:b=[],albumsList:$=[]}=s;let m="Information missing";t&&e?m=`${t} – ${e}`:t&&(m=`${t} – present`);const k=b.length?b.map(d=>`<li class="modal-artist-genre-item">${d}</li>`).join(""):'<li class="modal-artist-genre-item">No genres listed</li>',L=$.map(d=>{const M=(d.tracks||[]).map(c=>{const S=C(c.intDuration)||"",A=c.movie?`<a class="modal-artist-track-link" href="${c.movie}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${c.strTrack} on YouTube">
            <svg class="modal-artist-track-icon" width="24" height="24">
              <use href="${h}#youtube"></use>
            </svg>
           </a>`:'<div class="modal-artist-track-link"></div>';return`
        <li class="modal-artist-track-item">
          <p class="modal-artist-track-name">${c.strTrack}</p>
          <p class="modal-artist-track-time">${S}</p>
          ${A}
        </li>
      `}).join("");return`
      <li class="modal-artist-album-item">
        <h4 class="modal-artist-album-name">${d.strAlbum}</h4>
        <div class="modal-artist-track-header">
          <p class="modal-artist-track-title-name">Track</p>
          <p class="modal-artist-track-title-time">Time</p>
          <p class="modal-artist-track-title-link">Link</p>
        </div>
        <ul class="modal-artist-track-list">
          ${M}
        </ul>
      </li>
    `}).join(""),w=v?v.split(`
`)[0]:"No biography available.";r.innerHTML=`
    <h3 class="modal-artist-name">${i||""}</h3>

    <div class="modal-artist-header">
      <img class="modal-artist-image" src="${a||""}" alt="${i||"Artist photo"}" />

      <div class="modal-artist-details">
        <div class="modal-artist-info">
          <p class="modal-artist-years">
            <span class="modal-artist-info-label">Years active</span>
            <span class="modal-artist-years-value">${m}</span>
          </p>
          ${l?`
          <p class="modal-artist-gender">
            <span class="modal-artist-info-label">Sex</span>
            <span class="modal-artist-gender-value">${l}</span>
          </p>`:""}
          ${n?`
          <p class="modal-artist-members">
            <span class="modal-artist-info-label">Members</span>
            <span class="modal-artist-members-value">${n}</span>
          </p>`:""}
          <p class="modal-artist-country">
            <span class="modal-artist-info-label">Country</span>
            <span class="modal-artist-country-value">${o||"Information missing"}</span>
          </p>
        </div>

        <div class="modal-artist-description">
          <h4 class="modal-artist-description-title">Biography</h4>
          <p class="modal-artist-description-text">${w}</p>
        </div>
        
        <div class="modal-artist-genres">
          <ul class="modal-artist-genre-list">
            ${k}
          </ul>
        </div>
      </div>
    </div>

    <div class="modal-artist-albums">
      <h4 class="modal-artist-albums-title">Albums</h4>
      <ul class="modal-artist-album-list">
        ${L}
      </ul>
    </div>
  `}function C(r){const s=Math.floor(r/1e3),i=Math.floor(s/60),a=s%60,t=String(a).padStart(2,"0");return`${i}:${t}`}async function P(){return(await f.get("/feedbacks",{params:{limit:10,page:1}})).data}async function I(){const s=(await P()).data.map(({name:i,rating:a,descr:t})=>{const e=a-Math.floor(a),l=Math.floor(a);let n;return e>=.1&&e<=.2?n=l:e>.2&&e<.8?n=`${l}-5`:e>=.8&&e<=.9?n=l+1:n=l,`
         <li class="swiper-slide">
            <div class="wrapper">
              <div class="stars-static rating-set-${n}">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
              </div>
              <p class="user-feedback">
              ${t}
              </p>
              <p class="user-name">${i}</p>
            </div>
          </li>`}).join("");y.listFeedbacks.insertAdjacentHTML("beforeend",s)}I();const g=document.querySelector(".artists-list");g&&g.addEventListener("click",r=>{const s=r.target.closest(".list-item-btn");if(!s)return;const i=s.closest("[data-artist-id]").dataset.artistId;i&&O(i)});
//# sourceMappingURL=index.js.map
