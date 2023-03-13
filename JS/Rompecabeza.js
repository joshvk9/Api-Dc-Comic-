var instrucciones = ["Utilizar las flechas para mover las piezas",
    "Ordenar las piezas hasta alcanzar la imagen objetivo"
];
var movimientos = [];
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var filaVacia = 2;
var columnaVacia = 2;

function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionEnLista(instrucciones[i], "lista-instrucciones");
    }

}
function mostrarInstruccionEnLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

function agregarUltimoMovimiento(direccion) {
    movimientos.push(direccion);
}

function checarSiGano() {
    for (var i = 0; i < rompe.length; i++) {
        for (var j = 0; j < rompe[i].length; j++) {
            var rompeActual = rompe[i][j];
            if (rompeActual !== rompeCorrecta[i][j]) {
                return false;
            }
        }
    }return true;
}

function mostrarCartelGanador() {
    if (chequearSiGano()) {
        alert("Ganaste esta partida");
    }return false;
}
function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2) {

    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columnaPos2];

    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

function posicionValida(fila, columna) {
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

function moverEnDireccion(direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    if(direccion === codigosDireccion.ABAJO){
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }

    else if(direccion === codigosDireccion.ARRIBA){
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }

    else if(direccion === codigosDireccion.DERECHA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    }

    else if(direccion === codigosDireccion.IZQUIERDA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }


    if(posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        agregarUltimoMovimiento(direccion);
    }


}

var codigosDireccion= {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO: 40
};

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    var elementoPieza1 = document.getElementById(idPieza1);
    var elementoPieza2 = document.getElementById(idPieza2);
    var padre = elementoPieza1.parentNode;
    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);
    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.replaceChild(clonElemento2, elementoPieza1);
}

function actualizarUltimoMovimiento(direccion){
    var ultimoMov = document.getElementById('flecha');
    switch(direccion){
        case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑';
            break;
        case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓';
            break;
        case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→';
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '←';
            break;
    }
}

function mezclarPiezas(veces){
    if(veces <= 0){
        alert("Dc Comic");
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];

    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)]; //barajeando

    moverEnDireccion(direccion);

    setTimeout(function() {
        mezclarPiezas(veces - 1);
    }, 100);
}


function capturarTeclas(){
    document.body.onkeydown = (function(evento) {
        if(evento.which === codigosDireccion.ABAJO || evento.which === codigosDireccion.ARRIBA || evento.which === codigosDireccion.DERECHA || evento.which === codigosDireccion.IZQUIERDA){
            moverEnDireccion(evento.which);
            actualizarUltimoMovimiento(evento.which);

            var gano = checarSiGano();
            if(gano){
                setTimeout(function(){
                    mostrarCartelGanador();
                }, 500);
            }
            evento.preventDefault; 
        }
    } );
}

function iniciar(){
    mezclarPiezas(30);
    capturarTeclas();
}

iniciar();
mostrarInstrucciones(instrucciones);