<?php
include 'db_connect.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input["plate_number"]) || empty($input["plate_number"])) {
        echo json_encode(["error" => "Plate number is required"]);
        exit;
    }

    $plate_number = $input["plate_number"];
    $check_in_time = date("Y-m-d H:i:s"); //Current timestamp

    $query = "INSERT INTO transactions (plate_number, check_in_time) VALUES ($1, $2) RETURNING id";
    $result = pg_query_params($conn, $query, [$plate_number, $check_in_time]);

    if ($result) {
        echo json_encode(["success" => "Vehicle checked in successfully"]);
    } else {
        echo json_encode(["error" => pg_last_error($conn)]);
    }
}
?>
