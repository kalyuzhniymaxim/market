let request;
var existingGoods = [];
if(window.XMLHttpRequest) {
    request = new XMLHttpRequest();
} else {
    request = new ActiveXObject("Microsoft.XMLHTTP");
}
request.open("GET", "goods.json");
request.responseType = "json";
request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {
        existingGoods = request.response;
        console.log(existingGoods);
    }
}
request.send();

document
  .querySelector("#add-product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Получение значений полей формы
    let image = document.querySelector("#image-path");
    const selectedFile = image.files[0];
    const imagePath = selectedFile.name;
    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let price = +document.querySelector("#price").value;
    let category = document.querySelector("#category").value;

    // // Получение существующих товаров из localStorage
    // const existingGoods = JSON.parse(localStorage.getItem("goods")) || [];
    // Генерация уникального идентификатора для нового товара
    const id = existingGoods.length + 1;

    // // Генерация уникального идентификатора с помощью uuid
    // const id = uuidv4();

    // Создание нового товара (объект класса Good)
    const good = { id, category, imagePath, name, description, price };

    // Добавление нового товара
    existingGoods.push(good);
    console.log(existingGoods);
    // // Сохранение изменений в localStorage
    // localStorage.setItem("goods", JSON.stringify(existingGoods));


    // Очистка полей формы
    document.querySelector("#image-path").value = "";
    document.querySelector("#name").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#category").value;
  });

function saveToJson() {
  const jsonData = JSON.stringify(existingGoods);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "goods.json";
  link.click();
}  
// //асинхронная загрузка из json-файла
// async function loadGoodFromJson() {
//   const response = await fetch("goods.json");
//   const data = await response.json();
//   existingGoods = data;
//   console.log(existingGoods);
// }


// document
//   .querySelector("#add-product-form")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();
//     //получение значений полей формы
//     let image = document.querySelector("#image-path");
//     const selectedFile = image.files[0];
//     const imagePath = selectedFile.name;
//     let name = document.querySelector("#name").value;
//     let description = document.querySelector("#description").value;
//     let price = +document.querySelector('#price').value;
//     //создание нового товара(объект класса Good)
//     const good = {id, imagePath, name, description, price};
//     //получаем существующие товары из local Storage, если есть
//     const existingGoods = JSON.parse(localStorage.getItem("goods")) || [];
//     //добавляем новый товар
//     existingGoods.push(good);
//     //сохраняем изменения в localStorage
//     localStorage.setItem("goods", JSON.stringify(existingGoods));
//     //очищаем поля формы
//     document.querySelector("#image-path").value = "",
//     document.querySelector("#name").value = "",
//     document.querySelector("#description").value = "",
//     document.querySelector('#price').value = "";
//     //перенаправление на другую страницу
//     // window.location.href = "market.html";
//   });
