import { makeDomWithProperties, appendChildrenList } from "../utils/dom.js";


export const getProductCard = ({
    imgSrc,
    name, 
    discountPercent,
    price,
    originalPrice,
}) => {
    // ------ product-image-con ------------
    const productCard = makeDomWithProperties('div', {
        className: 'product-card',
    });

    const productImageCon = makeDomWithProperties('div', {
        className: 'product-image-con',
    });

    const productImage = makeDomWithProperties('img', {
        src: imgSrc,
        alt: name,
    });

    const cartToggleBtn = makeDomWithProperties('button', {
        className: 'cart-toggle-btn',
        type: 'button'
    });

    const cartImage = makeDomWithProperties('img', {
        className: 'cart-image',
        src: 'public/assets/cart.png',
    });


    cartToggleBtn.appendChild(cartImage);

    appendChildrenList(productImageCon, [productImage, cartToggleBtn]);

    // ------ product-image-con ------------


    // ------ product-description------------

    const productDescription = makeDomWithProperties('div', {
    className: 'product-description',
    });

    const productName = makeDomWithProperties('div', {
    className: 'product-name',
    innerHTML: name,
    });

    const productPriceContainer = makeDomWithProperties('div', {
    className: 'product-price-con',
    });

    const productDiscount = makeDomWithProperties('div', {
    className: 'product-discount-percent',
    innerHTML: `${discountPercent}%`
    });

    const productPrice = makeDomWithProperties('div', {
    className: 'product-price',
    innerHTML: `${price.toLocaleString()}원`
    });

    const productOriginalPrice = makeDomWithProperties('div', {
    className: 'product-original-price',
    innerHTML: `${originalPrice.toLocaleString()}원`
    });

    appendChildrenList(productPriceContainer, [productDiscount, productPrice]);
    appendChildrenList(productDescription, [productName, productPriceContainer, productOriginalPrice]);

    // ------ product-description------------

    appendChildrenList(productCard, [productImageCon, productDescription]);

    return productCard;
};