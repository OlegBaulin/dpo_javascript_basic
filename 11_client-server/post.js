const container = document.querySelector('.container');

// получаем данные статьи
async function getData(id) {
  let res = await fetch(`https://gorest.co.in/public/v1/posts/${id}`);
  return await res.json();
}

// получаем комментарии статьи
async function getComments(id) {
  let res = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
  return await res.json();
}



const URLData = new URLSearchParams(window.location.search);
const id = URLData.get('post_id');

const postData = await getData(id);
const commentsData = await getComments(id);

// создаём статью
function createPost(post, commentsData) {
  const title = document.createElement('h1');
  title.textContent = post.title;
  title.classList.add('text-center', 'mb-5');

  const text = document.createElement('p');
  text.textContent = post.body;
  text.classList.add('lead', 'text-center');
  document.title = post.title;

  const comments = createComments(commentsData);
  
  container.append(title);
  container.append(text);
  container.append(comments);
}

// создаём и возвращаем комментарии к статье
function createComments(comments) {
  const commentsContainer = document.createElement('div');
  
  const title = document.createElement('h2');
  title.textContent = 'Comments';

  commentsContainer.append(title);

  if(comments.length == 0) {
    const text = document.createElement('span');
    text.textContent = 'No comments...';
    commentsContainer.append(text);
    return commentsContainer;
  }

  const commentList = document.createElement('ul');
  commentList.classList.add('list-group', 'list-group-flush');

  for (const comment of comments) {
    console.log(comment);
    const commentItem = document.createElement('li');
    commentItem.classList.add('list-group-item');

    const commentAuthor = document.createElement('b');
    commentAuthor.textContent = comment.name;

    const commentText = document.createElement('p');
    commentText.textContent = comment.body;

    commentItem.append(commentAuthor);
    commentItem.append(commentText);
    commentList.append(commentItem);
  }

  commentsContainer.append(commentList);

  return commentsContainer;
}

createPost(postData.data, commentsData.data);
