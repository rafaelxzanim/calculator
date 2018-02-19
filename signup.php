<?php include_once 'header.php'; ?>

<?php
  if (isset($_GET['message'])) {

  	echo '<div class="messages">';

	switch ($_GET['message']) {
		case 'success':
			echo '<div class="alert alert-success"> <strong>Sucesso! </strong> Registro efetuado com sucesso.</div>';
			break;

		case 'invalid':			
			echo '<div class="alert alert-danger"> <strong>Aviso! </strong> Nome somente com caracteres alfa númericos.</div>';
			break;			
		
		case 'inuse':
			echo '<div class="alert alert-danger"> <strong>Aviso! </strong> Login já está sendo utilizado.</div>';			
			break;		

		default:
		    echo '<div class="alert alert-danger"> <strong>Aviso! </strong> Login/Senha Inválido.</div>';			
			break;
	}
  echo '</div>';
}
?>

<div class="signup_form">
 
  <h2>Sign Up</h2>
  
  <form class="form-horizontal" action="signup.inc.php" method="POST">
    <div class="form-group">
      <label class="control-label" for="name">Nome:</label>      
        <input type="nome" class="form-control" id="name" placeholder="Nome" name="name" required>      
    </div>

    <div class="form-group">
       <label class="control-label" for="login">Login:</label>      
       <input type="text" class="form-control" id="login" placeholder="Login" name="login" required>      
    </div>  

    <div class="form-group">
      <label class="control-label" for="pwd">Password:</label>               
      <input type="password" class="form-control" id="pwd" placeholder="Password" name="pwd" required>      
    </div>

    <div class="form-group vertical_center">              
        <button type="submit" class="btn btn-primary" name="submit">Gravar</button>      
    </div>
  </form>

</div> 

<?php include_once 'footer.php'; ?>