<?php

use App\Models\User;
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once '../config/database.php';
include_once '../models/User.php';

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->hash)) {

    if ($user->validate($data->email, $data->hash)) {
        http_response_code(200);
        echo json_encode(["message" => "User validated successfully."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to validate user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to validate user. Data is incomplete."]);
    echo json_encode($data);
}