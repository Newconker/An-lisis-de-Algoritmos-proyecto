/**
 * author: Aarón Piñar Mora 
 * version: 1.7
 * 
 */

var numSelected = null;
var tileSelected = null;


window.onload = function() {
    setGame();
}

function setGame() {
    creaTabla("tableroCentral")
    creaTabla("tableroSuperiorIzquierdo")
    creaTabla("tableroSuperiorDerecho")
    creaTabla("tableroInferiorDerecho")
    creaTabla("tableroInferiorIzquierdo")
    
}

/**
 * Función encargada de crear una tabla 9x9 (margenes)
 * En el caso de que la columna o fila sea 2 o 5 entonces dibuja las lineas de cada tabla
 * S: division de cada recuadro para la simulacion de una tabla 9x9 
 * R: Solo aplica para una tabla 
 */
function creaTabla(variable) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            document.getElementById(variable).append(tile);

            if (r == 2 || r == 5) {
                tile.classList.add("lineaHorizontal")
            }
            if (c == 2 || c == 5) {
                tile.classList.add("lineaVertical")
            }
        }
    }
}

/**
 * Funcion encargada de mostrar un display de numeros para la edicion de una tabla
 * E: Un acttion listener
 * S: Un numero del dispay 
 * R: Solo numeros mostrados en el display puede el usuario interactuar. Del 1 al 9 
 */
function creaDisplayEdit () {
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }   
}