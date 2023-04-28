let postId = document.querySelector('input[name="post-id"]').value.trim();


const editPostHandler = async (event) => {
    event.preventDefault();

    const newTitle = document.querySelector('#title').value.trim();
    const newContent = document.querySelector('#body').value.trim();

    if (newTitle && newContent) {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            body: JSON.stringify({ title: newTitle, body: newContent }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Edit/Delete failed!');
        }
    }
};

document
    .querySelector('.edit-post')
    .addEventListener('submit', editPostHandler);

/* Delete Post */

const deletetPostHandler = async (event) => {
    event.preventDefault();
    console.log(postId)

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Edit/Delete failed!');
    }
};

document
    .querySelector('#delete-btn')
    .addEventListener('click', deletetPostHandler);


// const addcommenthandler = async (event) => {
//     console.log('passed')
//     event.preventDefault()

// }

// document
//     .querySelector(".post-content")
//     .addEventListener("click", addcommenthandler);