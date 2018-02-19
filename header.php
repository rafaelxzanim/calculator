<?php
	session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <title>Calculator_1.0</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/bootstrap.css">
  <script src="js/jquery-3.2.1.js"></script>
  <script src="js/bootstrap.js"></script>  
  <!--customização -->
  <link rel="stylesheet" href="css/style.css">
  <!--date picker -->
  <link rel="stylesheet" href="css/jquery-ui.css">  
  <script src="js/jquery-ui.js"></script>  
</head>
<body>

<?php
    if (isset($_SESSION['user_name'])) {    

    include_once 'dbc.php'; 

    $sql = "SELECT user_id,user_name,user_login,user_pwd FROM users WHERE user_login='".$_SESSION["user_login"]."'"; 
    $result = mysqli_query($conn, $sql);
    $counter = mysqli_num_rows($result);

    if ($counter < 1 ){
      header("Location: logout.php");
      exit();
    }

      echo '<nav class="navbar navbar-inverse">
            <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">Calculator 1.0</a>
           </div>
           <ul class="nav navbar-nav">
              <li><a href="login.php">Calculadora</a></li>
	            <li><a href="rel.php">Relatório</a></li>
            </ul>
    	     <div class="navbar-form navbar-right"> <span class="user"> Bem-vindo: '.$_SESSION["user_login"].' </span> <a href="logout.php" class="nav_link">Logout</a></div>
           </div>
           </nav>';	
    } else {
?>

<nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="index.php">Calculator 1.0</a>    
    </div>

    <form class="navbar-form navbar-right" action="login.inc.php" method="POST">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Login" name="login" required>
        <input type="password" class="form-control" placeholder="Password" name="pwd" required>
      </div>
      <button type="submit" class="btn" name="submit">Login</button>
      <a href="signup.php" class="nav_link">Sign up</a>
    </form>';      
  </div>
</nav>

<?php      
         }
?>  