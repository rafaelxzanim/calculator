<?php

if (isset($_POST['submit'])) {

session_start();
  
    $datade=substr($_POST['datade'],6,4).'-'.substr($_POST['datade'],3,2).'-'.substr($_POST['datade'],0,2)." 00:00:00.000";
    $dataate=substr($_POST['dataate'],6,4).'-'.substr($_POST['dataate'],3,2).'-'.substr($_POST['dataate'],0,2)." 23:59:59.000";
    $login=$_POST['login'];

	include_once 'dbc.php';	
	

	$sql = "select 
			users.user_login,
    		DATE_FORMAT(log.log_date, \"%d/%m/%Y %k:%i:%s\"),
    		log.log_text
			from log
			inner join users on users.user_id=log.log_user_id
			where log.log_date between '$datade' and '$dataate' and log.log_user_id=$login
			order by log.log_date desc";

    		
     
	$result = mysqli_query($conn, $sql);

	$counter = mysqli_num_rows($result);


		if ($counter < 1 ){
			echo '<div class="messages"><div class="alert alert-info"> Nenhum registro encontrado para a seleção.</div></div>';
		}
		else {


?>
<div class="container">
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Login</th>
        <th>Data</th>
        <th>Operação</th>                
      </tr>
    </thead>
    <tbody>
      
      
<?php
	while ($row = mysqli_fetch_array($result, MYSQL_BOTH)) {
    echo "<tr><td>$row[0]</td><td>$row[1]</td><td>$row[2]</td></tr>";  
    }

    echo "</tbody>
  		</table>
</div>
  		";	

    mysqli_free_result($result);	
}// se existe resultados 

} //if (isset($_POST['submit'])) {
	else {

			header("Location: rel.php");
	         exit();
	}

?>