"use strict";

let basket = [];

// Set ID
let appId = document.querySelector(".app-container");
appId.setAttribute("id", "app");

let cart = document.querySelector(".red-info");
cart.setAttribute("id", "top-cart-count");
cart.nextSibling.nextSibling.setAttribute("id", "top-cart-sum");

let buttonOrder = document.querySelector(".btn-check");
buttonOrder.setAttribute("id", "arrange-order");

let filterSelect = document.querySelectorAll(".select-control");
filterSelect[0].setAttribute("id", "filter-category");
filterSelect[1].setAttribute("id", "filter-price");

// Lazy method for category

let sirnic = document.querySelectorAll(".product-box__title");
sirnic.forEach((el) => {
  let sir = el.parentNode;
  if (el.innerText === "Сырники со сметаной") {
    sir.parentNode.appendChild(sir);
  }
});

// CreateModal

let modal = document.createElement("div");
let app = document.querySelector("#app");
modal.setAttribute("id", "modal");
modal.setAttribute("style", "display: none");
modal.innerHTML = `
        <div style="position: fixed; width: 100%; height: 100%; background-color: beige; opacity: 0.95;">
            <div  style="position: fixed; text-align: center; width: 50%;     margin-left: 25%;
            margin-top: 20%; background-color: lightgray;">
                <h1>Модальное окно</h1>
                <form action="">
                    
                    <label for="phone">Введите номер телефона</label>
                    <br>
                    <input id="modal-phone" name="phone" type="phone" placeholder="phone">
                    <br>
                    <label for="email">Введите свой имеил</label>
                    <br>
                    <input id="modal-email" name="email" type="email" placeholder="email@email.com">
                    <br>
        
                    <button id="modal-send">Отправить</button>
                    <button id="modal-close">Закрыть</button>
                </form>
            </div>
        </div>`;

app.prepend(modal);

// Set data attributes for items

let item = document.querySelectorAll(".qty__item");

item.forEach((el, i) => {
  let minValue = 0;
  let price = priceItem(el);
  let newProduct = {
    count: 0,
    price: price,
    sum: 0,
  };

  el.setAttribute("min", minValue);
  el.setAttribute("data-index", i);
  el.setAttribute("data-price", price);

  let itemFilter = document.querySelectorAll(".product-box__item");
  itemFilter[i].setAttribute("data-category", categoryItem(i));
  itemFilter[i].setAttribute("data-price", price);

  basket.push(newProduct);
});

// Check push the button Add to basket

document.addEventListener("click", (ev) => {
  if (ev.target.className === "product-box__btn") {
    let input = ev.target.previousElementSibling.children[0];

    let countProducts = document.querySelector("#top-cart-count");
    let sumProducts = document.querySelector("#top-cart-sum");

    addToBasket(input.value, input.dataset.price, input.dataset.index);

    let resultCountProducts = 0;
    basket.forEach((el) => {
      resultCountProducts += Number(el.count);
    });

    countProducts.innerHTML = resultCountProducts;

    let resultSumProducts = 0;
    basket.forEach((el) => {
      resultSumProducts += Number(el.sum);
    });

    sumProducts.innerHTML = resultSumProducts;
  }
});

// Filter
let filterSelectCategory = document.querySelector("#filter-category");
filterSelectCategory.addEventListener("change", startFiltered);

let filterSelectPrice = document.querySelector("#filter-price");
filterSelectPrice.addEventListener("change", startFiltered);

function startFiltered() {
  refreshFiltersDisplay();
  filterPrice();
  filterCategory();
}

function filterCategory() {
  let filterSelectCategory = document.querySelector("#filter-category");
  let category = +filterSelectCategory.value;
  let itemCategory = document.querySelectorAll(".product-box__item");

  if (category === 1) {
    itemCategory.forEach((el) => {
      if (el.dataset.category !== "Завтраки")
        el.setAttribute("style", "display:none");
    });
  }
  if (category === 2) {
    itemCategory.forEach((el) => {
      if (el.dataset.category !== "Первые блюда")
        el.setAttribute("style", "display:none");
    });
  }
  if (category === 3) {
    itemCategory.forEach((el) => {
      if (el.dataset.category !== "Гарниры")
        el.setAttribute("style", "display:none");
    });
  }
}

function filterPrice() {
  let filterSelectPrice = document.querySelector("#filter-price");
  let price = +filterSelectPrice.value;
  let itemPrice = document.querySelectorAll(".product-box__item");

  if (price === 30) {
    itemPrice.forEach((el) => {
      if (el.dataset.price > 30) el.setAttribute("style", "display:none");
    });
  }

  if (price === 50) {
    itemPrice.forEach((el) => {
      if (el.dataset.price > 50) el.setAttribute("style", "display:none");
    });
  }
  if (price === 100) {
    itemPrice.forEach((el, i) => {
      if (el.dataset.price > 100) el.setAttribute("style", "display:none");
    });
  }
  if (price === 150) {
    itemPrice.forEach((el, i) => {
      if (el.dataset.price > 150) el.setAttribute("style", "display:none");
    });
  }
}

function refreshFiltersDisplay() {
  let itemDisplay = document.querySelectorAll(".product-box__item");
  itemDisplay.forEach((el) => el.setAttribute("style", "display:block"));
}

function addToBasket(count, price, index) {
  basket[index].count = count;
  basket[index].price = price;
  basket[index].sum = count * price;
}

function priceItem(el) {
  let priceStr = el.parentNode.previousElementSibling.innerText;
  let price = priceStr.split(" ")[0];
  return price;
}

function categoryItem(i) {
  if (i <= 3) return "Завтраки";
  else if (3 < i && i <= 7) return "Первые блюда";
  else if (7 < i && i <= 11) return "Гарниры";
}

// Task #3
let arrangeOrder = document.querySelector("#arrange-order");
arrangeOrder.addEventListener("click", (ev) => {
  ev.preventDefault();

  let checkBasket = document.querySelector("#top-cart-count");
  if (checkBasket.innerText === "XXX") {
    alert("Чтобы оформить покупку вначале добавте что-то в корзину");
    return;
  }

  changeTextInButton();

  openOrCloseModal();
});

function openOrCloseModal() {
  let buttonText = document.querySelector("#arrange-order");
  if (buttonText.innerText !== "ОФОРМИТЬ ЗАКАЗ") {
    let modal = document.querySelector("#modal");
    modal.setAttribute("style", "display:block");
    let body = document.querySelector("body");
    body.setAttribute("style", "overflow:hidden");
  } else {
    let modal = document.querySelector("#modal");
    modal.setAttribute("style", "display:none");
    let body = document.querySelector("body");
    body.setAttribute("style", "overflow:auto");
  }
}

// Close Modal
let closeModal = document.querySelector("#modal-close");
closeModal.addEventListener("click", (ev) => {
  ev.preventDefault();
  let modal = document.querySelector("#modal");
  modal.setAttribute("style", "display:none");

  let body = document.querySelector("body");
  body.setAttribute("style", "overflow:auto");

  changeTextInButton();
});

// Send Modal
let sendModoal = document.querySelector("#modal-send");
sendModoal.addEventListener("click", (ev) => {
  ev.preventDefault();

  if (isEmail() && isPhone()) {
    let modal = document.querySelector("#modal");
    modal.setAttribute("style", "display:none");

    let phone = document.querySelector("#modal-phone");
    let email = document.querySelector("#modal-email");
    phone.value = "";
    email.value = "";

    let body = document.querySelector("body");
    body.setAttribute("style", "overflow:auto");

    location.reload();
  }
});

function isPhone() {
  let phone = document.querySelector("#modal-phone");
  let lenght = phone.value.trim();

  return !lenght ? alert("Введите телефон") : true;
}

function isEmail() {
  let phone = document.querySelector("#modal-email");
  let lenght = phone.value.trim();

  return !lenght ? alert("Введите имеил") : true;
}

function changeTextInButton() {
  let buttonText = document.querySelector("#arrange-order");
  if (buttonText.innerText === "ПРОДОЛЖИТЬ ПОКУПКИ")
    buttonText.innerText = "ОФОРМИТЬ ЗАКАЗ";
  else buttonText.innerText = "ПРОДОЛЖИТЬ ПОКУПКИ";
}
