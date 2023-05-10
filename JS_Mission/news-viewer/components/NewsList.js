//뉴스 가져오는 함수
const NewsList = category => {
  let page = 1;
  const pageSize = 5;
  const apiKey = '858c9b5adb944841b39d58b8ae3a6bfb';

  //API로 받아온 뉴스 데이터를 HTML 템플릿 문자열로 변환하여 화면에 출력
  const printNews = news => {
    const $newsList = document.querySelector('.news-list');
    const { data } = news;
    data.articles.forEach(item => {
      const article = `
            <section class="news-item">
                <div class="thumbnail">
                    <a href=${item.url} target="_blank" rel="noopener noreferrer">
                    <img src=${item.urlToImage} alt="thumbnail" />
                    </a>
                </div>
                <div class="contents">
                    <h2>
                        <a href=${item.url} target="_blank" rel="noopener noreferrer">${item.title}</a>
                    </h2>
                    <p>${item.description}</p>
                </div>
            </section>`;
      //$newsList 노드의 마지막 자식노드 뒤에 article 문자열을 삽입
      $newsList.insertAdjacentHTML('beforeend', article);
    });
  };

  //API를 호출하여 카테고리별로 뉴스데이터를 가져옴
  const fetchNews = async () => {
    const categoryParam = category === 'general' || category === null ? '' : category;
    const url = `https://newsapi.org/v2/top-headlines?country=kr&category=${categoryParam}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
    return await axios.get(url);
  };

  //API 호출 / 응답 함수
  const render = async (callApi, callTemplate) => {
    const response = await callApi();
    callTemplate(response);
  };

  //HTML요소 추가 및 스크롤 옵저버 요소 생성
  const makeNews = () => {
    const $root = document.querySelector('#root');
    const $container = document.createElement('div');
    $container.classList.add('news-list-container');
    $container.innerHTML = `<article class="news-list">`;
    $root.appendChild($container);

    const $div = document.createElement('div');
    $div.classList.add('scroll-observer');
    $div.innerHTML = `<img src="img/ball-triangle.svg" alt="Loading" />`;
    $container.appendChild($div);
  };

  //render함수 호출하여 뉴스 데이터를 불러옴
  const loadNews = async () => {
    try {
      await render(fetchNews, printNews);
    } catch (error) {
      console.log(error);
    }
  };

  //스크롤 옵저버가 뷰포트 내에 들어올 때 페이지를 더하고 다음 뉴스를 불러옴
  const newsScrollObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      page++;
      loadNews();
    }
  });

  //초기 뉴스리스트 출력
  makeNews();
  loadNews();

  //스크롤 관찰 시작
  const $scroll_observer = document.querySelector('.scroll-observer');
  newsScrollObserver.observe($scroll_observer);
};

export default NewsList;
