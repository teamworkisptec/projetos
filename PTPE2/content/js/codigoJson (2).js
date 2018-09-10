/* global FormData */

var globalvar;
var arrayglobal = new Array();
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
                arrayglobal.push(obj.codigo[i]);
            }
        }
    });
    
    $( "#textoBusca" ).autocomplete({
		source: array
    });
    
    $("#btn-buscar").click(function(){
        
        $("#showlinks").empty();
        $(".col-sm-4").hide();
        var txtpesq = $('#textoBusca').val();
        $("#showlinks").append("<ul></ul>");
        
        var numString = txtpesq.length;//tamanho d� string no input textbusca
        var comp;
        for(i=0; i< arrayglobal.length; i++ )
        {
            comp=(arrayglobal[i].artigo[0].nome.substring(0,numString));//pega a string q veio do json e mete no mesmo tamanho da d� string no input textbusca
            if((txtpesq.toLowerCase())===(comp.toLowerCase())){
                $("<li></li>").html("<a onClick='myFunction()'>"+arrayglobal[i].artigo[0].nome+"</a>").appendTo("#showlinks ul");
                globalvar=arrayglobal[i];
            }
        }
          
    });
};

function myFunction(){
    
    $("#showlinks").empty();
                                
    $("#showlinks").html("<div class='panel'><div class='titulo'></div>"+"<div class='artigo'></div>"+"<div class='paragrafo'></div>"+"<div class='penalidade'></div></div>");
    $(".paragrafo").append("<ul></ul>");
    $('.titulo').html("<b>"+globalvar.titulo+"</b><br><br>");
    $('.artigo').html("<b>Artigo "+globalvar.artigo[0].numero+"º</b><br><b>("+globalvar.artigo[0].nome+")<b><br>");
    for(i=0; i<globalvar.artigo[0].paragrafo.length; i++){
        $('<li></li>').html(globalvar.artigo[0].paragrafo[i].numero+"- "+globalvar.artigo[0].paragrafo[i].texto+"<br><br>").appendTo('.paragrafo ul');    
    }$('.penalidade').html("A penalidade está no <a href=# onClick='functionPenalidade()''> Artigo "+globalvar.penalidade[0].artigonumero+" Paragrafo "+globalvar.penalidade[0].paragrafonumero+"</a><br><br>");
}

function functionPenalidade(){

    $.ajax({
        url: "http://localhost/PTPE2/content/js/penalidade.json",
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
            for (var i = 0; i <= obj.penalidade.length; i++) {
                if((globalvar.penalidade[0].artigonumero===obj.penalidade[i].artigo[0].numero)){
                    for(var j=0; j<=obj.penalidade[i].paragrafo.length; j++){
                        if((globalvar.penalidade[0].paragrafonumero===obj.penalidade[i].paragrafo[j].numero)){

                             $('.penalidade').html("<b> Artigo "+obj.penalidade[i].artigo[0].numero+"º<br>("+obj.penalidade[i].artigo[0].nome+")</b><br>"+"<b> A multa vai de "+obj.penalidade[i].paragrafo[j].multa[0].de+" a "+obj.penalidade[i].paragrafo[j].multa[0].a+" ucf </b><br><br>");
                        }
                    }
                }
            }
        }
    });

}
