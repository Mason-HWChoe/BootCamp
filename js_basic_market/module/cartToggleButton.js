import { makeDomWithProperties } from "../utils/dom.js";
import { CART_COOKIE_KEY } from "../constants/cart.js";

const addCartInfo = (productInfo) => {
    const originalCartInfo = JSON.parse(localStorage.getItem(CART_COOKIE_KEY)) || [];
    localStorage.setItem(CART_COOKIE_KEY, JSON.stringify([
        ...originalCartInfo,
        productInfo,
    ]));
};

export const getCartToggleButton = () => {
    const cartToggleBtn = makeDomWithProperties('button', {
        className: 'cart-toggle-btn',
        type: 'button',
        onclick: () => {
            addCartInfo(productInfo)
        }
    });

    const cartImage = makeDomWithProperties('img', {
        className: 'cart-image',
        src: 'public/assets/cart.png',
    });

    cartToggleBtn.appendChild(cartImage);

    return cartToggleBtn;
};