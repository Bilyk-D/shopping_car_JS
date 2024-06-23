import items from "./items.js";
const cart = () => {
  let hedIcon = document.querySelector(".header__icon");
  let closeBtn = document.querySelector(".buttons-cart__close");
  let body = document.querySelector("body");
  let buyItems = [];
  let allItemPrice = 0;
  let cartPrice = document.querySelector(".resum-cart__price");
  let totalPrice = 0;
  let totalArr = [];

  hedIcon.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });
  closeBtn.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
  });

  const setItemInCart = (idItem, quantity, position) => {
    if (quantity > 0) {
      if (position < 0) {
        buyItems.push({
          item_id: idItem,
          quantity: quantity,
        });
      } else {
        buyItems[position].quantity = quantity;
      }
    } else {
      buyItems.splice(position, 1);
    }

    localStorage.setItem("buyItems", JSON.stringify(buyItems));
    refreshItemHTML();
  };
  const refreshItemHTML = () => {
    let itemHTML = document.querySelector(".cart__body");
    let totalHTML = document.querySelector(".header__amount");
    let totalQuantity = 0;
    totalArr.length = 0;

    itemHTML.innerHTML = null;
    buyItems.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let position = items.findIndex((value) => value.id == item.item_id);
      let info = items[position];

      let newBuyItem = document.createElement("div");
      newBuyItem.classList.add("item");
      totalArr.push(info.price * item.quantity);
      console.log(totalArr);
      newBuyItem.innerHTML = `
                  <div class="image">
                    <img src="${info.image}"/>
                      </div>
                        <div class="name">
                        ${info.name}
                        </div>
                        <div class="totalPrice">$${
                          info.price * item.quantity
                        }</div>
                        <div class="quantity">
                            <span class="minus" data-id="${info.id}">-</span>
                            <span>${item.quantity}</span>
                            <span class="plus" data-id="${
                              info.id
                            }">+</span> </div>
                    `;

      itemHTML.appendChild(newBuyItem);
    });

    totalHTML.innerText = totalQuantity;

    calculated();
  };
  const calculated = () => {
    totalPrice = 0;
    totalArr.forEach(function (num) {
      totalPrice += num;
    });

    if (totalPrice > 0) {
      cartPrice.innerHTML = totalPrice;
    } else {
      cartPrice.innerHTML = 0;
    }
  };
  document.addEventListener("click", (event) => {
    let buttonClick = event.target;
    let idItem = buttonClick.dataset.id;
    let position = buyItems.findIndex((value) => value.item_id == idItem);
    let quantity = position < 0 ? 0 : buyItems[position].quantity;

    if (
      buttonClick.classList.contains("addCart") ||
      buttonClick.classList.contains("plus")
    ) {
      quantity++;
      setItemInCart(idItem, quantity, position);
    } else if (buttonClick.classList.contains("minus")) {
      quantity--;
      setItemInCart(idItem, quantity, position);
    }
  });

  const initApp = () => {
    if (localStorage.getItem("buyItems")) {
      buyItems = JSON.parse(localStorage.getItem("buyItems"));
    }
    refreshItemHTML();
  };
  initApp();
};
export default cart;
