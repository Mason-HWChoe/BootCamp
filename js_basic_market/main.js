import { getProductSection } from "./module/productSection.js";


const productSection = getProductSection('인기상품', [{
    "id" : 1,
    "imgSrc" : "../public/assets/파프리카.jpg", 
    "name" : "파프리카 2입",
    "discountPercent" : 20,
    "price" : 2000,
    "originalPrice" : 2500
    },
    {
    "id" : 2,
    "imgSrc" : "../public/assets/단호박.jpg", 
    "name" : "단호박",
    "discountPercent" : 20,
    "price" : 2000,
    "originalPrice" : 2500
    },
    {
    "id" : 3,
    "imgSrc" : "../public/assets/아보카도.jpg", 
    "name" : "아보카도 1개",
    "discountPercent" : 20,
    "price" : 2000,
    "originalPrice" : 2500
    }]);


document.body.appendChild(productSection);