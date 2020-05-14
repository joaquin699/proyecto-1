
var segundos;
var milesimas;

var conteo_regresivo;

var id_interval;
var id_regresivo;


//Activa el cronometro cuando comienza el juego 
function cronometrar(){
    escribir();
    id_interval = setInterval(escribir,10);
}

//Aumenta las milesimas y se encarga de escribir los segundos y milesimas en la pantalla de juego
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

//Detiene el cronometro
function pararCronometro(){
    clearInterval(id_interval);
}

//Inicia un conteo regresivo de 5 segundos para que el jugador vea las imagenes y trate de memorizarlas
function comenzarConteo(){
    conteo_regresivo = 5;
    id_regresivo = setInterval(descontar,1000);
}

//Reduce en 1 el conteo regresivo y lo muestra en la pantalla.
function descontar(){
    conteo_regresivo--;
    var cuenta =  document.getElementById("cuentaregresiva");
    if(conteo_regresivo>0){
        cuenta.innerHTML = conteo_regresivo;
    }else{
        clearInterval(id_regresivo);
        id_regresivo = null;
        tablero = document.getElementById("tablero");
        tablero.removeChild(cuenta);
        ocultarImagenes();
        activarOyentesBotonesJuego();
        cronometrar();
    }
}