//массив, хранящий элементы корзины
let cartItems = [];
let count = 1;
let totalPrice = 0;
let totalQuantity = 0;
let goodsList = [];
let goods = document.querySelector(".goods");

//класс товара
class Good {
  constructor(imagePath, name, description, price, id) {
    this.imagePath = imagePath;
    this.name = name;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  renderGood() {
    return `
            <div class="good" id="${this.id}">
                <p>${this.id}</p>
                <img src="images/${this.imagePath}" alt="good">
                <h2>${this.name}</h2>
                <p>${this.description}</p>
                <p class="good-price">Цена: ${this.price}$</p>
                <button class="add-to-cart-btn">Добавить в корзину</button>
            </div>
    `;
  }
}

//функция отображения количества товаров в корзине на индикаторе.
//можно вызывать при каждом изменении количества товаров в корзине(например, если вызывается метод saveCartItems)
async function showCartLength() {
  // document.querySelector("#cartIndicator").textContent = "";
  document.querySelector("#cartIndicator").textContent = totalQuantity;
}

function renderGoodsList() {
  goodsList.forEach((good) => {
    goods.innerHTML += new Good(
      good.imagePath,
      good.name,
      good.description,
      good.price,
      good.id
    ).renderGood();
  });
}

//метод добавления товаров в корзину(массив)
function addToCart(event) {
  //находим товар, в котором был совершен клик
  const good = event.target.closest(".good");
  //вытаскиваем название этого товара
  const goodName = good.querySelector("h2").textContent;
  //вытаскиваем цену товара. так как в строке содержатся не только цифры, заменяем их с помощью регулярного выражения на пустоту, т.е. удаляем из строки
  const goodPrice = +good
    .querySelector(".good-price")
    .textContent.replace(/\D/g, "");
  //Элемент массива представляет объект, который хранит название, цену и количество(при добавлении 1)
  //если товар уже есть в массиве, то увеличиваем его количество на 1.
  //если товара нет, то добавляем в массив
  const existingItem = cartItems.find((item) => item.name == goodName);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name: goodName, price: goodPrice, quantity: count });
  }
  totalQuantity++;
  totalPrice += goodPrice;
  showCartLength();
  saveCartItems(cartItems, totalPrice);
}

//метод сохранения объектов корзины в локальное хранилище браузера
//первый аргумент - ключ, произвольное имя
//второе - значение, которое будет записано в хранилище
//ключ и значение должны быть переданы в виде строки
function saveCartItems(cartItems, totalPrice) {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
}

async function setListener() {
  //получаем коллекцию кнопок
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  //вешаем на каждую кнопку слушатель клика, при котором вызовется метод addToCart
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);

    //слушатель события изменения текста для поля поиска товаров
    const searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener("input", handleSearch);
  });
}

//поиск элемента по имени
function handleSearch() {
  const searchText = searchInput.value.toLowerCase();
  goodsList.forEach((good) => {
    const goodName = good.name.toLowerCase();
    const goodElement = document.getElementById(good.id);
    if (goodName.includes(searchText)) {
      goodElement.style.display = "block";
    } else {
      goodElement.style.display = "none";
    }
  });
}

function loadFromLocalStorage() {
  const savedCartItems = localStorage.getItem("cartItems");
  const savedTotalPrice = localStorage.getItem("totalPrice");
  const savedGoods = localStorage.getItem("goods");

  if (savedCartItems) {
    cartItems = JSON.parse(savedCartItems);
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });
    totalPrice = JSON.parse(savedTotalPrice);
    showCartLength();
  }

  if (savedGoods) {
    goodsList = JSON.parse(savedGoods);
    renderGoodsList();
    setListener();
  }
}

loadFromLocalStorage();

export { saveCartItems };
