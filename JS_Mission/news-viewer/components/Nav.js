//nav 생성 함수
const Nav = () => {
  function makeNav() {
    const $root = document.querySelector('#root');
    const $nav = document.createElement('nav');
    $nav.classList.add('category-list');
    $root.appendChild($nav);

    const $ul = document.createElement('ul');
    $nav.appendChild($ul);

    $ul.innerHTML = '';

    let id;
    let content;

    //ul노드에 들어갈 리스트와 id값 배열로 만듦
    const idList = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];
    const contentList = ['전체보기', '비즈니스', '엔터테인먼트', '건강', '과학', '스포츠', '기술'];

    //반복문으로 ul의 innerHTML에 li태그 삽입
    for (let i = 0; i < idList.length; i++) {
      id = idList[i];
      content = contentList[i];
      $ul.innerHTML = $ul.innerHTML + `<li id=${id} class="category-item">${content}</li>`;
    }

    //id가 general인 노드에 active 클래스 추가 -> 첫 화면이 로드돠었을때 기본으로 보여줄 화면
    const general = document.querySelector('#general');
    general.classList.add('active');
  }

  makeNav();
};

export default Nav;
