const AnalogClock = $container => {
  // 해당 돔 아래에 자식이 있다면 전부 삭제해줌
  while ($container.firstChild) {
    $container.removeChild($container.firstChild);
  }

  // 돔 생성
  const $hourHand = document.createElement('div');
  const $minuteHand = document.createElement('div');
  const $secondHand = document.createElement('div');

  //돔에 클래스 추가
  $hourHand.classList.add('hand', 'hour');
  $minuteHand.classList.add('hand', 'minute');
  $secondHand.classList.add('hand', 'second');

  // 생성한 돔을 $container돔 아래에 추가
  $container.appendChild($hourHand);
  $container.appendChild($minuteHand);
  $container.appendChild($secondHand);

  //시계 눈금 추가하여 돔 아래에 추가
  for (let i = 1; i <= 12; i++) {
    const $hourTick = document.createElement('div');
    $hourTick.classList.add('time', `time${i}`);
    $hourTick.innerText = '|';
    $hourTick.style.transform = `rotate(${i * 30}deg)`;
    $container.appendChild($hourTick);
  }

  //시계 동작 함수
  const updateClock = () => {
    //현재 시간을 now 변수에 담은 뒤, 시간, 분, 초를 각각의 변수에 담음
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    //시, 분, 초의 각도를 계산하여 각각의 변수에 담음
    const hourDeg = hours * 30 + minutes * 0.5;
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;

    //계산한 각도를 각각의 돔에 css 속성에 있는 변수 --deg에 추가
    $hourHand.style.setProperty('--deg', hourDeg);
    $minuteHand.style.setProperty('--deg', minuteDeg);
    $secondHand.style.setProperty('--deg', secondDeg);
  };
  // 시계를 동작시킴 -> 1초마다 반복
  updateClock();
  setInterval(updateClock, 1000);
};

//클래스가 analog-clock인 첫번째 노드를 $container에 할당하고 AnalogClock 함수에 인수로 전달하여 실행
const $container = document.getElementsByClassName('analog-clock')[0];
AnalogClock($container);

export default AnalogClock;
