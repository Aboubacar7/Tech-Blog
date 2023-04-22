const signupFormHandler = async (event) => {
    event.preventDefault()

    const username = document.querySelector('#username-input-signup').value.trim()
    const password = document.querySelector('#password-input-signup').value.trim()

    fetch('/api/users/signup', {
        method: "POST",
        body: JSON.stringify({ username, password}),
        headers: {"Content-Type": "application/json"}
    })
    .then(() => {
        document.location.replace("/dashboard")
    })
    .then(() => {
        alert(`You're logged in`);
    })
}

document.querySelector('.signup-form').addEventListener("submit", signupFormHandler)
