const signupFormHandler = async (event) => {
    event.preventDefault()

    const username = document.querySelector('#username-input-signup')
    const password = document.querySelector('#password-input-signup')

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
