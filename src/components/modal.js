export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEsc);
}

export function closeModal(popup) {
  if (popup.target.classList.contains("popup__close")) {
    removeOpenPopup();
  } else if (popup.target.classList.contains("popup_is-opened")) {
    removeOpenPopup();
  }
  document.removeEventListener("keydown", closeModalEsc);
}

 function removeOpenPopup() {
  document
    .querySelector(".popup_is-opened")
    .classList.remove("popup_is-opened");
}

 function closeModalEsc(event) {
  if (event.kye === "Escape") {
    removeOpenPopup();
  }
}

