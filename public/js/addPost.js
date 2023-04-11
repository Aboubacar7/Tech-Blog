

const addPostHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#new-title').value.trim();
    const body= document.querySelector('#new-body').value.trim();
  
    if (title && body) {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, body }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('New post added');
      }
    }
  };
  
  document
    .querySelector('#create-btn')
    .addEventListener('submit', addPostHandler);
  
    const showaddPostHandler = async (event) => {
        
        const response = await fetch('/api/posts/newpost', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          if (response.ok) {
            alert('New post added');
          }
    }

    document
    .querySelector('#btn-id-2')
    .addEventListener('click', showaddPostHandler);