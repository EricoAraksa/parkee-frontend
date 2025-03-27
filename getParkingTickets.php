<?php

include 'db_connect.php';

// run with php -S localhost:8000
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$query = "SELECT id, plate_number, check_in_time, check_out_time, total_price FROM transactions"; 
$result = pg_query($conn, $query);

if (!$result) {
    die(json_encode(["error" => "Query failed: " . pg_last_error()]));
}

$data = [];
while ($row = pg_fetch_assoc($result)) {
  $row['check_in_time'] = date("d-m-Y H:i", strtotime($row['check_in_time']));
  $row['check_out_time'] = $row['check_out_time'] ? date("d-m-Y H:i", strtotime($row['check_out_time'])) : "Currently Parked";
  $row['total_price'] = $row['total_price'] ? "Rp " . number_format($row['total_price'], 0, ",", ".") : "Not yet calculated";

  $data[] = $row;
}

header("Content-Type: application/json");
echo json_encode($data);

pg_close($conn);
?>
