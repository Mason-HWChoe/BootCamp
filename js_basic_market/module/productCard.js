import { makeDomWithProperties, appendChildrenList } from "../utils/dom.js";
import { getCartToggleButton } from "./cartToggleButton.js";


export const getProductCard = (productInfo) => {
    const {
        imgSrc,
        name, 
        discountPercent,
        price,
        originalPrice,
    } = productInfo;
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

    const cartToggleBtn = getCartToggleButton(productInfo);

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