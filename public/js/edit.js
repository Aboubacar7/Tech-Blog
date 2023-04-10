const postId = document.querySelector('input[name="post-id"]').value.trim();


const editPostHandler = async (event) => {
    event.preventDefault();
  
    const newTitle = document.querySelector('#title').value.trim();
    const newContent = document.querySelector('#body').value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
       newTitle,
       newContent,
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

