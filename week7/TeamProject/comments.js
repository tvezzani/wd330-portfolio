let commentList = [];

// localStorage.clear();

function readFromLS(key) {
    let data = JSON.parse(localStorage.getItem(key));
    //console.log('Successfully fetched ' + data.length + ' comments from key ' + key);
    return data;
  }
  
  function writeToLS(key, data) {
    localStorage.setItem(key, data);
  }

function renderCommentList() {
    if (commentList.length === 0) {
        let temp;
        temp = readFromLS(111);
        if (temp !== null) {
            commentList = temp;
        }
    }

    if (commentList.length > 0){
        commentList.forEach(comment => {
            console.log(comment.comment);
        });
    }
    else{
        console.log("There are no comments");
    }
}

export default class Comment {
    constructor(hikeName, date, comment, type){
        this.hikeName = hikeName;
        this.date = date;
        this.comment = comment;
        }
    getAllComments() {
        //Do stuff
        return commentList;
      }
    
    filterCommentsByName() {
        //Do stuff
    }

    showCommentList() {
        renderCommentList();
    }

    addComment(hikeName, date, comment) {
        const newComment = {
            hikeName,
            date,
            comment
        }
        commentList.push(newComment);
        writeToLS(111, JSON.stringify(commentList));
        // console.log(commentList.length);
    }
}