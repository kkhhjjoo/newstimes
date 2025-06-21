const API_KEY = `acf8fc54b6204f2ab344c80407b0e3ce`;
let newsList = [];
let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
);
const menus = document.querySelectorAll('.menus button');
//console.log('menus', menus);
menus.forEach((menu) =>
  menu.addEventListener('click', (event) => getNewByCategory(event))
);

const getNews = async () => {
  try {
    const response = await fetch(url);
    console.log('response', response);

    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error('No result for this search');
      }
      newsList = data.articles;
      render();
    } else {
      throw new Error(data.message);
    }

    newsList = data.articles;
    render();
  } catch (error) {
    console.log('error', error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  getNews();
  console.log('data', newsList);
};
const getNewByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log('category', category);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  console.log('data', data);
  getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById('search-input').value;
  console.log('keyword', keyword);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );
  //console.log('keyword data', data);
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
          <div class="col-lg-4">
            <img class="news-img-size" src="${news.urlToImage}" alt="" />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>${news.description}</p>
            <div>
              ${news.source.name} * ${news.publishedAt}
            </div>
          </div>
        </div>`
    )
    .join('');
  document.getElementById('news-board').innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">${errorMessage}</div>`;

  document.getElementById('news-board').innerHTML = errorHTML;
};

getLatestNews();
//1. 버튼들에 클릭 이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
