<?php
include 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['plate_number'])) {
        echo json_encode(["error" => "Plate number is required"]);
        exit;
    }

    $plate_number = pg_escape_string($conn, $data['plate_number']);
    
    $query = "SELECT check_in_time FROM transactions WHERE plate_number = '$plate_number' AND check_out_time IS NULL ORDER BY check_in_time DESC LIMIT 1";
    $result = pg_query($conn, $query);

    if (!$result || pg_num_rows($result) == 0) {
        echo json_encode(["error" => "No active check-in found for this vehicle"]);
        exit;
    }

    $row = pg_fetch_assoc($result);
    $check_in_time = $row['check_in_time'];
    $check_out_time = date('Y-m-d H:i:s');

    $duration = (strtotime($check_out_time) - strtotime($check_in_time)) / 3600;
    $total_price = round($duration * 3000, 2); //3000 rate/hour

    $update_query = "UPDATE transactions SET check_out_time = '$check_out_time', total_price = $total_price WHERE plate_number = '$plate_number' AND check_out_time IS NULL";
    $update_result = pg_query($conn, $update_query);

    if ($update_result) {
        echo json_encode(["message" => "Check-out successful", "total_price" => $total_price]);
    } else {
        echo json_encode(["error" => "Check-out failed: " . pg_last_error()]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

pg_close($conn);
?>
