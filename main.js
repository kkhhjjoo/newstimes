const API_KEY = `acf8fc54b6204f2ab344c80407b0e3ce`;
let newsList = [];
const menus = document.querySelectorAll('.menus button');
//console.log('menus', menus);
menus.forEach((menu) =>
  menu.addEventListener('click', (event) => getNewByCategory(event))
);

const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log('data', newsList);
};
const getNewByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log('category', category);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log('data', data);
  newsList = data.articles;
  render();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById('search-input').value;
  console.log('keyword', keyword);
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log('keyword data', data);
  newsList = data.articles;
  render();
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
getLatestNews();
//1. 버튼들에 클릭 이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기
