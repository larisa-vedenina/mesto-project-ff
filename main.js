(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n,o,r){var c=_.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__delete-button"),i=c.querySelector(".card__like-button");return a.alt=e.name,a.src=e.link,c.querySelector(".card__title").textContent=e.name,e.likes.some((function(e){return e._id===r}))&&i.classList("card__like-button_is-active"),u.addEventListener("click",(function(){t(e._id,c)})),i.addEventListener("click",n),a.addEventListener("click",o),c}function n(e){e.remove()}function o(e){e.target.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}e.d({},{T:()=>_});var u=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.classList.remove("popup__error_visible"),n.textContent=""},i=function(e,t){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove("popup__button_disabled"):t.classList.add("popup__button_disabled")},l=function(e,t){var n=e.querySelectorAll(t.inputSelector),o=Array.from(n),r=e.querySelector(t.submitButtonSelector);o.forEach((function(t){u(e,t)})),i(o,r)},s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-26",headers:{authorization:"c40fcb4d-f11d-4aae-95de-4f87cf7a7ffa","Content-Type":"application/json"}},p=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var f,_=document.querySelector("#card-template").content,m=document.querySelector(".content").querySelector(".places__list"),y=document.querySelectorAll(".popup"),v=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),S=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),g=document.querySelector(".popup__image"),L=document.querySelector(".popup__caption"),E=document.querySelector(".popup__button"),k=document.querySelector('[name="edit-profile"]'),C=document.querySelector('[name="name-input"]'),A=document.querySelector('[name="description-input"]'),x=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),O=document.querySelector('[name="new-place"]'),j=document.querySelector('[name="place-name-input"]'),T=document.querySelector('[name="link-input"]'),P=document.querySelector(".popup_type_update-avatar"),U=P.querySelector('[name="update-avatar"]'),D=document.querySelector(".popup__input_type_url_avatar"),I=document.querySelector(".profile__image"),M=(document.querySelector(".card__like-button"),document.querySelector(".like-count"),{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"});function N(e){E.innerText=e?"Сохранение...":"Сохранить"}function B(e){e.reset()}function J(e){g.src=e.target.src,g.alt=e.target.alt,L.textContent=e.target.closest(".card").querySelector(".card__title").textContent,r(q)}f=document.querySelectorAll(".popup__form"),Array.from(f).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}));var t=e.querySelectorAll(".form__set");Array.from(t).forEach((function(e){!function(e){var t=e.querySelectorAll(".popup__input"),n=Array.from(t),o=e.querySelector(".popup__button");i(n,o),n.forEach((function(t){t.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),o.textContent=n,o.classList.add("popup__error_visible")}(e,t,t.validationMessage)}(e,t),i(n,o)}))}))}(e)}))})),Promise.all([fetch("".concat(s.baseUrl,"/cards"),{method:"GET",headers:s.headers}).then(p),fetch("".concat(s.baseUrl,"/users/me"),{method:"GET",headers:s.headers}).then(p)]).then((function(e){var r,c,a=(c=2,function(e){if(Array.isArray(e))return e}(r=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==t);i=!0);}catch(e){l=!0,r=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(r,c)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(r,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=a[0],i=a[1];console.log({cards:u,userData:i}),x.textContent=i.name,w.textContent=i.about,u.forEach((function(e){m.append(t(e,n,o,J))}))})).catch((function(e){return console.log("Ошибка: ".concat(e))})),k.addEventListener("submit",(function(e){e.preventDefault(),N(!0),l(k,M),function(e,t){return fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:"".concat(e.value),about:"".concat(t.value)})}).then(p)}(C,A).then((function(e){console.log(e);var t={name:e.name,about:e.about};x.textContent=t.name,w.textContent=t.about,c(S),B(k)})).catch((function(e){return console.log("Ошибка: ".concat(e))})).finally((function(){E.classList.add("popup__button_disabled"),N(!1)}))})),I.addEventListener("click",(function(){r(P)})),O.addEventListener("submit",(function(e){e.preventDefault(),N(!0),function(e,t){return fetch("".concat(s.baseUrl,"/cards"),{method:"POST",headers:s.headers,body:JSON.stringify({name:"".concat(e.value),link:"".concat(t.value)})}).then(p)}(j,T).then((function(e){console.log(e);var r=t({name:e.name,link:e.link},n,o,J);m.prepend(r),c(h),B(O),l(O,M)})).catch((function(e){return console.log("Ошибка: ".concat(e))})).finally((function(){E.classList.add("popup__button_disabled"),N(!1)}))})),v.addEventListener("click",(function(){r(S)})),b.addEventListener("click",(function(){r(h)})),U.addEventListener("submit",(function(e){e.preventDefault(),N(!0),function(e){return fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:"".concat(e.value)})}).then(p)}(D).then((function(e){console.log(e);var t=e.avatar;I.style.backgroundImage="url("+t+")",c(P),B(U)})).catch((function(e){return console.log("Ошибка: ".concat(e))})).finally((function(){N(!1)}))})),y.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){c(e)}))})),y.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&c(e)}))}))})();