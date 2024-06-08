<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $countryCode = $_POST['countryCode'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $guests = $_POST['guests'];
    $date = $_POST['date'];
    $time = $_POST['time'];
    $preference = $_POST['preference'];
    $comments = $_POST['comments'];

    $fullPhone = $countryCode . $phone;

    $stmt = $pdo->prepare("INSERT INTO bookings (name, phone, email, guests, date, time, preference, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt->execute([$name, $fullPhone, $email, $guests, $date, $time, $preference, $comments])) {
        echo 'Booking successful! We will contact you via email.';
    } else {
        echo 'Failed to book. Please try again.';
    }
}
?>
