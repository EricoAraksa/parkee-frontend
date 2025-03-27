<?php

include 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");

$query = "SELECT plate_number, check_in_time FROM transactions WHERE check_out_time IS NULL ORDER BY check_in_time DESC";
$result = pg_query($conn, $query);

$vehicles = [];
while ($row = pg_fetch_assoc($result)) {
    $vehicles[] = $row;
}

echo json_encode($vehicles);
pg_close($conn);
?>
