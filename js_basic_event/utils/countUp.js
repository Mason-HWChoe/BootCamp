export const countUp = (dom, target, second, term = 15) => {
    if(!dom || isNaN(Number(target)) || isNaN(Number(second)) || isNaN(Number(term))) return;

    let nowNumber = 0;
    const countTerm = Math.floor((target / second) * (term / 1000));

    const timerID = setInterval(() => {
        if(nowNumber >= target) {
            nowNumber = target;
            clearInterval(timerID)
            return;
        }
        nowNumber += countTerm;
        dom.innerHTML = `${nowNumber.toLocaleString()}`
    }, term);
};