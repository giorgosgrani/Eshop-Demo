import { cart } from "../data/products.js";

export function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}