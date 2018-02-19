<?php

session_start();

if (isset($_POST['submit'])) {

	include_once 'dbc.php';	

	$login = mysqli_real_escape_string($conn, $_POST['login']);

	$pwd = mysqli_real_escape_string($conn, $_POST['pwd']);
	
	if (empty($login) || empty($pwd)){		
		header("Location: login.php?message=empty");
		exit();
	} else {

		$sql = "SELECT user_id,user_name,user_login,user_pwd FROM users WHERE user_login='$login'"; 
		$result = mysqli_query($conn, $sql);
		$counter = mysqli_num_rows($result);

		if ($counter < 1 ){
			header("Location: login.php?message=invalid");
		exit();
		} else {
			if ($row = mysqli_fetch_assoc($result)) {

				$crypt_pwd = password_verify($pwd, $row['user_pwd']);

				if ($crypt_pwd == false) {
					
					header("Location: login.php?message=invalid");
					exit();

				} elseif ($crypt_pwd == true) {
					$_SESSION['user_id'] = $row['user_id'];
					$_SESSION['user_name'] = $row['user_name'];
                    $_SESSION['user_login'] = $row['user_login'];	
                    $_SESSION['date_control']=date("Y-m-d H:i:s");
                    header("Location: login.php?message=success");
					exit();				
				}				
			}		   
		}
	}
} else {
	header("Location: login.php");
	exit();
	}
?>