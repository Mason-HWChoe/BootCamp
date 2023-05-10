// do something!

export const StarRating = $container => {
  //인수로 넘어온 컨테이너에 클래스 추가
  $container.classList.add('star-rating-container');

  //현재 theme.css 파일이 링크된 것이 없을 때, CSS 링크 추가
  const existingLinkEl = document.querySelector('link[href="star-rating/theme.css"]');
  if (!existingLinkEl) {
    const linkEl = document.querySelectorAll('link')[document.querySelectorAll('link').length - 1];
    const newEl = document.createElement('link');
    newEl.rel = 'stylesheet';
    newEl.href = 'star-rating/theme.css';
    linkEl.parentNode.insertBefore(newEl, linkEl.nextSibling);
  }

  //별을 그려주고, 각 노드의 데이터셋에 대한 정보를 입력
  const maxRating = $container.dataset.maxRating;
  Array.from({ length: maxRating }, (_, i) => {
    const $star = document.createElement('i');
    $star.classList.add('bx', 'bxs-star', 'star');
    $star.dataset.ratingValue = i + 1;
    $container.appendChild($star);
    return $star;
  });

  //현재 노드 중 star-rating-container 아래에 있는 i 태그들을 배열에 담아 icons에 할당
  const icons = $container.querySelectorAll('.star-rating-container i');

  //이벤트 리스너 생성
  icons.forEach((icon, index) => {
    //마우스를 올렸을 때 hovered 클래스 추가
    icon.addEventListener('mouseover', () => {
      for (let i = 0; i <= index; i++) {
        icons[i].classList.add('hovered');
      }
    });

    //마우스 치웠을 때 hovered 클래스 삭제
    icon.addEventListener('mouseout', () => {
      for (let i = 0; i <= index; i++) {
        icons[i].classList.remove('hovered');
      }
    });

    //별점을 클릭했을 이벤트 리스너
    icon.addEventListener('click', () => {
      //클릭한 star 요소의 rating을 얻어온다
      const rating = icon.dataset.ratingValue;
      //rating-change 이벤트를 $container에 커스텀하여 발생시킨다
      const event = new CustomEvent('rating-change', { detail: rating });
      $container.dispatchEvent(event);
      //현재 클릭된 icon이 현재 노드의 부모 노드의 자식들 중에 몇 번째인지 인덱스를 얻어서 iconIndex에 할당
      //선택된 인덱스까지 selected 클래스 추가
      const iconIndex = Array.from(icon.parentNode.children).indexOf(icon);
      for (let i = 0; i <= iconIndex; i++) {
        icon.parentNode.children[i].classList.add('selected');
      }

      //선택된 인덱스 이후의 별들에 selected 클래스를 제거하여 초기의 별점 색깔 유지
      for (let i = iconIndex + 1; i < icon.parentNode.children.length; i++) {
        icon.parentNode.children[i].classList.remove('selected');
      }
    });
  });
};
