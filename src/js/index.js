import galleryItems from "./gallery-items.js";

const lightboxNode = document.querySelector(".js-lightbox");
const imgRef = document.querySelector(".lightbox__image");
const galleryNode = document.querySelector(".js-gallery");
const closeButton = document.querySelector(".lightbox__button");
let indexImage = 0;

const elements = galleryItems.map(({ preview, original, description }) => {
  const liNode = document.createElement("li");

  liNode.classList.add("gallery__item");
  liNode.style.justifyContent = "space-between";

  const aNode = document.createElement("a");

  aNode.classList.add("gallery__link");
  aNode.href = original;

  const imgNode = document.createElement("img");
  imgNode.classList.add("gallery__img");
  imgNode.style.width = "100%";
  imgNode.style.height = "100%";
  imgNode.style.cursor = "pointer";
  imgNode.src = preview;
  imgNode.alt = description;
  imgNode.dataset.source = original;

  aNode.appendChild(imgNode);
  liNode.append(aNode);

  console.log(liNode);
  return liNode;
});

galleryNode.addEventListener("click", shownPopup);

function shownPopup(event) {
  event.preventDefault();
  if (event.target.tagName !== "IMG") return;
  console.log(event.target.dataset.source);
  console.log(event.target.alt);

  lightboxNode.classList.add("is-open");

  updateAttribute(event.target.dataset.source, event.target.alt);
}

closeButton.addEventListener("click", closePopup);

function closePopup(event) {
  lightboxNode.classList.remove("is-open");
  updateAttribute();
}

function updateAttribute(src = "", alt = "") {
  imgRef.src = src;
  imgRef.alt = alt;
}

console.log(elements);
galleryNode.append(...elements);

document.addEventListener("keyup", slider);

// document.addEventListener("keypress", slider);

function slider(event) {
  if (event.code === "arrowRight") {
    indexImage += 1;
    if (indexImage > galleryItems.length - 1) {
      indexImage = 0;
    }
  }
  if (event.code === "arrowLeft") {
    if (indexImage < 0) {
      indexImage = galleryItems.length - 1;
    }
  }
  updateAttribute(
    galleryItems[indexImage].original,
    galleryItems[indexImage].description
  );
}
