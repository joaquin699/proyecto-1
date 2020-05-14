//Se encarga de mostrar en pantalla los puntajes del nivel lvl
function cargarTiempos(lvl){
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
        localStorage.setItem("lvl_"+nivel+"_nombre_"+pos,nombre);
        localStorage.setItem("lvl_"+nivel+"_tiempo_"+pos, tiemp);
        document.getElementById("segundos").innerHTML = tiemp;
        cargarTiempos(nivel);
    }
}

//Compara el tiempo pasado como parametro con los tiempos almacenados en localStorage
function compararTiempos(nivel,tiemp){
    var tiempo_almacenado;
    var pos = -1;
    for (var i = 5; i >= 1; i--) {
        tiempo_almacenado = localStorage.getItem("lvl_"+nivel+"_tiempo_"+i);
        if(tiempo_almacenado != null){
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
        nom = localStorage.getItem("lvl_"+nivel+"_nombre_"+(i-1));
        if(nom!= null){
            tiemp = localStorage.getItem("lvl_"+nivel+"_tiempo_"+(i-1));
            
            localStorage.setItem("lvl_"+nivel+"_nombre_"+i, nom);
            localStorage.setItem("lvl_"+nivel+"_tiempo_"+i, tiemp);
        }  
    }
}
