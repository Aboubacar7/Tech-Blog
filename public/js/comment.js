
 let commentId = document.querySelector('input[name="comments-id"]').value.trim();


/* Edit comments  */
const editCommentHandler = async (event) => {
    event.preventDefault();

    const newBody = document.querySelector('#body').value.trim();

    if (newBody) {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: 'PUT',
            body: JSON.stringify({commentId, content: newBody }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            /* Goes back and reload the page*/
            window.location = document.referrer;
        } else {
            alert('Edit/Delete failed!');
        }
    }
};

document
    .querySelector('#update-comment-btn')
    .addEventListener('click', editCommentHandler);

/* Delete Post */
const deletetCommentHandler = async (event) => {
    event.preventDefault();
    

    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
       window.location= document.referrer;
    } else {
        alert('Edit/Delete failed!');
    }
};

document
    .querySelector('#delete-comment-btn')
    .addEventListener('click', deletetCommentHandler);

