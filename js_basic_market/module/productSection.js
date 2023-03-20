import { appendChildrenList, makeDomWithProperties } from "../utils/dom.js";
import { getProductList } from "./productList.js";


export const getProductSection = (sectionName, productInfoList) => {
    const productListSection = makeDomWithProperties('div', {
        className: 'product-list-section',
    });
    const sectionTitle = makeDomWithProperties('div', {
        className: 'section-title',
    });
    const titleHighLight = makeDomWithProperties('span', {
        className: 'section-title-highlight',
    });
    const title = makeDomWithProperties('span', {
        innerHTML: sectionName,
    });

    appendChildrenList(sectionTitle, [ titleHighLight, title ]);

    const productListContainer = getProductList(productInfoList);

    appendChildrenList(productListSection, [ sectionTitle, productListContainer ]);

    return productListSection;
};