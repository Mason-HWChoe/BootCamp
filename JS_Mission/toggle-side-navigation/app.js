(() => {
  const get = target => {
    return document.querySelector(target);
  };

  // 노드 추출
  const $toggleBtn = get('.toggle');
  const $nav = get('nav');
  const $body = get('body');

  // 로컬스토리지에 저장
  const saveNavState = isOpen => {
    localStorage.setItem('navState', isOpen);
  };

  // 로컬스토리지에서 navState값이 있는지 체크
  const getNavState = () => {
    return localStorage.getItem('navState') === 'true';
  };

  // nav 노드에 active 클래스 토글하고 상태를 로컬스토리지에 저장
  const toggleNav = () => {
    const isOpen = $nav.classList.toggle('active');
    saveNavState(isOpen);
  };

  const init = () => {
    // 로컬스토리지의 상태 불러오기
    const isOpen = getNavState();

    //만약 로컬스토리지의 상태가 true이면 nav에 active 클래스 추가
    if (isOpen) {
      $nav.classList.add('active');
    }

    // 바디에 preload 클래스 추가하여 트랜지션을 막고, visibility를 visible로 바꿔서 페이지를 보여줌
    $body.classList.add('preload');
    document.body.style.visibility = 'visible';

    //페이지 로드가 끝나면 preload 클래스를 삭제하여 트랜지션이 발생하도록 만들어주고, 토글버튼이 클릭되면 toggleNav함수를 실행시킴
    window.addEventListener('load', () => {
      $body.classList.remove('preload');
    });
    $toggleBtn.addEventListener('click', toggleNav);
  };

  init();
})();
