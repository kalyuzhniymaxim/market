class GoodsItem {
  constructor(
    product_img = "recommendation/recommendation-8.jpeg",
    product_name = "Timberland ботинки 10061 синие зимние с мехом ",
    old_price = 15000,
    price = 7900,
    product_id = 0

  ) {
    this.product_img = product_img;
    this.product_name = product_name;
    this.old_price = old_price;
    this.price = price;
    this.product_id = product_id;
  }
  render() {
    return `<div class="goods-item">
                    <img src=${this.product_img} alt="" class="product-img">
                    <h4 class="product-name">${this.product_name}</h4>
                    <div class="underline"></div>
                    <p class="old_price">${this.old_price}.00 руб.</p>
                    <p class="price">${this.price}.00 руб.</p>
                    <button class="product-button" id=${this.product_id}>В КОРЗИНУ</button>
                </div>`;
  }
}

let catalogList = document.querySelector(".catalog");
let goods = [
  new GoodsItem("recommendation/recommendation-1.jpeg", "Timberland ботинки 10061 песочные демисезонные",11000, 5900, 1),
  new GoodsItem("recommendation/recommendation-2.png", "Ботинки Timberland желтые демисезонные", 13000,7900, 2),
  new GoodsItem("recommendation/recommendation-3.png", "Timberland ботинки 10063 желтые зимние с мехом ",11000,5900, 3),
  new GoodsItem("recommendation/recommendation-4.png", "Timberland ботинки 10061 черные демисезонные ",13000,7900, 4),
  new GoodsItem("recommendation/recommendation-5.png", "Timberland ботинки 10061 коричневые ",12000,6900, 5),
  new GoodsItem("recommendation/recommendation-6.jpeg", "Timberland ботинки 10061 темно-синие ",11000, 5900, 6),
  new GoodsItem("recommendation/recommendation-7.jpeg", "Timberland ботинки 10061 синие зимние с мехом ",13000,7900, 7),
  new GoodsItem("recommendation/recommendation-8.jpeg", "Timberland ботинки 10061 синие зимние с мехом ",15000, 7900, 8)
];
// let goods = [];
// for(let i = 0; i < 100; i++) {
//     goods[i] = new GoodsItem();
// }
let listHtml = "";
for (good of goods) {
  listHtml += good.render();
}
catalogList.innerHTML = listHtml;
