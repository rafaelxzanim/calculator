<?php include_once 'header.php'; ?>



  

<div class="row">
  <div class="col-sm-4 col-sm-offset-4">
  <h2 style="text-align: center;">Log de Operações realizas</h2>

  <form class="form-horizontal" action="rel_search.php" method="post" name="frm" id="frm">
    
    <div class="form-group">
      <label class="control-label col-sm-2" for="data2">Período:</label>
      <div class="col-sm-10">        
        <div class="col-sm-6">               
        <input type="text" class="form-control" name="data" id="data" maxlength="10" size="11" required>
      </div>

      <div class="col-sm-6">
        <input type="text" class="form-control" name="dataate" id="dataate" maxlength="10" size="11" required>   
      </div>
      </div>
    </div>

    <div class="form-group">
      <label class="control-label col-sm-2" for="login">Login:</label>
      <div class="col-sm-10">          
        <div class="col-sm-12">                        
          <select class="form-control" id="login" name="login">
            <?php


  include_once 'dbc.php'; 

  $operacao = mysqli_real_escape_string($conn, $_POST['operacao']);

  

  $sql = "SELECT users.user_id,users.user_login FROM users"; 
  $result = mysqli_query($conn, $sql);

  while ($row = mysqli_fetch_array($result, MYSQL_BOTH)) {
    echo "<option value='$row[0]'>$row[1]</option>";  
    }

    mysql_free_result($result); 
 
?>
          </select>
        </div>
      </div>
    </div>
    
    <div class="form-group">        
      <div class="col-sm-offset-2 col-sm-10">
        <div class="col-sm-12">        
        <button type="submit" class="btn btn-primary" id="btn_submit" name="btn_submit">Gerar</button>
      </div>
      </div>
     </div>
   </form>
  
  </div>
  </div>
            



<script>
  $(function() {
    
    $( "#data" ).datepicker({
    dateFormat: 'dd/mm/yy',
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    nextText: 'Próximo',
    prevText: 'Anterior',
    yearRange: "2017:2018"
});
  });

$(function() {
     $( "#dataate" ).datepicker({
    dateFormat: 'dd/mm/yy',
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    nextText: 'Próximo',
    prevText: 'Anterior',
    yearRange: "2017:2018"
});
  });
  </script>

<div id="result"></div>
<script type="text/javascript">
$(document).ready(function(){
    
    $("#btn_submit").click(function(event){
        event.preventDefault();
        $.post("rel_search.php",
        {
          datade: $("#data").val(),
          dataate: $("#dataate").val(),
          login:  $("#login").val(),
          submit: "submit"
        },
        function(data,status){
            $("#result").html(data).fadeIn(1000);
        });
    });
});
</script>

<?php include_once 'header.php'; ?>            