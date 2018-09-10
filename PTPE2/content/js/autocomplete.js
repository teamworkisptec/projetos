
$(document).ready(function(){

	var array = new Array();
	$.ajax({
		type: "GET",
		url:"codigo1.xml",
		dataType: 'xml',
		sucess: function(data){
			alert(1);
			$(data).find('data codigo artigo').each(function(){
				alert(1);
				
				array.push($(this).find('nome').text());
				/***
				$('.timeline ul').append(
					$('<li />',{
						text: art
					})
				);
				*/
			});
		},
		error: function(e){
			alert("Error: "+e);
			$('.timeline').text('ERROR!!');
		}
	});
});















/***
$(document).ready(function(){
	$.ajax({
		url:'../codigo1.xml',
		dataType:'xml',
		sucess: function(data) {

			$("ul").children().remove();
			$(data).find("codigo").each( function(){
				var info = '<li>titulo: '+$(this).find("titulo").text()+'</li>';
				$("ul").append(info);
			});
		},
		error: function() {
			alert("Error");
		}
	});
});

**/





/***
window.onload = function()  {
	var array = new Array();
	document.getElementById("sub").onclick = function(){
		var ajax = new XMLHttpRequest();
		var r = document.getElementById("resposta");
		
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4) {
				alert("chegou")
				var xml = new XML(ajax.responseText);
				r.appendChild(document.createTextNode(ajax.responseText));

			}
		}
		ajax.open("POST","codigo1.xml");
		ajax.send(null);
		return false;
	}

	$("#pesq").autocomplete({
				source: array
	});
}
**/