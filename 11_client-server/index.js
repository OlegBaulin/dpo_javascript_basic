const container = document.querySelector('.container');

let URLData = new URLSearchParams(window.location.search);
let page = URLData.get('page');

async function getData(page) {
  let res = await fetch(`https://gorest.co.in/public/v1/posts?page=${page}`);
  return await res.json();
}

let list = await getData(page);

function createList(data) {
  let list = document.createElement('ul');
  let title = document.createElement('h2');
  title.classList.add('mt-2');
  title.textContent = 'Список статей';

  list.classList.add('list-group', 'list-group-flush', 'mb-3');

  for (const item of data.data) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.classList.add('list-group-item');
    a.textContent = item.title;
    a.target = '_blanc';
    a.href = `./post.html?post_id=${item.id}`;

    li.append(a);
    list.append(li);
  }

  container.append(title);
  container.append(list);

  const pages = data.meta.pagination;

  const pagination = createPagination(pages);
  container.append(pagination)
}

// создаём и возвращаем пагинацию
function createPagination(pages) {
  const nav = document.createElement('nav');
  const pageList = document.createElement('ul');
  pageList.classList.add('pagination', 'flex-wrap');

  for (let i = 1; i <= pages.pages; i++) {
    const pageItem = document.createElement('li');
    pageItem.classList.add('page-item', 'mb-3');

    const pageLink = document.createElement('a');
    pageLink.classList.add('page-link');
    pageLink.textContent = i;
    i == 1 ? pageLink.href = 'index.html' : pageLink.href = `index.html?page=${i}`;

    pageItem.append(pageLink);
    pageList.append(pageItem);
  }

  nav.append(pageList);

  return nav;
}

createList(list);
