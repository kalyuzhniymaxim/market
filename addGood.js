let id = 1;

document
  .querySelector("#add-product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    //получение значений полей формы
    let image = document.querySelector("#image-path");
    const selectedFile = image.files[0];
    const imagePath = selectedFile.name;
    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let price = +document.querySelector('#price').value;
    //создание нового товара(объект класса Good)
    const good = {id, imagePath, name, description, price};
    id++;
    //получаем существующие товары из local Storage, если есть
    const existingGoods = JSON.parse(localStorage.getItem("goods")) || [];
    //добавляем новый товар
    existingGoods.push(good);
    
    //сохраняем изменения в localStorage
    localStorage.setItem("goods", JSON.stringify(existingGoods));
    //очищаем поля формы
    document.querySelector("#image-path").value = "", 
    document.querySelector("#name").value = "", 
    document.querySelector("#description").value = "", 
    document.querySelector('#price').value = "";
    //перенаправление на другую страницу
    // window.location.href = "market.html";
  });


