import Nav from './Nav.js';
import NewsList from './NewsList.js';

const pageIndex = () => {
  const category = {};

  //proxy 생성시 사용할 get, set 메서드 정의
  const handler = {
    get: (obj, name) => {
      if (name === 'id') {
        return obj[name] ? obj[name] : 'general';
      }
    },
    set: (obj, name, value) => {
      if (name === 'id') {
        obj[name] = value;
        return true;
      }
    },
  };

  //proxy 객체 생성
  const proxy = new Proxy(category, handler);

  //카테고리별 클릭 이벤트 리스너 등록
  const $navItems = document.querySelectorAll('.category-item');
  $navItems.forEach(nav => {
    nav.addEventListener('click', () => {
      //news-list-container 요소 삭제
      const $container = document.querySelector('.news-list-container');
      $container.remove();

      //클릭된 요소의 id값을 proxy의 id로 업데이트
      const id = nav.id;
      proxy.id = id;

      //기존에 active 클래스가 적용된 요소에 active 클래스를 삭제하고 클릭된 요소에 active 클래스 추가한 뒤 NewsList함수에 proxy.id를 전달하여 추가
      const $selectedItem = document.querySelector('.active');
      $selectedItem.classList.remove('active');
      nav.classList.add('active');
      NewsList(proxy.id);
    });
  });
};

export default pageIndex;
export { Nav, NewsList };
