var goodsList = [];

//рендер корзины из массива
function renderGoods() {
  const goodsItemsElement = document.querySelector("#good-item");
  goodsItemsElement.innerHTML = "";
  //метод forEach не закончит работу, пока есть элементы в массиве.
  //.Для каждого элемента массива(item) создается tr, строка таблицы. Создается ячейка для каждого из значений элемента массива(название, цена, количество)
  goodsList.forEach((item) => {
    const tr = document.createElement("tr");
    const tdId = document.createElement("td");
    const tdImage = document.createElement("td");
    const tdName = document.createElement("td");
    const tdPrice = document.createElement("td");
    const tdDescription = document.createElement("td");
    const tdButtons = document.createElement("td");

    //кнопки + и - для увеличения/var уменьшения количества
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    editButton.textContent = "Изменить";
    deleteButton.textContent = "Удалить";
    editButton.addEventListener("click", () => editGood(item));
    deleteButton.addEventListener("click", () => deleteGood(item));
    editButton.classList.add("quantBtn");
    deleteButton.classList.add("quantBtn");
    //--------------------------------------
    //добавляем в ячейку tdImage элемент для отображения картинки
    const imageInCart = document.createElement("img");
    tdImage.appendChild(imageInCart);
    imageInCart.setAttribute("src", `images/${item.imagePath}`);
    imageInCart.style.width = "50px";
    // **********************************************
    tdId.innerText = item.id;
    tdName.innerText = item.name;
    tdPrice.innerText = `${item.price}$`;
    tdDescription.innerText = item.description;
    //в одну ячейку размещаем кнопки +, - и количество
    tdButtons.append(editButton, deleteButton);
    tr.append(tdId, tdImage, tdName, tdPrice, tdDescription, tdButtons);
    goodsItemsElement.appendChild(tr);
  });
}

//удаление товара
function deleteGood(item) {
  //удаляем элемент из массива.
  //используем splice, который удалить элементы массива с указанной позиции и в заданном количестве.
  //позицию находим, получив индекс элемента, найденный при сравнении имен. количество указано вторым параметром
  goodsList.splice(
    goodsList.findIndex((goodItem) => goodItem.name == item.name),
    1
  );
  renderGoods();
}

async function loadFromLocalStorage() {
  try {
    const response = await fetch("goods.json");
    const data = await response.json();

    goodsList = data.map((item) => ({
      imagePath: item.imagePath,
      name: item.name,
      description: item.description,
      price: item.price,
      id: item.id,
      category: item.category,
    }));
    console.log(goodsList);
    // saveFromHtml();
    renderGoods();
    const saveToJsonButton = document.querySelector("#saveToJsonButton");
    saveToJsonButton.addEventListener("click", saveToJson);
  } catch (error) {
    console.error("Ошибка при загрузке данных из JSON-файла:", error);
  }
}

function saveToJson() {
  const jsonData = JSON.stringify(goodsList);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "goods.json";
  link.click();
}

loadFromLocalStorage();

// Функция обработчика события кнопки "Изменить"
function editGood(item) {
  const dialog = document.createElement("dialog");
  const form = document.createElement("form");
  const titleLabel = document.createElement("label");
  const titleInput = document.createElement("input");
  const descriptionLabel = document.createElement("label");
  const descriptionInput = document.createElement("input");
  const priceLabel = document.createElement("label");
  const priceInput = document.createElement("input");
  const saveButton = document.createElement("button");

  titleInput.value = item.name;
  descriptionInput.value = item.description;
  priceInput.value = item.price;

  titleLabel.textContent = "Название товара:";
  titleInput.type = "text";
  descriptionLabel.textContent = "Описание:";
  descriptionInput.type = "text";
  priceLabel.textContent = "Цена:";
  priceInput.type = "number";
  saveButton.textContent = "Сохранить";

  saveButton.addEventListener("click", (event) => {
    event.preventDefault();
    const updatedName = titleInput.value;
    const updatedDescription = descriptionInput.value;
    const updatedPrice = parseFloat(priceInput.value);

    if (updatedName && updatedDescription && !isNaN(updatedPrice)) {
      item.name = updatedName;
      item.description = updatedDescription;
      item.price = updatedPrice;

      dialog.close();

      renderGoods();
    } else {
      alert("Пожалуйста, введите корректные данные.");
    }
  });

  form.append(
    titleLabel,
    titleInput,
    descriptionLabel,
    descriptionInput,
    priceLabel,
    priceInput,
    saveButton
  );

  dialog.appendChild(form);
  document.body.appendChild(dialog);
  dialog.showModal();
}
