<?php
	include_once 'header.php';
?>
<?php
    if (isset($_GET['message'])){        
		if ($_GET['message']<>'success') {		
		echo '<div class="messages"><div class="alert alert-danger"> <strong>Erro ao logar! </strong>Login/Senha Inválido.</div></div>';
		exit();
		}        
   }
?>

<div class="container">
    <div class="row">
        <div class="col-sm-6" style="background-color: #ddd;padding:10px;">
            <div class="visor">
                <input type="text" id="visor" name="visor" readonly>
            </div>

        </div>

        <div class="col-sm-6"> 
            <div class="col-sm-12" style="background-color: #ddd;padding:10px;">
	           <span style="font-weight: bold">Última Consulta </span>
                <div id="result"></div>
            </div>

        </div>

    </div>
</div>
   
<div class="container">
    <div class="row">
        <div class="col-sm-6" style="background-color: #ddd;padding:10px;">

            <div class="row-fluid">	           
	           <div class="col-sm-2"><button value="√" class="btn btn-default btn_calc">√</button></div>	
	           <div class="col-sm-2"><button value="(" class="btn btn-default btn_calc">(</button></div>
	           <div class="col-sm-2"><button value=")" class="btn btn-default btn_calc">)</button></div>
	           <div class="col-sm-6"><button value="C" class="btn btn-danger btn_calc">C</button></div>               
            </div>

            <div class="row-fluid">
        	   <div class="col-sm-2"><button value="7" class="btn btn-default btn_calc">7</button></div>
        	   <div class="col-sm-2"><button value="8" class="btn btn-default btn_calc">8</button></div>
        	   <div class="col-sm-2"><button value="9" class="btn btn-default btn_calc">9</button></div>
        	   <div class="col-sm-6"><button value="+" class="btn btn-default btn_calc">+</button></div>
        	
            </div>

            <div class="row-fluid">
	           <div class="col-sm-2"><button value="4" class="btn btn-default btn_calc">4</button></div>
	           <div class="col-sm-2"><button value="5" class="btn btn-default btn_calc">5</button></div>
	           <div class="col-sm-2"><button value="6" class="btn btn-default btn_calc">6</button></div>
	           <div class="col-sm-6"><button value="-" class="btn btn-default btn_calc">-</button></div>
	
            </div>

            <div class="row-fluid">
            	<div class="col-sm-2"><button value="1" class="btn btn-default btn_calc">1</button></div>
            	<div class="col-sm-2"><button value="2" class="btn btn-default btn_calc">2</button></div>
            	<div class="col-sm-2"><button value="3" class="btn btn-default btn_calc">3</button></div>
            	<div class="col-sm-6"><button value="*" class="btn btn-default btn_calc">*</button></div>	
            </div>

            <div class="row-fluid">
                <div class="col-sm-2"><button value="." class="btn btn-default btn_calc">.</button></div>
                <div class="col-sm-2"><button value="0" class="btn btn-default btn_calc">0</button></div>
                <div class="col-sm-2"><button value="%" class="btn btn-default btn_calc">%</button></div>
                <div class="col-sm-2"><button value="/" class="btn btn-default btn_calc">/</button></div>
                <div class="col-sm-4"><button value="="  id="btn_result" class="btn btn-primary btn_calc">=</button></div>
            </div>

        </div>

    </div>

</div>

<script type="text/javascript">
$(document).ready(function(){


var controle_raiz="N";

$("button").click(function() {
    var value = $( this ).val();
    var str = $("#visor").val();

    if (value=="C") {

        str = str.substr(0,(str.length - 1));             				
    	$("#visor").val(str);

    	} else if (value=="=") {     	  	
    	   event.preventDefault();
    	}
	   else
	   {   
            if (str.substr(0,1)=="0"){
                str = str.substr(1,(str.length - 1))
            }
		    $( "#visor" ).val( str+""+value );	
	   }
        
  }).keyup();

//TRATAMENTO COM O BOTÃO IGUAL PARA GRAVAR O HISTORICO E CALCULAR A EXPRESSAO UTILIZADA    
    $("#btn_result").click(function(event){

        var visor_aux=$("#visor").val();

        event.preventDefault();
        $.post("calculate.php",
        {
          operacao: visor_aux,
          operacao_real: visor_aux,
          submit: "submit"       
        },
        function(data,status){
            //$("#result").html().fadeIn(0);
            $("#result").html($("#visor").val() + " = " + data ).fadeIn(1000);
            $("#visor").val(data).fadeIn(1000);
        });
    });
});
</script>

<?php	
	include_once 'footer.php';
?>