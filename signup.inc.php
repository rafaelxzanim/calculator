<?php

if (isset($_POST['submit'])) {

	include_once 'dbc.php';

	$name = mysqli_real_escape_string($conn, $_POST['name']);

	$login = mysqli_real_escape_string($conn, $_POST['login']);

	$pwd = mysqli_real_escape_string($conn, $_POST['pwd']);
	

	if (empty($name) || empty($login) || empty($pwd)){
		header("Location: signup.php?message=empty");
		exit();
	} else {
		if (!preg_match("/^[a-zA-Z]*$/", $login)){
			header("Location: signup.php?message=invalid");
		exit();
	} else {

		$sql = "SELECT user_login FROM users WHERE user_login='$login'"; 
		$result = mysqli_query($conn, $sql);
		$counter = mysqli_num_rows($result);

		if ($counter > 0 ){
			header("Location: signup.php?message=inuse");
		exit();
		} else {
		   $crypt_pwd = password_hash($pwd, PASSWORD_DEFAULT);

		   $sql="INSERT INTO users (user_name,user_login,user_pwd) values ('$name','$login','$crypt_pwd')";
		   
		   mysqli_query($conn, $sql);

		   header("Location: signup.php?message=success");
		   exit();
		}
	  }

	}

} else {
	header("Location: signup.php");
	exit();
}