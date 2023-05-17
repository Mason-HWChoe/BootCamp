const tick = hands => {
  const date = new Date();
  const [seconds, minutes, hours] = [date.getSeconds(), date.getMinutes(), date.getHours()];
  const [$hourHand, $minuteHand, $secondHand] = hands;

  $secondHand.style.setProperty('--deg', seconds * 6);
  $minuteHand.style.setProperty('--deg', minutes * 6 + seconds * 0.1);
  $hourHand.style.setProperty('--deg', hours * 30 + minutes * 0.5 + seconds * (0.5 / 60));
};

const AnalogClock = $container => {
  const $template = document.createElement('template');
  $template.innerHTML = `
        <div class="hand hour"></div>
        <div class="hand minute"></div>
        <div class="hand second"></div>
        <div class="time time1">|</div>
        <div class="time time2">|</div>
        <div class="time time3">|</div>
        <div class="time time4">|</div>
        <div class="time time5">|</div>
        <div class="time time6">|</div>
        <div class="time time7">|</div>
        <div class="time time8">|</div>
        <div class="time time9">|</div>
        <div class="time time10">|</div>
        <div class="time time11">|</div>
        <div class="time time12">|</div>
    `;

  $container.appendChild($template.content);

  const hands = [...$container.querySelectorAll('.hand')];

  setInterval(() => {
    tick(hands);
  }, 1000);
};

export default AnalogClock;
