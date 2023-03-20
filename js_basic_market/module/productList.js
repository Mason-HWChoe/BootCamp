import { makeDomWithProperties } from "../utils/dom.js"
import { getProductCard } from "./productCard.js";

export const getProductList = (productInfoList) => {
    const productListContainer = makeDomWithProperties('div', {
        className: 'product-list-con',
    });

    productInfoList.forEach((productInfo) => {
        productListContainer.appendChild(
            getProductCard({
                ...productInfo
            })
        );
    })
    return productListContainer;
};