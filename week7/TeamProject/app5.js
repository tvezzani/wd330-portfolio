import Hikes from './hikes.js';
import Comments from './comments.js';

//on load grab the array and insert it into the page
const myHikes = new Hikes('hikes');
window.addEventListener('load', () => {
  myHikes.showHikeList();
});

const myComments = new Comments('comments');
window.addEventListener('load', () => {
  myComments.showCommentList();
});

const commentInput =  document.getElementById("comment-content");
const submitCommentButton = document.getElementById("submit-comment").addEventListener("click", () => {
  myComments.addComment(0,0,commentInput.value);
  myComments.showCommentList();
});