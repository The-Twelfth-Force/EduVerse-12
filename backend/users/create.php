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

function generateNetID($firstName, $lastName) {
    $firstName = strtolower($firstName);
    $lastName = strtolower($lastName);
    $netid = $firstName[0] . $lastName[0] . substr(date("Y"), 2, 2) . rand(0000, 9999);
    echo $netid;
    return $netid;
}

if (!empty($data->firstName) && !empty($data->lastName) && !empty($data->email) && !empty($data->usertype)) {
    $user = new User($data->firstName, $data->lastName, $data->email, $data->password, $data->usertype, generateNetID($data->firstName, $data->lastName));

    if ($user->create()) {
        http_response_code(201);
        echo json_encode(["message" => "User created successfully."]);
    } else {
        http_response_code(503);
        echo json_encode(["message" => "Unable to create user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to create user. Data is incomplete."]);
    echo json_encode($data);
}