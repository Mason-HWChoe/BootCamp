import { getProductCard } from "./module/productCard.js";


const sectionDom = document.getElementsByTagName('section')[0];

const productCard = getProductCard({
    "id" : 2,
    "imgSrc" : "../public/assets/단호박.jpg", 
    "name" : "단호박",
    "discountPercent" : 20,
    "price" : 2000,
    "originalPrice" : 2500
});

const productCard2 = getProductCard({
    "id" : 5,
    "imgSrc" : "../public/assets/키위.jpg", 
    "name" : "키위 1팩",
    "discountPercent" : 15,
    "price" : 8500,
    "originalPrice" : 10000

})

sectionDom.appendChild(productCard);
sectionDom.appendChild(productCard2);