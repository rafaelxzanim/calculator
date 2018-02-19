<?php

//##ALGORITMO RE RAIZ QUADRADA
//https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method
function alternative_sqrt($n){
$controle_original=$n;
$tam=strlen($controle_original);
$S=$tam*pow(10,2);
$controle_temp=0;
$S_anterior=0;

while($controle_original){

$S=(($S+($controle_original/$S))/2);    
if ($S_anterior<>$S){
    $S_anterior=$S;
}
else
{
    break;
}
}

return $S;
}


function stack($expressao){

$input= $expressao;

$input=str_replace("√", "@", $input);
$input=str_replace("%", "/100", $input);

$output="";
$stack="";

$token_anterior="stack";

for ($x=0;$x<strlen($input);$x++){

    $token=substr($input,$x,1);

if  (
      ($token=="0") || ($token=="1") || ($token=="2") || ($token=="3") || ($token=="4") || ($token=="5") || ($token=="6") || ($token=="7") || ($token=="8") || ($token=="9") || ($token==".") || ($token=="%") || ($token=="@") 
     )
 {
    if ($token_anterior=="output")
    {
    $output=$output."".$token;  
    }
    else
    {
     $output=$output." ".$token;    
    }
    
    $token_anterior="output";
    
 }
 else
 {
    if ($stack==""){
        $stack=$token;   

    }
    else
    {
        $precedence=substr($stack,0,1);
        if (($precedence=="+") && ($token=="*")) { $stack=$token." ".$stack;}
        if (($precedence=="-") && ($token=="*")) { $stack=$token." ".$stack;}
        if (($precedence=="+") && ($token=="/")) { $stack=$token." ".$stack;}
        if (($precedence=="-") && ($token=="/")) { $stack=$token." ".$stack;}

        if (($precedence=="*") && ($token=="+")) { $output=$output." ".$stack; $stack=$token;}
        if (($precedence=="*") && ($token=="-")) { $output=$output." ".$stack; $stack=$token;}

        if (($precedence=="/") && ($token=="+")) { $output=$output." ".$stack; $stack=$token;}
        if (($precedence=="/") && ($token=="-")) { $output=$output." ".$stack; $stack=$token;}

//TAVA ZERADO
        if (($precedence=="+") && ($token=="+")) { $output=$output." ".$precedence; $stack=$token.substr($stack,1,strlen($stack)-1);}
        if (($precedence=="-") && ($token=="-")) { $output=$output." ".$precedence; $stack=$token.substr($stack,1,strlen($stack)-1);}
        if (($precedence=="/") && ($token=="/")) { $output=$output." ".$precedence; $stack=$token.substr($stack,1,strlen($stack)-1);}
        if (($precedence=="*") && ($token=="*")) { $output=$output." ".$precedence; $stack=$token.substr($stack,1,strlen($stack)-1);}

        if (($precedence=="/") && ($token=="*")) { $output=$output." ".$precedence; $stack=$token.substr($stack,1,strlen($stack)-1);}
        if (($precedence=="*") && ($token=="/")) { $output=$output." ".$precedence; $stack=$token.substr($stack,1,strlen($stack)-1);}
        if (($precedence=="+") && ($token=="-")) { $output=$output." ".$precedence; $stack=$token.substr($stack,1,strlen($stack)-1);}
        if (($precedence=="-") && ($token=="+")) { $output=$output." ".$precedence; $stack=$token.substr($stack,1,strlen($stack)-1);}

        if (($precedence=="(") && ($token=="*")) { $stack=$token." ".$stack;}
        if (($precedence=="(") && ($token=="/")) { $stack=$token." ".$stack;}
        if (($precedence=="(") && ($token=="+")) { $stack=$token." ".$stack;}
        if (($precedence=="(") && ($token=="-")) { $stack=$token." ".$stack;}
        
        if ($token=="(") { $stack=$token." ".$stack;}
        if ($token==")") { 
            $primeira_posicao_circle_brackets=strpos($stack,"(");
            
            if ($primeira_posicao_circle_brackets>0){
               $output=$output." ".substr($stack,0,$primeira_posicao_circle_brackets-1);    
            }
            
            $stack=substr($stack,$primeira_posicao_circle_brackets+2);
            
        }

    }

    $token_anterior="stack";

 }

} //end do for

//OUTPUT COMPLETO COM A ORDENAÇÃO DOS TOKENS CONFORME NUMBERS E OPERATORS STACK
$output=$output." ".$stack;
$stack="";

$final=explode(" ",$output);
$contador=count($final);

//VOU SETAR O FOR COM NÚMERO DO CONTADOR DE ITENS DO ARRAY MAS CONFORME AS OPERAÇÕES VÃO SENDO REALIZADAS O ARRAY VAI AUTOMATICAMENTE DIMINUINDO

for ($x=0;$x<$contador;$x++)
{

//print_r($final);

if (empty($final) || count($final)==1 ){break;}

foreach ($final as $key => $value) {
    if  (($value=="/") ||  ($value=="*") ||  ($value=="-") ||  ($value=="+"))
    {
        $posicao=$key;
        break;
    }
}

//CALCULO RAIZ QUADRADA 
if (strpos($final[$posicao-2], '@')!==false){   
    $final[$posicao-2]=str_replace('@', '', $final[$posicao-2]);
    $final[$posicao-2]=alternative_sqrt($final[$posicao-2]);    
}

if (strpos($final[$posicao-1], '@')!==false){
    $final[$posicao-1]=str_replace('@', '', $final[$posicao-1]);
    $final[$posicao-1]=alternative_sqrt($final[$posicao-1]);    
}
//CALCULO RAIZ QUADRADA 

$calculadora= new Calculator;
$calculadora->setNumbers($final[$posicao-2],$final[$posicao-1]);
$calculadora->setOperator($final[$posicao]);
$calculadora->calculate();
$resultado=$calculadora->getResult();

//DELETA OS ITEMS DA ARRAYS JÁ CALCULADOS
unset($final[$posicao-2]);
unset($final[$posicao-1]);
$final[$posicao]=$resultado;
//REORGANIZA O ARRAY
$array = array_values(array_filter($final));
$final=$array;
} 

return $final[0];    

}

class Calculator
{       
    public $input1;
    public $input2;
    public $operator;
    public $result;

    public function setNumbers($number1,$number2) {
    	$this->input1 = $number1;    	
    	$this->input2 = $number2;
    }
    
    public function setOperator($operator) {
        $this->operator = $operator;        
    }

    public function calculate() {
    	switch ($this->operator) {
    		case '+':
    			$this->result = $this->input1 + $this->input2;
    		break;
    		
    		case '-':
    			$this->result = $this->input1 - $this->input2;
    		break;
    		
    		case '/':
    			$this->result = $this->input1 / $this->input2;
    		break;

    		case '*':
    			$this->result = $this->input1 * $this->input2;
    		break;    		    		    		

    		case '%':
    			$this->result = (($this->input1 * $this->input2)/100);
    		break;  

    		case '%':
    			$this->result = (($this->input1 * $this->input2)/100);
    		break;  
    	}    	
    }

    public function getResult() {
    	return $this->result;    
    }
}
?>