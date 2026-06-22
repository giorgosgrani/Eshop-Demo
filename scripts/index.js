import { products, cart } from "../data/products.js";
let currentPage =1;
const productsPerPage=21;
/*In this code i render the products of each page*/ 
function renderProducts(){
  const start = (currentPage-1)*productsPerPage;
  const end =start+productsPerPage;

  const productsToShow = products.slice(start,end);

  let productsHTML = "";

  productsToShow.forEach((product)=>{
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <span>Βαθμολογία:${product.rating.stars}/5 (${product.rating.count})</span>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class= 'js-quantity-selector'>
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
            <img class="added-icon" src="../images/added-to-cart.svg">
          </div>
          </div>

          <div class="product-spacer"></div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector('.products-grid').innerHTML= productsHTML;
/*End of product rendering*/

/*Here i start to make the add button to introduce the products to cart and show the total quantity*/
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productID = button.dataset.productId;
    let matchingItem;
    const productQuantity = Number(button.closest('.product-container').querySelector('.js-quantity-selector').value);
    cart.forEach((item) => {
      if (productID === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += productQuantity;
    } else {
      cart.push({
        productId: productID,
        quantity: productQuantity
      });
    }

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    const productContainer = button.closest('.product-container');
    const addedMessage = productContainer.querySelector('.added-to-cart');

    addedMessage.classList.remove('added-to-cart-inactive');
    addedMessage.classList.add('added-to-cart-active');

    setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-active');
      addedMessage.classList.add('added-to-cart-inactive');
    }, 2000);
  });
});

}


function renderPagination(){
  renderProducts();
  const totalPages =Math.ceil(products.length/productsPerPage);
  let paginationHtml ='';
  for(let i=1;i<=totalPages;i++){
    paginationHtml+=`<button class="pagination-button ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  document.querySelector('.js-pagination').innerHTML= paginationHtml;
  
  const paginationButtons = document.querySelectorAll('.pagination-button');

  paginationButtons.forEach((Pagebutton)=>{
    Pagebutton.addEventListener('click',()=>{
      currentPage=Number(Pagebutton.dataset.page);
      renderPagination();
      
    })
  });
}

renderPagination();