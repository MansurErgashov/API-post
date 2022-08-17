const elUserList = document.querySelector('.user__list')
const elPostList = document.querySelector('.post_list')
const elCommentList = document.querySelector('.comment_list')
const elUsersTemplate = document.querySelector('.user__template').content;
const elPostsTemplate = document.querySelector('.post__template').content;
const elCommentsTemplate = document.querySelector('.commnets__template').content;
const elUsersCount = document.querySelector('.user-count')
const elPostsCount = document.querySelector('.posts__count')
const elCommentsCount = document.querySelector('.comments__count')

//users
fetch('https://jsonplaceholder.typicode.com/users')
.then(res => res.json())
.then(data => renderUsers(data))

//  render User
function renderUsers(array) {
    elUserList.innerHTML = '';


    elUsersCount.textContent = array.length;
    const usersFragment = document.createDocumentFragment();
    array.forEach(item => {

        const newUserTemp = elUsersTemplate.cloneNode(true)

        newUserTemp.querySelector('.user__link').textContent = item.name
        newUserTemp.querySelector('.user__item').dataset.userId = item.id
        usersFragment.appendChild(newUserTemp)
    });
    elUserList.appendChild(usersFragment)
}


// posts render 
elUserList.addEventListener('click', function(event) {
    elCommentList.innerHTML = '';
    
    let usersId = event.target.closest(".user__item").dataset.userId
  
    fetch(`https://jsonplaceholder.typicode.com/users/${usersId}/posts`)
    .then(res => res.json())
    .then(data => renderPosts(data));

})

function renderPosts(array) {

    elPostList.innerHTML = '';
    elPostsCount.textContent = array.length
    const postsFragment = document.createDocumentFragment();

    array.forEach(item => {
        
        const newPostTemp = elPostsTemplate.cloneNode(true)
        newPostTemp.querySelector('.post__id').textContent = item.id
        newPostTemp.querySelector('.post__title').textContent = item.title
        newPostTemp.querySelector('.posts__item').dataset.postId = item.id
        newPostTemp.querySelector('.post__body').textContent = item.body

        postsFragment.appendChild(newPostTemp)
    });
    elPostList.appendChild(postsFragment)
}


// commits
elPostList.addEventListener('click', function(event) {
    let postsId = event.target.closest(".posts__item").dataset.postId

    fetch(`https://jsonplaceholder.typicode.com/posts/${postsId}/comments`)
    .then(res => res.json())
    .then(data => renderCommits(data));
})

function renderCommits(array) {

    elCommentList.innerHTML = '';
    elCommentsCount.textContent = array.length;
    const commitsFragment = document.createDocumentFragment();

    array.forEach(item => {

        const newCommitsTemp = elCommentsTemplate.cloneNode(true)
        newCommitsTemp.querySelector('.commits__id').textContent = item.id
        newCommitsTemp.querySelector('.commits__title').textContent = item.name
        newCommitsTemp.querySelector('.commits__email').textContent = item.email
        newCommitsTemp.querySelector('.commits__body').textContent = item.body

        commitsFragment.appendChild(newCommitsTemp)
    });
    elCommentList.appendChild(commitsFragment)
}