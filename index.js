import{S,N as A,P as B,a as T}from"./assets/vendor-fJp_pnmi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const e of s)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const e={};return s.integrity&&(e.integrity=s.integrity),s.referrerPolicy&&(e.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?e.credentials="include":s.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function a(s){if(s.ep)return;s.ep=!0;const e=i(s);fetch(s.href,e)}})();new S(".swiper",{spaceBetween:20,speed:500,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",dynamicBullets:!0,type:"bullets",clickable:!0},modules:[A,B]});const g=T.create({baseURL:"https://sound-wave.b.goit.study/api"});async function j(n){return(await g.get("/artists",{params:{limit:8,...n}})).data}async function q(n){return(await g.get(`/artists/${n}/albums`)).data}const l={listArtists:document.querySelector(".artists-list"),listFeedbacks:document.querySelector(".js-list-feedbacks"),menu:document.querySelector("[data-menu]"),toggleBtn:document.querySelector("[data-menu-toggle]"),navLinks:document.querySelectorAll(".nav-list a")},b="/project-artist-hub/assets/symbol-defs-0ZSth0dU.svg";async function x(){const{artists:n}=await j(),t=n.map(({_id:i,strArtist:a,strBiographyEN:s,strArtistThumb:e,genres:r})=>`
        <li class="artists-list-item" data-artist-id="${i}">
          <div class="list-item-img">
            <img src="${e}" alt="${a}" />
          </div>
          <ul class="artists-tags-list">
            ${r.map(o=>`
                <li class="tags-list-item">${o}</li>
              `).join("")}
          </ul>
          <h3 class="list-item-title">${a}</h3>
          <p class="list-item-descr">
            ${s}
          </p>
          <button class="list-item-btn">
            Load More
            <span>
              <svg width="8" height="14">
                <use href="${b}#learn-more"></use>
              </svg>
            </span>
          </button>
        </li>
      `).join("");l.listArtists.insertAdjacentHTML("beforeend",t)}x();async function N(){return(await g.get("/feedbacks",{params:{limit:10,page:1}})).data}async function F(){const t=(await N()).data.map(({name:i,rating:a,descr:s})=>{const e=a-Math.floor(a),r=Math.floor(a);let o;return e>=.1&&e<=.2?o=r:e>.2&&e<.8?o=`${r}-5`:e>=.8&&e<=.9?o=r+1:o=r,`
         <li class="swiper-slide">
            <div class="wrapper">
              <div class="stars-static rating-set-${o}">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
              </div>
              <p class="user-feedback">
              ${s}
              </p>
              <p class="user-name">${i}</p>
            </div>
          </li>`}).join("");l.listFeedbacks.insertAdjacentHTML("beforeend",t)}F();function O(n){const t=Math.floor(n/1e3),i=Math.floor(t/60),a=t%60,s=String(a).padStart(2,"0");return`${i}:${s}`}function P(n,t){const{strArtist:i,strArtistThumb:a,intFormedYear:s,intDiedYear:e,strGender:r,intMembers:o,strCountry:c,strBiographyEN:v,genres:y=[],albumsList:h=[]}=t;let u="Information missing";s&&e?u=`${s} – ${e}`:s&&(u=`${s} – present`);const k=y.length?y.map(m=>`<li class="modal-artist-genre-item">${m}</li>`).join(""):'<li class="modal-artist-genre-item">No genres listed</li>',$=h.map(m=>{const w=(m.tracks||[]).map(d=>{const M=O(d.intDuration)||"",E=d.movie?`<a class="modal-artist-track-link" href="${d.movie}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${d.strTrack} on YouTube">
            <svg class="modal-artist-track-icon" width="24" height="24">
              <use href="${b}#youtube"></use>
            </svg>
           </a>`:'<div class="modal-artist-track-link"></div>';return`
        <li class="modal-artist-track-item">
          <p class="modal-artist-track-name">${d.strTrack}</p>
          <p class="modal-artist-track-time">${M}</p>
          ${E}
        </li>
      `}).join("");return`
      <li class="modal-artist-album-item">
        <h4 class="modal-artist-album-name">${m.strAlbum}</h4>
        <div class="modal-artist-track-header">
          <p class="modal-artist-track-title-name">Track</p>
          <p class="modal-artist-track-title-time">Time</p>
          <p class="modal-artist-track-title-link">Link</p>
        </div>
        <ul class="modal-artist-track-list">
          ${w}
        </ul>
      </li>
    `}).join(""),L=v?v.split(`
`)[0]:"No biography available.";n.innerHTML=`
    <h3 class="modal-artist-name">${i||""}</h3>

    <div class="modal-artist-header">
      <img class="modal-artist-image" src="${a||""}" alt="${i||"Artist photo"}" />

      <div class="modal-artist-details">
        <div class="modal-artist-info">
          <p class="modal-artist-years">
            <span class="modal-artist-info-label">Years active</span>
            <span class="modal-artist-years-value">${u}</span>
          </p>
          ${r?`
          <p class="modal-artist-gender">
            <span class="modal-artist-info-label">Sex</span>
            <span class="modal-artist-gender-value">${r}</span>
          </p>`:""}
          ${o?`
          <p class="modal-artist-members">
            <span class="modal-artist-info-label">Members</span>
            <span class="modal-artist-members-value">${o}</span>
          </p>`:""}
          <p class="modal-artist-country">
            <span class="modal-artist-info-label">Country</span>
            <span class="modal-artist-country-value">${c||"Information missing"}</span>
          </p>
        </div>

        <div class="modal-artist-description">
          <h4 class="modal-artist-description-title">Biography</h4>
          <p class="modal-artist-description-text">${L}</p>
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
        ${$}
      </ul>
    </div>
  `}let f=[];async function C(n){const t=document.querySelector(".modal-artist"),i=document.querySelector(".modal-artist-close"),a=document.querySelector(".modal-artist-loader"),s=document.querySelector(".modal-artist-content");if(!t||!i||!a||!s){console.error("Modal elements not found in DOM");return}t.classList.add("is-open"),document.body.style.overflow="hidden",a.style.display="block",s.style.display="none";try{const c=await q(n);P(s,c),a.style.display="none",s.style.display="flex"}catch{a.textContent="Failed to load artist data. Please try again."}const e=()=>p(t),r=c=>{c.target===t&&p(t)},o=c=>{c.key==="Escape"&&p(t)};i.addEventListener("click",e),t.addEventListener("click",r),document.addEventListener("keydown",o),f=[{el:i,event:"click",handler:e},{el:t,event:"click",handler:r},{el:document,event:"keydown",handler:o}]}function p(n){n.classList.remove("is-open"),document.body.style.overflow="",f.forEach(({el:t,event:i,handler:a})=>{t.removeEventListener(i,a)}),f=[]}l.listArtists.addEventListener("click",n=>{const t=n.target.closest(".list-item-btn");if(!t)return;const i=t.closest("[data-artist-id]").dataset.artistId;i&&C(i)});if(l.menu&&l.toggleBtn){const n=()=>{l.menu.classList.add("is-open"),l.toggleBtn.classList.add("is-open"),l.toggleBtn.setAttribute("aria-expanded","true"),document.body.classList.add("is-menu-open")},t=()=>{l.menu.classList.remove("is-open"),l.toggleBtn.classList.remove("is-open"),l.toggleBtn.setAttribute("aria-expanded","false"),document.body.classList.remove("is-menu-open")},i=()=>{l.menu.classList.contains("is-open")?t():n()};l.toggleBtn.addEventListener("click",i),l.navLinks.forEach(a=>a.addEventListener("click",t)),document.addEventListener("keydown",a=>{a.key==="Escape"&&t()}),window.addEventListener("resize",()=>{window.innerWidth>=768&&t()})}
//# sourceMappingURL=index.js.map
