
const mbtiQuestionDOM = document.getElementsByClassName('mbti-question')[0];
const [ yesButton, noButton ] = document.getElementsByClassName('mbti-select')[0].children;
const [ selectDOM, pendingDOM, resultDOM ] = document.getElementsByClassName('mbti-container');
const mbtiResultTitleDOM = document.getElementsByClassName('mbti-result')[0];
const mbtiResultDescriptionDOM = document.getElementsByClassName('mbti-description')[0];
const mbtiRetryButton = document.getElementsByClassName('mbti-retry-button')[0];

const mbtiQuestionList = [
    '짠 과자가 단 과자보다 좋다',
    '봉지 과자가 박스 과자보다 좋다',
    '과자를 뜯으면 한 번에 다 먹는다.'
];

const getMbtiResult = (resultValue) => {
    switch(resultValue) {
        case 0:
            return {
                title: '과자 어린이 유형',
                description: '과자 어린이 유형 설명'
            }
            break;
        case 1:
            return {
                title: '과자 초심자 유형',
                description: '과자 초심자 유형 설명'
            }
        case 2:
            return {
                title: '과자 중급자 유형',
                description: '과자 중급자 유형 설명'
            }
            break;
        case 3:
        default:
            return {
                title: '과자 고수 유형',
                description: '과자 고수 유형 설명'
            }
        }
}

let currntRound = 0;
let resultValue = 0;
const maxRound = mbtiQuestionList.length;

const setPendingSection = () => {
    pendingDOM.style.display = 'block';
    selectDOM.style.display = 'none';

    setTimeout(() => {
        pendingDOM.style.display = 'none';
        resultDOM.style.display = 'block';
    }, 3000);
}

const initialize = () => {
    currntRound = 0;
    resultValue = 0;
    selectDOM.style.display = 'block';
    pendingDOM.style.display = 'none';
    resultDOM.style.display = 'none';
}

const setResultSection = () => {
    const { title, description } = getMbtiResult(resultValue);
    mbtiResultTitleDOM.innerHTML = title;
    mbtiResultDescriptionDOM.innerHTML = description;

    mbtiRetryButton.onclick = initialize;
}

export const setMbtiSection = () => {

    if (currntRound === maxRound){
        setPendingSection();
        setResultSection();
        return;
    }
    
    selectDOM.style.display = 'block';

    mbtiQuestionDOM.innerHTML = mbtiQuestionList[currntRound++];
    yesButton.onclick = () => {
        resultValue++;
        setMbtiSection();
    };
    noButton.onclick = () => {
        setMbtiSection();
    };
};