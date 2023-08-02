//dom Elements
const productDom = document.querySelector(".products-center");

//products class
class Products {
  async getProducts() {
    try {
      const result = await fetch("data/products.json"); //returns response object
      let products = await result.json(); // to get the data from response object
      let data = products.items;
      data = data.map((item) => {
        const { title, price, type, rating } = item.fields;
        const id = item.sys.id;
        const url = item.fields.image.fields.file.url;
        return { title, price, type, rating, id, url };
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

//display class
class UserInterface {
  insertProductsInDom(products) {
    let result = "";
    products.forEach((element) => {
      let star="";
      for(let i = 0; i<element.rating;i++){
        star += `<i class="fas fa-star"></i>` //gives a filled star
      }
      for(let i = 0; i<5-element.rating;i++){
        star += `<i class="far fa-star"></i>`
      }
      result += `
            <article class="product">
                <div class="img-container">
                    <img src=${element.url} alt="product" class="product-img">
                    <button class="bag-btn" data-id=${element.id}><i class="fas fa-shopping-cart"></i>Add to cart</button>
                    <p>${element.title}</p>
                </div>
                <div>
                    <h4 class="light">${element.type}</h4>
                    <h4 class="price">$ ${element.price}</h4>
                </div>
                <div class="star">
                   ${star}
                </div>
            </article>
          `;
    });
    productDom.innerHTML = result;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const p = new Products();
  const ui = new UserInterface();

  p.getProducts()
    .then((data) => {
      console.log(data);
      // rendering products in the browser
      ui.insertProductsInDom(data);
      // saving products in the local storage
      Storage.saveProducts(data);
      ui.initialSetup();
      ui.getBagButtons();
      ui.cartFuntionality();
    })
});


// Even or Odd Number and Change button name and background color

var num, temp;

function changeName(){
    var clickButton = document.getElementById('clickButton');
    clickButton .innerHTML =  'Clicked !';
    clickButton.style.backgroundColor = 'green';

    num = parseInt(document.getElementById("num").value);
    if(num)
    {
        temp = document.getElementById("resPara");
        temp.style.display = "block";
        if(num%2==0)
        document.getElementById("res").innerHTML = "Even";
        else
        document.getElementById("res").innerHTML = "Odd";
    }
}