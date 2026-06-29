import { products, cart } from "../data/products.js";
import { updateCartQuantity } from "../scripts/cart-utilities.js";


let currentPage = 1;
let productsPerPage = 14;
let displayedProducts =[...products];
const params = new URLSearchParams(window.location.search);
const startingCategory = params.get('category');

if (startingCategory && startingCategory !== 'all') {
  displayedProducts = products.filter((product) => {
    return product.details.type === startingCategory;
  });
}

function productNumberSelector() {
  const productNumberButton = document.querySelector('.products-number-container');

  productNumberButton.innerHTML = `
    <select class="products-number">
      <option value="7">7</option>
      <option selected value="14">14</option>
      <option value="21">21</option>
      <option value="42">42</option>
    </select>
  `;

  const productsPerPageSelector = document.querySelector('.products-number');


  productsPerPageSelector.addEventListener('change', () => {
    productsPerPage = Number(productsPerPageSelector.value);
    currentPage = 1;
    renderPagination();
  });
}



function renderProducts() {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToShow = displayedProducts.slice(start, end);

  let productsHTML = "";

  productsToShow.forEach((product) => {
    
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <span>Βαθμολογία: ${product.rating.stars}/5 (${product.rating.count})</span>
        </div>

        <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector" aria-label="Ποσότητα">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <div class="added-to-cart added-to-cart-inactive">
            <img class="added-icon" src="../images/added-to-cart.svg" alt="Added to cart">
          </div>
        </div>

        <div class="product-spacer"></div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
          Προσθήκη στο καλάθι
        </button>
      </div>
    `;
  });
  
  document.querySelector(".products-grid").innerHTML = productsHTML;
  addToCart();
}



function addToCart(){
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const productQuantity = Number(button.closest(".product-container").querySelector(".js-quantity-selector").value);
      
      let matchingItem;

      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += productQuantity;
        //console.log(cart);
      } else {
        cart.push({
          productId,
          quantity: productQuantity,
          priceCents:products.priceCents
        });
          //console.log(cart);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartQuantity();

      const productContainer = button.closest(".product-container");
      const addedMessage = productContainer.querySelector(".added-to-cart");

      addedMessage.classList.remove("added-to-cart-inactive");
      addedMessage.classList.add("added-to-cart-active");

      setTimeout(() => {
        addedMessage.classList.remove("added-to-cart-active");
        addedMessage.classList.add("added-to-cart-inactive");
      }, 2000);
    });
    
  });}


function renderPagination() {
  renderProducts();

  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
  let paginationHtml = "";

  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += `<button class="pagination-button ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
  }

  document.querySelector(".js-pagination").innerHTML = paginationHtml;

  document.querySelectorAll(".pagination-button").forEach((pageButton) => {
    pageButton.addEventListener("click", () => {
      currentPage = Number(pageButton.dataset.page);
      renderPagination();
      
    });
  });
}

function filterProducts(){
  let filterHTML="";
  filterHTML= `
  <select class="selector-filter selector-filter-js">
    <option selected value = "0">Προτεινόμενα</option>
    <option value = "1">Αύξουσα τιμή</option>
    <option value = "2">Φθίνουσα τιμή</option>
  </select>`;

  const filterSelector = document.querySelector('.filter-container-js');
  filterSelector.innerHTML=filterHTML;
  const filter = filterSelector.querySelector('.selector-filter-js');
  if(Number(filter.value)===0){
        displayedProducts.sort((a, b) => {
          if (b.rating.stars !== a.rating.stars) {
            return b.rating.stars - a.rating.stars;
          }
          return b.rating.count - a.rating.count;});
          currentPage =1;
          renderPagination();
      }   

    filter.addEventListener('change',()=>{
      let value = Number(filter.value);  
      if(value===0){
        displayedProducts.sort((a, b) => {
          if (b.rating.stars !== a.rating.stars) {
            return b.rating.stars - a.rating.stars;
          }
          return b.rating.count - a.rating.count;});
      }    
      else if(value===1){
        displayedProducts.sort((a,b)=>a.priceCents-b.priceCents);
      }
      else if(value===2){
        displayedProducts.sort((a,b)=>b.priceCents-a.priceCents);
      }
     currentPage =1;
     renderPagination();
    
    });
}

function selectCat() {
  const categoryButtons = document.querySelectorAll('[data-category]');

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;



      if (category === 'all') {
        displayedProducts = [...products];
      } else {
        displayedProducts = products.filter((product) => {
          return product.details.type === category;
        });
      }

      currentPage = 1;
      filterProducts();

    });
  });
}

function searchProducts(){
  const search = document.querySelector('.search-bar');
  let value ='';
  search.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
      value = search.value.trim().toLowerCase();
      if(value.length>0){
    displayedProducts= products.filter((product)=>{
      return product.name.toLowerCase().includes(value);
    });
  }
    else{
      displayedProducts=[...products];
    }
    filterProducts();
  }
  }); 
}

productNumberSelector();
selectCat();
filterProducts();
updateCartQuantity();
searchProducts();



