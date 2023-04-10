const postContent = document.querySelector('.post-content');

postContent.addEventListener('click', () =>  {
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#body').value.trim();
    document.location.replace('/edit')
    const editTitle = post.paramsreq.params.id
})
    


const editPostHandler = async (event) => {
    event.preventDefault();
  
    const newTitle = document.querySelector('#title').value.trim();
    const newContent = document.querySelector('#body').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts/:id', {
        method: 'PUT',
        body: JSON.stringify({ newTitle, newContent }),
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

