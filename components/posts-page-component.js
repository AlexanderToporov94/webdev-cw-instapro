import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  
  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  const postsHTML = posts.map((createdAt, description, id, imageUrl, isLiked, likes, user) => {
    return`
    <li class="post">
      <div class="post-header" data-user-id="${user.id}">
          <img src="${user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${protectionInnerHTML(user.name)}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${id}" class="like-button">
        <img src="./assets/images/like${isLiked ? '-active' : '-not-active'}.svg">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${likes.length}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${protectionInnerHTML(user.name)}</span>
        ${protectionInnerHTML(description)}
      </p>
      <p class="post-date">
        ${createdAt}
      </p>
    </li>`
  }).join('');

  const postsConteiner = document.querySelector('.posts');

  postsConteiner.innerHTML = postsHTML;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
