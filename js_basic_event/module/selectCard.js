import { SELECT_RESULT_KEY } from "../constants/result.js";
import { appendChildrenList, makeDOMwithProperties } from "../utils/dom.js";


const cardInfoList = [
    {
        id: 1,
        imgSrc: '/js_basic_event/public/assets/초코꼬북칩.jpeg',
        name: '초코꼬북칩',
        description: '맛있는 초코꼬북칩',
    },
    {
        id: 2,
        imgSrc: '/js_basic_event/public/assets/나쵸.jpeg',
        name: '나쵸',
        description: '맛있는 나쵸',
    },
    {
        id: 3,
        imgSrc: '/js_basic_event/public/assets/허니버터칩.jpeg',
        name: '허니버터칩',
        description: '맛있는 허니버터칩',
    },
    {
        id: 4,
        imgSrc: '/js_basic_event/public/assets/홈런볼.jpeg',
        name: '홈런볼',
        description: '맛있는 홈런볼',
    }
];

const snackCardList = document.getElementsByClassName('snack-card-list')[0];
const selectButtonDOM = document.getElementsByClassName('participate-button')[0];
const [ notyetContainerDOM, resultContainerDOM ] = document.getElementsByClassName('result-container');
const [ , resultImageDOM, resultNameDOM, resultDescriptionDOM, selectRetryButtonDOM ] = resultContainerDOM.children;

const getSelectedCard = () => {
    return document.getElementsByClassName('select')[0];
}
const getCardId = (id) => {
    return document.getElementById(`select-${id}`);
}

const handleSelectCard = (cardId) => {

    const originalSelectedCard = getSelectedCard();
    originalSelectedCard?.classList.remove('select');

    const newSelectedCard = getCardId(cardId);
    newSelectedCard?.classList.add('select');
};

const getSelectCardDOM = ({
    id,
    imgSrc,
    name,
    description
}) => {
    const snackCardDOM = makeDOMwithProperties('button', {
        id: `select-${id}`,
        className: 'snack-card',
        onclick: () => handleSelectCard(id)
    });

    const imageDOM = makeDOMwithProperties('img', {
        src: imgSrc,
        alt: name,
    });
    
    const descriptionContainerDOM = makeDOMwithProperties('div', {
        className: 'snack-description',
    });

    const nameDOM = makeDOMwithProperties('div', {
        innerHTML: name,
    });

    const descriptionDOM = makeDOMwithProperties('div', {
        innerHTML: description,
    });

    appendChildrenList(descriptionContainerDOM, [nameDOM, descriptionDOM]);
    appendChildrenList(snackCardDOM, [imageDOM, descriptionContainerDOM]);

    return snackCardDOM;
}
export const setSelectCards = () => {
    const originalSnackCards = Object.assign([], snackCardList.children);
    originalSnackCards.forEach((snackCard) => snackCard.remove());

    cardInfoList.forEach((cardInfo) => {
        const SelectCardDOM = getSelectCardDOM(cardInfo);
        snackCardList.appendChild(SelectCardDOM);
    })

    const cardId = Number(localStorage.getItem(SELECT_RESULT_KEY));
    if (!cardId || isNaN(cardId)) return;
    handleSelectCard(cardId);
};


export const setSelectButton = () => {
    selectButtonDOM.onclick = () => {
        const selectedCard = getSelectedCard();
        if (!selectedCard) {
            alert("선택된 카드가 없습니다.");
            return;
        }
        const cardId = selectedCard.id?.split('-')[1];
        localStorage.setItem(SELECT_RESULT_KEY, cardId);
        setResultContainer();
    };
};

const initialize = () => {
    localStorage.removeItem(SELECT_RESULT_KEY);

    setSelectCards();
    setResultContainer();

    const selectsectionDom = document.getElementById('participate-section');
    const scrollTargetY = selectsectionDom.offsetTop;
    window.scroll({
        top: scrollTargetY,
        left: 0,
        behavior: 'smooth'
    });
};

export const setResultContainer = () => {
    const selectedId = Number(localStorage.getItem(SELECT_RESULT_KEY));

    const isSelected = !!selectedId;
    if (!isSelected) {
        notyetContainerDOM.style.display = 'block';
        resultContainerDOM.style.display = 'none';
        return;
    }
    notyetContainerDOM.style.display = 'noen';
    resultContainerDOM.style.display = 'flex';

    const cardInfo = cardInfoList.find((info) => info.id === selectedId);
    resultImageDOM.src = cardInfo.imgSrc;
    resultImageDOM.alt = cardInfo.name;
    resultNameDOM.innerHTML = cardInfo.name;
    resultDescriptionDOM.innerHTML = cardInfo.description;

    selectRetryButtonDOM.onclick = initialize;
}