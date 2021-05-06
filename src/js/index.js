import galleryItems from "./gallery-items.js";

const lightboxNode = document.querySelector(".js-lightbox");
const imgRef = document.querySelector(".lightbox__image");
const galleryNode = document.querySelector(".js-gallery");

const elements = galleryItems.map(({ preview, original, description }) => {
  const liNode = document.createElement("li");

  liNode.classList.add("gallery__item");

  const aNode = document.createElement("a");

  aNode.classList.add("gallery__link");
  aNode.href = original;

  const imgNode = document.createElement("img");
  imgNode.classList.add("gallery__img");
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
  imgRef.src = event.target.dataset.source;
}

console.log(elements);
galleryNode.append(...elements);
