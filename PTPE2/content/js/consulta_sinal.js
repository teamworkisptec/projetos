var globalvar;
window.onload = function () {
	
	var array = new Array();
	$.ajax({
        url: "http://localhost/PTPE2/content/js/sinalizacao.json",
		type: "get",
		dataType: "json",
        data: FormData,
        contentType: "application/json; charset=utf-8",
		async: true,
        sucess: function (data, status, request) {
            alert("Estado atual---\n" + status + "\nResultado: " + data);
			alert("Informações da requisição: \n" + request.getAllResponseHeaders());   
		},
        error: function (request, status, erro) {
            
            alert("Problema ocorrido: " + status + "\nDescrição: " + erro);
            //Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
            alert("Informações da requisição: \n" + request.getAllResponseHeaders());
        },
        complete: function (data, textStatus) {
            var obj = JSON.parse(data.responseText);
            globalvar = obj;
            for (var i = 0; i <obj.sinalizacao.length; i++){
                //Agora é passar tudo num array e levar na funcão auto complete
                array.push(obj.sinalizacao[i].descricao);   
            }
            
        }
    });
    
    $( "#textoBusca" ).autocomplete({
		source: array
    });

    $("#btn-buscar").click(function(){
        $("#showlinks").empty();
        $("#showlinks").append("<table class='table table-striped'><tr></tr></table>");
		
        var txtpesq = $('#textoBusca').val();
        var numString = txtpesq.length;
        var comp;
        
        for(var j=0; j<=globalvar.sinalizacao.length; j++){
            comp = globalvar.sinalizacao[j].descricao.substring(0,numString);
            if((txtpesq.toLowerCase())===(comp.toLowerCase())){
		$("<td></td>").html("<img src="+(globalvar.sinalizacao[j].imag)+">").appendTo("#showlinks table tr");
		$("<td></td>").html(globalvar.sinalizacao[j].descricao).appendTo("#showlinks table tr");
            }
        }
    });
};