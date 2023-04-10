const signupFormHandler = async (event) => {
    event.preventDefault()

    const username = document.querySelector('#username-input-signup').value.trim()
    const password = document.querySelector('#password-input-signup').value.trim()

    fetch('/api/user', {
        method: "POST",
        body: JSON.stringify({username: username.value, password: password.value}),
        headers: {"Content-Type": "application/json"}
    })
    .then(() => {
        document.location.replace("/dashboard")
    })
}

document.querySelector('#signup-form').addEventListener("submit", signupFormHandler)
