
const selectAnchorMenuDom = document.getElementById('anchor-to-select');
const resultAnchorMenuDom = document.getElementById('anchor-to-result');
const mbtiAnchorMenuDom = document.getElementById('anchor-to-mbti');

const selectsectionDom = document.getElementById('participate-section');
const resultSectionDom = document.getElementById('result-section');
const mbtiSectionDom = document.getElementById('mbti-section');

const setScrollHandler = (anchorDOM, targetDOM) => {
    anchorDOM.onclick = () => {
        const scrollTargetY = targetDOM.offsetTop;
        window.scroll({
            top: scrollTargetY,
            left: 0,
            behavior: 'smooth'
        })
    };
};


export const setTabMenu = () => {
    setScrollHandler(selectAnchorMenuDom, selectsectionDom);
    setScrollHandler(resultAnchorMenuDom, resultSectionDom);
    setScrollHandler(mbtiAnchorMenuDom, mbtiSectionDom);


};