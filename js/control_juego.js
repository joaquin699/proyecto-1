//Contiene la posicion de la ultima ficha seleccionada [fila,columna]
var ultima_seleccionada;

//Se activa cuando dos piezas seleccionadas se estan comparando
var comparando = false;

var parejas_encontradas;

//Maneja las acciones de seleccionar una pieza del tablero
function operar(element){
    var img_aux;
    
    var fila_col = obtenerFilaColumna(element);

    img_aux = img_tablero[fila_col[0]][fila_col[1]];
    
    if(ultima_seleccionada == null){
        ultima_seleccionada = fila_col;
        element.innerHTML = "<img src=\"img/"+img_aux+"\">";
    }
    else{
        if(!comparando && !(fila_col[0]==ultima_seleccionada[0] && fila_col[1] == ultima_seleccionada[1]) ){
            comparando = true;
            element.innerHTML = "<img src=\"img/"+img_aux+"\">";
            iguales = Boolean(compararImagenes(ultima_seleccionada,fila_col));
            div1 = document.getElementById("f"+fila_col[0]+"c"+fila_col[1]);
            div2 = document.getElementById("f"+ultima_seleccionada[0]+"c"+ultima_seleccionada[1]);
            
            setTimeout(()=> mostrarOcultar(div1,div2,iguales),350);
        }
    }  
}

//Retorna fila y columna del elemento pasado
//El elemento tiene que corresponder a una ubicacion valida del tablero
function obtenerFilaColumna(element){
    var id = element.id;
    var f = id.charAt(1);
    var c = id.charAt(3);
    
    var fila = parseInt(f,10);
    var col = parseInt(c,10);
    
    var res = [];
    res[0] = fila;
    res[1] = col;

    return res;
}

//Compara las imagenes de las dos posiciones pasadas como parametro
function compararImagenes(fil_col1, fil_col2){
    return (img_tablero[fil_col1[0]][fil_col1[1]] == img_tablero[fil_col2[0]][fil_col2[1]]);
}

//Se encarga de comparar las imagenes de los elementos div1 y div2
//Si son iguales, deja la imagen y desactiva los cuadros para que no puedan volver a tocarse
//Si no lo son, oculta la imagen. 
function mostrarOcultar(div1, div2, iguales){
    if(iguales){
        div1.setAttribute("onClick","");
        div2.setAttribute("onClick","");
        parejas_encontradas++;
    }
    else{
        div1.innerHTML = "";
        div2.innerHTML = "";
    }
    if( parejas_encontradas == (dimension*dimension / 2 ) ){
            terminar();
    }
    ultima_seleccionada = null;
    comparando = false;
}

//Se encarga de finalizar la partida
function terminar(){
    var milAux = milesimas;
    pararCronometro();
    
    if (milesimas < 10){
        milAux="0" + milesimas;
    }
    guardarTiempo(segundos+"."+milAux,dimension);
}