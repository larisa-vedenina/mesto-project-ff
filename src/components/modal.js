export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalEsc);
}

//  export function removeOpenPopup() {
//   document
//     .querySelector(".popup_is-opened")
//     .classList.remove("popup_is-opened");
// }

 function closeModalEsc(event) {
  if (event.key === "Escape") {
    closeModal(document
      .querySelector(".popup_is-opened"));
  }
}

