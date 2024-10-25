<?php
// Connect to the database
$conn = mysqli_connect("localhost", "username", "password", "database");

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Add a movie
if (isset($_POST['add_movie'])) {
    $movie_name = $_POST['movie_name'];
    $show_time = $_POST['show_time'];
    $sql = "INSERT INTO shows (show_name, show_time) VALUES ('$movie_name', '$show_time')";
    mysqli_query($conn, $sql);
}

// Remove a movie
if (isset($_POST['remove_movie'])) {
    $movie_id = $_POST['movie_id'];
    $sql = "DELETE FROM shows WHERE show_id = $movie_id";
    mysqli_query($conn, $sql);
}

// Retrieve the list of shows
$sql = "SELECT * FROM shows";
$result = mysqli_query($conn, $sql);
?>

<!-- HTML Form for Adding/Removing Movies -->
<form method="post">
    <input type="text" name="movie_name" placeholder="Movie Name" required>
    <input type="text" name="show_time" placeholder="Show Time" required>
    <button type="submit" name="add_movie">Add Movie</button>
</form>

<form method="post">
    <select name="movie_id">
        <?php while ($row = mysqli_fetch_assoc($result)) { ?>
            <option value="<?php echo $row['show_id']; ?>"><?php echo $row['show_name']; ?></option>
        <?php } ?>
    </select>
    <button type="submit" name="remove_movie">Remove Movie</button>
</form>