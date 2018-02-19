var xmlHttp;
var msgErro;
var meuHost = window.location.host;
var meuHost2 = location.pathname;

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function MostraTela(id) {
    if (document.getElementById(id).style.display == 'block')
        document.getElementById(id).style.display = 'none';
    else
        document.getElementById(id).style.display = 'block';
}

function mudar_cor_over(celula) {
    //celula.style.backgroundColor = "#C3C3C3";   
}

function mudar_cor_out(celula, cor) {
    //celula.style.backgroundColor = cor;
}

function OpcaoMenu(acaoMenu, itemMenu) {
    document.getElementById('hndAcao') = acaoMenu;
    document.getElementById('hndItem') = itemMenu;
}

function MudaCorObjeto_In(nome) {
    document.getElementById(nome).style.backgroundColor = '#F5F5F5';
}

function MudaCorObjeto_Out(nome) {
    document.getElementById(nome).style.backgroundColor = '#FFFFFF';
}

function formataData(campo) {
    var valor = $(campo).val();
    valor = valor.replace(/\D/g, "")                             //Remove tudo o que não é dígito
    valor = valor.replace(/^(\d{2})(\d)/, "$1/$2")               //Coloca uma barra entre o segundo e o terceiro dígitos
    valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")   //Coloca uma barra entre o quarto e o quinto dígitos
    if (valor.length > 10) {
        valor = valor.substring(0, 10);
    }
    $(campo).val(valor);
}

function validaData(campo, opcional) {
    var retorno = true;
    var valor = $(campo).val();

    if (opcional && valor == "") { retorno = true; }

    if (retorno && valor != "") { retorno = isDate(valor); }

    if (!retorno) {
        alert("A data informada é inválida.");
        campo.focus();
    }

    return retorno;
}

function isDate(pDate) {
    var currVal = pDate;
    if (currVal == '')
        return false;

    //Declare Regex  
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    dtDay = dtArray[1];
    dtMonth = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}


function validaDataInicialFinal(idDataInicial, idDataFinal, obrigatorio, validaPeriodo) {
    //msgErro = "";
    if ($("#" + idDataInicial).val() != "" ||
		$("#" + idDataFinal).val() != "") {
        if ($("#" + idDataInicial).val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor informar a data inicial.";
        }
        else {
            if ($("#" + idDataInicial).val().length != 10) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar uma data inicial válida.";
            }
        }
        if ($("#" + idDataFinal).val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor informar a data final.";
        }
        else {
            if ($("#" + idDataFinal).val().length != 10) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar uma data final válida.";
            }
        }
        if (msgErro == "") {
            //new Date(year, month, day, hours, minutes, seconds, milliseconds)
            //O mês inicia em zero
            var auxData = $("#" + idDataInicial).val().split('/');
            var dataInicial = new Date(auxData[2], auxData[1] - 1, auxData[0]);

            //new Date(year, month, day, hours, minutes, seconds, milliseconds)
            //O mês inicia em zero
            auxData = $("#" + idDataFinal).val().split('/');
            var dataFinal = new Date(auxData[2], auxData[1] - 1, auxData[0]);

            if (dataFinal < dataInicial) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "A Data Final não pode ser menor que a Data Inicial.";
            }
            else {
                if (dataInicial.getFullYear() < 1900) {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro = "Informe um período válido.";
                }
                else {
                    if (typeof validaPeriodo == "undefined") {
                        validaPeriodo = true;
                    }
                    if (validaPeriodo) {
                        if (dataFinal.getFullYear() != dataInicial.getFullYear()) {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "Apenas são permitidas consultas no mesmo exercício.";
                        }
                    }
                }
            }
        }
    }
    else {
        if (obrigatorio) {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor informar um período.";
        }

    }

    return msgErro;
}

function formataCPFCNPJ(campo) {
    var valor = $(campo).val();
    valor = valor.replace(/\D/g, "") //Remove tudo o que não é dígito

    if (valor.length > 11) {
        //CNPJ
        valor = valor.replace(/^(\d{2})(\d)/, "$1.$2") //Coloca ponto entre o segundo e o terceiro dígitos
        valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
        valor = valor.replace(/\.(\d{3})(\d)/, ".$1/$2") //Coloca uma barra entre o oitavo e o nono dígitos
        valor = valor.replace(/(\d{4})(\d)/, "$1-$2") //Coloca um hífen depois do bloco de quatro dígitos
    }
    else {
        //CPF
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2") //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2") //Coloca um hífen entre o terceiro e o quarto dígitos
    }
    if (valor.length > 18) {
        valor = valor.substring(0, 18);
    }
    $(campo).val(valor);
}

function validaCPF(cpf) {
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11) {
        return false;
    }
    for (i = 0; i < cpf.length - 1; i++) {
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--) {
            soma += numeros.charAt(11 - i) * i;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}
function alteraTXTDiariasPassagens() {
    var valor = $("#cmbDiariasPassagens").val();
    if (valor == 1) {
        $("#TBiframe").contents().find("p").text("As diárias são despesas orçamentárias com cobertura de alimentação, pousada e locomoção urbana, do servidor público estatutário ou celetista que se desloca de sua sede em objeto de serviço, em caráter eventual ou transitório, entendido como sede o Município onde a repartição estiver instalada e onde o servidor tiver exercício em caráter permanente.");
    };
    if (valor == 2) {
        $("#TBiframe").contents().find("p").text("Nesta opção são consideradas as despesas orçamentárias, realizadas diretamente ou por meio de empresa contratada, com aquisição de passagens (aéreas, terrestres, fluviais ou marítimas), taxas de embarque, seguros, fretamento, pedágios, locação ou uso de veículos para transporte de pessoas e suas respectivas bagagens, inclusive quando decorrentes de mudanças de domicílio no interesse da administração.");
    };
    if (valor == 3) {
        $("#TBiframe").contents().find("p").text("O adiantamento caracteriza-se pela concessão de um valor (considerando os limites previstos em lei) ao agente público, para realização de despesas de pronto pagamento, com a prestação de contas ocorrendo posteriormente.");
    };
    if (valor == 0 || valor == "") {
        $("#TBiframe").contents().find("p").text("");
    };
}

function alteraTXTTipoTransferencia(){
	var valor = $("#cmbTipoTransferencia").val();
    if (valor == 41) {
        $("#TBiframe").contents().find("p").text("Contribuições: Despesas orçamentárias às quais não correspondam contraprestação direta em bens e serviços e não sejam reembolsáveis pelo recebedor, inclusive as destinadas a atender a despesas de manutenção de outras entidades de direito público ou privado, observado o disposto na legislação vigente.");
    };
    if (valor == 42) {
        $("#TBiframe").contents().find("p").text("Auxílios: Despesas orçamentárias destinadas a atender a despesas de investimentos ou inversões financeiras de outras esferas de governo ou de entidades privadas sem fins lucrativos, observado, respectivamente, o disposto nos artigos 25 e 26 da Lei de Responsabilidade Fiscal.");
    };
    if (valor == 43) {
        $("#TBiframe").contents().find("p").text("Subvenções Sociais: Despesas orçamentárias para cobertura de despesas de instituições privadas de caráter assistencial ou cultural, sem finalidade lucrativa, de acordo com os artigos. 16, parágrafo único, e 17 da Lei nº 4.320/1964, observado o disposto no artigo 26 da Lei de Responsabilidade Fiscal.");
    };
    if (valor == 45) {
        $("#TBiframe").contents().find("p").text("Subvenções Econômicas: Despesas orçamentárias com o pagamento de subvenções econômicas, a qualquer título, autorizadas em leis específicas, tais como: ajuda financeira a entidades privadas com fins lucrativos; concessão de bonificações a produtores, distribuidores e vendedores; cobertura, direta ou indireta, de parcela de encargos de empréstimos e financiamentos e dos custos de aquisição, de produção, de escoamento, de distribuição, de venda e de manutenção de bens, produtos e serviços em geral; e, ainda, outras operações com características semelhantes.");
    };	
    if (valor == 0 || valor == "") {
        $("#TBiframe").contents().find("p").text("");
    };	
}

function alteraTXTOrigemRecurso(){
	var valor = $("#cmbOrigemRecurso").val();
    if (valor == 1) {
        $("#TBiframe").contents().find("p").text("Recursos da União: São os valores repassados da esfera federal para a entidade.");
    };
    if (valor == 2) {
        $("#TBiframe").contents().find("p").text("Recursos do Estado: São os valores repassados da esfera estadual para a entidade.");
    };
    if (valor == 3) {
        $("#TBiframe").contents().find("p").text("Outros: São os valores repassados de outras esferas ou outras entidades.");
    };	
    if (valor == 0 || valor == "") {
        $("#TBiframe").contents().find("p").text("");
    };	
}

function textogp() {
    var valor = $("#cmbVinculoGP").val();
    if (valor == 0 || valor == "") {
        $("#TBiframe").contents().find("p").text("Lista todos os Servidores em atividade.");
    };
    if (valor == 1) {
        $("#TBiframe").contents().find("p").text("Servidor efetivo é aquele aprovado em concurso público, mantendo relação com a administração por tempo indeterminado.");
    };
    if (valor == 2) {
        $("#TBiframe").contents().find("p").text("Servidor comissionado é aquele nomeado para o exercício de função de direção, chefia e assessoramento, sem a necessidade de aprovação prévia em concurso público.");
    };
    if (valor == 3) {
        $("#TBiframe").contents().find("p").text("Servidor cedido/recebido é aquele requisitado para trabalhar em local diferente do seu órgão de origem.");
    };
    if (valor == 4) {
        $("#TBiframe").contents().find("p").text("Estagiário é o aluno matriculado e que esteja frequentando curso vinculado ao ensino em escola pública e/ou privado que desenvolve, no serviço público, atividades relacionadas à sua área de formação profissional.");
    };
    if (valor == 5) {
        $("#TBiframe").contents().find("p").text("Servidor temporário é aquele contratado por tempo determinado para atender à necessidade temporária de exepcional interesse público.");
    };
    if (valor == "") {
        $("#TBiframe").contents().find("p").text("");
    };
}

function MinMaxTeste(divID) {
    $("#" + divID).find("tr").each(function (index) {
        if (index > 0) {
            var child = $(this);
            if (child.css("display") == "none") {
                child.show();
            }
            else {
                child.hide();
            }
        }
    });
}

function retiraAcento(obj) {
    com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ';
    sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
    nova = '';
    for (i = 0; i < obj.length; i++) {
        if (com_acento.search(obj.substr(i, 1)) >= 0) {
            nova += sem_acento.substr(com_acento.search(obj.substr(i, 1)), 1);
        }
        else {
            nova += obj.substr(i, 1);
        }
    }
    return nova.toUpperCase();
}

$(document).ready(function () {

    menuFavoritos()

    if (($("#hndAcao").val() == null)) {
    }
    else {

        //document.getElementById("btExportarPDF").onclick = function (e) {
        //    exportarPDF();
        //    e.preventDefault();
        //}

        validaProdutosInstalados();

        var exportXML = $('#hndItemExporta').val();

        document.getElementById('imprimirPDF').style.visibility = "hidden";
        document.getElementById('exportarXML').style.visibility = "hidden";
        document.getElementById('exportarCSV').style.visibility = "hidden";
    }

    if (($("#hndAcao").val() == 1) && ($("#hndItem").val() == 5)) {
        $("#cmbEstoqueUnidadeCM option:first").attr('selected', 'selected');
        $("#cmbEstoqueDataVigenciaLC option:first").attr('selected', 'selected');
        $("#cmbEstoqueAlmoxarifado option:first").attr('selected', 'selected');
        $("#cmbEstoqueUnidadeGestoraLC option:first").attr('selected', 'selected');
        $("#cmbEstoqueMesInicial option:first").attr('selected', 'selected');
        $("#cmbEstoqueMesFinal option:first").attr('selected', 'selected');
        $("#cmbEstoqueTipoMovimento option:first").attr('selected', 'selected');
    }

    if (($("#hndAcao").val() == 1) && ($("#hndItem").val() == 6)) {
        $("#cmbPatrimonioUnidadePP option:first").attr('selected', 'selected');
        $("#cmbPatrimonioUnidadeGestoraLC option:first").attr('selected', 'selected');
    }
    //Frotas
    if (($("#hndAcao").val() == 1) && ($("#hndItem").val() == 7)) {
        $("#cmbFrotasUnidadeAF option:first").attr('selected', 'selected');
        $("#cmbFrotasUnidadeGestora option:first").attr('selected', 'selected');
    }
    if (($("#hndAcao").val() == 3) && ($("#hndItem").val() == 13)) {
        $('#cmbUnidadeCP').change(function () {
            consultarDadosCP('UnidadeGestoraCP', 'cmbUnidadeGestora', 'cmbUnidadeCP', this.id, 'CP_Fato_EmpenhoDespesa', 'CP_Fato_saldodespesa', 'cmbUnidadeCP');
        })
    }
    // Valida se foi acionado o botão de exportação da estrutura organizacional, e exporta
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 2)) {

        function mostrarValorEstrutura() {
            downloadXMLNovo(13);
        }

        document.getElementById("exportarXML").onclick = function (e) {
            mostrarValorEstrutura();
            e.preventDefault();
        }

        document.getElementById("exportarCSV").onclick = function (e) {
            exportacaoCSV(1, 0);
            e.preventDefault();
        }

    }

    // Valida se foi acionado o botão de exportação da estrutura organizacional, e exporta
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 6)) {

        function mostrarValorEstrutura() {
            downloadXMLNovo(15);
        }

        document.getElementById("exportarXML").onclick = function (e) {
            mostrarValorEstrutura();
            e.preventDefault();
        }

        document.getElementById("exportarCSV").onclick = function (e) {
            exportacaoCSV(1, 1);
            e.preventDefault();
        }

    }

    //LC -Contratos
    if (($("#hndAcao").val() == 1) && ($("#hndItem").val() == 1)) {
        //grid contratos com.
        if ($("#ckContrato").attr("checked")) {
            $('.contratos').css('display', "");
        }
        $("#ckContrato").click(function () {
            if ($("#ckContrato").attr("checked")) {
                $('.contratos').css('display', "");
            } else {
                $('.contratos').css('display', 'none');
                $('.contratosCom input').attr("checked", false);
            }
        });


        //setar todos os tipos contratos
        $('.TipoContratoTodos').click(function () {
            if ($('.TipoContratoTodos  input').attr("checked")) {
                $('.TipoContrato input').attr("checked", true);
            } else {
                $('.TipoContrato  input').attr("checked", false);
            }
        });
        $('.TipoContrato').click(function () {
            VerificaInputChecked('TipoContrato', 'TipoContratoTodos');
        });

        //setar todos instrumentos contratual
        $('.instrumentoContratualTodos').click(function () {
            //alert('teste');
            if ($('.instrumentoContratualTodos input').attr("checked")) {
                $('.instrumentoContratual  input').attr("checked", true);
                $('.contratos').css('display', "");
            } else {
                $('.instrumentoContratual  input').attr("checked", false);
                $('.contratosComTodos  input').attr("checked", false);
                $('.contratosCom input').attr("checked", false);
                $('.contratos').css('display', 'none');
            }
        });
        $('.instrumentoContratual').click(function () {
            VerificaInputChecked('instrumentoContratual', 'instrumentoContratualTodos');
        });

        //setar todos os tipos Aditivos
        $('.contratosComTodos').click(function () {
            if ($('.contratosComTodos input').attr("checked")) {
                $('.contratosCom input').attr("checked", true);
            } else {
                $('.contratosCom input').attr("checked", false);
            }
        });
        $('.contratosCom').click(function () {
            VerificaInputChecked('contratosCom', 'contratosComTodos');
        });

    };

    function VerificaInputChecked(checked, notChecked) {
        var estado = true;
        var totalNaoChecadas = 0;
        var totalChecadas = 0;
        $.each($("." + checked + " input"), function () {
            if (!$(this).attr('checked')) {
                totalNaoChecadas++;
                estado = false
            } else {
                totalChecadas++;
            }
        });
        console.log('Não Checadas:' + totalNaoChecadas + " Checadas:" + totalChecadas + " Estado:" + estado);    
        if (totalNaoChecadas != 0){
            $("." + notChecked + " input").attr('checked', estado ? "checked" : "");
        } else {
            $("." + notChecked + " input").attr('checked', estado ? "checked" : "");
        }
    }

    // Valida se foi acionado o botão de exportação da estrutura organizacional, e exporta
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 1)) {

        function mostrarValorPerguntas() {
            downloadXMLNovo(14);
        }

        document.getElementById("exportarXML").onclick = function (e) {
            mostrarValorPerguntas();
            e.preventDefault();
        }

        document.getElementById("exportarCSV").onclick = function (e) {
            exportacaoCSV(2, 0);
            e.preventDefault();
        }
    }

    // Controle de seleção de todos (Selecionar Tudo)
    $(".todos").click(function () {

        var estado = $(this).find('input').attr('checked');
        // Selecionar todos as modalidades
        $.each($(".modalidade input"), function () {
            $(this).attr('checked', estado ? "checked" : "");
        });

        // Selecionar todos as modalidades
        $.each($(".finalidade input"), function () {
            $(this).attr('checked', estado ? "checked" : "");

            $(this).attr("disabled", estado ? "" : "disabled");
        });
    });

    $(".modalidade").click(function () {
        var estado = true;
        var totalModalidadesNaoChecadas = 0;
        var totalModalidadesChecadas = 0;
        $.each($(".modalidade input"), function () {
            if (!$(this).attr('checked')) {
                totalModalidadesNaoChecadas++;
                estado = false
            } else {
                totalModalidadesChecadas++;
            }
        });
        console.log('Não Checadas:' + totalModalidadesNaoChecadas + " Checadas:" + totalModalidadesChecadas + " Estado:" + estado);
        if (totalModalidadesChecadas != 0) {
            $(".finalidade input").attr("disabled", "");
        } else {
            $(".finalidade input").attr("disabled", true);
            $(".finalidade input").attr("checked", "");
        }
        if (totalModalidadesNaoChecadas != 0)
            $('#ckTipoModalidadeTodos').attr('checked', estado ? "checked" : "");
    });

    $(".finalidade").click(function () {
        var estado = true;
        var totalFinalidadesNaoChecadas = 0;
        var totalModalidadesNaoChecadas = 0;
        $.each($(".modalidade input"), function () {
            if (!$(this).attr('checked')) {
                totalModalidadesNaoChecadas++;
                estado = false
            }
        });
        $.each($(".finalidade input"), function () {
            if (!$(this).attr('checked')) {
                totalFinalidadesNaoChecadas++;
                estado = false
            }
        });
        if (totalModalidadesNaoChecadas != 0 || totalFinalidadesNaoChecadas != 0)
            $('#ckTipoModalidadeTodos').attr('checked', estado ? "checked" : "");
    });


    $("h4").live("click", function () {
        var meuHost = window.location.host;
        var mudaImagem = $(this).parent().find("h4").find("img");
        $(this).parent().find("p").toggle();
        if (mudaImagem.attr('src') == "/pronimtb/imagens/setaParaBaixo_nova.png") {
            mudaImagem.attr('src', '/pronimtb/imagens/setaDireita.png');
        }
        else {
            mudaImagem.attr('src', '/pronimtb/imagens/setaDireita.png');
        }
    });

    // Busca publicações Prestação de contas
    if ((($("#hndAcao").val() == 21) && ($("#hndItem").val() == 2)) || (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 3) || (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 4)) || (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 5)))) {

        var valParametro = "";

        switch ($("#hndItem").val()) {
            case "2": {
                valParametro = 1;//13; // Prestação de Contas
            } break;
            case "3": {
                valParametro = 2;//5; // Execução Orçamentária
            } break;
            case "4": {
                valParametro = 3;//4; // Gestão Fiscal
            } break;
            case "5": {
                valParametro = 4;//12; // Lei de acesso a informação
            } break;
        }

        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaPublicacoesMenu&param1=" + valParametro,
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";

                htm += "<div id='geraPublicacoes' style='width: 100%; font-size: 14px; color:black !important;'>";
                htm += "<div style='width: 100%; font-size: 8px;'></div>";
                htm += "<div style='width: 100%; text-align: center;'></div>";
                htm += "<p>";

                if (jdados.Dados.length > 0) {
                    htm += "<h1 style='display:block; font-size: 11px; padding-left: 20px;'> Total de Publicações: " + jdados.Dados.length + "</h1>";
                }

                var iTitulo = 0;
                var strNomeTema = "";

                for (var i = 0; i < jdados.Dados.length; i++) {
                    var objResult = jdados.Dados[i];


                    if (iTitulo == 0) {
                        strNomeTema = objResult.Nome_tema;

                        htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                        htm += "<table id='publicacoesArquivos'>";
                        htm += "<div style='width:100%'>";

                        htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/pronimtb/imagens/setaParaBaixo_nova.png' width='20' height='20'><b> Tema: " + objResult.Nome_tema + "</b></h4>";


                        // htm += "<div style='font-size: 8px; width:100%; height:100%; hspace:10px;'>";
                        if (objResult.Descricao_tema != "") {
                            htm += "<p style='display:block; font-size: 11px; padding-left: 50px; padding-top: 10px;'> " + objResult.Descricao_tema + "</p>";
                        }
                        // htm += "</div>";

                        //htm += "<div style='width: 100%; font-size: 8px;'>&nbsp;&nbsp;&nbsp;</div>";
                        iTitulo += 1;
                    }

                    if (strNomeTema != objResult.Nome_tema) {

                        htm += "</div>";
                        htm += " </table>";

                        htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                        htm += "<table id='publicacoesArquivos'>";
                        htm += "<div style='width:100%;'>";

                        htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/pronimtb/imagens/setaParaBaixo_nova.png' width='20' height='20'><b> Tema: " + objResult.Nome_tema + "</b></h4>";

                        // htm += "<div style='font-size: 8px; width:100%; height:100%; hspace:10px;'>";
                        if (objResult.Descricao_tema != null) {
                            htm += "<p style='display:block; font-size: 11px; padding-left: 50px; padding-top: 10px;'> " + objResult.Descricao_tema + "</p>";
                        }
                        //htm += "</div>";

                        // htm += "<div style='width: 100%; font-size: 8px;'>&nbsp;&nbsp;&nbsp;</div>";
                        strNomeTema = objResult.Nome_tema;

                    }

                    if (objResult.Nome_arquivo != null && objResult.Nome_arquivo != "") {
                        htm += "<p style='display:block; font-size: 11px; padding-left: 50px;'> Nome:  " + objResult.Nome_arquivo + "</p>";
                    } else {
                        htm += "<p style='display:block; font-size: 11px; padding-left: 50px;'> Nome:  " + objResult.Nome_tema + " - " + objResult.NOME_RELATORIO + "</p>";
                    }

                    if (objResult.IMG_ARQUIVO != null) {
                        htm += "<p style='display:block; font-size: 11px; padding-left: 50px;'>";

                        switch (objResult.ID_AREA) {
                            case "1": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/pronimtb/upload/Gestao_de_Pessoal/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";
                            } break;
                            case "2": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/pronimtb/upload/Administracao_Geral/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                            } break;
                            case "3": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/pronimtb/upload/Arrecadacao/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                            } break;
                            case "4": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/pronimtb/upload/Financeira/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                            } break;
                            case "5": {
                                htm += " Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='/pronimtb/upload/Outros/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                            } break;
                        };


                        htm += "</p>";

                        if (objResult.DT_VIGENCIA_INICIO != null && objResult.DT_VIGENCIA_INICIO != "") {

                            if (objResult.DT_VIGENCIA_FIM != null && objResult.DT_VIGENCIA_FIM != "") {
                                htm += "<p style='display:block; font-size: 11px; padding-left: 50px;'> Referência:  " + objResult.DT_VIGENCIA_INICIO + " a " + objResult.DT_VIGENCIA_FIM + "</p>";
                            } else {
                                htm += "<p style='display:block; font-size: 11px; padding-left: 50px;'> Referência:  " + objResult.DT_VIGENCIA_INICIO + " a Vigente </p>";
                            }
                        }

                        if (objResult.DS_DESCRICAO != null) {
                            htm += "<p style='display:block; font-size: 11px; padding-left: 50px;'> Descrição:  " + objResult.DS_DESCRICAO + "</p>";
                        }

                        htm += "<p style='display:none; width: 50%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'>";
                        htm += "</p>";
                    };
                }

                if (jdados.Dados.length == 0) {
                    htm += "<p style='font-size: 16px; padding-left: 20px;'><b> Não foi encontrada nenhuma publicação para a consulta selecionada! </b></p>";
                }

                htm += " </div>";
                htm += " </table>";
                htm += " </div>";

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('tamanhoTabela').style.width = '2000px !important';
                document.getElementById('linhaPublicacoesAcessoRapido').innerHTML = htm;

            },

            error: function (jerro) {
                alert("Erro ao retornar os arquivos!");
                console.log(jerro.responseText);

            }
        });
    };

    // Busca Ano Cargas - Publicação
    if (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 1)) {

        $("#cmbOrdenacao").change(function () {
            if ($("#cmbOrdenacao").find('option:selected').val() == 0) {
                $('#cmbCriterioOrdenacao').attr('disabled', 'disabled');
                document.getElementById("cmbCriterioOrdenacao").value = 0;              
            } else {
                $('#cmbCriterioOrdenacao').removeAttr('disabled')
            }
        });
        $("#cmbOrdenacao option:first").attr('selected', 'selected');
        $("#cmbCriterioOrdenacao option:first").attr('selected', 'selected');
        var destino = $("#cmbAnoCargasPublicacoes");
        if ((destino) && (destino.is(":visible"))) {
            limparDados("cmbAnoCargasPublicacoes");
            destino.css("background-color", "#cecece");

            destino.attr("disabled", true);
            $.ajax({
                type: "GET",
                global: false,
                url: "acao.asp",
                data: "acao=BuscaAnoCargas",
                dataType: "json",
                async: false,
                cache: false,
                success: function (jdados) {
                    limparDados("cmbAnoCargasPublicacoes");
                    if (jdados) {
                        if (jdados.Dados.length > 0) {
                            destino.removeAttr("disabled");
                            for (x = 0; x < jdados.Dados.length; x++) {
                                var dado = jdados.Dados[x];
                                var optn = document.createElement("OPTION");
                                optn.text = dado.EXERCICO_ANO;
                                optn.value = dado.EXERCICO_ANO;
                                destino.find("option").end().append("<option value='" + dado.text + "'>" + dado.text + "</option>").val("'" + dado.EXERCICO_ANO + "'");
                            };
                        }
                    }
                    destino.css("background-color", "#ffffff");
                    destino.attr("disabled", false);
                },
                error: function (jerro) {
                    alert(jerro.responseText);
                    destino.css("background-color", "#ffffff");
                }
            });
        }
    };




    if (($("#hndAcao").val() == 21) && ($("#hndItem").val() == 1)) {
        $("#txtReferenciaDePublicacoes").blur(function () {
            //alert($('#cmbAnoCargasPublicacoes').val())
            if ($("#txtReferenciaDePublicacoes").val() != "") {
                if ($('#cmbAnoCargasPublicacoes').val() != $("#txtReferenciaDePublicacoes").val().substr(6, 10)) {
                    alert("Ano de Referência maior que ano de Exercício.")
                    $("#txtReferenciaDePublicacoes").focus();
                }
            }
        });
        if ($("#txtReferenciaAtePublicacoes").val() < $("#txtReferenciaDePublicacoes").val()) {
            alert("Referência final menor que referência inicial!")
            $("#txtReferenciaAtePublicacoes").focus();
        }
        $("#txtReferenciaAtePublicacoes").blur(function () {
            if ($("#txtReferenciaAtePublicacoes").val() != "" && $("#txtReferenciaDePublicacoes").val() == "") {
                alert("Favor preencher a data inícial!")
                $("#txtReferenciaDePublicacoes").focus();
            }
        });
        preencheComboTema();
    }


    // Busca perguntas Frequentes
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 1)) {

        // Alterar a URL para usar esta abaixo - NÃO ESQUECER
        // meuHost
        // url: "http://" + meuHost + ":90/api/perguntasfrequentes",
        //url: "http://ws713:90/api/perguntasfrequentes",

        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaPerguntasFrequentes",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                htm += "<div style='width: 100%; text-align: center; '>Abaixo estão relacionadas perguntas e respostas para ajudar o usuário do Portal da Transparência a tirar suas dúvidas mais frequentes.</div>";
                htm += "<p>";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];
                    //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                    htm += "<table>";
                    htm += "<div style='width:100%'>";
                    htm += "<h4 style='height:4px; padding-left: 20px; '><img id='image' src='/pronimtb/imagens/setaParaBaixo_nova.png' width='20' height='20'> &nbsp;&nbsp; " + objResult.Pergunta + "</h4>";
                    htm += " <b><p style='display:block; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'></b> " + objResult.Resposta + "</p>";
                    htm += " </div>";
                    htm += " </table>";

                }

                //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>"

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('imprimirPDF').style.visibility = "visible";
                document.getElementById('exportarXML').style.visibility = "visible";
                document.getElementById('exportarCSV').style.visibility = "visible";
                document.getElementById('linhaPerguntasFrequentes').innerHTML = htm;

            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    };

    // Busca Pedidos Informação
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 5)) {

        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaPedidosInformacao",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                htm += "<div style='width: 100%; text-align: center; '></div>";
                htm += "<p>";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];
                    //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                    htm += "<table>";
                    htm += "<div style='width:100%'>";
                    htm += "<div id='coluna_esquerda'>&nbsp;</div>"

                    htm += " <div style='text-align:justify; font-style: italic; font-family: initial; font-size: 17px; colspan= 20; height:100%; padding-left: 90px; padding-top: 10px;'>" + objResult.texto + "</div>";
                    htm += "</br>";

                    htm += " <div style='text-align:left; '>O acesso encontra-se disponível no endereço: <a href=" + objResult.linkPedidos + ">" + objResult.linkPedidos + "</a></div>";
                    htm += " </div>";
                    htm += " </table>";

                }

                //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>"

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('imprimirPDF').style.display = 'none';
                document.getElementById('exportarXML').style.display = 'none';
                document.getElementById('exportarCSV').style.display = 'none';
                document.getElementById('linhaPedidosInformacao').innerHTML = htm;

            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    };

    // Busca Estrutura Organizacional
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 2)) {

        // Alterar a URL para usar esta abaixo - NÃO ESQUECER
        // meuHost
        // url: "http://" + meuHost + ":90/api/EstruturaOrganizacional",
        //url: "http://ws713:90/api/EstruturaOrganizacional",

        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaEstruturaOrganizacional&param1=0",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                htm += "<div style='width: 100%; text-align: center;'>Consulta da Estrutura Organizacional das Entidades</div>";
                htm += "<p>";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];

                    // htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                    htm += "<table id='EstruturaOrganizacional'>";
                    htm += "<div style='font-family:Verdana; font-size:14px; text-align: left; width:100%;'>";

                    if (objResult.nomeEntidade != null) {
                        htm += "<h4 style='height:4px; padding-left: 20px; '><img id='image' src='/pronimtb/imagens/setaDireita.png' width='20' height='20'><b> &nbsp;&nbsp; Nome da Entidade:    " + objResult.nomeEntidade + "</b></h4>";
                    }
                    if (objResult.nmEntidadePrincipal != null && objResult.nmEntidadePrincipal != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Nome Entidade Principal:  " + objResult.nmEntidadePrincipal + "</p>";
                    }
                    if (objResult.CompetenciasEntidade != null && objResult.CompetenciasEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Competências da Entidade:   " + objResult.CompetenciasEntidade + "</p>";
                    }
                    if (objResult.Logradouro != null && objResult.Logradouro != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Logradouro:   " + objResult.Logradouro + "</p>";
                    }
                    if (objResult.Bairro != null && objResult.Bairro != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Bairro:   " + objResult.Bairro + "</p>";
                    }
                    if (objResult.CEP != null && objResult.CEP != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> CEP:   " + objResult.CEP + "</p>";
                    }
                    if (objResult.Complemento != null && objResult.Complemento != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Complemento:   " + objResult.Complemento + "</p>";
                    }
                    if (objResult.TelefoneFixo != null && objResult.TelefoneFixo != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo:    " + objResult.TelefoneFixo + "</p>";
                    }
                    if (objResult.Celular != null && objResult.Celular != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular:    " + objResult.Celular + "</p>";
                    }
                    if (objResult.Fax != null && objResult.Fax != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> FAX:    " + objResult.Fax + "</p>";
                    }
                    if (objResult.EnderecoEletronico != null && objResult.EnderecoEletronico != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Endereço Eletrônico: <a href='http://" + objResult.EnderecoEletronico + "'>" + objResult.EnderecoEletronico + "</a></p>";
                    }
                    if (objResult.hroAtendimento != null && objResult.hroAtendimento != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Horário de Atendimento:   " + objResult.hroAtendimento + "</p>";
                    }
                    if (objResult.cntEletronicoEntidade != null && objResult.cntEletronicoEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico da Entidade: <a href='http://" + objResult.cntEletronicoEntidade + "'>" + objResult.cntEletronicoEntidade + "</a></p>";
                    }
                    if (objResult.nmResponsavel != null && objResult.nmResponsavel != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Nome do responsável:   " + objResult.nmResponsavel + "</p>";
                    }
                    if (objResult.cntEletronicoResponsavel != null && objResult.cntEletronicoResponsavel != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico do responsável:   " + objResult.cntEletronicoResponsavel + "</p>";
                    }
                    if (objResult.respTelefone != null && objResult.respTelefone != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo do responsável:   " + objResult.respTelefone + "</p>";
                    }
                    if (objResult.respCelular != null && objResult.respCelular != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular responsável:   " + objResult.respCelular + "</p>";
                    }
                    if (objResult.arqEstruturaOrganizacional != null && objResult.arqEstruturaOrganizacional != "") {
                        htm += "<p style='display:none; text-align:center; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-botton: 3px'> <img alt='' src='/pronimtb/imagens/" + objResult.arqEstruturaOrganizacional + "' /></p>";
                    }

                    htm += " </div>";
                    htm += " </table>";

                }

                htm += "<div id='linhaDivisao' style='padding-top: 10px;'></div>"
                // htm += "<div id='linhaEstruturaRopade' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge;'></div>"

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('imprimirPDF').style.visibility = "visible";
                document.getElementById('exportarXML').style.visibility = "visible";
                document.getElementById('exportarCSV').style.visibility = "visible";
                document.getElementById('linhaEstruturaOrganizacional').innerHTML = htm;

                // teste();
            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    };

    // Busca Estrutura Organizacional_SIC
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 6)) {


        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaEstruturaOrganizacional&param1=1",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                htm += "<div style='width: 100%; text-align: center;'>Consulta da Estrutura Organizacional das Entidades que possuem SIC</div>";
                htm += "<p>";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];

                    // htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                    htm += "<table id='EstruturaOrganizacional'>";
                    htm += "<div style='font-family:Verdana; font-size:14px; text-align: left; width:100%;'>";

                    if (objResult.nomeEntidade != null) {
                        htm += "<h4 style='height:4px; padding-left: 20px; '><img id='image' src='/pronimtb/imagens/setaDireita.png' width='20' height='20'><b> &nbsp;&nbsp; Nome da Entidade:    " + objResult.nomeEntidade + "</b></h4>";
                    }
                    if (objResult.nmEntidadePrincipal != null && objResult.nmEntidadePrincipal != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Nome Entidade Principal:  " + objResult.nmEntidadePrincipal + "</p>";
                    }
                    if (objResult.CompetenciasEntidade != null && objResult.CompetenciasEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Competências da Entidade:   " + objResult.CompetenciasEntidade + "</p>";
                    }
                    if (objResult.Logradouro != null && objResult.Logradouro != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Logradouro:   " + objResult.Logradouro + "</p>";
                    }
                    if (objResult.Bairro != null && objResult.Bairro != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Bairro:   " + objResult.Bairro + "</p>";
                    }
                    if (objResult.CEP != null && objResult.CEP != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> CEP:   " + objResult.CEP + "</p>";
                    }
                    if (objResult.Complemento != null && objResult.Complemento != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Complemento:   " + objResult.Complemento + "</p>";
                    }
                    if (objResult.TelefoneFixo != null && objResult.TelefoneFixo != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo:    " + objResult.TelefoneFixo + "</p>";
                    }
                    if (objResult.Celular != null && objResult.Celular != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular:    " + objResult.Celular + "</p>";
                    }
                    if (objResult.Fax != null && objResult.Fax != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> FAX:    " + objResult.Fax + "</p>";
                    }
                    if (objResult.EnderecoEletronico != null && objResult.EnderecoEletronico != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Endereço Eletrônico: <a href='http://" + objResult.EnderecoEletronico + "'>" + objResult.EnderecoEletronico + "</a></p>";
                    }
                    if (objResult.hroAtendimento != null && objResult.hroAtendimento != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Horário de Atendimento:   " + objResult.hroAtendimento + "</p>";
                    }
                    if (objResult.cntEletronicoEntidade != null && objResult.cntEletronicoEntidade != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico da Entidade: <a href='http://" + objResult.cntEletronicoEntidade + "'>" + objResult.cntEletronicoEntidade + "</a></p>";
                    }
                    if (objResult.nmResponsavel != null && objResult.nmResponsavel != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Nome do responsável:   " + objResult.nmResponsavel + "</p>";
                    }
                    if (objResult.cntEletronicoResponsavel != null && objResult.cntEletronicoResponsavel != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico do responsável:   " + objResult.cntEletronicoResponsavel + "</p>";
                    }
                    if (objResult.respTelefone != null && objResult.respTelefone != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo do responsável:   " + objResult.respTelefone + "</p>";
                    }
                    if (objResult.respCelular != null && objResult.respCelular != "") {
                        htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular responsável:   " + objResult.respCelular + "</p>";
                    }
                    if (objResult.arqEstruturaOrganizacional != null && objResult.arqEstruturaOrganizacional != "") {
                        htm += "<p style='display:none; text-align:center; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-botton: 3px'> <img alt='' src='/pronimtb/imagens/" + objResult.arqEstruturaOrganizacional + "' /></p>";
                    }

                    htm += " </div>";
                    htm += " </table>";

                }

                htm += "<div id='linhaDivisao' style='padding-top: 10px;'></div>"
                htm += "<div id='linhaEstruturaSIC_Ropade' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge;'></div>"

                document.getElementById('confirma').style.display = 'none';
                document.getElementById('imprimirPDF').style.visibility = "visible";
                document.getElementById('exportarXML').style.visibility = "visible";
                document.getElementById('exportarCSV').style.visibility = "visible";
                document.getElementById('linhaEstruturaOrganizacional').innerHTML = htm;

                // teste();
            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    };

    // Some com o botão de confirmação para as telas de perguntas frequentes e estrutura organizacional
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 3)) {

        document.getElementById('confirma').style.display = 'none';
    }

    $('#cmbEstoqueDataVigenciaLC').change(function () {

        if (this.value > 0) {

            LimpaCombo("cmbEstoqueMesInicial");
            LimpaCombo("cmbEstoqueMesFinal");

            $("#cmbEstoqueMesInicial").css("display", "block");
            //$("#mensagemAteCombo").css("display", "block");

            $("#cmbEstoqueMesInicial").removeAttr("style");
            //$("#mensagemAteCombo").removeAttr("style");

            var comboMesesEstoque;

            for (xx = 0; xx < 2; xx++) {

                if (xx == 0) {
                    comboMesesEstoque = document.getElementById("cmbEstoqueMesInicial");
                } else {
                    comboMesesEstoque = document.getElementById("cmbEstoqueMesFinal");
                }

                var opt0 = document.createElement("option");
                opt0.value = "0";
                opt0.text = "SELECIONE";
                comboMesesEstoque.add(opt0, comboMesesEstoque.options[0]);

                for (x = 1; x < 13; x++) {
                    var opt = document.createElement("option");
                    opt.value = x;
                    if (x == 1) {
                        opt.text = "Janeiro";
                    } else if (x == 2) {
                        opt.text = "Fevereiro";
                    } else if (x == 3) {
                        opt.text = "Março";
                    } else if (x == 4) {
                        opt.text = "Abril";
                    } else if (x == 5) {
                        opt.text = "Maio";
                    } else if (x == 6) {
                        opt.text = "Junho";
                    } else if (x == 7) {
                        opt.text = "Julho";
                    } else if (x == 8) {
                        opt.text = "Agosto";
                    } else if (x == 9) {
                        opt.text = "Setembro";
                    } else if (x == 10) {
                        opt.text = "Outubro";
                    } else if (x == 11) {
                        opt.text = "Novembro";
                    } else if (x == 12) {
                        opt.text = "Dezembro";
                    }

                    comboMesesEstoque.add(opt, comboMesesEstoque.options[x]);
                };
            };

        } else {
            limparDados("cmbEstoqueMesInicial");
        }
    }).change();

    // Tela de Pesquisa
    if (($("#hndAcao").val() == 20) && ($("#hndItem").val() == 4)) {

        var url = $.url(unescape(window.location.href));
        var textoPesquisa = unescape(url.param('txtPesquisa'));

        var valResultadoPesquisa = retiraAcento(textoPesquisa);

        if (valResultadoPesquisa != "") {
            var meuHost = window.location.host;

            $.ajax({
                type: "GET",
                global: false,
                url: "acao.asp",
                data: "acao=buscaPesquisa&param1=" + valResultadoPesquisa.toString(),
                dataType: "json",
                async: false,
                cache: false,
                success: function (jdados) {
                    var htm = "";
                    if (jdados) {
                        // Menu XML

                        htm = "";
                        htm += "<table id='pesquisaRapida'>";
                        htm += "<div style='width:100%; '>";

                        htm += "<div style='width:100%;height:0px;' ><td style='font-family:Verdana; text-align: left; font-size:18px;'>";
                        var vMenu = 0;

                        for (var i = 0; i < jdados.length; i++) {
                            var objResult = jdados[i];
                            if (objResult.Pai != "" && typeof objResult.Pai != "undefined") {

                                if (vMenu == 0) {
                                    htm += "<p style='height:0px;'><b> Menu </b></p>";
                                    vMenu += 1;
                                }

                                htm += "<tr style='font-family:Verdana; font-size:14px; text-align: left; color:#0074B2;' ><td>";
                                htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/pronimtb/imagens/setaDireita.png' width='20px' height='20px'><b style='padding-left: 9px;'>" + objResult.Pai.toUpperCase() + "</b></h4>";

                                if (objResult.Filho != "" && typeof objResult.Filho != "undefined") {

                                    var strFilhos = objResult.Filho;
                                    var resFilhos = strFilhos.split("|");

                                    var strURL = objResult.URL;
                                    var resURL = strURL.split("|");

                                    // htm += " <p style='display:none; height:3px; padding-left: 40px;' > <a style='font-size: 12px;!important; text-decoration:none;' class='but' >" + objResult.Filho + "</a></p>";

                                    htm += " <p style='display:none; height:3px; padding-left: 40px;' >";
                                    htm += " | ";

                                    for (var i1 = 0; i1 < resFilhos.length; i1++) {
                                        if (resURL[i1] != 'Vazio') {
                                            htm += " <a style='font-size: 12px;!important; padding: 10px 0px;'  class='but' href='http://" + meuHost + "/pronimtb" + resURL[i1] + "' >" + resFilhos[i1] + "</a>";
                                            htm += " | ";
                                        }
                                        else {
                                            htm += " <a style='font-size: 12px;!important;' class='but' >" + resFilhos[i1] + "</a>";
                                        }
                                    }

                                    htm += "</p>";

                                }
                                htm += "</td></tr>";
                            }
                        }
                        htm += "</td></div>";
                        htm += " </div>";
                        htm += " </table>";

                        // ---- Perguntas Frequentes

                        htm += "<div style='font-family:Verdana; text-align: left; font-size:18px; '><td>";
                        htm += "<table id='pesquisaRapidaPerguntas'>";
                        htm += "<div style='width:100%; '>";

                        var vPerguntasFrequentes = 0;

                        for (var i = 0; i < jdados.length; i++) {
                            var objResult = jdados[i];
                            if (objResult.Pergunta != "" && typeof objResult.Pergunta != "undefined") {

                                if (vPerguntasFrequentes == 0) {
                                    htm += "<p style='height:0px;'><b> Perguntas Frequentes </b></p>";
                                    vPerguntasFrequentes += 1;
                                }

                                htm += "<tr style='font-family:Verdana; font-size:14px; color:#0074B2;'><td>";
                                htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/pronimtb/imagens/setaDireita.png' width='20px' height='20px'><b style='padding-left: 5px;'> " + objResult.Pergunta.toUpperCase() + "</b></h4>";
                                htm += " <p style='display:block ; text-align:justify; 'height:3px;'><a style='font-size: 12px;!important; padding-left: 70px;' class='but' href='http://" + meuHost + "/pronimtb/index.asp?acao=20&item=1' >" + objResult.Resposta + "</a></p>";
                                htm += "</td></tr>";
                            }
                        }

                        htm += "</td></div>";

                        htm += " </div>";
                        htm += " </table>";

                        // ---- Publicações 

                        htm += "<div id='geraPublicacoes' style='font-family:Verdana; text-align: left; font-size:18px;'>";
                        htm += "<div style='width: 100%; font-size: 8px;'>&nbsp;&nbsp;&nbsp;</div>";
                        htm += "<div style='width: 100%; text-align: center;'></div>";
                        htm += "<p>";

                        var iTitulo = 0;
                        var strNomeTema = "";

                        var vPublicacoes = 0;

                        for (var i = 0; i < jdados.length; i++) {
                            var objResult = jdados[i];
                            if (objResult.ID_AREA != "" && typeof objResult.ID_AREA != "undefined") {

                                if (vPublicacoes == 0) {
                                    htm += "<p><b>Publicações </b></p>";
                                    vPublicacoes += 1;
                                }

                                if (iTitulo == 0) {
                                    strNomeTema = objResult.Nome_tema;

                                    htm += "<div id='linhaPerguntas'  style='font-family:Verdana; font-size:14px; color:#0074B2;'></div>";
                                    htm += "<table id='publicacoesArquivos'>";
                                    htm += "<div style='width:100%'>";

                                    htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/pronimtb/imagens/setaDireita.png' width='20px' height='20px'><b style='font-family:Verdana; font-size:14px; color:#0074B2; padding-left: 5px;'> " + objResult.Nome_tema + "</b></h4>";


                                    htm += "<div style='font-size: 3px; width:100%; height:100%; '>";
                                    if (objResult.Descricao_tema != "") {
                                        htm += "<div style='width:1px; height:1px;'></div>";
                                        htm += "<p style='display:block; font-size: 11px;!important; width:100%; text-align:justify; height:100%; padding-left: 70px;'><a style='font-size: 12px;!important; padding-left: 0px;' class='but' href='http://" + meuHost + "/pronimtb/index.asp?acao=21&item=1'>" + objResult.Descricao_tema + "</a></p>";
                                    }
                                    htm += "</div>";

                                    iTitulo += 1;
                                }

                                if (strNomeTema != objResult.Nome_tema) {

                                    htm += "</div>";
                                    htm += " </table>";

                                    htm += "<div id='linhaPerguntas' style='font-family:Verdana; font-size:14px; color:#0074B2;'></div>";
                                    htm += "<table id='publicacoesArquivos'>";
                                    htm += "<div style='width:100%;'>";

                                    htm += "<h4 style='height:3px; padding-left: 20px;'><img id='image' src='/pronimtb/imagens/setaDireita.png' width='20px' height='20px'><b style='font-family:Verdana; font-size:14px; color:#0074B2; padding-left: 5px;'> " + objResult.Nome_tema + "</b></h4>";

                                    htm += "<div style='font-size: 3px; width:100%; height:100%;'>";
                                    if (objResult.Descricao_tema != null) {
                                        htm += "<div style='width:1px; height:1px;'></div>";
                                        htm += "<p style='display:block; font-size: 11px;!important; width:100%; text-align:justify; height:100%; padding-left: 70px;'><a style='font-size: 12px;!important; padding-left: 0px;' class='but' href='http://" + meuHost + "/pronimtb/index.asp?acao=21&item=1'>" + objResult.Descricao_tema + "</a></p>";
                                    }
                                    htm += "</div>";

                                    strNomeTema = objResult.Nome_tema;

                                }


                                if (objResult.Nome_arquivo != null && objResult.Nome_arquivo != "") {
                                    htm += "<p style='display:none; font-size: 11px;padding-left: 70px;'>Nome:  " + objResult.Nome_arquivo + "</p>";
                                } else {
                                    htm += "<p style='display:none; font-size: 11px;padding-left: 70px;'>Nome:  " + objResult.Nome_tema + " - " + objResult.NOME_RELATORIO + "</p>";
                                }

                                if (objResult.IMG_ARQUIVO != null) {
                                    htm += "<p style='display:none; font-size: 11px;padding-left: 70px;'>";

                                    switch (objResult.ID_AREA) {
                                        case "1": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but'   href='http://" + meuHost + "/pronimtb/upload/Gestao_de_Pessoal/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";
                                        } break;
                                        case "2": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px;  backgound: none;' class='but'  href='http://" + meuHost + "/pronimtb/upload/Administracao_Geral/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                                        } break;
                                        case "3": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but'  href='http://" + meuHost + "/pronimtb/upload/Arrecadacao/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                                        } break;
                                        case "4": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but'  href='http://" + meuHost + "/pronimtb/upload/Financeira/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                                        } break;
                                        case "5": {
                                            htm += "Arquivo: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but'  href='http://" + meuHost + "/pronimtb/upload/Outros/" + objResult.IMG_ARQUIVO + "'> " + objResult.IMG_ARQUIVO + "</a>";

                                        } break;
                                    };


                                    htm += "</p>";

                                    if (objResult.DT_VIGENCIA_INICIO != null && objResult.DT_VIGENCIA_INICIO != "") {

                                        if (objResult.DT_VIGENCIA_FIM != null && objResult.DT_VIGENCIA_FIM != "") {
                                            htm += "<p style='display:none; font-size: 11px; padding-left: 70px;'>Referência:  " + objResult.DT_VIGENCIA_INICIO + " a " + objResult.DT_VIGENCIA_FIM + "</p>";
                                        } else {
                                            htm += "<p style='display:none; font-size: 11px; padding-left: 70px;'>Referência:  " + objResult.DT_VIGENCIA_INICIO + " a Vigente </p>";
                                        }
                                    }

                                    if (objResult.DS_DESCRICAO != null) {
                                        htm += "<p style='display:none; font-size: 11px; padding-left: 70px;'>Descrição:  " + objResult.DS_DESCRICAO + "</p>";
                                    }

                                    htm += "<p style='display:none; width: 50%; text-align: center; bottom: 0px;  border: 1px ridge'>";
                                    htm += "</p>";
                                };
                            }
                        }

                        htm += " </div>";
                        htm += " </table>";
                        htm += " </div>";

                        var vEstrutura = 0;
                        // Estrutura Organizacional
                        //htm += "<div style='width: 100%; text-align: center;'>Consulta da Estrutura Organizacional das Entidades</div>";
                        htm += "<div id='geraPublicacoes' style='font-family:Verdana; text-align: left; font-size:18px;'>";
                        htm += "<div style='width: 100%; font-size: 8px;'>&nbsp;&nbsp;&nbsp;</div>";
                        htm += "<div style='width: 100%; text-align: center;'></div>";
                        htm += "<p>";
                        for (var i = 0; i < jdados.length; i++) {

                            var objResult = jdados[i];

                            if (objResult.nomeEntidade != "" && typeof objResult.nomeEntidade != "undefined") {

                                if (vEstrutura == 0) {
                                    htm += "<p><b>Estrutura Organizacional </b></p>";
                                    vEstrutura += 1;
                                }

                                //htm += "<div id='linhaPerguntas' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge'></div>";
                                htm += "<table id='EstruturaOrganizacional'>";
                                htm += "<div style='font-family:Verdana; font-size:14px; text-align: left; width:100%;'>";

                                if (objResult.nomeEntidade != null) {
                                    htm += "<h4 style='height:4px; padding-left: 20px; '><img id='image' src='/pronimtb/imagens/setaDireita.png' width='20' height='20'><b <b style='font-family:Verdana; font-size:14px; color:#0074B2; padding-left: 5px;'> NOME DA ENTIDADE:    " + objResult.nomeEntidade.toUpperCase() + "</b></h4>";
                                }
                                if (objResult.nmEntidadePrincipal != null && objResult.nmEntidadePrincipal != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Nome Entidade Principal:  " + objResult.nmEntidadePrincipal + "</p>";
                                }
                                if (objResult.CompetenciasEntidade != null && objResult.CompetenciasEntidade != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-top: 10px;'> Competências da Entidade:   " + objResult.CompetenciasEntidade + "</p>";
                                }
                                if (objResult.Logradouro != null && objResult.Logradouro != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Logradouro:   " + objResult.Logradouro + "</p>";
                                }
                                if (objResult.Bairro != null && objResult.Bairro != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Bairro:   " + objResult.Bairro + "</p>";
                                }
                                if (objResult.CEP != null && objResult.CEP != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> CEP:   " + objResult.CEP + "</p>";
                                }
                                if (objResult.Complemento != null && objResult.Complemento != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Complemento:   " + objResult.Complemento + "</p>";
                                }
                                if (objResult.TelefoneFixo != null && objResult.TelefoneFixo != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo:    " + objResult.TelefoneFixo + "</p>";
                                }
                                if (objResult.Celular != null && objResult.Celular != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular:    " + objResult.Celular + "</p>";
                                }
                                if (objResult.Fax != null && objResult.Fax != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> FAX:    " + objResult.Fax + "</p>";
                                }
                                if (objResult.EnderecoEletronico != null && objResult.EnderecoEletronico != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Endereço Eletrônico: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='http://" + objResult.EnderecoEletronico + "'>" + objResult.EnderecoEletronico + "</a></p>";
                                }
                                if (objResult.hroAtendimento != null && objResult.hroAtendimento != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Horário de Atendimento:   " + objResult.hroAtendimento + "</p>";
                                }
                                if (objResult.cntEletronicoEntidade != null && objResult.cntEletronicoEntidade != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico da Entidade: <a style='font-size: 12px;!important; text-decoration: underline; padding-left: 0px; backgound: none;' class='but' href='http://" + objResult.cntEletronicoEntidade + "'>" + objResult.cntEletronicoEntidade + "</a></p>";
                                }
                                if (objResult.nmResponsavel != null && objResult.nmResponsavel != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Nome do responsável:   " + objResult.nmResponsavel + "</p>";
                                }
                                if (objResult.cntEletronicoResponsavel != null && objResult.cntEletronicoResponsavel != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Contato Eletrônico do responsável:   " + objResult.cntEletronicoResponsavel + "</p>";
                                }
                                if (objResult.respTelefone != null && objResult.respTelefone != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Telefone Fixo do responsável:   " + objResult.respTelefone + "</p>";
                                }
                                if (objResult.respCelular != null && objResult.respCelular != "") {
                                    htm += "<p style='display:none; text-align:justify; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; '> Celular responsável:   " + objResult.respCelular + "</p>";
                                }
                                if (objResult.arqEstruturaOrganizacional != null && objResult.arqEstruturaOrganizacional != "") {
                                    htm += "<p style='display:none; text-align:center; font-size: 11px; colspan= 20; height:100%; padding-left: 60px; padding-botton: 3px'> <img alt='' src='/pronimtb/imagens/" + objResult.arqEstruturaOrganizacional + "' /></p>";
                                }

                                htm += " </div>";
                                htm += " </table>";
                            }

                        }
                        htm += " </div>";

                        htm += "<div id='linhaDivisao' style='padding-top: 10px;'></div>"
                        htm += "<div id='linhaEstruturaRopade' style='width: 100%; text-align: center; bottom: 0px; left: 0px; border: 1px ridge;'></div>"


                        document.getElementById('confirma').style.display = 'none';
                        document.getElementById('linhaResultadoPesquisa').innerHTML = htm;

                    }

                    if (jdados.length == 0) {
                        htm += " <b>Não foi encontrado nenhum item para a pesquisa realizada, por favor refaça a sua pesquisa!</b>  ";

                        document.getElementById('confirma').style.display = 'none';
                        document.getElementById('linhaResultadoPesquisa').innerHTML = htm;


                    }

                },

                error: function (jerro) {
                    alert(jerro.responseText + "Erro ao receber o arquivo!");
                }
            });

        }

    }

    //PP
    $("#cmbPatrimonioStatus").change(function () {
        if ($("#cmbPatrimonioSituacaoBem").val() == 1) {
            //em uso
            if ($("#cmbPatrimonioStatus").val() == "N") {
                LimpaCompoTipoIngressoPP()
                CarregaComboTipoingresso()
            }//baixado
            else if ($("#cmbPatrimonioStatus").val() == "B") {
                LimpaCompoTipoIngressoPP()
                $("#TipoPatrimonio").text("Tipo de Baixa:")
                CarregaComboTipoingresso()
            }
        }
        if ($("#cmbPatrimonioStatus").val() == "C") {
            LimpaCompoTipoIngressoPP()
        }
        if ($("#cmbPatrimonioStatus").val() != "B") {
            $("#TipoPatrimonio").text("Tipo de Ingresso:");
        }
    });

    $("#cmbPatrimonioSituacaoBem").change(function () {
        $("#TipoPatrimonio").text("Tipo de Ingresso:");
        if ($("#cmbPatrimonioSituacaoBem").val() != 1) {
            LimpaCompoTipoIngressoPP()
        }

        if ($("#cmbPatrimonioSituacaoBem").val() == 1) {
            //em uso
            if ($("#cmbPatrimonioStatus").val() == "N") {
                LimpaCompoTipoIngressoPP()
                CarregaComboTipoingresso()
            }//baixado
            else if ($("#cmbPatrimonioStatus").val() == "B") {
                LimpaCompoTipoIngressoPP()
                $("#TipoPatrimonio").text("Tipo de Baixa:")
                CarregaComboTipoingresso()
            }
        }
    });
    //AF
    $('#quantEspecf').focusout(function () {
        if ($('#quantEspecf').val() != '') {
            $("input[name='nrMovimentos']:checked").attr("checked", false);
        }
    });
    $("input[name='nrMovimentos']").click(function () {
        $('#quantEspecf').val('');
    });
    $('.tipoDespesaTodas').click(function () {
        var estado = $('.tipoDespesaTodas').attr('checked');
        //alert(estado);
        $.each($('.tipoDespesa'), function () {
            $(this).attr('checked', estado ? "checked" : "");
        });
    });
    $('.tipoDespesa').click(function () {
        var estado = true;
        var totalNaoChecadas = 0;
        var totalChecadas = 0;
        $.each($(".tipoDespesa"), function () {
            if (!$(this).attr('checked')) {
                totalNaoChecadas++;
                estado = false
            } else {
                totalChecadas++;
            }
        });
        $('.tipoDespesaTodas').attr('checked', estado ? "checked" : "")
    });
});

valResultadoPesquisa = "";
function LimpaCompoTipoIngressoPP() {
    $("#cmbPatrimonioTipoIngresso").empty();
    $("#cmbPatrimonioTipoIngresso").append("<option value=''>SELECIONE</option>")
}

function CarregaComboTipoingresso() {
    consultarDados('RetornaTipoDeIngressoPP', 'cmbPatrimonioTipoIngresso', 'cmbPatrimonioUnidadePP', 'cmbPatrimonioStatus', '', '', '');
}

function pesquisaRapida() {

    valResultadoPesquisa = document.getElementById('txtPesquisa').value.toString();
    window.location.href = "http://" + meuHost + "/pronimtb/index.asp?acao=20&item=4&txtPesquisa=" + valResultadoPesquisa;

}

function telaAcessbilidade() {
    var meuHost = window.location.host;
    window.location.href = "http://" + meuHost + "/pronimtb/index.asp?acao=20&item=3";
}

function menuFavoritos() {
    var destino = $("#cmbMenuFavoritos");
    if ((destino) && (destino.is(":visible"))) {
        limparDadosFavoritos("cmbMenuFavoritos");
        destino.css("background-color", "#cecece");

        // destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=BuscaFavoritos",
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDadosFavoritos("cmbMenuFavoritos");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.descricao;
                            optn.value = dado.value;
                            destino.find("option").end().append("<option value='http://" + meuHost + "/pronimtb" + dado.value + "'>" + dado.descricao + "</option>").val("'" + dado.value + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                //destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}


// Gera exportação de CSV para as telas de estrutura organizacional e perguntas frequentes
function exportacaoCSV(tipoExport, validaEsic) {
    // url: "http://ws713:90/api/perguntasfrequentes",
    // url: "http://ws713:90/api/EstruturaOrganizacional",

    if (tipoExport == 1) {
        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaEstruturaOrganizacional&param1=" + validaEsic,
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";

                htm += "ENTIDADE;";
                htm += "ENTIDADE PRINCIPAL;";
                htm += "ESTRUTURA ORGANIZACIONAL;";
                htm += "COMPETENCIAS;";
                htm += "ENDERECO;";
                htm += "BAIRRO;";
                htm += "CEP;";
                htm += "COMPLEMENTO;";
                htm += "TELEFONE FIXO;";
                htm += "TELEFONE CELULAR;";
                htm += "FAX;";
                htm += "ENDERECO ELETRONICO;";
                htm += "HORARIO DE ATENDIMENTO;";
                htm += "CONTATO ELETRONICO;";
                htm += "NOME RESPONSAVEL;";
                htm += "CONTATO ELETRONICO RESPONSAVEL;";
                htm += "TELEFONE FIXO RESPONSAVEL;";
                htm += "TELEFONE CELULAR RESPONSAVEL;";
                htm += "E-SIC;";
                htm += "\n";

                for (var i = 0; i < jdados.length; i++) {
                    var objResult = jdados[i];
                    htm += objResult.nomeEntidade + ";";
                    htm += objResult.nmEntidadePrincipal + ";";
                    htm += objResult.arqEstruturaOrganizacional + ";";
                    htm += objResult.CompetenciasEntidade + ";";
                    htm += objResult.Logradouro + ";";
                    htm += objResult.Bairro + ";";
                    htm += objResult.CEP + ";";
                    htm += objResult.Complemento + ";";
                    htm += objResult.TelefoneFixo + ";";
                    htm += objResult.Celular + ";";
                    htm += objResult.Fax + ";";
                    htm += objResult.EnderecoEletronico + ";";
                    htm += objResult.hroAtendimento + ";";
                    htm += objResult.cntEletronicoEntidade + ";";
                    htm += objResult.nmResponsavel + ";";
                    htm += objResult.cntEletronicoResponsavel + ";";
                    htm += objResult.respTelefone + ";";
                    htm += objResult.respCelular + ";";
                    htm += objResult.nrSIC + ";";
                    htm += "\n";
                }

                ExportToCsv('estruturaOrganizacional', htm);
            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: "acao.asp?acao=RetornaPerguntasFrequentes",
            dataType: "json",
            //crossDomain: false,
            success: function (jdados) {
                var htm = "";
                for (var i = 0; i < jdados.length; i++) {

                    var objResult = jdados[i];
                    htm += objResult.Pergunta + ";";
                    htm += objResult.Resposta + ";";
                    htm += "\n";
                }

                ExportToCsv('perguntasFrequentes', htm);
            },

            error: function (jerro) {
                alert(jerro.responseText + "Erro ao receber o arquivo!");
            }
        });
    }
}

function validaCNPJ(cnpj) {
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14 && cnpj.length < 15) {
        return false;
    }
    for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }
    if (!digitos_iguais) {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}

function ApenasNumeros(campo) {

    var tecla = (window.event) ? event.keyCode : e.which;
    if ((tecla > 47 && tecla < 58)) return true;
    else {
        if (tecla == 8 || tecla == 0) return true;
        else return false;
    }

    //if (document.all) // Internet Explorer  
    //    var tecla = event.keyCode;                
    //else if (document.layers) // Nestcape          
    //    var tecla = e.which;

    //if ((tecla > 47 && tecla < 58)) // numeros de 0 a 9  
    //    return true;
    //else {
    //    if (tecla != 8) // backspace  
    //        //event.keyCode = 0;  
    //        return false;
    //    else
    //        return true;
    //}
    //$(campo).val($(campo).val().replace(/\D/g,""));
}

function PostForm() {
    //Cookies para os dados do filtro
    if ($("#cmbDataGP").val() != "") { createCookie("ckDataGP", $("#cmbDataGP").val(), 1) };
    if ($("#cmbAno").val() != "") { createCookie("ckAno", $("#cmbAno").val(), 1) };
    if ($("#cmbExercicio").val() != "") { createCookie("ckExercicio", $("#cmbExercicio").val(), 1) };
    if ($("#cmbUnidadeCP").val() != "") { createCookie("ckUnidadeCP", $("#cmbUnidadeCP").val(), 1) };
    if ($("#cmbMesInicial").val() != "") { createCookie("ckMesInicial", $("#cmbMesInicial").val(), 1) };
    if ($("#cmbMesFinal").val() != "") { createCookie("ckMesFinal", $("#cmbMesFinal").val(), 1) };
    if ($("#txtDataInicial").val() != "") { createCookie("ckDataInicial", $("#txtDataInicial").val(), 1) };
    if ($("#txtDataFinal").val() != "") { createCookie("ckDataFinal", $("#txtDataFinal").val(), 1) };
    if ($("#cmbUnidadeGestora").val() != "") { createCookie("ckUnidadeGestora", $("#cmbUnidadeGestora").val(), 1) };
    if ($("#cmbApresentarPor").val() != "") { createCookie("ckApresentarPor", $("#cmbApresentarPor").val(), 1) };
    if ($("#ckEmpenhoOrcamentario").val() != "") { createCookie("ckEmpenhoOrcamentario", $("#ckEmpenhoOrcamentario").val(), 1) };
    if ($("#ckEmpenhoExtra").val() != "") { createCookie("ckEmpenhoExtra", $("#ckEmpenhoExtra").val(), 1) };
    if ($("#ckEmpenhoResto").val() != "") { createCookie("ckEmpenhoResto", $("#ckEmpenhoResto").val(), 1) };
    if ($("#cmbEstado").val() != "") { createCookie("ckEstado", $("#cmbEstado").val(), 1) };
    if ($("#cmbMunicipio").val() != "") { createCookie("ckMunicipio", $("#cmbMunicipio").val(), 1) };
    if ($("#cmbDataFiltro").val() != "") { createCookie("ckDataFiltro", $("#cmbDataFiltro").val(), 1) };
    if ($("#cmbCategoria").val() != "") { createCookie("ckCategoria", $("#cmbCategoria").val(), 1) };

    //Estoque
    if ($("#cmbEstoqueDataVigenciaLC").val() != "") { createCookie("ckEstoqueAno", $("#cmbEstoqueDataVigenciaLC").val(), 1) };
    if ($("#cmbEstoqueUnidadeGestoraLC").val() != "") { createCookie("ckEstoqueUnidadeGestora", $("#cmbEstoqueUnidadeGestoraLC").val(), 1) };
    if ($("#cmbEstoqueAlmoxarifado").val() != "") { createCookie("ckEstoqueAlmoxarifado", $("#cmbEstoqueAlmoxarifado").val(), 1) };
    if ($("#txtEstoqueLocalizacao").val() != "") { createCookie("ckEstoqueLocalizacao", $("#txtEstoqueLocalizacao").val(), 1) };
    if ($("#txtEstoqueMaterial").val() != "") { createCookie("ckEstoqueMaterial", $("#txtEstoqueMaterial").val(), 1) };
    if ($("#cmbEstoqueMesInicial").val() != "") { createCookie("ckEstoqueDataInicial", $("#cmbEstoqueMesInicial").val(), 1) };
    if ($("#cmbEstoqueMesFinal").val() != "") { createCookie("ckEstoqueDataFinal", $("#cmbEstoqueMesFinal").val(), 1) };
    if ($("#txtEstoqueClassificacao").val() != "") { createCookie("ckEstoqueClassificacao", $("#txtEstoqueClassificacao").val(), 1) };

    //Patrimonio
    if ($("#cmbPatrimonioUnidadeGestoraLC").val() != "") { createCookie("ckPatrimonioUnidadeGestora", $("#cmbPatrimonioUnidadeGestoraLC").val(), 1) };
    if ($("#txtPatrimonioDescricaoBem").val() != "") { createCookie("ckPatrimonioDescricaoBem", $("#txtPatrimonioDescricaoBem").val(), 1) };
    if ($("#txtPatrimonioDataInicial").val() != "") { createCookie("ckPatrimonioDataInicial", $("#txtPatrimonioDataInicial").val(), 1) };
    if ($("#txtPatrimonioDataFinal").val() != "") { createCookie("ckPatrimonioDataFinal", $("#txtPatrimonioDataFinal").val(), 1) };
    if ($("#txtPatrimonioClassificacao").val() != "") { createCookie("ckPatrimonioClassificacao", $("#txtPatrimonioClassificacao").val(), 1) };
    if ($("#txtPatrimonioLocalizacao").val() != "") { createCookie("ckPatrimonioLocalizacao", $("#txtPatrimonioLocalizacao").val(), 1) };
    if ($("#cmbPatrimonioSituacaoBem").val() != "") { createCookie("ckPatrimonioSituacaoBem", $("#cmbPatrimonioSituacaoBem").val(), 1) };
    if ($("#cmbPatrimonioStatus").val() != "") { createCookie("ckPatrimonioStatus", $("#cmbPatrimonioStatus").val(), 1) };
	
    //Frotas
    if ($("#cmbFrotasUnidadeGestora").val() != "") { createCookie("ckFrotasUnidadeGestora", $("#cmbFrotasUnidadeGestora").val(), 1) };
    if ($("#cmbFrotasTipoVeiculo").val() != "") { createCookie("ckFrotasTipoVeiculo", $("#cmbFrotasTipoVeiculo").val(), 1) };
    if ($("#txtFrotasDescricao").val() != "") { createCookie("ckFrotasDescricao", $("#txtFrotasDescricao").val(), 1) };    
    if ($("#txtFrotasDataInicial").val() != "") { createCookie("ckFrotasDataInicial", $("#txtFrotasDataInicial").val(), 1) };
    if ($("#txtFrotasDataFinal").val() != "") { createCookie("ckFrotasDataFinal", $("#txtFrotasDataFinal").val(), 1) };
    if ($("#txtFrotasLocalizacao").val() != "") { createCookie("ckFrotasLocalizacao", $("#txtFrotasLocalizacao").val(), 1) };
    if ($("#txtFrotasPlaca").val() != "") { createCookie("ckFrotasPlaca", $("#txtFrotasPlaca").val(), 1) };	
    if ($("#txtFrotasAnoFabricacao").val() != "") { createCookie("ckFrotasAnoFabricacao", $("#txtFrotasAnoFabricacao").val(), 1) };
    if ($("#cmbFrotasSituacaoVeiculo").val() != "") { createCookie("ckFrotaSituacaoVeiculo", $("#cmbFrotasSituacaoVeiculo").val(), 1) };
	

    document.getElementById("mensagemReferencia").style.display = "none";

    //Ug LC
    if ($("#cmbUnidadeGestoraLC").val() != "") { createCookie("ckUnidadeGestoraLC", $("#cmbUnidadeGestoraLC").val(), 1) };

    //Cookies para os dados do filtro
    //Hidden para tela do Filtro Utilizado
    PreencheHidden('cmbAno', 'hndAno');
    PreencheHidden('cmbExercicio', 'hndExercicio');
    PreencheHidden('cmbUnidadeGestora', 'hndUnidadeGestora');
    PreencheHidden('cmbCategoria', 'hndCategoria');
    PreencheHidden('cmbMesInicial', 'hndMesInicial');
    PreencheHidden('cmbMesFinal', 'hndMesFinal');
    PreencheHidden('cmbUnidadeCP', 'hndUnidadeCP');
    PreencheHidden('cmbUnidadeGestoraLC', 'hndUnidadeGestoraLC');
    PreencheHidden('cmbVinculoGP', 'hndVinculoGP');
    PreencheHidden('cmbUnidadeGP', 'hndUnidadeGP');
    PreencheHidden('cmbDiariasPassagens', 'hndDiariasPassagens');
	PreencheHidden('cmbTipoTransferencia','hndTipoTransferencia');
	PreencheHidden('cmbOrigemRecurso','hndOrigemRecurso');
    //Estoque
    PreencheHidden('cmbEstoqueDataVigenciaLC', 'hndEstoqueDataVigenciaLC');
    PreencheHidden('cmbEstoqueUnidadeGestoraLC', 'hndEstoqueUnidadeGestoraLC');
    PreencheHidden('cmbEstoqueAlmoxarifado', 'hndEstoqueAlmoxarifado');
    PreencheHidden('cmbEstoqueMesInicial', 'hndEstoqueMesInicial');
    PreencheHidden('cmbEstoqueMesFinal', 'hndEstoqueMesFinal');
    PreencheHidden('cmbEstoqueTipoMovimento', 'hndEstoqueTipoMovimento');

    //Patrimonio
    PreencheHidden('cmbPatrimonioUnidadeGestoraLC', 'hndPatrimonioUnidadeGestoraLC');
    PreencheHidden('cmbPatrimonioSituacaoBem', 'hndPatrimonioSituacaoBem');
    PreencheHidden('cmbPatrimonioStatus', 'hndPatrimonioStatus');
	
	//Frotas
    PreencheHidden('cmbFrotasUnidadeGestora', 'hndFrotasUnidadeGestora');
	PreencheHidden('cmbFrotasTipoVeiculo', 'hndFrotasTipoVeiculo');
    PreencheHidden('cmbFrotasSituacaoVeiculo', 'hndFrotasSituacaoVeiculo');


    if (($("#hndAcao").val() == 3) && ($("#hndItem").val() == 7)) {
        PreencheHidden('cmbApresentarPor', 'hndApresentarPorCP');
    }
    if ($("#hndAcao").val() == 1) {
        switch ($("#hndItem").val()) {
            case "2":
                {
                    PreencheHidden('cmbDataFiltro', 'hndDataFiltro');
                    var estado = false;
                    var estado2 = true;
                    var totalModalidadesChecadas = 0;
                    var totalModalidadesNaoChecadas = 0;
                    var totalFinalidadesChecadas = 0;
                    $.each($(".modalidade input"), function () {
                        if ($(this).attr('checked')) {
                            totalModalidadesChecadas++;
                            estado = true;
                        } else {
                            totalModalidadesNaoChecadas++;
                            estado2 = false
                        }
                    });
                    $.each($(".finalidade input"), function () {
                        if (!$(this).attr('checked')) {
                            totalFinalidadesChecadas++;
                        }
                    });
                    if (totalModalidadesNaoChecadas != 0 || totalFinalidadesChecadas != 0)
                        $('#ckTipoModalidadeTodos').attr('checked', estado2 ? "checked" : "");
                    if (totalModalidadesChecadas != 0) {
                        // Selecionar todos as modalidades
                        $.each($(".finalidade input"), function () {
                            $(this).attr("disabled", estado ? "" : "disabled");
                        });
                    } else {
                        $.each($(".finalidade input"), function () {
                            $(this).attr("disabled", estado ? "" : "disabled");
                            $(this).attr('checked', estado ? "checked" : "");
                        });
                    }
                    $.each($(".finalidade input"), function () {
                        if (!$(this).attr('checked')) {
                            totalFinalidadesChecadas++;
                            estado = false;
                        }
                    });
                    $.each($(".modalidade input"), function () {
                        if ($(this).attr('checked')) {
                            totalModalidadesChecadas++;
                            estado = false;
                        }
                    });
                    if (totalFinalidadesChecadas != 0 || totalModalidadesChecadas != 0)
                        $('#ckTipoModalidadeTodos').attr('checked', estado ? "checked" : "");
                } break;
            case "3":
                {
                    PreencheHidden('cmbEstado', 'hndEstado');
                    PreencheHidden('cmbMunicipio', 'hndMunicipio');
                } break;
        }
    }

    //Servidores Ativos/Inativo/Quadro de Pessoal

    if (($("#hndAcao").val() == 4) && ($("#hndItem").val() == 2) || ($("#hndAcao").val() == 4) && ($("#hndItem").val() == 3) || ($("#hndAcao").val() == 4) && ($("#hndItem").val() == 4)) {
        PreencheHidden('hndApresentar', 'hndApresentarPorGP');
    }
    else {
        PreencheHidden('ckTipoGestaoPessoas', 'hndApresentarPorGP');
    }

    //Hidden para tela do Filtro Utilizado
    //Limpar variáveis da sessão
    if ($("#hndAcao").val() != 10) {
        $.ajax({
            type: "POST",
            url: "acao.asp?acao=LimparHistoricos",
            data: "",
            async: false,
            cache: false,
            error: function (jerro) {
                alert(jerro.responseText);
            }
        });
    }
    //Limpar variáveis da sessão

    document.getElementById('hndvisao').value = 1;
}


function validaProdutosInstalados() {
    $("#AtalhosAdm").css("display", "none");
    $("#amdEstoque").css("display", "none");
    $("#admPatrimonio").css("display", "none");    
	$("#admFrotas").css("display", "none");	
    $(".admAG").css("display", "none");
    $("#AtalhosReceitas").css("display", "none");
    $("#AtalhosDespesas").css("display", "none");
    $("#AtalhosTransf").css("display", "none");
	$("#AtalhosTransfVolun").css("display", "none");	
    $("#AtalhosCredores").css("display", "none");
    $("#AtalhosGP").css("display", "none");

    $.ajax({
        type: "GET",
        url: "acao.asp?acao=RetornaProdutosTB",
        dataType: "json",
        success: function (jdados) {
            var htm = "";
            for (var i = 0; i < jdados.length; i++) {
                var objResult = jdados[i];
                if (objResult.TipoProduto == 'AG') {
                    $(".admAG").css("display", "block");
                    $(".admAG").removeAttr("style");
                    $("#AtalhosAdm").css("display", "block");
                    $("#AtalhosAdm").removeAttr("style");
                }
                if (objResult.TipoProduto == 'CM') {
                    $("#amdEstoque").css("display", "block");
                    $("#amdEstoque").removeAttr("style");
                    $("#AtalhosAdm").css("display", "block");
                    $("#AtalhosAdm").removeAttr("style");
                }
                if (objResult.TipoProduto == 'PP') {
                    $("#admPatrimonio").css("display", "block");
                    $("#admPatrimonio").removeAttr("style");
                    $("#AtalhosAdm").css("display", "block");
                    $("#AtalhosAdm").removeAttr("style");
                }
                if (objResult.TipoProduto == 'AF') {
                    $("#admFrotas").css("display", "block");
                    $("#admFrotas").removeAttr("style");
                    $("#AtalhosAdm").css("display", "block");
                    $("#AtalhosAdm").removeAttr("style");
                }
                if (objResult.TipoProduto == 'FA') {
                    $("#AtalhosReceitas").css("display", "block");
                    $("#AtalhosReceitas").removeAttr("style");
                }
                if (objResult.TipoProduto == 'FC') {
                    $("#AtalhosCredores").css("display", "block");
                    $("#AtalhosCredores").removeAttr("style");
                }
                if (objResult.TipoProduto == 'FR') {
                    $("#AtalhosReceitas").css("display", "block");
                    $("#AtalhosReceitas").removeAttr("style");
                }
                if (objResult.TipoProduto == 'FD') {
                    $("#AtalhosDespesas").css("display", "block");
                    $("#AtalhosDespesas").removeAttr("style");
                }
                if (objResult.TipoProduto == 'TV') {
                    $("#AtalhosTransfVolun").css("display", "block");
                    $("#AtalhosTransfVolun").removeAttr("style");
                }
                if (objResult.TipoProduto == 'TF') {
                    $("#AtalhosTransf").css("display", "block");
                    $("#AtalhosTransf").removeAttr("style");
                }
                if (objResult.TipoProduto == 'GP') {
                    $("#AtalhosGP").css("display", "block");
                    $("#AtalhosGP").removeAttr("style");
                }
            }
        },

        error: function (jerro) {
            alert(jerro.responseText + "Erro ao receber o arquivo!");
        }
    });

}

function ValidaForm() {


    msgErro = "";

    if ($("#hndAcao").val() == 10) {

        if ($("#hndItem").val() == 1) {
            if ($("#cmbUnidadeGestoraLC").val() == "") {
                ($("#cmbUnidadeGestoraLC").val(-1))
            }
        }



        if ($("#hndItem").val() >= 4 && $("#hndItem").val() <= 7) //Despesas
        {
            if ($("#cmbUnidadeGestora").val() == "" && ($("#cmbUnidadeGestora").val() == "" && $("#cmbUnidadeCP").val() == "")) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo Unidade Gestora!";
            }
            if ($("#cmbDiariasPassagens").val() == "" && $("#cmbDiariasPassagens").css("display") == "none") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o Tipo de Despesa!";
            }
        }

        //Validação para todas as telas do CP e Exportação
        if ($("#hndItem").val() != 1) {


            if ($("#cmbExercicio").attr('selectedIndex') == 0)
                msgErro = validaDataInicialFinal("txtDataInicial", "txtDataFinal", true);
            else {
                if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Período!";
                }
            }
        }

        // Valida Dados para a exportação   
        if ($("#hndItem").val() == 1) {
            if ($("#cmbUnidadeLC").val() == "") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo Entidade!";
            }
            if ($("#cmbUnidadeGestoraLC").val() == "" && ($("#cmbUnidadeGestoraLC").val() == "" && $("#cmbUnidadeGestoraLC").val() == "")) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar o campo Unidade Gestora!";
            }

            if ($("#txtDataInicial").val() == "" || $("#txtDataInicial").val() == "") {
                if ($('#cmbTipoEsportacaoDados').find('option:selected').val() == "6") { // igual a estoque
                    if ($("#cmbMesInicial").val() == 0 || $("#cmbMesFinal").val() == 0) {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Período!";
                    }
                }
            }

            if ($('#cmbTipoEsportacaoDados').find('option:selected').val() != "7" && $('#cmbTipoEsportacaoDados').find('option:selected').val() != "8") {
                if ($("#cmbExercicio").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o Ano da Vigência!";
                }
            } else {
                msgErro = validaDataInicialFinal("txtDataInicial", "txtDataFinal", true, false);
            }
        }


    } else {
        if ($("#txtDataInicial").val() != "" || $("#txtDataFinal").val() != "") {
            if (!validaData("#txtDataInicial", true)) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Data Inicial inválida.";
            }
            if (!validaData("#txtDataFinal", true)) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Data Final inválida.";
            }
        }
    }




    // 1 - Arrecadação
    if ($("#hndAcao").val() == 2) {
        if ($("#hndItem").val() == 2 || $("#hndItem").val() == 1) //Receitas
        {
            if ($("#cmbAno").val() == "") {
                msgErro += "Favor informar o campo Ano!";
            }

        }
    }
    // 3-Financeiro, Credores
    if ($("#hndAcao").val() == 3) {
        //Validação para todas as telas do CP
        if ($("#cmbUnidadeCP").val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor informar o campo Entidade!";
        }

        if ($("#hndItem").val() == 11 || $("#hndItem").val() == 12 || $("#hndItem").val() == 13 || $("#hndItem").val() == 15 || $("#hndItem").val() == 16 || $("#hndItem").val() == 17)  //Receitas, Despesas Diarias e Empenhos a Pagar
        {
            if (msgErro == "" && $("#hndItem").val() != 15 && $("#hndItem").val() != 13 && $("#hndItem").val() != 16 && $("#hndItem").val() != 17) {
                msgErro += validaDataInicialFinal("txtDataInicial", "txtDataFinal", true);
            }

            if ($("#hndItem").val() == 16) { // Transferência Voluntária Concedida
                if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Período!";
                }
                if ($("#cmbUnidadeGestora").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Unidade Gestora!";
                }	
            }
			
            if ($("#hndItem").val() == 17) { // Transferência Voluntária Recebida
                if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Período!";
                } 
                if ($("#cmbUnidadeGestora").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Unidade Gestora!";
                }	
            }			

            if ($("#hndItem").val() == 13) //Empenhos a Pagar
            {
                if ($("#cmbUnidadeGestora").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    // msgErro += "Favor informar o campo Unidade Gestora!";
                }
            }

            if ($("#hndItem").val() == 11 || $("#hndItem").val() == 15) //Despesa Diaria
            {
                if (!$("#ckEmpenhoOrcamentario").is(":checked") &&
					!$("#ckEmpenhoExtra").is(":checked") &&
					!$("#ckEmpenhoResto").is(":checked")) {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor selecionar um Tipo de Empenho.";
                }
                if ($("#hndItem").val() == 15) {
                    if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Período!";
                    }
                    if ($("#cmbUnidadeGestora").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                }
                if ($("#txtCPFCNPJFornecedor").val() != "") {
                    var auxCPFCNPJ = $("#txtCPFCNPJFornecedor").val();
                    auxCPFCNPJ = replaceAll(auxCPFCNPJ, ".", "");
                    auxCPFCNPJ = replaceAll(auxCPFCNPJ, "-", "");
                    auxCPFCNPJ = replaceAll(auxCPFCNPJ, "/", "");
                    if (auxCPFCNPJ.length < 12) {
                        if (!validaCPF(auxCPFCNPJ)) {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "CPF inválido!";
                        }
                    }
                    else {
                        if (!validaCNPJ(auxCPFCNPJ)) {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "CNPJ inválido!";
                        }
                    }
                }
                //Validação de Diarias/passagens
                if ($("#hndItem").val() == 15) //Despesa Diaria
                {
                    if ($("#cmbDiariasPassagens").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o Tipo de Despesa!";
                    }
                }
            }			
        }
        else {
            if ($("#cmbReceitas").val() != "LANÇAMENTO DAS RECEITAS") {
                if ($("#cmbMesInicial").val() == "" || $("#cmbMesFinal").val() == "") {
                    if (msgErro != "") { msgErro += "\n\n"; }
                    msgErro += "Favor informar o campo Período!";
                }
            }
            //Financeiro | Itens:Ação, Categoria, Programa, Classificação institucional, Esfera, Fonte categoria e funcional
            if ($("#cmbReceitas").val() != "LANÇAMENTO DAS RECEITAS") {
                if ($("#hndItem").val() == 1 || $("#hndItem").val() == 2 || $("#hndItem").val() == 3 || $("#hndItem").val() == 4 || $("#hndItem").val() == 5 || $("#hndItem").val() == 6 || $("#hndItem").val() == 7 || $("#hndItem").val() == 8 || $("#hndItem").val() == 9 || $("#hndItem").val() == 10) {
                    if ($("#cmbUnidadeGestora").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                }
            }
        }
    }

    // Validação Tela de Publicações //

    if ($("#hndAcao").val() == 21) {

        if ($("#txtReferenciaAtePublicacoes").val() != "" && $("#txtReferenciaDePublicacoes").val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor preencher a data inícial!"
        }

        if ($("#cmbPeriodoPublicacao").val() != 0) {
            if ($("#cmbReferenciaDePublicacoes").val() == 0) {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Informe a referência!"
            }
        }
    }


    if ($("#hndAcao").val() == 4) {
        if ($("#hndItem").val() == 3) {
            if ($("#cmbVinculoGP").val() == "") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor selecionar o Tipo de Vínculo!"
            }
        }
        if ($("#cmbDataGP").val() == null || $("#cmbDataGP").val() == "") {
            if (msgErro != "") { msgErro += "\n\n"; }
            msgErro += "Favor selecionar a Data!"
        }

        if ($("#hndItem").val() == 1) {
            if ($("#ckTipoGestaoPessoas").val() == -1 && $("#ApresentarPorLotacaoCargos").css("display") != "none") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor selecionar a opção em: Apresentar Por!"
            }
        }
    }

    if ($("#hndAcao").val() == 1) //ADM
    {
        if (msgErro == "") {
            msgErro += validaDataInicialFinal("txtDataInicial", "txtDataFinal", false);
        }
        //Estoque = Item 5
        //Validar Ano de Vigencia
        if ($("#hndItem").val() != 5 && $("#hndItem").val() != 6 && $("#hndItem").val() != 7) {
            //entidade
            if ($("#cmbUnidadeLC").val() == "") {
                if (msgErro != "") { msgErro += "\n\n"; }
                msgErro += "Favor informar a Entidade!";
            }
            //contrato
            if ($("#hndItem").val() == 1) {
                if ($("#txtAnoContrato").val() == '') {
                    if ($("#hndDataVigenciaLC").val() == "") {
                        if ($("#cmbDataVigenciaLC").val() == "") {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "Favor informar o Ano de Vigência!";
                        }

                    }
                }
            }
            //Processo
            if ($("#hndItem").val() == 2) {
                if ($("#txtAnoProcesso").val() == '') {
                    if ($("#hndDataVigenciaLC").val() == "") {
                        if ($("#cmbDataVigenciaLC").val() == "") {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "Favor informar o Ano de Vigência!";
                        }

                    }
                }
            }
        }
        //Estoque = Item 5
        if ($("#hndItem").val() != 5 && $("#hndItem").val() != 6) {
            if ($("#cmbUnidadeGestoraLC").val() == "") {
                ($("#cmbUnidadeGestoraLC").val(-1))
            }
        }
        switch ($("#hndItem").val()) {
            case "1": //Contrato
                {
                    if (($("#txtValorContratoInicial").val() != "" && $("#txtValorContratoFinal").val() != "") &&
						($("#txtValorContratoInicial").val().replace(".", "") > $("#txtValorContratoFinal").val().replace(".", ""))) {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "O Valor do Contrato possui um intervalo inválido."
                    }
                    if ($("#txtAnoContrato").val() != "" || $("#txtNumeroContrato").val() != "") {
                        if ($("#txtAnoContrato").val() == "") {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "Favor preencher o Ano do contrato."
                        }
                        if ($("#txtNumeroContrato").val() == "") {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "Favor preencher o Número do contrato."
                        }
                    }

                    if (msgErro == "") {
                        //Tipo Contrato
                        var totalTipoContratoChecadas = 0;
                        $.each($(".TipoContrato input"), function () {
                            if ($(this).attr('checked')) {
                                totalTipoContratoChecadas++;
                            }
                        });
                        if (totalTipoContratoChecadas == 0) {
                            $.each($(".TipoContrato input"), function () {
                                $(this).attr('checked', true)
                            });
                        };
                        //Instrumento Contratual
                        var totalInstContratualChecadas = 0;
                        $.each($(".instrumentoContratual input"), function () {
                            if ($(this).attr('checked')) {
                                totalInstContratualChecadas++;
                            }
                        });
                        if (totalInstContratualChecadas == 0) {
                            $.each($(".instrumentoContratual input"), function () {
                                $(this).attr('checked', true)
                            });
                        };
                        //Contrato Com
                        var totalAditivosChecadas = 0;
                        if ($('#ckContrato').attr('checked')) {
                            $('.contratos').css('display', 'none');
                            $.each($(".contratosCom input"), function () {
                                if ($(this).attr('checked')) {
                                    totalAditivosChecadas++;
                                }
                            });
                            if (totalAditivosChecadas == 0) {
                                $.each($(".contratosCom input"), function () {
                                    $(this).attr('checked', true)
                                });
                            };
                        }
                    }
                } break;
            case "2": //Processos 
                {
                    if ($("#txtAnoProcesso").val() != "" || $("#txtNumeroProcesso").val() != "") {
                        if ($("#txtAnoProcesso").val() == "") {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "Favor preencher o Ano do Processo."
                        }
                        if ($("#txtNumeroProcesso").val() == "") {
                            if (msgErro != "") { msgErro += "\n\n"; }
                            msgErro += "Favor preencher o Número do Processo."
                        }
                    }

                    if (msgErro == "") {

                        function AlgumCheckSelecionado(classOrID) {

                            var resultado = false;

                            jQuery.each($(classOrID + " > input:checkbox"), function () {

                                if ($(this).is(':checked'))
                                    resultado = true;
                            });

                            return resultado;

                        }


                        //checked todas as finalidades caso não exista alguma selecionada
                        var totalModalidadesChecadas = 0;
                        $.each($(".modalidade input"), function () {
                            if ($(this).attr('checked')) {
                                totalModalidadesChecadas++;
                            }
                        });
                        if (totalModalidadesChecadas == 0) {
                            $.each($(".modalidade input"), function () {
                                $(this).attr("disabled", "");
                                $(this).attr('checked', true)
                            });
                        };
                        var totalFinalidadesChecadas = 0;
                        $.each($(".finalidade input"), function () {
                            if ($(this).attr('checked')) {
                                totalFinalidadesChecadas++;
                            }
                        });
                        if (totalFinalidadesChecadas == 0) {
                            $.each($(".finalidade input"), function () {
                                $(this).attr("disabled", "");
                                $(this).attr('checked', true)
                            });
                        };

                    }
                } break;


            case "3": //fornecedores
                {
                    if ($("#cmbEstado").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Estado!";
                    }
                    else {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        if ($("#cmbMunicipio").val() == "") {
                            msgErro += "Favor informar o campo Município!";
                        }
                    }

                } break;

            case "4": //Produtos
                {
                    if (msgErro == "") {
                        //Se todos TipoContrato estiverem desmarcados então marca todos
                        if (!$("#ckClassificacaoBensPatrimoniais").is(":checked") &&
						!$("#ckClassificacaoMaterialConsumo").is(":checked") &&
						!$("#ckClassificacaoObrasServicos").is(":checked")) {
                            $("#ckClassificacaoBensPatrimoniais").attr("checked", true);
                            $("#ckClassificacaoMaterialConsumo").attr("checked", true);
                            $("#ckClassificacaoObrasServicos").attr("checked", true);
                        }
                    }
                } break;

            case "5": //Estoque
                {

                    if ($("#cmbEstoqueUnidadeCM").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Entidade!";
                    }
                    if ($("#cmbEstoqueDataVigenciaLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Ano!";
                    }
                    if ($("#cmbEstoqueUnidadeGestoraLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                    //if ($('#cmbEstoqueMesInicial :selected').val() == 0) {
                    //	if (msgErro != "") { msgErro += "\n\n"; }
                    //	msgErro += "Favor informar o campo Mês Inicial do Movimento!";
                    //}
                    //if ($('#cmbEstoqueMesFinal :selected').val() == 0) {
                    //	if (msgErro != "") { msgErro += "\n\n"; }
                    //	msgErro += "Favor informar o campo Mês Final do Movimento!";
                    //}

                } break;
				
            case "6": //Patrimonio
                {
                    if ($("#cmbPatrimonioUnidadeCM").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Entidade!";
                    }
                    if ($("#cmbPatrimonioDataVigenciaLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Ano!";
                    }
                    if ($("#cmbPatrimonioUnidadeGestoraLC").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                } break;
				
			case "7": //Frotas
			    {
			        msgErro += ""
                    if ($("#cmbFrotasUnidadeAF").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Entidade!";
                    }                    
                    if ($("#cmbFrotasUnidadeGestora").val() == "") {
                        if (msgErro != "") { msgErro += "\n\n"; }
                        msgErro += "Favor informar o campo Unidade Gestora!";
                    }
                } break;					
        }
    }
    if (msgErro == "") {
        if ($("#hndAcao").val() == 10)
            return true;

        PostForm();
        exibirAguarde();
    }
    else {
        jAlert(msgErro, 'Atenção');
        return false;
    }
}

function exibirAguarde(param) {
    var exibir = true;

    if (param != undefined)
        exibir = param;

    var agd = document.getElementById("aguarde");
    if (agd) {
        if (exibir)
            agd.style.display = "block";
        else
            agd.style.display = "none";

        if (agd.getAttribute("primeiravez") == "1")
            return;

        window.scrollTo(0, 0);
        resize();
        agd.setAttribute("primeiravez", "1");
    }
}

function resize() {
    var agd = document.getElementById("aguarde");

    if (agd) {
        var htmlheight = document.body.scrollHeight || agd.parentElement.scrollHeight;
        var htmlwidth = document.body.scrollWidth || agd.parentElement.scrollWidth;
        agd.style.height = htmlheight + "px";
        agd.style.width = htmlwidth + "px";
    }
    mover('aguardeinterno');
}

function mover(idElemento) {
    var elemento = $("#" + idElemento);
    if (elemento) {
        $(elemento).css("top", ($(window).height() - $(elemento).height()) / 2 + $(window).scrollTop() + "px");
        $(elemento).css("left", ($(window).width() - $(elemento).width()) / 2 + $(window).scrollLeft() + "px");
    }
}

function NovaJanela(idElemento) {
    var elemento = $("#" + idElemento);
    var elemento2 = $("#topo");
    if (elemento) {
        var conteudohtml = $('<div>').append(elemento.clone()).html();
        conteudohtml = $('<div>').append(elemento2.clone()).html() + conteudohtml;
        var novaJanela = window.open("", "NovaJanela", "scrollbars,status,resizable");
        novaJanela.document.write("<html><head>"
				+ "<link href='style.css' rel='stylesheet' type='text/css'></head>"
				+ "<body onload='$(\"a\").contents().unwrap();$(\"#tbAtualizacao\").remove();$(\"#txtPaginacao\").show();$(\"#tbPageTop\").remove();$(\"#tbPageBottom\").remove();'>"
				+ "<script type='text/javascript' src='script.js'></script>"
				+ "<script type='text/javascript' src='jquery-1.4.2.min.js'></script>"
				+ "<script type='text/javascript'>"
				+ "function Imprimir() { window.print(); }"
				+ "</script>"
				+ "<form>"
				+ conteudohtml
				+ "<br /><input type='button' onclick='Imprimir();' value='Imprimir' />"
				+ "<input type='button' style='margin-left:10px;' onclick='window.close();' value='Fechar' />"
				+ "</form></body></html>");
        novaJanela.document.close();
    }
}

function alteraAno() {


    limparDados('cmbUnidadeCP');
    limparDados('cmbMesInicial');
    limparDados('cmbMesFinal');
    limparDados('txtDataInicial');
    limparDados('txtDataFinal');
    limparDados('cmbUnidadeGestora');
    limparDados('cmbCategoria');
    limparDados('cmbEstoqueUnidadeCM');


}

/*
 * Metodo responsável pela configuração das datas da opção
 * de menu Exportar Dados
 */
function ExibicaoPeriodoExportarDados(exercicio, data, meses) {
    alteraEntidade();
    if (exercicio.attr('selectedIndex') > 0 || exercicio.val() != '') {
        exibirEsconderControle(data, false)
        exibirEsconderControle(meses, true)
    }
    else {
        exibirEsconderControle(data, true)
        exibirEsconderControle(meses, false)
    }

}

function alteraEntidade() {
    limparDados('cmbMesInicial');
    limparDados('cmbMesFinal');
    //limparDados('txtDataInicial');
    //limparDados('txtDataFinal');
    limparDados('cmbUnidadeGestora');
}

function exibirEsconderControle(controle, exibir) {
    if (exibir)
        $(controle).show();
    else
        $(controle).hide();
}

function limparDadosFavoritos(objID) {
    var obj = $("#" + objID);
    if (obj) {
        obj.find("option").remove().end().append("<option value=''>Acesso Rápido</option>").val("''");
    }
}

function limparDados(objID) {
    var obj = $("#" + objID);
    if (obj) {
        if ($("#hndAcao").val() != 1) //ADM e ExpotarBD
        {
            if ($("#hndItem").val() == 1 || $("#hndItem").val() == 2 || $("#hndItem").val() == 3 || $("#hndItem").val() == 4 || $("#hndItem").val() == 5 || $("#hndItem").val() == 6 || $("#hndItem").val() == 7 || $("#hndItem").val() == 8 || $("#hndItem").val() == 9 || $("#hndItem").val() == 10 || $("#hndItem").val() == 11 || $("#hndItem").val() == 12 || $("#hndItem").val() == 13 || $("#hndItem").val() == 14 || $("#hndItem").val() == 15 || $("#hndItem").val() == 16 || $("#hndItem").val() == 17)  //Licitacoes
            {
                if (obj.is("input")) {
                    obj.val("");
                }
                else {
                    obj.find("option").remove().end().append("<option value=''>SELECIONE</option>").val("''");
                }
            }
        }
    }
}


function consultarMes(maiorqueID, mesID, anoID, fato1, fato2) {
    consultarDados("Mes", mesID, anoID, maiorqueID, fato1, fato2);
}

function AtualizaMesFinal(mesInicial, mesFinal) {

    var valorSelecionado = $("#" + mesInicial + " option:selected").val();

    if (valorSelecionado != "") {
        LimpaCombo(mesFinal)
        adicionarItem(mesFinal, "", "SELECIONE");
        $("select#" + mesInicial).find('option').each(function () {
            if ($(this).val() != "" && parseInt($(this).val()) >= parseInt(valorSelecionado))
                adicionarItem(mesFinal, $(this).val(), $(this).text());
        });
    }
    else {
        LimpaCombo(mesFinal)
        adicionarItem(mesFinal, "", "SELECIONE");
    }
}

function adicionarItem(select, val, tex) {
    $("#" + select).append("<option value='" + val + "'>" + tex + "</option>");
}

function LimpaCombo(select) {
    $("#" + select + " > option").remove();

}

/* Publicações Inicio */
function preencheComboTema() {

    var destino = $("#cmbTemaPublicacoes");
    if ((destino) && (destino.is(":visible"))) {
        limparDados("cmbTemaPublicacoes");
        destino.css("background-color", "#cecece");

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=PreencheTema",
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("cmbTemaPublicacoes");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}

function preencheComboEntidadePublicacoes() {

    var destino = $("#cmbEntidadePublicacoes");
    var destino2 = $("#cmbPeriodoPublicacao");
    if ((destino) && (destino.is(":visible"))) {
        limparDados("cmbEntidadePublicacoes");
        limparDados("cmbPeriodoPublicacao");
        destino.css("background-color", "#cecece");

        if ($("#cmbAnoCargasPublicacoes").select().val() != "") {
            var comboMesesPublicacao = document.getElementById("cmbPeriodoPublicacao");

            for (x = 0; x < 6; x++) {
                var opt = document.createElement("option");
                opt.value = x;
                if (x == 0) {
                    opt.text = "Livre";
                } else if (x == 1) {
                    opt.text = "Semestre";
                } else if (x == 2) {
                    opt.text = "Quadrimestre";
                } else if (x == 3) {
                    opt.text = "Trimestre";
                } else if (x == 4) {
                    opt.text = "Bimestre";
                } else if (x == 5) {
                    opt.text = "Mês";
                }

                comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
            }

            destino2.attr("disabled", false);

        } else {
            destino2.attr("disabled", true);
            limparDados("cmbPeriodoPublicacao");
            limparDados("cmbUnidadeGestoraPublicacoes");
            $("#cmbRef").css("display", "none");
            $("#txtRef").css("display", "block");
        }

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=BuscaEntidadesPublicacoes&param1=" + $("#cmbAnoCargasPublicacoes").select().val() + "&param2=" + $("#cmbTemaPublicacoes").select().val(),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("cmbEntidadePublicacoes");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}

function preencheComboUnidadeGestoraPublicacoes() {

    var destino = $("#cmbUnidadeGestoraPublicacoes");
    if ((destino) && (destino.is(":visible"))) {
        limparDados("cmbUnidadeGestoraPublicacoes");
        destino.css("background-color", "#cecece");

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=BuscaUnidadesGestorasPublicacoes&param1=" + $("#cmbEntidadePublicacoes").select().val() + "&param2=" + $("#cmbAnoCargasPublicacoes").select().val(),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("cmbUnidadeGestoraPublicacoes");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}

function alteraComboReferenciaPublicacoes() {

    var destino = $("#cmbPeriodoPublicacao");
    var destino2 = $("#cmbReferenciaDePublicacoes");

    limparDados("cmbReferenciaDePublicacoes");
    destino.css("background-color", "#cecece");

    //$("#mensagemReferencia").css("display", "none");

    if ($("#cmbPeriodoPublicacao").select().val() != 0) { // Se for diferente de Livre
        $("#txtRef").css("display", "none");
        $("#cmbRef").css("display", "block");

    } else {
        $("#cmbRef").css("display", "none");
        $("#txtRef").css("display", "block");
    }

    if ($("#cmbPeriodoPublicacao").select().val() == 1) {// Semestre

        LimpaCombo("cmbReferenciaDePublicacoes");

        $("#cmbReferenciaAtePublicacoes").css("display", "none");
        $("#mensagemAteCombo").css("display", "none");
        //$("#mensagemReferencia").css("display", "block");
        //$("#mensagemReferencia").removeAttr("display");

        var comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");

        var opt0 = document.createElement("option");
        opt0.value = "0";
        opt0.text = "SELECIONE";
        comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

        for (x = 1; x < 3; x++) {
            var opt = document.createElement("option");
            opt.value = x;
            if (x == 1) {
                opt.text = "Primeiro";
            } else if (x == 2) {
                opt.text = "Segundo";
            }
            comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
        }

    } else if ($("#cmbPeriodoPublicacao").select().val() == 2) {// Quadrimestre

        LimpaCombo("cmbReferenciaDePublicacoes");
        $("#cmbReferenciaAtePublicacoes").css("display", "none");
        $("#mensagemAteCombo").css("display", "none");
        //$("#mensagemReferencia").css("display", "block");
        //$("#mensagemReferencia").removeAttr("display");

        var comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");

        var opt0 = document.createElement("option");
        opt0.value = "0";
        opt0.text = "SELECIONE";
        comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

        for (x = 1; x < 4; x++) {
            var opt = document.createElement("option");
            opt.value = x;
            if (x == 1) {
                opt.text = "Primeiro";
            } else if (x == 2) {
                opt.text = "Segundo";
            } else if (x == 3) {
                opt.text = "Terceiro";
            }

            comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
        }

    } else if ($("#cmbPeriodoPublicacao").select().val() == 3) {// Trimestre

        LimpaCombo("cmbReferenciaDePublicacoes");
        $("#cmbReferenciaAtePublicacoes").css("display", "none");
        $("#mensagemAteCombo").css("display", "none");
        //$("#mensagemReferencia").css("display", "block");
        //$("#mensagemReferencia").removeAttr("display");

        var comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");

        var opt0 = document.createElement("option");
        opt0.value = "0";
        opt0.text = "SELECIONE";
        comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

        for (x = 1; x < 5; x++) {
            var opt = document.createElement("option");
            opt.value = x;
            if (x == 1) {
                opt.text = "Primeiro";
            } else if (x == 2) {
                opt.text = "Segundo";
            } else if (x == 3) {
                opt.text = "Terceiro";
            } else if (x == 4) {
                opt.text = "Quarto";
            }

            comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
        }

    } else if ($("#cmbPeriodoPublicacao").select().val() == 4) {// Bimestre

        LimpaCombo("cmbReferenciaDePublicacoes");
        $("#cmbReferenciaAtePublicacoes").css("display", "none");
        $("#mensagemAteCombo").css("display", "none");
        // $("#mensagemReferencia").css("display", "block");
        // $("#mensagemReferencia").removeAttr("display");

        var comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");

        var opt0 = document.createElement("option");
        opt0.value = "0";
        opt0.text = "SELECIONE";
        comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

        for (x = 1; x < 7; x++) {
            var opt = document.createElement("option");
            opt.value = x;
            if (x == 1) {
                opt.text = "Primeiro";
            } else if (x == 2) {
                opt.text = "Segundo";
            } else if (x == 3) {
                opt.text = "Terceiro";
            } else if (x == 4) {
                opt.text = "Quarto";
            } else if (x == 5) {
                opt.text = "Quinto";
            } else if (x == 6) {
                opt.text = "Sexto";
            }

            comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
        }

    } else if ($("#cmbPeriodoPublicacao").select().val() == 5) {// Mês

        LimpaCombo("cmbReferenciaDePublicacoes");
        LimpaCombo("cmbReferenciaAtePublicacoes");

        $("#cmbReferenciaAtePublicacoes").css("display", "block");
        $("#mensagemAteCombo").css("display", "block");

        $("#cmbReferenciaAtePublicacoes").removeAttr("style");
        $("#mensagemAteCombo").removeAttr("style");

        var comboMesesPublicacao;

        for (xx = 0; xx < 2; xx++) {

            if (xx == 0) {
                comboMesesPublicacao = document.getElementById("cmbReferenciaDePublicacoes");
            } else {
                comboMesesPublicacao = document.getElementById("cmbReferenciaAtePublicacoes");
            }

            var opt0 = document.createElement("option");
            opt0.value = "0";
            opt0.text = "SELECIONE";
            comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

            for (x = 1; x < 13; x++) {
                var opt = document.createElement("option");
                opt.value = x;
                if (x == 1) {
                    opt.text = "Janeiro";
                } else if (x == 2) {
                    opt.text = "Fevereiro";
                } else if (x == 3) {
                    opt.text = "Março";
                } else if (x == 4) {
                    opt.text = "Abril";
                } else if (x == 5) {
                    opt.text = "Maio";
                } else if (x == 6) {
                    opt.text = "Junho";
                } else if (x == 7) {
                    opt.text = "Julho";
                } else if (x == 8) {
                    opt.text = "Agosto";
                } else if (x == 9) {
                    opt.text = "Setembro";
                } else if (x == 10) {
                    opt.text = "Outubro";
                } else if (x == 11) {
                    opt.text = "Novembro";
                } else if (x == 12) {
                    opt.text = "Dezembro";
                }

                comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
            };
        };

    } else {
        limparDados("cmbReferenciaDePublicacoes");
    }
}

function preencheComboReferenciaAtePublicacoes() {

    var valorCombo = $("#cmbReferenciaDePublicacoes").select().val();

    LimpaCombo("cmbReferenciaAtePublicacoes");

    var comboMesesPublicacao = document.getElementById("cmbReferenciaAtePublicacoes");

    var opt0 = document.createElement("option");
    opt0.value = "0";
    opt0.text = "SELECIONE";
    comboMesesPublicacao.add(opt0, comboMesesPublicacao.options[0]);

    for (x = valorCombo; x < 13; x++) {
        var opt = document.createElement("option");
        opt.value = x;
        if (x == 1) {
            opt.text = "Janeiro";
        } else if (x == 2) {
            opt.text = "Fevereiro";
        } else if (x == 3) {
            opt.text = "Março";
        } else if (x == 4) {
            opt.text = "Abril";
        } else if (x == 5) {
            opt.text = "Maio";
        } else if (x == 6) {
            opt.text = "Junho";
        } else if (x == 7) {
            opt.text = "Julho";
        } else if (x == 8) {
            opt.text = "Agosto";
        } else if (x == 9) {
            opt.text = "Setembro";
        } else if (x == 10) {
            opt.text = "Outubro";
        } else if (x == 11) {
            opt.text = "Novembro";
        } else if (x == 12) {
            opt.text = "Dezembro";
        }

        comboMesesPublicacao.add(opt, comboMesesPublicacao.options[x]);
    };
}

/* Publicações Fim */


function consultarMesGeral(parametros) {
    var dados = parametros.split('#');

    var destino = $("#cmbMesInicial");
    if ((destino) && (destino.is(":visible"))) {
        var params = "";
        if ($("#hndAcao").val() == 10 && $("#hndItem").val() == 3) //ADM
        {
            dados[5] = $("#cmbUnidadeCP option:selected").val().split('|')[1];
        }
        var obj = $("#" + dados[0] + " option:selected").text();
        if (obj != "")
            params += "&param1=" + obj;
        else
            limparDados("cmbMesInicial");

        params += "&param2=''";

        params += "&param3=" + dados[2];
        params += "&param4=" + dados[3];
        params += "&param5=" + dados[4];
        params += "&param6=" + (dados[5] == '' ? $("#" + dados[0] + " option:selected").val() : dados[5]);
        destino.css("background-color", "#cecece");

        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=MesGeral" + replaceAll(params, "/", "|"),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados("cmbMesInicial");
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}

function consultarMesTransferencia(parametros) {
    var dados = parametros.split('#');

    var destino = $("#cmbMesInicial");

    var params = "";
    //var obj = $("#cmbAno option:selected").text();
    var obj = $("#" + dados[0] + " option:selected").text();
    params += "&param1=" + obj;

    //var obj = $('#cmbUnidadeCP option:selected').val();
    var obj = $("#" + dados[1] + " option:selected").val();
    params += "&param2=" + obj;


    destino.css("background-color", "#cecece");
    destino.attr("disabled", true);
    $.ajax({
        type: "GET",
        global: false,
        url: "acao.asp",
        data: "acao=MesTransferencia" + replaceAll(params, "/", "|"),
        dataType: "json",
        async: false,
        cache: false,
        success: function (jdados) {
            limparDados("cmbMesInicial");
            if (jdados) {
                if (jdados.Dados.length > 0) {
                    destino.removeAttr("disabled");
                    for (x = 0; x < jdados.Dados.length; x++) {
                        var dado = jdados.Dados[x];
                        var optn = document.createElement("OPTION");
                        optn.text = dado.text;
                        optn.value = dado.id;
                        destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                    };
                }
            }
            destino.css("background-color", "#ffffff");
            destino.attr("disabled", false);
        },
        error: function (jerro) {
            alert(jerro.responseText);
            destino.css("background-color", "#ffffff");
        }
    });
}

function consultarAnosCargaLC(prFuncao, prDestino, prParam1) {

    var destino = $("#" + prDestino);
    var params = "";

    if (destino && $("#" + prParam1).val() != "") {

        // validação campo #1
        if ($("#" + prParam1) && $("#" + prParam1).val() != "") {
            params += "&param1=" + $("#" + prParam1).val();
        }
        // chamada ajax
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                destino.css("background-color", "#ffffff");
            },
            error: function (jerro) {
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}

function consultarDadosComboLC(prFuncao, prDestino, prParam1, prParam2) {
    var destino = $("#" + prDestino);
    var params = "";

    limparDados(prDestino);
    //limparDados("cmbUnidadeGestoraLC");

    destino.find('option')
				 .remove()
				 .end()
				 .append('<option value="">SELECIONE</option>')
				 .val('');

    destino.trigger("change");

    if (destino && $("#" + prParam1).val() != "" && $("#" + prParam2).val() != "") {

        // validação campo #1
        if ($("#" + prParam1) && $("#" + prParam1).val() != "") {
            params += "&param1=" + $("#" + prParam1).val();
        }

        // validação campo #2
        if ($("#" + prParam2).val() != "") {

            if ($("#" + prParam2) && $("#" + prParam2).val() != "") {
                params += "&param2=" + $("#" + prParam2).val();
            }
        }

        // chamada ajax
        postDataAjaxLc(destino, prFuncao, params);

    }
}


function consultarDadosLC(prOrigem, prDestino) {
    var destino = $("#" + prDestino);

    if ($("#" + prOrigem).val() != "" || $("#" + prOrigem).val() == "") {
        //LimpaCombo(destino);
        destino.find('option')
					 .remove()
					 .end()
					 .append('<option value="">SELECIONE</option>')
					 .val('');
    }
    destino.trigger("change");
}
function postDataAjaxLc(destino, prFuncao, params) {
    $.ajax({
        type: "POST",
        url: "acao.asp?acao=" + prFuncao + replaceAll(params, "/", "|"),
        data: "",
        async: false,
        cache: false,

        success: function (d) {

            if (d && d.length > 0) {

                var dados = d.split("|");


                for (x = 0; x < dados.length; x++) {
                    var dado = dados[x];

                    var dadosID = dado.split("#")

                    if (dado != "") {
                        destino.append("<option value='" + dadosID[1] + "'>" + dadosID[0] + "</option>").val("'" + dadosID[1] + "'");
                    }

                    destino.removeAttr("disabled");
                };
            }

        },

        error: function (jerro) {
            destino.attr('disabled', true);
            alert(jerro.responseText);
        }
    });
}

function consultarDadosEXportaBDCP(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5, prParam6) {

    var params = "";
    var obj = $("#" + prParam5);

    var pr6 = "";
    if ($("#hndAcao").val() == 10 || $("#hndItem").val() == 3) //ADM
    {
        pr6 = "cmbUnidadeCP";
    } else {
        pr6 = $("#" + prParam6 + " option:selected").text() + '|' + $("#" + prParam6 + " option:selected").val().split('|')[1];
    }

    if (obj && obj.val() != "") {
        consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, pr6);
    } else {
        consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, "");
    }
}

function consultarDadosCP(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5) {

    var params = "";
    var obj = $("#" + prParam5);

    if (obj && obj.val() != "") {
        consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5);
    } else {
        consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, "");
    }
}

function changeTipoEsportaDados() {
    var dscAjuda = "Todas as informações referente a parte de administração.";
    var valTipoEsporta = $('#cmbTipoEsportacaoDados').find('option:selected').val();


    $('#txtDataInicial').parent('td').parent('tr').show();
    $('#txtDataFinal').parent('td').parent('tr').show();

    $('#txtDataInicial').val("");
    $('#txtDataFinal').val("");

    $('#cmbMesInicial').parent('td').parent('tr').hide();
    $('#cmbMesFinal').parent('td').parent('tr').hide();
    $('#cmbMesInicial option[value=""]').attr('selected', 'selected');
    $('#cmbMesFinal option[value=""]').attr('selected', 'selected');
    $('#cmbExercicio option[value=""]').attr('selected', 'selected');


    switch (valTipoEsporta) {
        case "2"://LC
            dscAjuda = "Informações de Licitações, Contratos, Produtos e Fornecedores";
            $("#cmbExercicio").parent('td').parent('tr').show();
            $("#cmbUnidadeLC")[0].setAttribute("onchange", "consultarDadosLC('cmbUnidadeLC', 'cmbExercicio'); consultarAnosCargaLC('ConsultarDataLC', 'cmbExercicio', 'cmbUnidadeLC')");
            $("#cmbExercicio")[0].setAttribute("onchange", "consultarDadosLC('cmbExercicio', 'cmbUnidadeGestoraLC');consultarDadosComboLC('ConsultarUnidadeGestoraLC', 'cmbUnidadeGestoraLC', 'cmbExercicio', 'cmbUnidadeLC'); ExibicaoPeriodoExportarDados($('#cmbExercicio'),$('#txtDataInicial').parent('td').parent('tr'), $('#cmbMesInicial').parent('td').parent('tr')),consultarMesGeral('cmbExercicio##LC_Dim_Tempo#LC_Fato_ContratoProcessos#dt_Homologacao#' + $('#cmbUnidadeLC option:selected').val());");
            break;
        case "6": //CM
            dscAjuda = "Informações de Itens de Estoque";
            $("#cmbExercicio").parent('td').parent('tr').show();
            //Este Deve ser alterado
            $("#cmbUnidadeLC")[0].setAttribute("onchange", "consultarDadosLC('cmbUnidadeLC', 'cmbExercicio'); consultarAnosCargaLC('ConsultarDataCM', 'cmbExercicio','cmbUnidadeLC'); consultarDados('RetornaUnidadeGestoraCM', 'cmbUnidadeGestoraLC', 'cmbUnidadeLC'); consultarDados('RetornaUnidadeGestoraCM', 'cmbEstoqueUnidadeGestoraLC', 'cmbEstoqueUnidadeCM');");
            $("#cmbExercicio")[0].setAttribute("onchange", "");
            $('#cmbExercicio').change(function () {
                if (this.value > 0) {

                    $('#cmbMesInicial').parent('td').parent('tr').show();
                    $('#cmbMesFinal').parent('td').parent('tr').show();
                    $('#txtDataInicial').parent('td').parent('tr').hide();
                    $('#txtDataFinal').parent('td').parent('tr').hide();


                    LimpaCombo("cmbMesInicial");
                    LimpaCombo("cmbMesFinal");

                    $("#cmbMesInicial").css("display", "block");
                    //$("#mensagemAteCombo").css("display", "block");

                    $("#cmbMesInicial").removeAttr("style");
                    //$("#mensagemAteCombo").removeAttr("style");

                    var comboMesesEstoque;

                    for (xx = 0; xx < 2; xx++) {

                        if (xx == 0) {
                            comboMesesEstoque = document.getElementById("cmbMesInicial");
                        } else {
                            comboMesesEstoque = document.getElementById("cmbMesFinal");
                        }

                        var opt0 = document.createElement("option");
                        opt0.value = "0";
                        opt0.text = "SELECIONE";
                        comboMesesEstoque.add(opt0, comboMesesEstoque.options[0]);

                        for (x = 1; x < 13; x++) {
                            var opt = document.createElement("option");
                            opt.value = x;
                            if (x == 1) {
                                opt.text = "JANEIRO";
                            } else if (x == 2) {
                                opt.text = "FEVEREIRO";
                            } else if (x == 3) {
                                opt.text = "MARÇO";
                            } else if (x == 4) {
                                opt.text = "ABRIL";
                            } else if (x == 5) {
                                opt.text = "MAIO";
                            } else if (x == 6) {
                                opt.text = "JUNHO";
                            } else if (x == 7) {
                                opt.text = "JULHO";
                            } else if (x == 8) {
                                opt.text = "AGOSTO";
                            } else if (x == 9) {
                                opt.text = "SETEMBRO";
                            } else if (x == 10) {
                                opt.text = "OUTUBRO";
                            } else if (x == 11) {
                                opt.text = "NOVEMBRO";
                            } else if (x == 12) {
                                opt.text = "DEZEMBRO";
                            }
                            comboMesesEstoque.add(opt, comboMesesEstoque.options[x]);
                        };
                    };

                } else {
                    limparDados("cmbMesInicial");
                }
            }).change();

            break;
        case "7": //PP
            dscAjuda = "Informações de Itens Patrimoniais";
            $("#cmbExercicio").parent('td').parent('tr').hide();
            $("#cmbUnidadeLC")[0].setAttribute("onchange", "consultarDadosLC('cmbUnidadeLC', 'cmbUnidadeGestoraLC'); consultarDados('RetornaUnidadeGestoraPP', 'cmbUnidadeGestoraLC', 'cmbUnidadeLC')");;
            break;
		case "8": //AF
            dscAjuda = "Informações da Frota Municipal";
            $("#cmbExercicio").parent('td').parent('tr').hide();
            $("#cmbUnidadeLC")[0].setAttribute("onchange", "consultarDadosLC('cmbUnidadeLC', 'cmbUnidadeGestoraLC'); consultarDados('RetornaUnidadeGestoraAF', 'cmbUnidadeGestoraLC', 'cmbUnidadeLC')");;
            break;
			
    }
    consultarDadosLC('cmbTipoEsportacaoDados', 'cmbUnidadeLC');
    consultarAnosCargaLC('RetornaTodosDatabases', 'cmbUnidadeLC', 'cmbTipoEsportacaoDados');
    $('#dscTipo').text(dscAjuda);
}



function consultarDados(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5) {
    var destino = $("#" + prDestino);

    if ((destino) && (destino.is(":visible"))) {

        var params = "";
        var obj = $("#" + prParam1);
        if (obj && obj.val() != "") {
            params += "&param1=" + obj.val();
        }
        else {
            limparDados(prDestino);
        }

        if (prParam2 != "") {
            obj = $("#" + prParam2);
            if (obj) {
                params += "&param2=" + obj.val();
            }
        }

        if (prParam3 != "") {
            obj = $("#" + prParam3);
            if (obj) {
                if (obj.val()) {
                    params += "&param3=" + obj.val();
                }
                else {
                    params += "&param3=" + prParam3;
                }
            }
        }
        if (prParam4 != "") {
            obj = $("#" + prParam4);
            if (obj) {
                if (obj.val()) {
                    params += "&param4=" + obj.val();
                }
                else {
                    params += "&param4=" + prParam4;
                }
            }
        }
        if (prParam5 != "") {
            obj = $("#" + prParam5);
            if (obj) {
                if (obj.val()) {
                    params += "&param5=" + obj.val();
                }
                else {
                    params += "&param5=" + prParam5;
                }
            }
        }
        destino.css("background-color", "#cecece");
        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados(prDestino);
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                //else {
                //    destino.attr("disabled", true);
                //}
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                //var w = window.open("", "Erro", "scrollbars,status,resizable")
                //w.document.write(jerro.responseText);
                //w.document.close();
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }
}

function consultarDadosCondicao(prFuncao, prDestino, prParam1, prParam2, prParam3, prParam4, prParam5, prParam6) {

    var destino = $("#" + prDestino);
    if ((destino) && (destino.is(":visible"))) {
        var params = "";
        var obj = $("#" + prParam1);
        if (obj && obj.val() != "") {
            params += "&param1=" + obj.val();
        }
        else {
            limparDados(prDestino);
        }

        if (prParam2 != "") {
            obj = $("#" + prParam2);
            if (obj) {
                if (obj.val()) {
                    params += "&param2=" + obj.val();
                }
            }
        }

        if (prParam3 != "") {
            obj = $("#" + prParam3);
            if (obj) {
                if (obj.val()) {
                    params += "&param3=" + obj.val();
                }
                else {
                    params += "&param3=" + prParam3;
                }

            }
        }

        if (prParam4 != "") {
            obj = $("#" + prParam4);
            if (obj) {
                if (obj.val()) {
                    params += "&param4=" + obj.val();
                }
                else {
                    params += "&param4=" + prParam4;
                }

            }
        }

        if (prParam5 != "") {
            obj = $("#" + prParam5);
            if (obj) {
                if (obj.val()) {
                    params += "&param5=" + obj.val();
                }
                else {
                    params += "&param5=" + prParam5;
                }
            }

        }

        if (prParam6 != "") {
            params += "&param6=" + prParam6;
        }


        destino.css("background-color", "#cecece");
        destino.attr("disabled", true);
        $.ajax({
            type: "GET",
            global: false,
            url: "acao.asp",
            data: "acao=" + prFuncao + replaceAll(params, "/", "|"),
            dataType: "json",
            async: false,
            cache: false,
            success: function (jdados) {
                limparDados(prDestino);
                if (jdados) {
                    if (jdados.Dados.length > 0) {
                        destino.removeAttr("disabled");
                        for (x = 0; x < jdados.Dados.length; x++) {
                            var dado = jdados.Dados[x];
                            var optn = document.createElement("OPTION");
                            optn.text = dado.text;
                            optn.value = dado.id;
                            destino.find("option").end().append("<option value='" + dado.id + "'>" + dado.text + "</option>").val("'" + dado.id + "'");
                        };
                    }
                }
                //else {
                //    destino.attr("disabled", true);
                //}
                destino.css("background-color", "#ffffff");
                destino.attr("disabled", false);
            },
            error: function (jerro) {
                /*var w = window.open("", "Erro", "scrollbars,status,resizable")
				w.document.write(jerro.responseText);
				w.document.close();*/
                alert(jerro.responseText);
                destino.css("background-color", "#ffffff");
            }
        });
    }

}

function replaceAll(string, texto, novotexto) {
    while (string.indexOf(texto) != -1) {
        string = string.replace(texto, novotexto);
    }
    return string;
}

function atualizaFiltroPagina() {
    var aux = readCookie("ckAno");
    if (aux) {
        $("#cmbAno").val(aux);
        $("#cmbAno").change();

    }

    if ($("#cmbSitProcessoLicit").size() > 0) {
        licSituacaoFiltrarPor($("#cmbSitProcessoLicit"));
    }

    aux = readCookie("ckExercicio");
    if (aux) {
        $("#cmbExercicio").val(aux);
    }


    aux = readCookie("ckDataGP");
    if (aux) {
        $("#cmbDataGP").val(aux);
    }
    aux = readCookie("ckUnidadeCP");
    if (aux) {
        $("#cmbUnidadeCP").val(aux);
        $("#cmbUnidadeCP").change();
    }
    aux = readCookie("ckDataInicial");
    if (aux) {
        $("#txtDataInicial").val(aux);
    }
    aux = readCookie("ckDataFinal");
    if (aux) {
        $("#txtDataFinal").val(aux);
        $("#txtDataFinal").blur();
    }

    aux = readCookie("ckMesInicial");
    if (aux) {
        $("#cmbMesInicial").val(aux);
        $("#cmbMesInicial").change();
        aux = readCookie("ckMesFinal");
        if (aux) {
            $("#cmbMesFinal").val(aux);
            $("#cmbMesFinal").change();
        }
    }
    aux = readCookie("ckUnidadeGestora");
    if (aux) {
        $("#cmbUnidadeGestora").val(aux);
    }
    aux = readCookie("ckCategoria");
    if (aux) {
        $("#cmbCategoria").val(aux.split(','));
    }
    aux = readCookie("ckApresentarPor");
    if (aux) {
        $("#cmbApresentarPor").val(aux);
    }
    aux = readCookie("ckEmpenhoOrcamentario");
    if (aux) {
        $("#ckEmpenhoOrcamentario").val(aux);
    }
    aux = readCookie("ckEmpenhoExtra");
    if (aux) {
        $("#ckEmpenhoExtra").val(aux);
    }
    aux = readCookie("ckEmpenhoResto");
    if (aux) {
        $("#ckEmpenhoResto").val(aux);
    }
    aux = readCookie("ckEstado");
    if (aux) {
        $("#cmbEstado").val(aux);
        aux = readCookie("ckMunicipio");
        if (aux) {
            $("#cmbEstado").change();
            $("#cmbMunicipio").val(aux);
        }
    }
    aux = readCookie("ckDataFiltro");
    if (aux) {
        $("#cmbDataFiltro").val(aux);
    }
    //Filtro oculto
    if ($("#hndAcao").val() == 1) //ADM
    {
        if ($("#hndItem").val() == 2) //Licitacoes
        {
            Exibir('trTipoLicitacaoConcurso1', $('#ckTipoModalidadeConcurso').is(':checked'));
            Exibir('trTipoLicitacaoConcurso2', $('#ckTipoModalidadeConcurso').is(':checked'));
        }
    }
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function limparCookies() {
    eraseCookie("ckAno");
    eraseCookie("ckExercicio");
    eraseCookie("ckDataGP");
    eraseCookie("ckDataInicial");
    eraseCookie("ckDataFinal");
    eraseCookie("ckUnidadeCP");
    eraseCookie("ckMesInicial");
    eraseCookie("ckMesFinal");
    eraseCookie("ckUnidadeGestora");
    eraseCookie("ckCategoria");
    eraseCookie("ckApresentarPor");
    eraseCookie("ckEmpenhoOrcamentario");
    eraseCookie("ckEmpenhoExtra");
    eraseCookie("ckEmpenhoResto");
    eraseCookie("ckEstado");
    eraseCookie("ckMunicipio");
    eraseCookie("ckDataFiltro");
}

function MinMax(iconeID, tableID) {
    $("#" + tableID).find("tr").each(function (index) {
        if (index > 0) {
            var child = $(this);
            if (child.css("display") == "none") {
                child.show();
            }
            else {
                child.hide();
            }
        }
    });
    var icone = $("#" + iconeID);
    if (icone.attr("alt") == "Minimizar") {
        icone.attr("alt", "Maximizar");
        icone.attr("src", "max.png");
    }
    else {
        icone.attr("alt", "Minimizar");
        icone.attr("src", "min.png");
    }
}

function PreencheHidden(cmbID, hndID) {
    $("#" + hndID).val($("#" + cmbID + " option:selected").text());

    if ($("#" + cmbID).attr("type") == "select-multiple") {
        var str = "";
        $("#" + cmbID + " option:selected").each(function () {
            str += $(this).text() + ",<br>";
        });
        $("#" + hndID).val(str.slice(0, -5));
    }
}

function IncluirHistorico(linhaID) {
    var linha = $("#" + linhaID);
    var tabela = linha.parent().parent();
    var texto = ""
    var link = ""
    linha.children().each(function (index) {
        var child = $(this);
        if (child.attr("exibir")) {
            if (child.attr("exibir") != 0) {
                for (x = 0; x < parseInt(child.attr("exibir")) ; x++) {
                    texto += "|";
                }
            }
        }
        else {
            if (texto != "") { texto += "|"; }
            //Busca a legenda do table e só adiciono se não houver nenhum texto
            if (texto.replace("|", "") == "") {
                texto = tabela.attr("legenda") + texto;
            }
            texto += child.text();
        }
        if (index == 0) {
            link = child.find("a").attr("href");
        }
    });
    if (tabela.attr("novocab")) {
        if (tabela.attr("novocab") != "") {
            texto = tabela.attr("novocab") + texto;
        }
    }

    var spl
    spl = link.split(';');
    link = "";
    for (x = 0; x < spl.length; x++) {
        if (x > 0) {
            if (spl[x].substring(0, 14) == "location.href=") {
                link += spl[x].substring(15, spl[x].length - 1);
            }
        }
    }
    link = escape(link);
    $.ajax({
        type: "POST",
        url: "acao.asp?acao=IncluirHistorico&visao=" + $("#hndvisao").val() +
			 "&produto=" + $("#hndAcao").val() +
			 "&nivel=" + QueryString("nivel") +
			 "&link=" + link,
        data: texto,
        async: false,
        cache: false,
        error: function (jerro) {
            alert(jerro.responseText);
        }
    });
}

function ExcluirHistorico(linha) {
    $.ajax({
        type: "POST",
        url: "acao.asp?acao=ExcluirHistorico&visao=" + linha,
        data: "",
        async: false,
        cache: false,
        error: function (jerro) {
            alert(jerro.responseText);
        }
    });
}

function QueryString(variavel) {
    var result = ""
    var variaveis = location.search.replace(/\x3F/, "").replace(/\x2B/g, " ").split("&");
    var nvar;
    if (variaveis != "") {
        var qs = [];
        for (var i = 0; i < variaveis.length; i++) {
            nvar = variaveis[i].split("=");
            qs[nvar[0]] = unescape(nvar[1]);
        }
        if (qs[variavel]) { result = qs[variavel]; }
    }
    return result;
}

function SetNotCheckBox(idCheck, idTodos) {
    $("#" + idCheck).attr("checked", !$("#" + idCheck).is(":checked"));
    if (!$("#" + idCheck).is(":checked")) {
        $("#" + idTodos).attr("checked", false);
    }
}

function SetGroupCheckBox(elemHtml, checked) {
    jQuery.each($(elemHtml + " input:checkbox"), function () {

        var elem = $(this);

        if (checked) {
            if (elem.attr("disabled") == '') {
                $(this).attr("checked", true);
            }
        }
        else {
            $(this).attr("checked", false);
        }


    });
}

function SetTodosCheckBox(idCheck, idTodos, idAux1, idAux2, idAux3) {
    if (!$("#" + idCheck).is(":checked")) {
        $("#" + idTodos).attr("checked", false);
    }
    if (!$("#" + idCheck).is(":checked") && idAux1) {
        $("#" + idAux1).attr("checked", $("#" + idCheck).is(":checked"));
    }
    if (!$("#" + idCheck).is(":checked") && idAux2) {
        $("#" + idAux2).attr("checked", $("#" + idCheck).is(":checked"));
    }
    //    if (!$("#"+idCheck).is(":checked") && idAux3)
    //    {
    //        $("#"+idAux3).attr("checked", $("#"+idCheck).is(":checked"));
    //    }
}

function Exibir(idObj, exibir) {
    if (exibir) {
        $("#" + idObj).show();
    }
    else {
        $("#" + idObj).hide();
    }
}

function getLastDateOfMonth(Year, Month) {
    return (new Date((new Date(Year, Month, 1)) - 1));
}
function finalizaDownload() {
    exibirAguarde(false);
    document.getElementById("ifrmDownload").src = document.getElementById("ifrmDownload").contentWindow.document.getElementById("lnkDownload").href;
}
function createObjectURL(file) {
    if (window.webkitURL) {
        return window.webkitURL.createObjectURL(file);
    } else if (window.URL && window.URL.createObjectURL) {
        return window.URL.createObjectURL(file);
    } else if (URL.createObjectURL) {
        return URL.createObjectURL(file);
    } else {
        return createObjectURL(file);
    }
}

function downloadXML(itemMenu) {

    var dataInicial = "";
    var ano = "";
    var dataFinal = "";
    var unidadeGestora = "-1";
    var banco = "";
    var NomeFornecedor = "";
    var CPFCNPJFornecedor = "";
    var TipoDespesa = "";
    var tipoEsportacao = "";

    if (ValidaForm() == true) {

        if ($('#cmbExercicio option:selected').index() == 0) { // Por data    
            if ($('#txtDataInicial').val() != "" && $('#txtDataFinal').val() != "") {
                dataInicial = $('#txtDataInicial').val().substr(6, 4) + $('#txtDataInicial').val().substr(3, 2) + $('#txtDataInicial').val().substr(0, 2);
                dataFinal = $('#txtDataFinal').val().substr(6, 4) + $('#txtDataFinal').val().substr(3, 2) + $('#txtDataFinal').val().substr(0, 2);;
            }

        }
        else { // Por mes
            if (($('#cmbAno option:selected').val() == '') || ($('#cmbAno option:selected').index() == -1)) {
                dataInicial = $('#cmbExercicio option:selected').text() + ('0' + $('#cmbMesInicial option:selected').val()).slice(-2) + '01';
                dataFinal =
					$('#cmbExercicio option:selected').text() +
					('0' + $('#cmbMesFinal option:selected').val()).slice(-2) +
					('0' + getLastDateOfMonth($('#cmbExercicio option:selected').text(), $('#cmbMesFinal option:selected').val()).getDate()).slice(-2);
            }
            else {
                dataInicial = $('#cmbAno option:selected').text() + ('0' + $('#cmbMesInicial option:selected').val()).slice(-2) + '01';
                dataFinal =
					$('#cmbAno option:selected').text() +
					('0' + $('#cmbMesFinal option:selected').val()).slice(-2) +
					('0' + getLastDateOfMonth($('#cmbAno option:selected').text(), $('#cmbMesFinal option:selected').val()).getDate()).slice(-2);
            }
        }

        //Ano
        if (($('#cmbAno option:selected').val() == '') || ($('#cmbAno option:selected').index() == -1)) {
            ano = $('#cmbExercicio option:selected').text();
        }
        else {
            ano = $('#cmbAno option:selected').text();
        }

        //Unidade Gestora
        if ($('#cmbUnidadeGestora option:selected').val() != "")
            unidadeGestora = $('#cmbUnidadeGestora option:selected').val();

        //NomeFornecedor
        if ($('#txtNomeFornecedor').val() != "")
            NomeFornecedor = $('#txtNomeFornecedor').val();
        //CPFCNPJFornecedor
        if ($('#txtCPFCNPJFornecedor').val() != "")
            CPFCNPJFornecedor = $('#txtCPFCNPJFornecedor').val();
        //Unidade Gestora LC
        if ($('#cmbUnidadeGestoraLC option:selected').val() != "")
            unidadeGestora = $('#cmbUnidadeGestoraLC option:selected').val();

        if (banco == "" || banco == null) { banco = $('#cmbUnidadeLC').val() };
        if (banco == "" || banco == null) { banco = $('#cmbUnidadeCP').val().split('|')[1] };
        if (banco == "" || banco == null) { banco = $('#cmbUnidadeAR').val() };

        //  Prepara URL com parâmetros de consulta
        var strURL = "geraxml.asp"
				+ "?item=" + itemMenu
				+ "&banco=" + banco
				+ "&exercicio=" + ano
				+ "&dataInicial=" + dataInicial
				+ "&dataFinal=" + dataFinal
				+ "&unidadeGestora=" + unidadeGestora
				+ "&nmFornecedor=" + NomeFornecedor;

        if ($('#txtCPFCNPJFornecedor').val() != "") {
            CPFCNPJFornecedor = $('#txtCPFCNPJFornecedor').val();
            strURL = strURL + "&CPFCNPJFornecedor=" + CPFCNPJFornecedor;
        }
        if ($('#cmbDiariasPassagens').val() != "") {
            TipoDespesa = $('#cmbDiariasPassagens').val();
            strURL = strURL + "&TipoDespesa=" + TipoDespesa;
        }
        if ($('#cmbTipoTransferencia').val() != "") {
            TipoDespesa = $('#cmbTipoTransferencia').val();
            strURL = strURL + "&TipoDespesa=" + TipoDespesa;
        }
        if ($('#cmbTipoEsportacaoDados').find('option:selected').val() != "") {
            var tipoEsportacao = $('#cmbTipoEsportacaoDados').find('option:selected').val();
            strURL = strURL + "&TipoEsportacaoDados=" + tipoEsportacao;
        }


        var iframe = document.createElement("iframe");
        exibirAguarde();
        iframe.id = "ifrmDownload";
        iframe.style.display = "none";

        var htm = "<iframe id='ifrmDownload' src='" + strURL + "' onload='finalizaDownload();'></iframe>";
        document.getElementById('conteudo').innerHTML = htm;

        var ST_LOADING = 1
        var ST_LOADED = 4

        //Verifica erros
        var client = new XMLHttpRequest();
        client.open("GET", strURL, true);
        client.responseType = "blob";
        client.send();
        client.onreadystatechange = function () {
            if (this.readyState == ST_LOADED) {
                if (this.getResponseHeader("ERRO")) {
                    jAlert(this.getResponseHeader("ERRO"), "Atenção");
                    exibirAguarde(false);
                }
            }
        }
    }
}


function licSituacaoFiltrarPor(item) {
    var sel = $(item).find('option:selected').val();
    if (sel == "Aberta" || sel == "Deserta" || sel == "Frustrada") {
        $("#cmbDataFiltro").find("option[value=3]").remove();
    } else {
        if ($("#cmbDataFiltro").find("option[value=3]").size() == 0) {
            $("#cmbDataFiltro").append($("<option>").val(3).text("DATA DE HOMOLOGAÇÃO"));
        }
    }
}

/// Download utilizado para gerar arquivo xml para estrutura organizacional e perguntas frequentes
function downloadXMLNovo(itemMenu) {

    var dataInicial = "";
    var ano = "";
    var dataFinal = "";
    var unidadeGestora = "-1";
    var banco = "";
    var NomeFornecedor = "";
    var CPFCNPJFornecedor = "";
    var TipoDespesa = "";


    //  Prepara URL com parâmetros de consulta
    var strURL = "geraxml.asp"
			+ "?item=" + itemMenu

    var iframe = document.createElement("iframe");
    exibirAguarde();
    iframe.id = "ifrmDownload";
    iframe.style.display = "none";

    var htm = "<iframe id='ifrmDownload' src='" + strURL + "' onload='finalizaDownload();'></iframe>";
    document.getElementById('conteudo').innerHTML = htm;

    var ST_LOADING = 1
    var ST_LOADED = 4

    //Verifica erros
    var client = new XMLHttpRequest();
    client.open("GET", strURL, true);
    client.responseType = "blob";
    client.send();
    client.onreadystatechange = function () {
        if (this.readyState == ST_LOADED) {
            if (this.getResponseHeader("ERRO")) {
                jAlert(this.getResponseHeader("ERRO"), "Atenção");
                exibirAguarde(false);
            }
        }
    }
}


function URLoader_Timeout() {

    if ($('#ifrmDownload').contents().attr('readyState') == 'loading')
        setTimeout(URLoader_Timeout, 100);
    else {
        exibirAguarde(false);
        document.body.removeChild(document.getElementById("ifrmDownload"));
    }
}
function exportarXLS() {
    exportar(1);
}

function exportarPDF() {
    exportar(2);
}

function exportarCSV() {
    exportar(3);
}

function exportar(tipoArquivo) {

    // var pageCount = $("#tbPageTop").find("tr").find("a").length;
    // if (pageCount > 200) {
    //     alert("Não é possível realizar exportação com mais de 200 páginas de resultado. Por favor refine sua busca.");
    //     return;
    // }

    exibirAguarde();
    var url = "index.asp" + window.location.search + "&itensPorPagina=100000&tipoArquivo=" + tipoArquivo;
    url = url.replace("numpag", "undefined");
    if (window.location.search.indexOf("visao") == -1)
        url = url + "&visao=" + $("#hndvisao").val();

    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            var file = $(data).find("#file").html();
            window.open(file);
            exibirAguarde(false);
        },
        error: function (jerro) {
            console.log(jerro.responseText);
            exibirAguarde(false);
            alert("Erro ao gerar arquivo!");
        }
    });
}

function ExportToCsv(fileName, arquivo) {
    // var data = GetCellValues(arquivo);
    // var csv = ConvertToCsv(data);
    // EstruturaOrganizacional
    //alert("Procedimento disponível somente para IE, Chrome e Firefox!")

    //var download = function(content, fileName, mimeType) {
    //download(csvContent, 'dowload.csv', 'text/csv');

    var fileName = fileName + ".csv";
    var content = arquivo;
    var mimeType = 'text/csv';
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';

    if (navigator.msSaveBlob) { // IE10
        return navigator.msSaveBlob(new Blob([content], { type: mimeType }), fileName);
    } else if ('download' in a) { //html5 A[download]
        a.href = 'data:' + mimeType + ',' + encodeURIComponent(content);
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        setTimeout(function () {
            a.click();
            document.body.removeChild(a);
        }, 66);
        return true;
    } else { //do iframe dataURL download (old ch+FF):

        alert("Procedimento disponível somente para IE, Chrome, Firefox e Opera!")

    }

};
function validaCkTipoDespesa() {
    var totalNaoChecadas = 0;
    var totalChecadas = 0;
    $.each($(".tipoDespesa"), function () {
        if (!$(this).attr('checked')) {
            totalNaoChecadas++;
        } else {
            totalChecadas++;
        }
    });
    if (totalChecadas == 0) {
        $('.tipoDespesaTodas').attr('checked', "checked");
        $('.tipoDespesa').attr('checked', 'checked');
    }

}
function retornaFiltroDespesas() {
    var destino = $("#gridHistMovFrotas tbody");
    var nrMoviemtos;
    var params = "";
    var url_parms = URLParameters();

    params += "&param1=" + url_parms.id_Veiculo

    if ($("#quantEspecf").val() != "") {
        params += "&param2=" + $("#quantEspecf").val();
    } else {
        if ($("input[name='nrMovimentos']:checked").val() == undefined) {
            alert('Informe uma quantidade de movimentos!');
            return;
        }
        params += "&param2=" + $("input[name='nrMovimentos']:checked").val()
    }    // quantidade especifica
    if ($("#txtFrotasDespesasIni") && $("#txtFrotasDespesasIni").val() != "") {
        params += "&param3=" + $("#txtFrotasDespesasIni").val().replaceAll("/", "");
    }   //
    if ($("#txtFrotasDespesasFim") && $("#txtFrotasDespesasFim").val() != "") {
        params += "&param4=" + $("#txtFrotasDespesasFim").val().replaceAll("/", "");
    }   //

    validaCkTipoDespesa();

    if ($("#ckAbastecimento").is(":checked"))
        params += "&param5=" + $("#ckAbastecimento").val();
    //
    if ($("#ckOutrasManutencoes").is(":checked"))
        params += "&param6=" + $("#ckOutrasManutencoes").val();
    //
    if ($("#ckImpostos").is(":checked"))
        params += "&param7=" + $("#ckImpostos").val();
    //
    if ($("#ckTodasDespesasFrotas").is(":checked"))
        params += "&param8=" + $("#ckTodasDespesasFrotas").val();

    params += "&param9=" + $("input[name='ordenacao']:checked").val();
    //
    //console.log(params)
    $.ajax({
        type: "GET",
        url: "acao.asp?acao=RetornaMontaFrotasItens" + replaceAll(params, "/", "|"),
        dataType: "json",
        success: function (jdados) {
            $('.histMovi').remove();
            var htm = "";
            if (jdados.Dados.length > 0) {

                htm = "";
                for (x = 0; x < jdados.Dados.length; x++) {
                    var dado = jdados.Dados[x];
                    htm += "<tr class='histMovi'>";
                    htm += "<td style='white-space: nowrap;' align='center'>" + dado.dtEvento + "</td>";
                    htm += "<td style='white-space: nowrap;' align='left'>" + dado.dsEvento + "</td>";
                    htm += "<td style='white-space: nowrap;' align='right'>" + dado.qtLancamento + "</td>";
                    htm += "<td style='white-space: nowrap;' align='center'>" + dado.vlLancamento + "</td>";
                    htm += "<td style='white-space: nowrap;' align='center'>" + dado.vlTotalDespesa + "</td>";
                    htm += "</tr>";
                };
            } else {
                htm += "<tr class='histMovi'>";
                htm += "<td colspan='5' style='white-space: nowrap;' align='center'>Não existe movimentos nesse período.</td>";
                htm += "</tr>";
            }
            $('#gridHistMovFrotas').append(htm);
        },
        error: function (jerro) {
            var htm = "";
            htm += "<tr class='histMovi'>";
            htm += "<td colspan='5' style='white-space: nowrap;' align='center'>Erro ao retornar movimentos para o período.</td>";
            htm += "</tr>";
            $('#gridHistMovFrotas').append(htm);
        }
    });
}
function URLParameters() {
    var result = {};

    var params = window.location.search.split(/\?|\&/);

    params.forEach(function (it) {
        if (it) {
            var param = it.split("=");
            result[param[0]] = param[1];
        }
    });

    return result;
}