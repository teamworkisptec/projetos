/* global FormData */

var arrayglobal = new Array();
window.onload = function () {
    var array = new Array();

    $.ajax({
        url: "http://localhost/PTPE2/content/js/codigo.json",
	type: "get",
	dataType: "json",
        data: FormData,
        contentType: "application/json; charset=utf-8",
	async: true,
        sucess: function (data, status, request) {
            alert("Estado atual---\n" + status + "\nResultado: " + data);
			alert("Informa��es da requisi��o: \n" + request.getAllResponseHeaders());   
		},
        error: function (request, status, erro) {
            
            alert("Problema ocorrido: " + status + "\nDescri��o: " + erro);
            //Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
            alert("Informações da requisi��o: \n" + request.getAllResponseHeaders());
        },
        complete: function (data, textStatus) {
            var obj = JSON.parse(data.responseText);
            for (var i = 0; i <obj.codigo.length; i++){ //array do codigo
                arrayglobal.push(obj.codigo[i]);
                for(var j = 0; j<obj.codigo[i].titulo.length; j++){ // array do titulo
                    for ( var k = 0; k<obj.codigo[i].titulo[j].capitulo.length; k++){ /// array do capitulo
                        for ( var l=0; l<obj.codigo[i].titulo[j].capitulo[k].artigo.length; l++){ /// array do artigo
                            array.push(obj.codigo[i].titulo[j].capitulo[k].artigo[l].nome);
                        }
                        
                    }    
                }
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
            for(var j = 0; j<arrayglobal[i].titulo.length; j++){ // array do titulo
                for ( var k = 0; k<arrayglobal[i].titulo[j].capitulo.length; k++){ /// array do capitulo
                    for ( var l=0; l<arrayglobal[i].titulo[j].capitulo[k].artigo.length; l++){
                        comp=(arrayglobal[i].titulo[j].capitulo[k].artigo[l].nome.substring(0,numString));//pega a string q veio do json e mete no mesmo tamanho da d� string no input textbusca
                        if((txtpesq.toLowerCase())===(comp.toLowerCase()))
                        {
                            $("<li></li>").html("<a onClick='myFunction("+i+","+j+","+k+","+l+")'>"+arrayglobal[i].titulo[j].capitulo[k].artigo[l].nome+"</a>").appendTo("#showlinks ul");
                            
                        }
                    } 
                }
            }   
        }
          
    });
};

function myFunction(i, j, k, l){
    $("#showlinks").empty();
                                
    $("#showlinks").html("<div class='panel'><div class='titulo'></div>"+"<div class='artigo'></div>"+"<div class='paragrafo'></div>"+"<div class='penalidade'></div></div>");
    $(".paragrafo").append("<ul></ul>");
    $('.titulo').html("<b>"+arrayglobal[i].titulo[j].nome+"</b><br><br>");
    $('.artigo').html("<b>Artigo "+arrayglobal[i].titulo[j].capitulo[k].artigo[l].numero+"º</b><br><b>("+arrayglobal[i].titulo[j].capitulo[k].artigo[l].nome+")<b><br>");
    
    for(var m=0; m<arrayglobal[i].titulo[j].capitulo[k].artigo[l].paragrafo.length; m++){
        $('<li></li>').html(arrayglobal[i].titulo[j].capitulo[k].artigo[l].paragrafo[m].numero+"- "+arrayglobal[i].titulo[j].capitulo[k].artigo[l].paragrafo[m].texto+"<br><br>").appendTo('.paragrafo ul');    
    }
    
    $('.penalidade').html("A penalidade está no <a href=# onClick='functionPenalidade("+i+","+j+","+k+","+l+")'> Artigo "+arrayglobal[i].titulo[j].capitulo[k].artigo[l].penalidade[0].artigonumero+" Paragrafo "+arrayglobal[i].titulo[j].capitulo[k].artigo[l].penalidade[0].paragrafonumero+"</a><br><br>");
}

function functionPenalidade(i,j,k,l){

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
            for (var n = 0; n <= obj.penalidade.length; n++) {
                if((arrayglobal[i].titulo[j].capitulo[k].artigo[l].penalidade[0].artigonumero===obj.penalidade[n].artigo[0].numero)){
                    for(var p=0; p<=obj.penalidade[n].paragrafo.length; p++){
                        if((arrayglobal[i].titulo[j].capitulo[k].artigo[l].penalidade[0].paragrafonumero===obj.penalidade[n].paragrafo[p].numero)){
                            $('.penalidade').html("<b> Artigo "+obj.penalidade[n].artigo[0].numero+"º<br>("+obj.penalidade[n].artigo[0].nome+")</b><br>"+"<b> A multa vai de "+obj.penalidade[n].paragrafo[p].multa[0].de+" a "+obj.penalidade[n].paragrafo[p].multa[0].a+" ucf </b><br><br>");
                        }
                    }
                }
            }
        }
    });

}
