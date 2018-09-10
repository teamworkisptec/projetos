window.onload = function () {
    var array = new Array();
    var arraylink = new Array();

    $.ajax({
        url: "http://localhost/PTPE2/content/js/codigo.json",
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
            for (i = 0; i <obj.codigo.length; i++){
                //Agora é passar tudo num array e levar na funcão auto complete
                array.push(obj.codigo[i].artigo[0].nome);   
            }
            
            
        }
		
	});
    
    $('#textoBusca').autocomplete({
		source: array
	});
    
    $("#btn-buscar").click(function(){
        
        $("#showlinks").empty();
      //  $("#caixa_texto").html("<div class='panel panel-default'><div class='panel-body' id='showlinks'></div></div>");
        
        
        var txtpesq = $('#textoBusca').val();
        $("#showlinks").append("<ul></ul>");
        $.ajax({
            url: "http://localhost/PTPE2/content/js/codigo.json",
            type: "get",
            dataType: "json",
            data: FormData,
            contentType: "application/json; charset=utf-8",
            async: true,
            sucess: function (data, status, request) {
                alert("Chegou");
            },
            error: function (request, status, erro) {
                alert("\nErro button: " + erro);
            },
            complete: function (data, textStatus) {
                //alert("Chegou1: "+txtpesq);
                var obj1 = JSON.parse(data.responseText);
                var numString = txtpesq.length;
                var comp;
                
                for(i=0; i< obj1.codigo.length; i++ )
                {
                    //alert((obj1.codigo[i].artigo[0].nome.substring(0,numString)));
                    comp=(obj1.codigo[i].artigo[0].nome.substring(0,numString));
                    //alert(comp);
                    if((txtpesq.toLowerCase())==(comp.toLowerCase())){
                    //$("#showlinks ul").html('');
                        $("<li></li>").html("<a id='btn-arraylinks"+i+"' onClick='myFunction("+i+")'>"+obj1.codigo[i].artigo[0].nome+"</a>").appendTo("#showlinks ul");
                    }
                }
           }
		});
    });
    
   

    

};

function myFunction(i){
        
    
    var valor = $("#btn-arraylinks"+i+"").text();
    //alert(valor);
    
    $("#showlinks").empty();
    
    $.ajax({
        url: "http://localhost/PTPE2/content/js/codigo.json",
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
            var cod;
            for(i=0; i<obj.codigo.length; i++ ){
                if(valor==obj.codigo[i].artigo[0].nome){
                    cod=obj.codigo[i];
                }
            }    
            if(valor!=null){
                
                $("#showlinks").html("<div class='titulo'></div>"+"<div class='artigo'></div>"+"<div class='paragrafo'></div>");
                $(".paragrafo").append("<ul></ul>");
                
                $('.titulo').html(cod.titulo+"<br><br>");
                
                $('.artigo').html("Artigo "+cod.artigo[0].numero+"º<br><b>("+cod.artigo[0].nome+")<b><br>");
                
                for(i=0; i<cod.artigo[0].paragrafo.length; i++){
                    $('<li></li>').html(cod.artigo[0].paragrafo[i].numero+"- "+cod.artigo[0].paragrafo[i].texto+"<br><br>").appendTo('.paragrafo ul');    
                }
                
                
                
            }
            
        }
		
	});
};
