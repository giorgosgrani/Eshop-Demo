import { cart , products } from "../data/products.js";
import { updateCartQuantity } from "../scripts/cart-utilities.js";

let selectedProducts=[];

function EmptyCart(){
  let cartHTML = "";
  if(cart.length===0){
    const message= document.querySelector('.cart-grid');
    message.innerHTML=`
    <div class="Empty-message"><span>Το καλάθι σας είναι προς το παρόν άδειο.</span>
    <button class="index-button">
    <a href="index.html">Επιστροφή στην αρχική σελίδα</a></button>
    </div>
    `;
  }
}

function renderCartProducts(){
  selectedProducts = [];
  let cartHTML = "";
  cart.forEach((productCart)=>{
    products.forEach((product)=>{
      if(productCart.productId===product.id){
        selectedProducts.push({
          product,
          quantity:productCart.quantity
        });
      }
    });
  });
  selectedProducts.forEach((selected)=>{
    cartHTML+=`
      <div class="cart-product-container">
        <div class="productCart-image-container">
          <img class="productCart-image" src="${selected.product.image}" alt="${selected.product.name}">
        </div>
        <div class="productCart-name">${selected.product.name}</div>
        <div class="productCart-price">€ ${selected.product.priceCents / 100} </div> 
           <div class="quantity-stepper">
                <button class="quantity-button js-decrease-quantity" data-product-id="${selected.product.id}">
                          -
                </button>
                <span class="cart-product-quantity">
                ${selected.quantity}
                </span>
                <button class="quantity-button js-increase-quantity" data-product-id="${selected.product.id}">
                          +
                </button>
            </div> 
        <div class="total-product-price">${((selected.product.priceCents / 100)*selected.quantity).toFixed(2)}
        </div>
          
      </div>
      
      `
  });
  document.querySelector('.cart-grid').innerHTML=cartHTML;
  CalTotal();
  quantityButtons();
  EmptyCart();
}

function CalTotal(){
  let netCost =0;
  let VatCost =0;
  let TotalCost =0;
  selectedProducts.forEach((item)=>{
    TotalCost+=Number(((item.product.priceCents/100)*item.quantity));
    });
  TotalCost= TotalCost.toFixed(2);
  VatCost =(TotalCost*(24/100)).toFixed(2);
  netCost=(TotalCost-VatCost).toFixed(2);
  document.querySelector('.cart-summary').innerHTML=`  
  <div class="summary-row">
    <span>Αξία προϊόντων</span>
    <span class="js-products-total">€${netCost}</span>
  </div>

  <div class="summary-row">
    <span>ΦΠΑ(24%)</span>
    <span class="js-VAT-total">€${VatCost}</span>
  </div>

  <div class="summary-row">
    <span>Τελική αξία</span>
    <span class="js-order-total">€${TotalCost}</span>
  </div>
  <div class="reset-cart-js reset-cart"></div>  `
  const resetCart = document.querySelector('.reset-cart-js');
  resetCart.innerHTML =`<button class="reset-button-js reset-button">Εκκαθάριση καλαθιού</button>`;

  const resetButton= document.querySelector('.reset-button-js');
  resetButton.addEventListener('click',()=>{
    cartReset(cart);
    renderCartProducts();
    updateCartQuantity();
  });
}

function quantityButtons(){
  const Inbuttons=document.querySelectorAll('.js-increase-quantity');
  const Lobuttons=document.querySelectorAll('.js-decrease-quantity');

  Inbuttons.forEach((plus)=>{
    plus.addEventListener('click',()=>{
      let matchingItem;
      cart.forEach((product)=>{
        if(product.productId===plus.dataset.productId){
          matchingItem=product;
        }
        });
        if(matchingItem){
        matchingItem.quantity++;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartProducts();
        updateCartQuantity();
    });
  });

   Lobuttons.forEach((low)=>{
    low.addEventListener('click',()=>{
      let matchingIndex=-1;
      cart.forEach((product,index)=>{
        if(product.productId===low.dataset.productId){
          matchingIndex=index;
        }
        });
        if(matchingIndex>=0){
        cart[matchingIndex].quantity--;
          if(cart[matchingIndex].quantity===0){
            cart.splice(matchingIndex,1);
          }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartProducts();
        updateCartQuantity();
    });
  });
  
}

function cartReset(cartNow){
  cartNow.length = 0;
  localStorage.removeItem('cart');
}



renderCartProducts();
updateCartQuantity();


