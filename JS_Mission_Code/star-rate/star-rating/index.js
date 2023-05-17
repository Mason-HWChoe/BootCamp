const CONTAINER_DEFAULT_CLASS_NAME = 'star-rating-container';
const CSS_DEFAULT_THEME = 'star-rating/theme.css';

const loadStyle = href => {
  if (document.querySelector(`link[href='${href}']`)) return;

  const $link = document.createElement('link');
  $link.href = href;
  $link.rel = 'stylesheet';

  const $lastLink = document.querySelector('link:last-of-type');
  document.head.insertBefore($link, $lastLink.nextElementSibling);
};

const render = $container => {
  const { maxRating = 5 } = $container.dataset;

  if (maxRating === '0') throw new Error(`Star-rating 컴포넌트의 max-rating 어트리뷰트 값은 1 이상이어야 합니다.`);

  $container.innerHTML = `
        <div class=${CONTAINER_DEFAULT_CLASS_NAME}>
            ${Array.from({ length: maxRating }, (_, i) => `<i class="bx bxs-star" data-value='${i + 1}'></i>`).join('')}
        </div>    
    `;
};

const StarRating = $container => {
  loadStyle(CSS_DEFAULT_THEME);
  render($container);

  const $stars = [...$container.querySelectorAll('i')];

  $container.onmouseover = ({ target }) => {
    if (!target.matches('i')) return;

    const { value } = target.dataset;

    $stars.forEach(($star, i) => {
      $star.classList.toggle('hovered', i < value);
    });
  };

  $container.onmouseleave = () => {
    $stars.forEach($star => {
      $star.classList.remove('hovered');
    });
  };

  $container.onclick = ({ target }) => {
    if (!target.matches('i')) return;

    const { value } = target.dataset;

    $stars.forEach(($star, i) => {
      $star.classList.toggle('selected', i < value);
    });

    $container.dispatchEvent(
      new CustomEvent('rating-change', {
        detail: value,
        bubble: true,
      })
    );
  };
};

export default StarRating;
