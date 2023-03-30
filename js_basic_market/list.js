import { fetchSectionListData } from "./module/fetch.js";
import { setButtonEvent, setFilterEvent } from "./module/productFilter.js";
import { getProductList } from "./module/productList.js";



const sectionInfoList = await fetchSectionListData();

const productList = sectionInfoList.reduce(
    (prev, curr) => [...prev, ...curr.productList], 
    []
);

const section = document.getElementsByTagName('section')[0];
const productListDOM = getProductList(productList);
section.appendChild(productListDOM);

setFilterEvent();
setButtonEvent(productList);