import items from "./items.js";
import cart from "./cart.js";
let app = document.getElementById("app");
let itemCard = document.getElementById("content__items");

const loadTemplate = () => {
  fetch("template.html")
    .then((response) => response.text())
    .then((html) => {
      app.innerHTML = html;
      let selectedItem = document.getElementById("selected-item");
      selectedItem.innerHTML = itemCard.innerHTML;
      itemCard.innerHTML = null;
      cart();
      initApp();
    });
};
loadTemplate();

const initApp = () => {
  let idItem = new URLSearchParams(window.location.search).get("id");
  let info = items.filter((value) => value.id == idItem)[0];
  if (!info) {
    window.Location.href = "/";
  }
  let detailItem = document.querySelector(".detail-item");

  detailItem.querySelector(".detail-item__image img").src = info.image;
  detailItem.querySelector(".content-item__name").innerText = info.name;
  detailItem.querySelector(".content-item__price").innerText = "$" + info.price;
  detailItem.querySelector(".content-item__description").innerText =
    info.description;
  detailItem.querySelector(".addCart").dataset.id = idItem;

  // similar product
  let simItems = document.querySelector(".item-card__sim-items");
  simItems.innerHTML = null;
  items
    .filter((value) => value.id != idItem)
    .forEach((items) => {
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.innerHTML = `
  <a href="/detail.html?id=${items.id}">
        <img src="${items.image}"/>
          </a>
      <h2>${items.name}</h2>
      <div class="price">${items.price}</div>
      <button class="addCart" data-id="${items.id}">BUY</button>
          `;
      simItems.appendChild(newItem);
    });
};
