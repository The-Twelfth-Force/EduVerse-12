<?php
$host = 'localhost';
$dbname = getenv('MYSQL_DATABASE');
$username = 'root';
$password = getenv('MYSQL_ROOT_PASSWORD');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}