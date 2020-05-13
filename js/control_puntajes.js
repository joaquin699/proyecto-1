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

function guardarPuntaje(punt,dim){
    var nivel = parseInt((dim/2 - 1),10);
    var pos;

    pos = compararPuntajes(nivel,punt);

    if(pos > 0){
        var nombre = "";
        var opcion;
        
        correrPuntajes(pos,nivel);
        
        do{
            opcion = prompt("Introduzca su nombre:", "");
            if(opcion != null && opcion.length>15){
                alert("El nombre debe ser mas corto");
                opcion = "";
            }
        }while(opcion == null || opcion == "");
        nombre = opcion;
        localStorage.setItem("lvl_"+nivel+"_nombre_"+pos,nombre);
        localStorage.setItem("lvl_"+nivel+"_tiempo_"+pos, punt);
        document.getElementById("segundos").innerHTML = punt;
        cargarPuntajes(nivel);
    }
}

function compararPuntajes(nivel,punt){
    var aux;
    var pos = -1;
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
    return pos;
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
