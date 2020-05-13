window.onload = init;

//Dimension del tablero de juego
var dimension;

//Variables utilizadas en el control del cronometro y el conteo regresivo antes de cada juego
var segundos;
var milesimas;
var conteo_regresivo;
var id_interval;
var id_regresivo;

//Contiene todas las imagenes de la carpeta img
var imagenes;

//Contiene las imagenes que se estan mostrando en el trablero.
var img_tablero;

//Contiene la posicion de la ultima ficha seleccionada [fila,columna]
var ultima_seleccionada;

//Se activa cuando dos piezas seleccionadas se estan comparando
var comparando = false;

var parejas_encontradas;



function init(){
    tema = localStorage.getItem("tema");
    if(tema!=null){
        cambiarTema(tema);
    }
    dimension = 4;
    ultima_seleccionada = null;

    cargarImagenes();
    imagenesTablero();

    segundos = 0;
    milesimas = 0;
    id_interval = null;
    id_regresivo = null;

    parejas_encontradas = 0;

    //Crea la tabla inicial. El nivel inicial por defecto es 1.
    crearTablero();

    cargarPuntajes(1);
}

//Inicializa la variable imagenes con todas las imagenes de la carpeta img
function cargarImagenes(){
    imagenes = [];
    imagenes[0] = "window.png";
    imagenes[1] = "ball.png";
    imagenes[2] = "book.png";
    imagenes[3] = "cake.png";
    imagenes[4] = "camera.png";
    imagenes[5] = "clock.png";
    imagenes[6] = "computer.png";
    imagenes[7] = "house.png";
    imagenes[8] = "iphone.png";
    imagenes[9] = "letter.png";
    imagenes[10] = "people.png";
    imagenes[11] = "person.png";
    imagenes[12] = "phone.png";
    imagenes[13] = "plane.png";
    imagenes[14] = "star.png";
    imagenes[15] = "ticket.png"; 
    imagenes[16] = "thumb.png";
    imagenes[17] = "message.png";
}

//Inicializa la variable img_tablero con las imagenes que se van a utilizar en cada posicion del tablero
function imagenesTablero(){
    img_tablero = [];
    var img_utilizadas = [];

    for(var i = 0; i < (dimension*dimension)/2 ; i++){
        img_utilizadas[2*i] = imagenes[i];
        img_utilizadas[2*i+1] = imagenes[i]; 
    }

    for(var f = 0; f<dimension ; f++){
        img_tablero[f] = [];
        for (var c = 0; c < dimension; c++) {
            im = getRandomInt(0,img_utilizadas.length);
            img_tablero[f][c] = img_utilizadas[im];
            img_utilizadas.splice(im,1);
        }
    }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Crea el tablero de juego que se va a utilizar de acuerdo al tamanio indicado en dimension.
function crearTablero(){

    var anchoFila = dimension * 58;
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

function seleccionarNivel(nivel){
    dimension = 2*(nivel + 1);
    tablero = document.getElementById("tablero");
    imagenesTablero();
    vaciarTablero(tablero);
    crearTablero();
    cargarPuntajes(nivel);
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
//Se encarga de iniciar el juego
function comenzarJuego(){
    tablero = document.getElementById("tablero");

    cuenta_inicio = document.createElement("div");
    cuenta_inicio.setAttribute("id","cuentaregresiva");
    cuenta_inicio.innerHTML = "5";

    tablero.appendChild(cuenta_inicio);

    parejas_encontradas = 0;

    mostrarImagenes();
    comenzarConteo();

    desactivarBotones();   
}

//Muestra todas las imagenes del tablero
function mostrarImagenes(){
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            element = document.getElementById("f"+i+"c"+j);
            element.innerHTML = "<img src=\"img/"+img_tablero[i][j]+"\">";
        }
    }
}

//Oculta todas las imagenes del tablero
function ocultarImagenes(){
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            element = document.getElementById("f"+i+"c"+j);
            element.innerHTML = "";
            element.setAttribute("onClick","operar(this)");
        }
    }
}

//Activa los botones start y Nivel i
function activarBotones(){
    (document.getElementsByClassName("boton start")[0]).setAttribute("onClick","comenzarJuego()");
    niveles = document.getElementsByClassName("lvl");
    for(var i = 0; i< niveles.length; i++){
        niveles[i].setAttribute("onClick","seleccionarNivel(" + (i+1) + ")");
    }

    temas = document.getElementsByClassName("temas");
    for (var i = 0; i < temas.length; i++) {
        var id_tema = temas[i].id;
        var color = id_tema.substring(2,id_tema.length);
        temas[i].setAttribute("onClick","cambiarTema('" + color + "')");
    }
}

//Desactiva los botones de start, y niveles para el correcto funcionamiento del juego
function desactivarBotones(){
  
    (document.getElementsByClassName("boton start")[0]).setAttribute("onClick","");
    niveles = document.getElementsByClassName("lvl");
    for(var i = 0; i< niveles.length; i++){
        niveles[i].setAttribute("onClick","");
    }

    temas = document.getElementsByClassName("temas");
    for (var i = 0; i < temas.length; i++) {
        temas[i].setAttribute("onClick","");
    }
}

//Hace un conteo regresivo de 5 segundos para que el jugador vea las imagenes y trate de memorizarlas
function comenzarConteo(){
    conteo_regresivo = 5;
    id_regresivo = setInterval(descontar,1000);
}

//Reduce en 1 el conteo regresivo y lo muestra en la pantalla.
function descontar(){
    conteo_regresivo--;
    cuenta =  document.getElementById("cuentaregresiva");
    if(conteo_regresivo>0){
        cuenta.innerHTML = conteo_regresivo;
    }else{
        clearInterval(id_regresivo);
        id_regresivo = null;
        tablero = document.getElementById("tablero");
        tablero.removeChild(cuenta);
        ocultarImagenes();
        cronometrar();
    }
}

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

//Se encarga de manejar las acciones asociadas a la seleccion de una pieza del tablero.
function operar(element){
    var img_aux;
    
    fila_col = obtenerFilaColumna(element);

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


//Termina el juego parando el cronometro
function terminar(){
    var milAux = milesimas;
    pararCronometro();
    if (milesimas < 10){
        milAux="0" + milesimas;
    }
    guardarPuntaje(segundos+"."+milAux);
}

//Detiene el cronometro
function pararCronometro(){
    clearInterval(id_interval);
}

//Reinicia el juego completo
function reiniciar(){
    if(id_interval != null){
        clearInterval(id_interval);    
    }
    if(id_regresivo != null){
        clearInterval(id_regresivo);
        tablero = document.getElementById("tablero");
        tablero.removeChild(document.getElementById("cuentaregresiva"));
    }

    activarBotones();

    ocultarImagenes();

    imagenesTablero();
    
    document.getElementById("segundos").innerHTML="0.00";    
    
    segundos=0;
    milesimas=0;

    id_interval = null;
    id_regresivo = null;

    ultima_seleccionada = null;

    comparando = false;

    parejas_encontradas = 0;
}

//Se encarga de mostrar en pantalla los puntajes del nivel lvl
function cargarPuntajes(lvl){
    var puntaje;
    var nombre;
    var tiempo;

    for(var i = 1; i<=5; i++){
        puntaje = document.getElementById("p"+i);
        
        nombre = localStorage.getItem("lvl_"+lvl+"_nombre_"+i);
        if(nombre != null){
            tiempo = localStorage.getItem("lvl_"+lvl+"_tiempo_"+i);
            puntaje.innerHTML = i + ". " + nombre ;
            puntaje.nextSibling.innerHTML = tiempo + "\"";
        }
        else{
            puntaje.innerHTML = i + ". ";
            puntaje.nextSibling.innerHTML = "";
        }
    }

    document.getElementById("titulo").innerHTML = " Puntajes mas altos: Nivel "+lvl+" ";
}

function guardarPuntaje(punt){
    var nivel = dimension/2 - 1;
    var pos = -1;
    var aux;

    for (var i = 5; i >= 1; i--) {
        aux = localStorage.getItem("lvl_"+nivel+"_tiempo_"+i);
        if(aux != null){
            if(punt < aux){
                pos = i;
            }
        }
        else{
            pos = i;
        }
    }

    if(pos!= -1){
        var nombre = "";
        var opcion;
        correrPuntajes(pos,nivel);
        do{
            opcion = prompt("Introduzca su nombre:", "");
            if(opcion != null && opcion.length>16){
                alert("El nombre debe ser mas corto");
                opcion = "";
            }
        }while(opcion == null || opcion == "");
        nombre = opcion;
        localStorage.setItem("lvl_"+nivel+"_nombre_"+pos,nombre);
        localStorage.setItem("lvl_"+nivel+"_tiempo_"+pos, punt);
        cargarPuntajes(nivel);
    }
}

function correrPuntajes(pos,nivel){
    for(var i = 5; i > pos; i--){
        nom = localStorage.getItem("lvl_"+nivel+"_nombre_"+(i-1));
        if(nom!= null){
            tiem = localStorage.getItem("lvl_"+nivel+"_tiempo_"+(i-1));
            
            localStorage.setItem("lvl_"+nivel+"_nombre_"+i, nom);
            localStorage.setItem("lvl_"+nivel+"_tiempo_"+i, tiem);
        }  
    }
}


function cambiarTema(tema){
    document.getElementById("estilo").setAttribute("href","css/app_"+tema+".css");
    localStorage.setItem("tema",tema);
}