window.onload = init;

var dimension = 4;
var anchoFila;
var segundos;
var milesimas;

function init(){
    
    //Inicializa los datos del cronometro
    document.querySelector(".start").addEventListener("click",cronometrar);
    document.querySelector(".reiniciar").addEventListener("click",reiniciar);
    
    segundos = 0;
    milesimas = 0;

    document.getElementById("segundos").innerHTML="0.00";

    //Crea la tabla para el nivel seleccionado.
	crearTablero();   
}

function seleccionarNivel(nivel){
    dimension = 2*(nivel + 1);
    tablero = document.getElementById("tablero");
    vaciarTablero(tablero);
    crearTablero();
}

function vaciarTablero(element){
    if(element != null){
        while (element.hasChildNodes())
        {
            element.removeChild(element.lastChild);
        }
    }
    else{
        alert("Tablero nulo");
    }
}

//Crea un tablero de NxN. El tamanio del tablero es el indicado por dimension.
function crearTablero(){
    anchoFila = dimension * 60;
    var tablero = document.getElementById("tablero");
    for (var f = 0; f < dimension; f++) {
        var fila = document.createElement("div");
        fila.setAttribute("class", "fila");
        fila.setAttribute("style","width:"+anchoFila+"px");
        for (var c = 0; c < dimension; c++) {
            var columna = document.createElement("div");
            columna.setAttribute("class","columna");
            columna.setAttribute("id","f"+f+"c"+c);
            fila.appendChild(columna);
        }
        tablero.appendChild(fila);
    }
}

function cronometrar(){
    escribir();
    id = setInterval(escribir,10);
    document.querySelector(".start").removeEventListener("click",cronometrar);
}

function escribir(){
    var milAux = milesimas;
    milesimas++;
    if(milesimas>99){
        segundos++;
        milesimas=0;
    }

    if (milesimas < 10){
        milAux="0" + milesimas;
    }
    
    document.getElementById("segundos").innerHTML = segundos + "." + milAux; 
}

function parar(){
    clearInterval(id);
    document.querySelector(".start").addEventListener("click",cronometrar);
}

function reiniciar(){
    clearInterval(id);
    document.getElementById("segundos").innerHTML="0.00";
    segundos=0;
    milesimas=0;
    document.querySelector(".start").addEventListener("click",cronometrar);
}



