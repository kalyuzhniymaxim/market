//массив, хранящий элементы корзины
let cartItems = [];
let count = 1;
let totalPrice = 0;
let totalQuantity = 0;
let goodsList = [];
let goods = document.querySelector(".goods");
let categoryList = document.querySelectorAll(".categories li");

categoryList.forEach((category) => {
  category.addEventListener("click", () => {
    //получаем название категории из каждого элемента
    const selectedCategory = category.dataset.category;
    //очищаем каталог
    goods.innerHTML = "";
    //фильтруем все товары по категории кликнутого элемента из сайдбара
    const filteredGoods = goodsList.filter((good) => {
      return selectedCategory == "all" || good.category == selectedCategory
  });
    //выводим отфильтрованные товары на экран
    filteredGoods.forEach((good) => {
      goods.innerHTML += new Good(
        good.imagePath,
        good.name,
        good.description,
        good.price,
        good.id,
        good.category
      ).renderGood();
    });
    setListeners();
  });
});

//класс товара
class Good {
  constructor(imagePath, name, description, price, id, category) {
    this.imagePath = imagePath;
    this.name = name;
    this.description = description;
    this.price = price;
    this.id = id;
    this.category = category;
  }

  renderGood() {
    return `
            <div class="good" id="${this.id}" data-category="${this.category}">
                <img src="images/${this.imagePath}" alt="good">
                <h2 class="good-name">${this.name}</h2>
                <p class="good-description">${this.description}</p>
                <p class="good-price">Цена: ${this.price}$</p>
                <button class="add-to-cart-btn btn"><span>В корзину</span></button>
            </div>
    `;
  }
}

//функция отображения количества товаров в корзине на индикаторе.
//можно вызывать при каждом изменении количества товаров в корзине(например, если вызывается метод saveCartItems)
async function showCartLength() {
  document.querySelector("#cartIndicator").textContent = "0";
  document.querySelector("#cartIndicator").textContent = totalQuantity;
}

function renderGoodsList() {
  goodsList.forEach((good) => {
    goods.innerHTML += new Good(
      good.imagePath,
      good.name,
      good.description,
      good.price,
      good.id,
      good.category
    ).renderGood();
  });
}

//метод добавления товаров в корзину(массив)
function addToCart(event) {
  //находим товар, в котором был совершен клик
  const good = event.target.closest(".good");
  //получаем путь к изображению, обрезаем 'images/'
  const goodImage = good.querySelector("img").getAttribute("src");
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
    cartItems.push({ imagePath: goodImage, name: goodName, price: goodPrice, quantity: count });
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

async function setListeners() {
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

async function loadFromLocalStorage() {
  const savedCartItems = localStorage.getItem("cartItems");
  const savedTotalPrice = localStorage.getItem("totalPrice");
  // const savedGoods = localStorage.getItem("goods");

  if (savedCartItems) {
    cartItems = JSON.parse(savedCartItems);
    cartItems.forEach((item) => {
      totalQuantity += item.quantity;
    });
    totalPrice = JSON.parse(savedTotalPrice);
    showCartLength();
  }

  try {
    const response = await fetch("goods.json");
    const data = await response.json();

    goodsList = data.map((item) => {
      return new Good(
        item.imagePath,
        item.name,
        item.description,
        item.price,
        item.id,
        item.category
      );
    });
    // saveFromHtml();
    renderGoodsList();
    setListeners();
  } catch (error) {
    console.error("Ошибка при загрузке данных из JSON-файла:", error);
  }

  // if (savedGoods) {
  //   goodsList = JSON.parse(savedGoods);
  //   renderGoodsList();
  //   setListeners();
  // }
}


loadFromLocalStorage();

export { saveCartItems };



//сохранение в массив текущей статической разметки
// function saveFromHtml() {
//   const allGood = goods.querySelectorAll(".good");
//   allGood.forEach((item) => {
//     const goodId = +item.getAttribute("id");
//     const imgSrc = item.querySelector("img").getAttribute("src").slice(7);
//     const goodname = item.querySelector(".good-name").textContent;
//     const desc = item.querySelector(".good-description").textContent;
//     const goodPrice = +item.querySelector(".good-price").textContent.replace(/\D/g, '');
//     const goodCategory = item.dataset.category;

//     const oneGood = {
//       id: goodId,
//       category: goodCategory,
//       imagePath: imgSrc,
//       name: goodname,
//       description: desc,
//       price: goodPrice
//     };

//     goodsList.push(oneGood);
//   });
//   console.log(goodsList);
// }

