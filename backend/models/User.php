<?php
namespace App\Models;

use Database;

include_once "../config/database.php";

class User {
    private int $id;
    private string $firstName;
    private string $lastName;
    private string $email;
    private string $NetID;
    private string $usertype;
    private string $hash;
    private \DateTime $createdAt;
    
    public function __construct(string $firstName, string $lastName, string $email, string $hash, string $usertype, string $NetID) {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->hash = password_hash($hash, PASSWORD_DEFAULT);;
        $this->NetID = $NetID;
        $this->usertype = $usertype;
        $this->createdAt = new \DateTime();
    }

    // Getters
    public function getId(): int { return $this->id; }
    public function getfirstName(): string { return $this->firstName; }
    public function getLastName(): string { return $this->lastName; }
    public function getEmail(): string { return $this->email; }
    public function getNetID(): ?string { return $this->NetID; }
    public function getusertype(): ?string { return $this->usertype; }
    public function getCreatedAt(): \DateTime { return $this->createdAt; }

    // Setters
    public function setfirstName(string $firstName): void { $this->firstName = $firstName; }
    public function setLastName(string $lastName): void { $this->lastName = $lastName; }
    public function setEmail(string $email): void { $this->email = $email; }
    public function sethash(string $hash): void { $this->hash = password_hash($hash, PASSWORD_DEFAULT); }
    public function setNetID(string $NetID): void { $this->NetID = $NetID; }
    public function setusertype(string $usertype): void { $this->usertype = $usertype; }

    public function verifyhash(string $hash): bool {
        return password_verify($hash, $this->hash);
    }

    public function create() {
        $db = new Database();
        if ($db->getConnection() === null) {
            die("db connection failed");
        }
        $query = "INSERT INTO users (firstName, lastName, email, hash, usertype, netid) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $db->getConnection()->prepare($query);
        return $stmt->execute([$this->firstName, $this->lastName, $this->email, $this->hash, $this->usertype, $this->NetID]);
    }
    public function validate(string $email, string $hash) {
        $db = new Database();
        if ($db->getConnection() === null) {
            die("db connection failed");
        }
        $query = "SELECT * FROM users WHERE email = ? AND hash = ?";
        $stmt = $db->getConnection()->prepare($query);
        return $stmt->execute([$email, $hash]);
    }

}