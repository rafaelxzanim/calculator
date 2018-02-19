<?php

//https://en.wikipedia.org/wiki/Shunting-yard_algorithm
/*
while there are tokens to be read:
    read a token.
    if the token is a number, then push it to the output queue.
    if the token is an operator, then:
        while ((there is an operator at the top of the operator stack with
            greater precedence) or (the operator at the top of the operator stack has
                        equal precedence and
                        the operator is left associative)) and
                      (the operator at the top of the stack is not a left bracket):
                pop operators from the operator stack, onto the output queue.
        push the read operator onto the operator stack.
    if the token is a left bracket (i.e. "("), then:
        push it onto the operator stack.
    if the token is a right bracket (i.e. ")"), then:
        while the operator at the top of the operator stack is not a left bracket:
            pop operators from the operator stack onto the output queue.
        pop the left bracket from the stack.
        /# if the stack runs out without finding a left bracket, then there are
        mismatched parentheses. #/
if there are no more tokens to read:
    while there are still operator tokens on the stack:
        /# if the operator token on the top of the stack is a bracket, then
        there are mismatched parentheses. #/
        pop the operator onto the output queue.
exit.
*/

if (isset($_POST['submit'])) {

session_start();

if (isset($_POST['operacao'])) {

	include_once 'dbc.php';	

	include_once 'calculator.php';

	$operacao = mysqli_real_escape_string($conn, $_POST['operacao']);

	$sql="INSERT INTO log (log_user_id,log_date,log_text) values ('".$_SESSION['user_id']."','". date("Y-m-d H:i:s")."','$operacao')";	
		   
	mysqli_query($conn, $sql);

	$sql = "SELECT log_user_id,log_date,log_text FROM log WHERE log_date>='".$_SESSION['date_control']."' and log_user_id=".$_SESSION['user_id']." order by log_date desc limit 5"; 

	$result = mysqli_query($conn, $sql);

    $resultado=stack($_POST['operacao']);

    echo $resultado;
    //while ($row = mysqli_fetch_array($result, MYSQL_BOTH)) {
     //echo $row[2]." = ".stack($row[2])."<br>";  
        //echo $row[2]."= ".stack($row[2])."<br>";
    //}

    mysqli_free_result($result);	
} 
}	else {

			header("Location: login.php");
	         exit();
	}


//echo $output_controle." - ".$stack_controle;
?>