let postId = document.querySelector('input[name="post-id"]').value.trim();
console.log(postId)

const addCommentHandler = async (event) => {
    event.preventDefault();

   
    const newContent = document.querySelector('#new-body').value.trim();

    if (newContent) {
        const response = await fetch(`/api/posts/comment/:postid`, {
            method: 'POST',
            body: JSON.stringify({postId, body: newContent }),
            headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Add comment failed!');
        }
    }
};

document
    .querySelector('.create-comment-btn')
    .addEventListener('click', addCommentHandler);
