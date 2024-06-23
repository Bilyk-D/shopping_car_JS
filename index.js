import cart from "./cart.js";
import items from "./items.js";
let app = document.getElementById("app");
let content = document.getElementById("content");

const loadTemplate = () => {
  fetch("/template.html")
    .then((response) => response.text())
    .then((html) => {
      app.innerHTML = html;
      let selectedItem = document.getElementById("selected-item");

      selectedItem.innerHTML = content.innerHTML;
      content.innerHTML = null;
      cart();
      initApp();
    });
};

loadTemplate();

const initApp = () => {
  let contentItems = document.querySelector(".content__items");
  contentItems.innerHTML = null;
  items.forEach((item) => {
    let newItem = document.createElement("div");
    newItem.classList.add("item");
    newItem.innerHTML = `
<a href="/detail.html?id=${item.id}">
      <img src="${item.image}"/>
        </a>
    <h2>${item.name}</h2>
    <div class="price">$${item.price}</div>
    <button class="addCart" data-id="${item.id}">BUY</button>
        `;
    contentItems.appendChild(newItem);
  });
};
