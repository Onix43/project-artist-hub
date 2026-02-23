import{S as E,N as B,P as T,a as q}from"./assets/vendor-fJp_pnmi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();new E(".swiper",{spaceBetween:20,speed:500,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",dynamicBullets:!0,type:"bullets",clickable:!0},modules:[B,T]});const o={listArtists:document.querySelector(".artists-list"),listFeedbacks:document.querySelector(".js-list-feedbacks"),menu:document.querySelector("[data-menu]"),toggleBtn:document.querySelector("[data-menu-toggle]"),navLinks:document.querySelectorAll(".nav-list a")};//! Анімація кнопки
const y=document.querySelector(".btn-feedback-modal"),j=()=>{const i=()=>{y.classList.add("shake-bottom"),setTimeout(()=>{y.classList.remove("shake-bottom")},800)};i(),setInterval(i,1e4)};j();const v=q.create({baseURL:"https://sound-wave.b.goit.study/api"});async function x(i){return(await v.get("/artists",{params:{limit:8,...i}})).data}async function F(i){return(await v.get(`/artists/${i}/albums`)).data}const h="/project-artist-hub/assets/symbol-defs-0ZSth0dU.svg";async function N(){const{artists:i}=await x(),t=i.map(({_id:n,strArtist:a,strBiographyEN:e,strArtistThumb:s,genres:r})=>`
        <li class="artists-list-item" data-artist-id="${n}">
          <div class="list-item-img">
            <img src="${s}" alt="${a}" />
          </div>
          <ul class="artists-tags-list">
            ${r.map(l=>`
                <li class="tags-list-item">${l}</li>
              `).join("")}
          </ul>
          <h3 class="list-item-title">${a}</h3>
          <p class="list-item-descr">
            ${e}
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
      `).join("");o.listArtists.insertAdjacentHTML("beforeend",t)}N();async function O(){return(await v.get("/feedbacks",{params:{limit:10,page:1}})).data}async function C(){const t=(await O()).data.map(({name:n,rating:a,descr:e})=>{const s=a-Math.floor(a),r=Math.floor(a);let l;return s>=.1&&s<=.2?l=r:s>.2&&s<.8?l=`${r}-5`:s>=.8&&s<=.9?l=r+1:l=r,`
         <li class="swiper-slide">
            <div class="wrapper">
              <div class="stars-static rating-set-${l}">
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
                <div class="star"></div>
              </div>
              <p class="user-feedback">
              ${e}
              </p>
              <p class="user-name">${n}</p>
            </div>
          </li>`}).join("");o.listFeedbacks.insertAdjacentHTML("beforeend",t)}C();function I(i){const t=Math.floor(i/1e3),n=Math.floor(t/60),a=t%60,e=String(a).padStart(2,"0");return`${n}:${e}`}function P(i,t){const{strArtist:n,strArtistThumb:a,intFormedYear:e,intDiedYear:s,strGender:r,intMembers:l,strCountry:c,strBiographyEN:g,genres:b=[],albumsList:k=[]}=t;let u="Information missing";e&&s?u=`${e} – ${s}`:e&&(u=`${e} – present`);const $=b.length?b.map(m=>`<li class="modal-artist-genre-item">${m}</li>`).join(""):'<li class="modal-artist-genre-item">No genres listed</li>',L=k.map(m=>{const M=(m.tracks||[]).map(d=>{const A=I(d.intDuration)||"",S=d.movie?`<a class="modal-artist-track-link" href="${d.movie}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${d.strTrack} on YouTube">
            <svg class="modal-artist-track-icon" width="24" height="24">
              <use href="${h}#youtube"></use>
            </svg>
           </a>`:'<div class="modal-artist-track-link"></div>';return`
        <li class="modal-artist-track-item">
          <p class="modal-artist-track-name">${d.strTrack}</p>
          <p class="modal-artist-track-time">${A}</p>
          ${S}
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
          ${M}
        </ul>
      </li>
    `}).join(""),w=g?g.split(`
`)[0]:"No biography available.";i.innerHTML=`
    <h3 class="modal-artist-name">${n||""}</h3>

    <div class="modal-artist-header">
      <img class="modal-artist-image" src="${a||""}" alt="${n||"Artist photo"}" />

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
          ${l?`
          <p class="modal-artist-members">
            <span class="modal-artist-info-label">Members</span>
            <span class="modal-artist-members-value">${l}</span>
          </p>`:""}
          <p class="modal-artist-country">
            <span class="modal-artist-info-label">Country</span>
            <span class="modal-artist-country-value">${c||"Information missing"}</span>
          </p>
        </div>

        <div class="modal-artist-description">
          <h4 class="modal-artist-description-title">Biography</h4>
          <p class="modal-artist-description-text">${w}</p>
        </div>
        
        <div class="modal-artist-genres">
          <ul class="modal-artist-genre-list">
            ${$}
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
  `}let f=[];async function Y(i){const t=document.querySelector(".modal-artist"),n=document.querySelector(".modal-artist-close"),a=document.querySelector(".modal-artist-loader"),e=document.querySelector(".modal-artist-content");if(!t||!n||!a||!e){console.error("Modal elements not found in DOM");return}t.classList.add("is-open"),document.body.style.overflow="hidden",a.style.display="block",e.style.display="none";try{const c=await F(i);P(e,c),a.style.display="none",e.style.display="flex"}catch{a.textContent="Failed to load artist data. Please try again."}const s=()=>p(t),r=c=>{c.target===t&&p(t)},l=c=>{c.key==="Escape"&&p(t)};n.addEventListener("click",s),t.addEventListener("click",r),document.addEventListener("keydown",l),f=[{el:n,event:"click",handler:s},{el:t,event:"click",handler:r},{el:document,event:"keydown",handler:l}]}function p(i){i.classList.remove("is-open"),document.body.style.overflow="",f.forEach(({el:t,event:n,handler:a})=>{t.removeEventListener(n,a)}),f=[]}o.listArtists.addEventListener("click",i=>{const t=i.target.closest(".list-item-btn");if(!t)return;const n=t.closest("[data-artist-id]").dataset.artistId;n&&Y(n)});if(o.menu&&o.toggleBtn){const i=()=>{o.menu.classList.add("is-open"),o.toggleBtn.classList.add("is-open"),o.toggleBtn.setAttribute("aria-expanded","true"),document.body.classList.add("is-menu-open")},t=()=>{o.menu.classList.remove("is-open"),o.toggleBtn.classList.remove("is-open"),o.toggleBtn.setAttribute("aria-expanded","false"),document.body.classList.remove("is-menu-open")},n=()=>{o.menu.classList.contains("is-open")?t():i()};o.toggleBtn.addEventListener("click",n),o.navLinks.forEach(a=>a.addEventListener("click",t)),document.addEventListener("keydown",a=>{a.key==="Escape"&&t()}),window.addEventListener("resize",()=>{window.innerWidth>=768&&t()})}
//# sourceMappingURL=index.js.map
