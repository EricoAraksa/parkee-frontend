<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "sql105.infinityfree.com";
$username = "if0_38613507"; 
$password = "obpZZT6wbX7hz";
$dbname = "if0_38613507_parkee_asm";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

if ($_GET['action'] == "getParkingTickets") {
    $sql = "SELECT * FROM parking_tickets";
    $result = $conn->query($sql);

    $tickets = [];
    while ($row = $result->fetch_assoc()) {
        $tickets[] = $row;
    }

    echo json_encode($tickets);
}

$conn->close();
?>
