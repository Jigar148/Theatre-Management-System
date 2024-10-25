<?php
session_start();

// Dummy user for demonstration purposes
$valid_username = "user";
$valid_password = "password"; // In a real application, use hashed passwords!

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check credentials
    if ($username === $valid_username && $password === $valid_password) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header("Location: dashboard.php"); // Redirect to dashboard
        exit;
    } else {
        echo "Invalid username or password.";
    }
}

