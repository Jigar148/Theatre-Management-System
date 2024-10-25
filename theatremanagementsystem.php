<?php
// Connect to the database
$conn = mysqli_connect("localhost", "username", "password", "theatre_management");

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Function to retrieve movies
function getMovies() {
    global $conn;
    $sql = "SELECT * FROM movies";
    $result = mysqli_query($conn, $sql);
    return $result;
}

// Function to retrieve bookings
function getBookings() {
    global $conn;
    $sql = "SELECT * FROM bookings";
    $result = mysqli_query($conn, $sql);
    return $result;
}

// Function to add a movie
function addMovie($title, $genre, $language, $subtitles, $screen_no, $location, $release_date, $ticket_price) {
    global $conn;
    $sql = "INSERT INTO movies (title, genre, language, subtitles, screen_no, location, release_date, ticket_price) VALUES ('$title', '$genre', '$language', '$subtitles', $screen_no, '$location', '$release_date', $ticket_price)";
    mysqli_query($conn, $sql);
}

// Function to add a booking
function addBooking($movie_id, $seat_numbers, $customer_name, $customer_email, $total_price) {
    global $conn;
    $sql = "INSERT INTO bookings (movie_id, seat_numbers, customer_name, customer_email, total_price) VALUES ($movie_id, '$seat_numbers', '$customer_name', '$customer_email', $total_price)";
    mysqli_query($conn, $sql);
}

// Function to remove a movie
function removeMovie($id) {
    global $conn;
    $sql = "DELETE FROM movies WHERE id = $id";
    mysqli_query($conn, $sql);
}

// Function to remove a booking
function removeBooking($id) {
    global $conn;
    $sql = "DELETE FROM bookings WHERE id = $id";
    mysqli_query($conn, $sql);
}
