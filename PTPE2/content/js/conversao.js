
function functionConversao(){
    var num = $("#ucf").val();
    var x;
    var kz = 88;
    var ucf = 1;
    //if(num) uma expressão regular
    x = (num * kz)/ucf;
    $("#show").empty();
    $("#show").append("<br><br><b>Convertendo "+(num)+" ucf corresponde "+(x)+" kwanzas</b>");
    
    
    
}