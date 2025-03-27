<?php
$host = "localhost";
$port = "5432";
$dbname = "parkee_db";
$user = "postgres";
$password = "Erico1235";

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    die(json_encode(["error" => "Failed to connect to database: " . pg_last_error()]));
}
?>
