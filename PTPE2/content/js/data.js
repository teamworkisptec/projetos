var dia_semana = new Array("Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado");
var data;
function pegarData() {
    data = new Date();
    document.getElementById('data').value = dia_semana[data.getDay()]+', '+data.getDay()+'/'+data.getMonth()+'/'+data.getFullYear();
}