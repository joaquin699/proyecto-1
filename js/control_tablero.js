//Dimension del tablero de juego
var dimension;

//Contiene todas las imagenes de la carpeta img
var imagenes;

//Contiene las imagenes que se estan mostrando en el trablero.
var img_tablero;



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
        }
    }
}

//Activa los botones del tablero de juego
function activarOyentesBotonesJuego(){
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            element = document.getElementById("f"+i+"c"+j);
            element.setAttribute("onClick","operar(this)");
        }
    }
}

//Activa los botones start, restart, Nivel i, cambio de tema
function activarBotones(){
    (document.getElementsByClassName("boton start")[0]).setAttribute("onClick","comenzarJuego()");
    var niveles = document.getElementsByClassName("lvl");
    for(var i = 0; i< niveles.length; i++){
        niveles[i].setAttribute("onClick","seleccionarNivel(" + (i+1) + ")");
    }

    var temas = document.getElementsByClassName("temas");
    for (var i = 0; i < temas.length; i++) {
        var id_tema = temas[i].id;
        var color = id_tema.substring(2,id_tema.length);
        temas[i].setAttribute("onClick","cambiarTema('" + color + "')");
    }
}

//Desactiva los botones start, restart, nivel i, cambio de tema
function desactivarBotones(){
    (document.getElementsByClassName("boton start")[0]).setAttribute("onClick","");
    var niveles = document.getElementsByClassName("lvl");
    for(var i = 0; i< niveles.length; i++){
        niveles[i].setAttribute("onClick","");
    }

    var temas = document.getElementsByClassName("temas");
    for (var i = 0; i < temas.length; i++) {
        temas[i].setAttribute("onClick","");
    }
}

function cambiarTema(tema){
    document.getElementById("estilo").setAttribute("href","css/app_"+tema+".css");
    localStorage.setItem("tema",tema);
}