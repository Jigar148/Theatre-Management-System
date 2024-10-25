<?php
// db.php - Database simulation
session_start();

$users = [
    ["username" => "admin", "password" => "password"]
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    foreach ($users as $user) {
        if ($user['username'] === $username && $user['password'] === $password) {
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            echo json_encode(["success" => true]);
            exit;
        }
    }
    echo json_encode(["success" => false]);
}

