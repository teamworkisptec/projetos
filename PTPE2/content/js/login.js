function validacao(){
        
		var nome = document.getElementById('item1');
		var senha = document.getElementById('item2');
		var _nome='NIP00001';
		var _senha='2468';
       
	   
		if(nome.value == false){
			nome.focus();
			document.getElementById('texto1').innerHTML = "*";
			return false;
		}
	
		else if(senha.value == false){
			senha.focus();
			document.getElementById('texto2').innerHTML = "*";
			return false;
		}
		
		else{
			
		    if( (nome.value==_nome)&&(senha.value==_senha) )
				window.location='index.html';
			
			else if(nome.value!=_nome){
				nome.focus();
			    document.getElementById('texto1').innerHTML = "*";
				return false;
				}
			     
			else if(senha.value!=_senha){
				senha.focus();
				document.getElementById('texto2').innerHTML = "*";
				return false;
		        }
		}
			
}


