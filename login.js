document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    // Hardcoded user credentials (for demonstration purposes only)
    const validUsername = "user";
    const validPassword = "password";

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Simple validation
        if (username === validUsername && password === validPassword) {
            // Redirect to the booking page upon successful login
            window.location.href = "book.html";
        } else {
            // Show error message for invalid credentials
            errorMessage.textContent = "Invalid username or password. Please try again.";
        }
    });
});
