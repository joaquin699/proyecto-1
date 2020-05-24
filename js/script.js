window.onload = init;

function init(){
    var tema = localStorage.getItem("tema");
    if(tema!=null){
        cambiarTema(tema);
    }

    iniciarVariables();
    
    cargarImagenes();
    imagenesTablero();

    crearTablero();

    cargarTiempos(1);
}

function iniciarVariables(){

    if(dimension === undefined || dimension == null){
        dimension = 4;
    }
    
    ultima_seleccionada = null;

    segundos = 0;
    milesimas = 0;

    id_interval = null;
    id_regresivo = null;

    parejas_encontradas = 0;
    
    comparando = false;
}

//Funcion asociada a los botones nivel i.
function seleccionarNivel(nivel){
    dimension = 2*(nivel + 1);
    tablero = document.getElementById("tablero");
    
    imagenesTablero();
    
    vaciarTablero(tablero);
    
    crearTablero();
    
    cargarTiempos(nivel);
}

//Elimina todos los elementos HTML del subarbol con raiz element
function vaciarTablero(element){
    if(element != null){
        while (element.hasChildNodes())
        {
            element.removeChild(element.lastChild);
        }
    }
}

//Funcion asociada al boton start
//Se encarga de iniciar la partida
function comenzarJuego(){
    tablero = document.getElementById("tablero");

    cuenta_inicio = document.createElement("div");
    cuenta_inicio.setAttribute("id","cuentaregresiva");
    cuenta_inicio.innerHTML = "5";

    tablero.appendChild(cuenta_inicio);

    desactivarBotones();   

    mostrarImagenes();
    
    comenzarConteo();
}
    
//Funcion asociada al boton restart
//Reinicia el juego.
//Mantiene el ultimo nivel seleccionado.
function reiniciar(){
    if(id_interval != null){
        clearInterval(id_interval);    
    }
    
    if(id_regresivo != null){
        clearInterval(id_regresivo);
        tablero = document.getElementById("tablero");
        tablero.removeChild(document.getElementById("cuentaregresiva"));
    }

    iniciarVariables();

    activarBotones();

    ocultarImagenes();

    desactivarOyentesBotonesJuego();

    imagenesTablero();

    document.getElementById("segundos").innerHTML="0.00";    
}