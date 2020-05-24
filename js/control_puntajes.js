//Se encarga de mostrar en pantalla los puntajes del nivel lvl
function cargarTiempos(lvl){
    var puntaje_html;
    var nombre;
    var tiempo;

    for(var i = 1; i<=5; i++){
        puntaje_html = document.getElementById("p"+i);
        
        puntaje_almacenado = localStorage.getItem("lvl_"+lvl+"_puntaje_"+i);
        if(puntaje_almacenado != null){
            puntaje = JSON.parse(puntaje_almacenado);

            nombre = puntaje.nombre
            tiempo = puntaje.tiempo;
            
            puntaje_html.innerHTML = i + ". " + nombre ;
            puntaje_html.nextSibling.innerHTML = tiempo + "\"";
        }
        else{
            puntaje_html.innerHTML = i + ". ";
            puntaje_html.nextSibling.innerHTML = "";
        }
    }

    document.getElementById("titulo").innerHTML = " Puntajes mas altos: Nivel "+lvl+" ";
}

//Guarda, si corresponde, el tiempo en LocalStorage
function guardarTiempo(tiemp,dim){
    var nivel = parseInt((dim/2 - 1),10);
    var pos;

    pos = compararTiempos(nivel,tiemp);

    if(pos > 0){
        var nombre = "";
        var opcion;
        
        correrTiempos(pos,nivel);
        
        do{
            opcion = prompt("Introduzca su nombre:", "");
            if(opcion != null && opcion.length>15){
                alert("El nombre debe ser mas corto");
                opcion = "";
            }
        }while(opcion == null || opcion == "");
        nombre = opcion;
        puntaje_a_guardar = {"nombre":nombre, "tiempo":tiemp};

        localStorage.setItem("lvl_"+nivel+"_puntaje_"+pos,JSON.stringify(puntaje_a_guardar));
        document.getElementById("segundos").innerHTML = tiemp;
        cargarTiempos(nivel);
    }
}

//Compara el tiempo pasado como parametro con los tiempos almacenados en localStorage
function compararTiempos(nivel,tiemp){
    var tiempo_almacenado;
    var pos = -1;
    for (var i = 5; i >= 1; i--) {
        puntaje_almacenado = localStorage.getItem("lvl_"+nivel+"_puntaje_"+i);
        if(puntaje_almacenado != null){
            tiempo_almacenado = (JSON.parse(puntaje_almacenado)).tiempo;
            if(tiemp < tiempo_almacenado){
                pos = i;
            }
        }
        else{
            pos = i;
        }
    }
    return pos;
}

//Desplaza los tiempos almacenados una posicion mas abajo a partir de pos.
function correrTiempos(pos,nivel){
    for(var i = 5; i > pos; i--){
        puntaje_almacenado = localStorage.getItem("lvl_"+nivel+"_puntaje_"+(i-1));
        if(puntaje_almacenado!= null){
            puntaje = JSON.parse(puntaje_almacenado)
            nom = puntaje.nombre;
            tiemp = puntaje.tiempo;
            
            puntaje_a_guardar = {'nombre':nom,'tiempo':tiemp};

            localStorage.setItem("lvl_"+nivel+"_puntaje_"+i, JSON.stringify(puntaje_a_guardar));
        }  
    }
}
