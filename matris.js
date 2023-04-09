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

const matrizCentralCopia = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];

//var x = Math.floor(Math.random()*10);

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
// se ingresa la matriz a validar, el numero que se quiere saber si exist en una fila y una columna y la fila y columna
function validarCF(matriz, num, column, row) {
    // verificar para la fila
    for (let j = 0; j < 9; j++){
        if (matriz[row][j] === num){
            return false;
        }
    }

    // verificar para la columna
    for (let i = 0; i < 9; i++){
        if (matriz[i][column] === num){
            return false;
        }
    }
    return true;
}

//verifica si el numero es valido para el cuadrante
function validarCuadrante (matriz, num, column, row){
    //se posiciona en el cuadrante de la fila
    let cRow = Math.floor(row / 3) * 3;
    //se posiciona en el cuadrante de la columna
    let cColumn = Math.floor(column / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (matriz[cRow + i][cColumn + j] == num) {
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
                return [i, j];
            }
        }
    }
}


function completarSudoku(matriz){
    if (completo(matriz)){
        return true;
    }

    let [i, j] = generar(matriz);
    
    for (let x = 1; x < 10; x++){
        let y = Math.floor(Math.random()*10);
        if (validarCF(matriz, y, j, i) && validarCuadrante (matriz, y, j, i)){
            matriz[i][j] = y;

            if (completarSudoku(matriz)){
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

function Sudoku(){
    completarSudoku(matrizCentral);

    duplicarLaterales(matrizSuperiorI, 0, 0, 6, 6);
    duplicarLaterales(matrizSuperiorD, 0, 6, 6, 0);
    duplicarLaterales(matrizInferiorI, 6, 0, 0, 6);
    duplicarLaterales(matrizInferiorD, 6, 6, 0, 0);

    completarSudoku(matrizSuperiorI);
    completarSudoku(matrizSuperiorD);
    completarSudoku(matrizInferiorI);
    completarSudoku(matrizInferiorD);

    console.log(matrizCentral);
}

function SudokusAresolver(matriz){
    for(let i=0;i<matriz.length;i++){
        for(let j=0;j<matriz[0].length;j++){
            if(matriz[i][j]!= 0){
                let x = Math.floor(Math.random() * 2);
                if (x!=0){
                    matriz[i][j] = 0
                }
            }
        }
    }
}

Sudoku();
