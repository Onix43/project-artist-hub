import{S as C,N as F,P as N,a as P}from"./assets/vendor-fJp_pnmi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function i(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(s){if(s.ep)return;s.ep=!0;const n=i(s);fetch(s.href,n)}})();new C(".swiper",{spaceBetween:20,speed:500,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},pagination:{el:".swiper-pagination",dynamicBullets:!0,type:"bullets",clickable:!0},modules:[F,N]});const r={listFeedbacks:document.querySelector(".js-list-feedbacks"),leaveFeedbackBtn:document.querySelector(".btn-feedback-modal"),listArtists:document.querySelector(".artists-list"),loadMoreArtistsBtn:document.querySelector(".js-load-more-btn"),loaderArtists:document.querySelector(".artists-results .loader"),menu:document.querySelector("[data-menu]"),toggleBtn:document.querySelector("[data-menu-toggle]"),navLinks:document.querySelectorAll(".nav-list a")};//! Анімація кнопки
const O=()=>{const e=()=>{r.leaveFeedbackBtn.classList.add("shake-bottom"),setTimeout(()=>{r.leaveFeedbackBtn.classList.remove("shake-bottom")},800)};e(),setInterval(e,1e4)};O();const b=P.create({baseURL:"https://sound-wave.b.goit.study/api"});async function I(){return(await b.get("/feedbacks",{params:{limit:10,page:1}})).data}async function D(){const t=(await I()).data.map(({name:i,rating:a,descr:s})=>{const n=a-Math.floor(a),o=Math.floor(a);let l;return n>=.1&&n<=.2?l=o:n>.2&&n<.8?l=`${o}-5`:n>=.8&&n<=.9?l=o+1:l=o,`
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
              ${s}
              </p>
              <p class="user-name">${i}</p>
            </div>
          </li>`}).join("");r.listFeedbacks.insertAdjacentHTML("beforeend",t)}D();async function L(e){return(await b.get("/artists",{params:{limit:8,...e}})).data}async function Y(e){return(await b.get(`/artists/${e}/albums`)).data}const $="/project-artist-hub/assets/symbol-defs-0ZSth0dU.svg";function H(e){const{_id:t,strArtist:i,strBiographyEN:a,strArtistThumb:s,genres:n}=e;return`
      <li class="artists-list-item" data-artist-id="${t}">
        <div class="list-item-img">
          <img src="${s}" alt="${i}" />
        </div>
        <ul class="artists-tags-list">
          ${n.map(o=>`
              <li class="tags-list-item">${o}</li>
            `).join("")}
        </ul>
        <h3 class="list-item-title">${i}</h3>
        <p class="list-item-descr">
          ${a}
        </p>
        <button class="list-item-btn">
          Learn More
          <span>
            <svg width="8" height="14">
              <use href="${$}#learn-more"></use>
            </svg>
          </span>
        </button>
      </li>
    `}function A(e,t=1){const i=e.map(H).join("");return r.listArtists.insertAdjacentHTML("beforeend",i)}const w=r.loaderArtists;function z(){w.style.display="inline-block"}function R(){w.style.display="none"}const m=r.loadMoreArtistsBtn;console.log(m);const M=r.listArtists;let f=1;async function U(){z(),k(),f++;try{const{artists:e,totalArtists:t,limit:i,page:a}=await L({page:f}),s=Math.ceil(t/i);a<s&&W(),a===s&&(f=1,k(),M.style.marginBottom="0px"),A(e,a),_()}catch(e){console.log(e.message)}finally{R()}}function W(){m.hasAttribute("hidden")&&m.removeAttribute("hidden")}function k(){m.hasAttribute("hidden")||m.setAttribute("hidden","")}function _(){const e=M.firstElementChild;if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t,behavior:"smooth"})}r.loadMoreArtistsBtn.addEventListener("click",U);async function G(){try{const{artists:e,page:t}=await L();A(e,t)}catch(e){console.log(e.message)}}G();function K(e){const t=Math.floor(e/1e3),i=Math.floor(t/60),a=t%60,s=String(a).padStart(2,"0");return`${i}:${s}`}function Z(e,t){const{strArtist:i,strArtistThumb:a,intFormedYear:s,intDiedYear:n,strGender:o,intMembers:l,strCountry:c,strBiographyEN:y,genres:h=[],albumsList:B=[]}=t;let p="Information missing";s&&n?p=`${s} – ${n}`:s&&(p=`${s} – present`);const E=h.length?h.map(u=>`<li class="modal-artist-genre-item">${u}</li>`).join(""):'<li class="modal-artist-genre-item">No genres listed</li>',S=B.map(u=>{const T=(u.tracks||[]).map(d=>{const j=K(d.intDuration)||"",x=d.movie?`<a class="modal-artist-track-link" href="${d.movie}" target="_blank" rel="noopener noreferrer" aria-label="Watch ${d.strTrack} on YouTube">
            <svg class="modal-artist-track-icon" width="24" height="24">
              <use href="${$}#youtube"></use>
            </svg>
           </a>`:'<div class="modal-artist-track-link"></div>';return`
        <li class="modal-artist-track-item">
          <p class="modal-artist-track-name">${d.strTrack}</p>
          <p class="modal-artist-track-time">${j}</p>
          ${x}
        </li>
      `}).join("");return`
      <li class="modal-artist-album-item">
        <h4 class="modal-artist-album-name">${u.strAlbum}</h4>
        <div class="modal-artist-track-header">
          <p class="modal-artist-track-title-name">Track</p>
          <p class="modal-artist-track-title-time">Time</p>
          <p class="modal-artist-track-title-link">Link</p>
        </div>
        <ul class="modal-artist-track-list">
          ${T}
        </ul>
      </li>
    `}).join(""),q=y?y.split(`
`)[0]:"No biography available.";e.innerHTML=`
    <h3 class="modal-artist-name">${i||""}</h3>

    <div class="modal-artist-header">
      <img class="modal-artist-image" src="${a||""}" alt="${i||"Artist photo"}" />

      <div class="modal-artist-details">
        <div class="modal-artist-info">
          <p class="modal-artist-years">
            <span class="modal-artist-info-label">Years active</span>
            <span class="modal-artist-years-value">${p}</span>
          </p>
          ${o?`
          <p class="modal-artist-gender">
            <span class="modal-artist-info-label">Sex</span>
            <span class="modal-artist-gender-value">${o}</span>
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
          <p class="modal-artist-description-text">${q}</p>
        </div>
        
        <div class="modal-artist-genres">
          <ul class="modal-artist-genre-list">
            ${E}
          </ul>
        </div>
      </div>
    </div>

    <div class="modal-artist-albums">
      <h4 class="modal-artist-albums-title">Albums</h4>
      <ul class="modal-artist-album-list">
        ${S}
      </ul>
    </div>
  `}let v=[];async function J(e){const t=document.querySelector(".modal-artist"),i=document.querySelector(".modal-artist-close"),a=document.querySelector(".modal-artist-loader"),s=document.querySelector(".modal-artist-content");if(!t||!i||!a||!s){console.error("Modal elements not found in DOM");return}t.classList.add("is-open"),document.body.style.overflow="hidden",a.style.display="block",s.style.display="none";try{const c=await Y(e);Z(s,c),a.style.display="none",s.style.display="flex"}catch{a.textContent="Failed to load artist data. Please try again."}const n=()=>g(t),o=c=>{c.target===t&&g(t)},l=c=>{c.key==="Escape"&&g(t)};i.addEventListener("click",n),t.addEventListener("click",o),document.addEventListener("keydown",l),v=[{el:i,event:"click",handler:n},{el:t,event:"click",handler:o},{el:document,event:"keydown",handler:l}]}function g(e){e.classList.remove("is-open"),document.body.style.overflow="",v.forEach(({el:t,event:i,handler:a})=>{t.removeEventListener(i,a)}),v=[]}r.listArtists.addEventListener("click",e=>{const t=e.target.closest(".list-item-btn");if(!t)return;const i=t.closest("[data-artist-id]").dataset.artistId;i&&J(i)});if(r.menu&&r.toggleBtn){const e=()=>{r.menu.classList.add("is-open"),r.toggleBtn.classList.add("is-open"),r.toggleBtn.setAttribute("aria-expanded","true"),document.body.classList.add("is-menu-open")},t=()=>{r.menu.classList.remove("is-open"),r.toggleBtn.classList.remove("is-open"),r.toggleBtn.setAttribute("aria-expanded","false"),document.body.classList.remove("is-menu-open")},i=()=>{r.menu.classList.contains("is-open")?t():e()};r.toggleBtn.addEventListener("click",i),r.navLinks.forEach(a=>a.addEventListener("click",t)),document.addEventListener("keydown",a=>{a.key==="Escape"&&t()}),window.addEventListener("resize",()=>{window.innerWidth>=768&&t()})}
//# sourceMappingURL=index.js.map
