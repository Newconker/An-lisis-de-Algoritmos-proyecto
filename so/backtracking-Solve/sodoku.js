/**
 * @author Aaron Pinnar Mora
 * @author Johan Vargas Quesada 
 * @author Alvaro Moreira Villalobos 
 * 
 * @version 7.0
 * 
 */
var numSelected = null; 
var tileSelected = null;
var estadoGame = false ;
var paso = 1;
var termina = false;
var terminaBucle = false;
var empezoReco = false 
var largoCentral
var LargoSuperiorDerecho 

//Banderas para estados
var banderaC = false;
var banderaII = false;
var bii = 0;
var banderaID = false;
var bid = 0;
var banderaSD = false;
var bsd = 0;
var banderaSI = false; 
var bsi = 0;

var evaluandoC = 0  // para el central
var evaluandoSD = 0 // para el superior Derecho 
var evaluandoSI = 0 // para evaluar superior izquierdo
var evaluandoII = 0 // para evaluar inferior izquierdo 
var evaluandoID = 0 // para evaluar inferior derecho 
var etapa = 1       // etapa del recorrido
var modoAestrella = false; // Para  seleccionar que a estrella esta en ejecucion
var pruebal 


/**
 * Funcion encargada de resolver en totalidad el sodoku
 * Esto lo hace mediante un ciclo con un intervalo de tiempo, apretando el boton encargado de mostrar paso por paso
 * @returns resultado del sodoku
 */
function resolverBoton() {
    if (estadoGame == true) {
        let boton = document.querySelector("#btn1_1"); // obtenemos el botón del DOM
        boton.click()
        console.log("hasta:",board[0][0].length)
        console.log("evalua:", LargoSuperiorDerecho)
  

        if(terminaBucle==false) {
            let intervalo = setInterval(function() {
                boton.click(); // simulamos el clic en el botón
                
                if (terminaBucle === true) {
                    clearInterval(intervalo); // detenemos el intervalo después de 100 clics
                }
            }, 100); //intervalo en milisegundos
        }
    }
    else {
        alert("Debe de generar primero un juego para resolver")
        
    }
}
/**
 *  Boton encargado de mostrar las tablas en navegador 
 *  Inicializa las tablas en base a la activacion del botón  generar
 *  R: Solo puede generar un juego por vista
 */
function inicializaTablas () {
    if(estadoGame == true) {
        alert("Ya un juego esta inicializado")
        console.log("Ya un juego esta inicializado")    
    }
    else {
        estadoGame = true
        alert("Se genero un juego con exito")
        console.log("Se genero un juego con exito")
        //Se inicializa el juego y muestra las tablas a resolver
        Sudoku();
        //Consigue estado Base del juego 
        SudokusAresolver(matrizCentral);
        SudokusAresolver(matrizSuperiorI);
        SudokusAresolver(matrizSuperiorD);
        SudokusAresolver(matrizInferiorD);
        SudokusAresolver(matrizInferiorI);
        //Dibuja las tablas
        creaTabla("tableroSuperiorIzquierdo",matrizSuperiorI, "si");
        creaTabla("tableroCentral",matrizCentral, "c");
        creaTabla("tableroSuperiorDerecho",matrizSuperiorD, "sd");
        creaTabla("tableroInferiorIzquierdo",matrizInferiorI, "ii");
        creaTabla("tableroInferiorDerecho",matrizInferiorD, "id");    
    }
}

/**
 * Boton encargado de mostrar el paso anterior 
 * R: Debe existir un juego ya generado y que por lo menos se avance 1 paso con anterioridad 
 */
function validaRecorrido() {
    if (estadoGame == false) {
        alert("Debe de generar un juego para poder mostrar el siguiente paso")
        console.log("Debe de generar un juego para poder mostrar el siguiente paso")
    }
    if (modoAestrella == true) { 
        alert("Warning: Se esta ya analizando con A*")
        console.log("Ya se esta realizando busqueda A*")
    }
    else (
        siguientePaso()
    )
}
/**
 * Funcion encargada de recorrer las soluciones del backtracking y mostrarlas en pantalla
 * @board pertenece al resultado del sodoku
 * @returns Resultado por posicion del sodoku resuelto 
 */
function siguientePaso() {
    console.log("Se esta haciendo con backTracking")
    if (empezoReco == true) { //no completa sodoku, solo avanza en el tablero 
        /**
         * Funcionamiento de los recorridos en el board
            console.log("Caso: [0]",board) //
            console.log("Caso: [0][0]",board[0][0], "Numero:",board[0][1])  // brinda todo el caso 
            console.log("Caso: [0][0][0]",board[0][0][0])  //brinda primera fila 
            console.log("Caso: [0][0][0][0]",board[0][0][0][0], "Numero:",board[0][1])  //da el primer elemento del caso, en este ejemplo un digito
            console.log("fin")
            console.log("Aja",board[0], "Numero:",board[0][1])
            console.log("Aja",board[1], "Numero:",board[0][1]) 
        */
       //   ----   Central   ----
       if (evaluandoC != largoCentral) {
            evaluandoC ++
            cambiaTile("tableroCentral",board[etapa])
        }
        if (banderaC == false ) {
            if (evaluandoC == largoCentral ) {
                etapa = largoCentral+2 
                banderaC = true;
            }
        }
        console.log("el primero", evaluandoC, "elsegundo",largoCentral)
        
        //   ---- Superior Derecho   ----
        if ( banderaC == true && bsd == 0) {
            if (evaluandoSD != LargoSuperiorDerecho-1) {
                evaluandoSD ++
                cambiaTile("tableroSuperiorDerecho",board[etapa])           
            }
            if (evaluandoSD == LargoSuperiorDerecho-1) {
                etapa = LargoSuperiorDerecho+2
                banderaSD = true
                bsd = 1
                   
            }
            console.log("el primero", evaluandoSD, "elsegundo",LargoSuperiorDerecho)
        }
        
        //  ---- Superior Izquierda  ----- 
        if ( banderaSD == true && bsi == 0) {
            if (evaluandoSI != LargoSuperiorIzquierda-1) {
                evaluandoSI ++
                cambiaTile("tableroSuperiorIzquierdo",board[etapa])           
            }

            if (evaluandoSI == LargoSuperiorIzquierda-1 ) {
                etapa = LargoSuperiorIzquierda+2
                bsi = 1
                banderaSI = true

                
            }
            console.log("el primero", evaluandoSI, "elsegundo",LargoSuperiorIzquierda)
        } 

        //  ----  Inferior izquierda   -----
        if ( banderaSI == true && bii == 0){
             if (evaluandoII != LargoInferiorIzquierda+1) {
                evaluandoII ++
                cambiaTile("tableroInferiorIzquierdo",board[etapa])           
            }

            if (evaluandoII == LargoInferiorIzquierda+1) {
                console.log( "Tablero Inferior izquierda completo", LargoInferiorIzquierda)
                etapa = LargoInferiorIzquierda
                bii = 1
                banderaII = true
                
            }
            console.log("el primero inferior Izquierdo ", evaluandoII, "elsegundo Inferior Izquierda",LargoInferiorIzquierda)
        }
        //  ----  Inferior Derecha  ----
        if ( banderaII == true && bid == 0 ) {
            console.log("//////////Etapa: ", etapa)
            if (evaluandoID != LargoInferiorDerecha+2) {
                evaluandoID ++
                console.log("Se crea en psoicion", etapa)
                console.log("Va: ", board[etapa])
                console.log("correccion", board[etapa-1])
                cambiaTile("tableroInferiorDerecho",board[etapa])           
            }
            if (evaluandoID == LargoInferiorDerecha+2) {
                alert(" Se resolvio el juego!")
                console.log("se resolvio el juego!") 
                terminaBucle = true
                bid == 1
                
            }
            console.log("el primero inferior Derecho", evaluandoID, "elsegundo inferior derecho",LargoInferiorDerecha)
        }
    }
    else  {
        empezoReco = true
        //  ----  Se completan Matriz Central  ----
        completarSudoku(matrizCentral, 1)
        //Se extrae el largo 
        largoCentral = board.length - 1 

        // -----  Se completa matriz superior derecha  -----
        completarSudoku(matrizSuperiorD, 2)
        //Se extrae el largo 
        LargoSuperiorDerecho = board.length
        evaluandoSD = largoCentral+1

        //  ----  Se completa matriz superior Izquierda  ---
        completarSudoku(matrizSuperiorI, 3)
        //Se extrae el largo 
        LargoSuperiorIzquierda = board.length
        evaluandoSI = LargoSuperiorDerecho +1 

        //  ----  Se completa matriz inferior izquierda ----
        completarSudoku(matrizInferiorI, 4)
        //Se extrae el largo 
        LargoInferiorIzquierda = board.length
        evaluandoII = LargoSuperiorIzquierda +2

        //  ----  Se completa matriz inferior Derecho ----
        completarSudoku(matrizInferiorD, 5)
        //Se extrae el largo 
        LargoInferiorDerecha = board.length
        evaluandoID = LargoInferiorIzquierda +2
        console.log(evaluandoID,"ssssss", LargoInferiorIzquierda, "largo", LargoInferiorDerecha) 

        //  ----  Evalua Central   ----
        if (evaluandoC != largoCentral) {
            console.log("Tabla inicial: ", board[0])
            console.log("Etapa:",etapa)
            cambiaTile("tableroCentral",board[etapa]) //Tabla a ingresar
            evaluandoC += 1
        }
        console.log("Se termino de evaluar Central")
    }
}

function cambiaTile(tabla, nuevatabla) {
    console.log("Se analizara: ", nuevatabla)
    for (let x = 0; x < 9; x++ ) {
        for(let y = 0; y < 9; y++ ) {
            if (tabla == "tableroCentral") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "c")
                //console.log("Va entrar: ", nuevatabla[0][x][y])
                //console.log("Segundo caso a evaluar: ", nuevatabla[etapa][x][y])
                if (nuevatabla[0][x][y]!=0 ) {
                    aEvaluar.innerText = nuevatabla[0][x][y] 
                }
                  
            }
            if (tabla == "tableroSuperiorDerecho") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "sd")
                if (nuevatabla[0][x][y]!=0 ) {
                    aEvaluar.innerText = nuevatabla[0][x][y] 
                }
                  
            }
            if (tabla == "tableroSuperiorIzquierdo") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "si")
                if (nuevatabla[0][x][y]!=0 ) {
                    aEvaluar.innerText = nuevatabla[0][x][y] 
                }
                  
            }
            if (tabla == "tableroInferiorIzquierdo") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "ii")
                if (nuevatabla[0][x][y]!=0 ) {
                    aEvaluar.innerText = nuevatabla[0][x][y] 
                }
                  
            }
            if (tabla == "tableroInferiorDerecho") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "id")
                if (nuevatabla[0][x][y]!=0 ) {
                    aEvaluar.innerText = nuevatabla[0][x][y] 
                }
            }
        }
    }
    console.log("Saliendo del cambiar titulo etapa: " , etapa)
    etapa++
    console.log("Saliendo del cambiar titulo etapa: " , etapa)
    console.log("Se inserto con exito")
}



    
/** Funcion de editar tabla  */
function editarTabla() {
           
    idTablas = document.querySelector("#tableroCentral")
    console.log(idTablas) //funciona
            
    //Funciona da el tile 
    var sf = document.getElementById("0-0c");
    console.log("sss",sf)
    const titulo = sf.textContent;
    console.log("Da titulo", titulo)
    //console.log("sss",sf.tile)
          
    sf.innerText = "ggg" 
    var sfs = document.getElementById("0-0c");
    console.log("sss",sfs)
}

/**
 * Resuelve las tablas presentadas
 */
function resolverBackTrackinh() {
    completarSudoku(matrizCentral);
    completarSudoku(matrizSuperiorI);
    completarSudoku(matrizSuperiorD);
    completarSudoku(matrizInferiorD);
    completarSudoku(matrizInferiorI);
}


/*------------------------------------------------------------------------------  Generación de tablas ---------------------------------------------------------------------------------------------------- */
/**
 * Función encargada de crear una tabla 9x9 (margenes)
 * En el caso de que la columna o fila sea 2 o 5 entonces dibuja las lineas de cada tabla
 * S: division de cada recuadro para la simulacion de una tabla 9x9 
 * R: Solo aplica para una tabla, solo va colocar informacion de tablas cuando sea diferente a -
 */
function creaTabla(variable,datosTablaLista, idPosicionTabla) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString() + idPosicionTabla;
            tile.classList.add("tile"); 
            if (datosTablaLista[r][c]!= "-" && datosTablaLista[r][c]!= "0" ) {
                tile.innerText = datosTablaLista[r][c];
            }
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

/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


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

/***  Backtracking  */
/** Johan - Alvaro  */
const matrizCentral = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];

const matrizSuperiorI = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
                    
const matrizSuperiorD = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
                    
const matrizInferiorI = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];

const matrizInferiorD = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];

const matrizSamurai=    [[0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                 ["-","-","-","-","-","-",0,0,0,0,0,0,0,0,0,"-","-","-","-","-","-"],
                 ["-","-","-","-","-","-",0,0,0,0,0,0,0,0,0,"-","-","-","-","-","-"],
                 ["-","-","-","-","-","-",0,0,0,0,0,0,0,0,0,"-","-","-","-","-","-"],
                             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0],
                         [0,0,0,0,0,0,0,0,0,"-","-","-",0,0,0,0,0,0,0,0,0]];

let board = []; // Tabla temporal para almacenar los pasos
                        

// valida si la matriz ya se completo, si es asi se retorna un true de lo contrario retorna un false
function completo(tablero){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (tablero[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}
// valida si el numero existe en una fila y una columna de la matriz
// se ingresa la matriz a validar, el n�mero que se quiere saber si exist en una fila y una columna y la fila y columna
function validar(matriz, num, column, row) {
    // verificar para la fila
    for (let i = 0; i < 9; i++) {
        if (matriz[row][i] === num) {
            return false;
        }
    }

    // verificar para la columna
    for (let i = 0; i < 9; i++) {
        if (matriz[i][column] === num) {
            return false;
        }
    }

    //se posiciona en el cuadrante de la fila
    let cRow = Math.floor(row / 3) * 3;
    //se posiciona en el cuadrante de la columna
    let cColumn = Math.floor(column / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matriz[cRow + i][cColumn + j] === num) {
                return false;
            }
        }
    }

    return true;
}



function generar(matriz){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (matriz[i][j] == 0){
                return [i, j];completarSudoku
            }
        }
    }
}


function completarSudoku(matriz, num) {
    board.push([JSON.parse(JSON.stringify(matriz)),num]);  
    if (completo(matriz)){
        return true;
    }

    let [i, j] = generar(matriz);

    for (let x = 1; x < 10; x++){
        //let y = Math.floor(Math.random()*10);
        if (validar(matriz, x, j, i)){
            matriz[i][j] = x;
            imprimir(matriz);
            if (completarSudoku(matriz, num)){
                return true;
            }
            
            matriz[i][j] = 0;
        }
    } 
    return false
}

function duplicarLaterales(matriz, Crow, Ccolumn, Mrow, Mcolumn){
     for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            matriz[Mrow+i][Mcolumn+j] = matrizCentral[Crow+i][Ccolumn+j]
        }
     }
}

function posAleatoria(matriz){
    for (let x = 0; x < 82; x++){
        let i = Math.floor(Math.random()*9);
        let j = Math.floor(Math.random()*9);
        if (matriz[i][j] == 0){
            return [i, j]
        }  
    }
}

function cantidadNum(matriz){
    let cont = 0;
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (matriz[i][j] != 0){
                cont++;
            }
        }
    }

    if (cont == 36){
        return true;
    }

    return false;
}

function Sudoku(){
    solver(matrizCentral);

    duplicarLaterales(matrizSuperiorI, 0, 0, 6, 6);
    duplicarLaterales(matrizSuperiorD, 0, 6, 6, 0);
    duplicarLaterales(matrizInferiorI, 6, 0, 0, 6);
    duplicarLaterales(matrizInferiorD, 6, 6, 0, 0);

    solver(matrizSuperiorI);
    solver(matrizSuperiorD);
    solver(matrizInferiorI);
    solver(matrizInferiorD);

    console.log(matrizCentral);
    console.log(matrizSuperiorD);
    console.log(matrizInferiorD);
    console.log(matrizInferiorI);
}

function solver(matriz){
    if (completo(matriz)){
        return true;
    }

    let [i, j] = generar(matriz);
    //rellena la matris con un sudoku completo random 
    if (matriz){
        let x = Math.floor(Math.random() * (9 - 1 + 1) +1);
        
        if (validar(matriz, x, j, i)){
            matriz[i][j] = x;

            if (solver(matriz)){
                return true;
            }

            matriz[i][j] = 0;
        }
    };

    //let x = Math.floor(Math.random()*10);
    for (let x = 1; x < 10; x++){
        if (validar(matriz, x, j, i)){
            matriz[i][j] = x;

            if (solver(matriz)){
                return true;
            }

            matriz[i][j] = 0;
        }
    } 

    return false

}

function SudokusAresolver(matriz){
    for(let i=0;i<matriz.length;i++){
        for(let j=0;j<matriz[0].length;j++){
            if(matriz[i][j]!= "-"){
                let x = Math.floor(Math.random() * 2);
                if (x!=0){
                    matriz[i][j] = 0
                }
            }
        }
    }
}

function GenerarSamurai(matriz){
    //genera el sudoku central del samurai
    solver(matriz);
    // genera el sudoku sumperior izquierdo del samurai
    for(let i = 0;i<3; i++){
        for(let j = 0; j < 3 ; j++){
            matrizSuperiorI[i+6][j+6]=matriz[i][j]
        }
    }
    solver(matrizSuperiorI);
     // genera el sudoku sumperior derecho del samurai
    for(let i = 0;i<3; i++){
        for(let j = 6; j < 9 ; j++){
            matrizSuperiorD[i+6][j-6]=matriz[i][j]
        }
    }
    solver(matrizSuperiorD);
    // genera el sudoku inferior izquierdo del samurai
    for(let i = 6;i<9; i++){
        for(let j = 0; j < 3 ; j++){
            matrizInferiorI[i-6][j+6]=matriz[i][j]
        }
    }
    solver(matrizInferiorI);
    // genera el sudoku inferior Derecho del samurai
    for(let i = 6;i<9; i++){
        for(let j = 6; j < 9 ; j++){
            matrizInferiorD[i-6][j-6]=matriz[i][j]
        }
    }
    solver(matrizInferiorD);
    /*
    SudokusAresolver(matrizCentral);
    SudokusAresolver(matrizInferiorD);
    SudokusAresolver(matrizInferiorI);
    SudokusAresolver(matrizSuperiorD);
    SudokusAresolver(matrizSuperiorI);*/

}

function samurai(matriz){
    for(let i = 0;i<9;i++){
        for(let j =0;j<9;j++)
        matriz[i][j]=matrizSuperiorI[i][j]
        
    }

    for(let i = 0;i<9;i++){
        for(let j =12;j<21;j++)
        matriz[i][j]=matrizSuperiorD[i][j-12]
        
    }

    for(let i = 12;i<21;i++){
        for(let j =0;j<9;j++)
        matriz[i][j]=matrizInferiorI[i-12][j];
        
    }

    for(let i = 12;i<21;i++){
        for(let j =12;j<21;j++)
        matriz[i][j]=matrizInferiorD[i-12][j-12]
        
    }

    for(let i = 6;i<15;i++){
        for(let j =6;j<15;j++)
        matriz[i][j]=matrizCentral[i-6][j-6]
        
    }
};

function imprimir(matriz){
    let string = ''
    for (let i = 0; i <matriz.length; i++) {
        for (let j = 0; j <matriz[0].length; j++) {
          string += matriz[i][j] + ' '
        }
        string += '\n'
      }
      //console.log(string)
}

// ----------------------------------------------      A *          --------------------------------------------

/**
 * Funcion encargada de conectar solucion de a*  en base al sodoku
 * Solo mostrara en el caso de que exista un juego generado ya en vista 
 * @returns {}  vista al usuario de la solucion completa
 */
function resolverBotonEstrella() {
    if (estadoGame == true) {
        console.log("Se esta haciendo el A*")
        modoAestrella = true
        aStar(matrizCentral);
  
        aStar(matrizInferiorD,1);
        aStar(matrizInferiorI,2);
        aStar(matrizSuperiorD,3);
        aStar(matrizSuperiorI,4);
        actualizarTablaE("tableroCentral")
        actualizarTablaE("tableroSuperiorDerecho")
        actualizarTablaE("tableroSuperiorIzquierdo")
        actualizarTablaE("tableroInferiorIzquierdo")
        actualizarTablaE("tableroInferiorDerecho")
    }
    else {
        alert("Debe de generar un juego para poder obtener una solucion")
        console.log("Wargning: Debe de generar un juego para obtener una solucion")
    }
}
/**
 * Funcion encargada de actualizar la vista con respecto a la  matriz en su totalidad
 * @param {} tabla corresponde a la tabla que se quiere actualizar 
 * @returns {} vista de la solucion por sector 
 */
function actualizarTablaE(tabla) {
    for (let x = 0; x < 9; x++ ) {
        for(let y = 0; y < 9; y++ ) {
            if (tabla == "tableroCentral") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "c")
                aEvaluar.innerText = matrizCentral[x][y] 
            }
            
            if (tabla == "tableroSuperiorDerecho") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "sd")
                if (tabla[x][y]!=0 ) {
                    aEvaluar.innerText = matrizSuperiorD[x][y]
                }
                  
            }
            if (tabla == "tableroSuperiorIzquierdo") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "si")
                if (tabla[x][y]!=0 ) {
                    aEvaluar.innerText = matrizSuperiorI[x][y]
                }
                  
            }
            if (tabla == "tableroInferiorIzquierdo") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "ii")
                if (tabla[x][y]!=0 ) {
                    aEvaluar.innerText = matrizInferiorI[x][y]
                }
                  
            }
            if (tabla == "tableroInferiorDerecho") {
                aEvaluar = document.getElementById( x.toString() + "-" + y.toString() + "id")
                if (tabla[x][y]!=0 ) {
                    aEvaluar.innerText = matrizInferiorD[x][y] 
                }
            }
        }     
    }              
}



function calculateHeuristic(matriz) {
    let heuristic = 0;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matriz[i][j] == 0) {
                for (let k = 1; k < 10; k++) {
                    if (!validar(matriz, k, j, i)) {
                        heuristic++;
                    }
                }
            }
        }
    }
    return heuristic;
}

function expandirMatriz(matriz) {
    let successors = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matriz[i][j] == 0) {
                for (let x = 1; x < 10; x++) {
                    if (validar(matriz, x, j, i)) {
                        let newMatrix = [];
                        copiarMatriz(matriz, newMatrix);
                        newMatrix[i][j] = x;

                        let heuristic = calculateHeuristic(newMatrix);
                        let successor = [newMatrix, heuristic, i, j];

                        successors.push(JSON.parse(JSON.stringify(successor)));
                    }
                }

                return successors;
            }
        }
    }
}
function copiarMatriz(matriz, newMatrix) {
    for (let i = 0; i < 9; i++) {
        newMatrix.push([]);
        for (let j = 0; j < 9; j++) {
            newMatrix[i].push(matriz[i][j]);
        }
    }
}
function copiarMatriz1(matriz, newMatrix) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            newMatrix[i][j] = matriz[i][j];
        }
    }
}

function agregarList(closeList, openList, source) {
    for (let i = 0; i < source.length; i++) {
        let validarCloseList = true;
        let validarOpenList = true;

        for (let j = 0; j < closeList.length; j++) {
            if (!JSON.stringify(closeList[j]) === JSON.stringify(source[i][0])) {
                validarCloseList = false;
            }
        }

        for (let j = 0; j < openList.length; j++) {
            if (!JSON.stringify(openList[j][0]) === JSON.stringify(source[i][0])) {
                validarOpenList = false;
            }
        }

        if (validarOpenList && validarCloseList) {
            openList.push(source[i]);
        }
    }

    openList.sort(function (a, b) { return a[1] - b[1]; });
}

function aStar(matriz,num) {
    let openList = [];
    let closeList = [];
    let actual = matriz;

    while (!completo(actual)) {
        let successors = expandirMatriz(actual);
        agregarList(closeList, openList, successors);
        closeList.push(actual);

        if (openList.length != 0) {
            actual = openList[0][0];
            openList.shift();
        }
        board.push([JSON.parse(JSON.stringify(actual)),num]);  
    }
    copiarMatriz1(actual, matriz);
    return actual;
}