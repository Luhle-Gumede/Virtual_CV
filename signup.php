<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<?php
include('db_connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $role = $_POST['role'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);

    if ($role == 'employee') {
        $name = $_POST['name'];
        $query = "INSERT INTO users (role, email, password, name) VALUES ('$role', '$email', '$password', '$name')";
    } else {
        $companyName = $_POST['companyName'];
        $query = "INSERT INTO users (role, email, password, company_name) VALUES ('$role', '$email', '$password', '$companyName')";
    }

    if (mysqli_query($conn, $query)) {
        echo "Signup successful!";
    } else {
        echo "Error: " . $query . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);
}
?>

</body>
</html>
