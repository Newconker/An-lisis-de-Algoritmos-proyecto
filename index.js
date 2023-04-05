var sudoku = [[1,2,3,4,5,6,5,8,9],
              [2,3,4,5,0,0,0,0,0],
              [3,4,5,0,0,0,0,0,0],
              [4,5,0,0,0,0,0,0,0],
              [5,0,0,0,0,0,0,0,9],
              [6,0,0,0,0,0,0,0,0],
              [1,0,0,0,0,0,0,0,0],
              [8,0,0,0,0,0,0,0,0],
              [9,0,0,0,0,0,0,0,9]];


function RepetidoF(fila,columna){
        let numeroOriginal = sudoku[fila][columna];
    for (var i = 0; i< sudoku.length;i++){
        let x = sudoku[fila][i];
        
        if (columna != i){
            if (numeroOriginal == x){
                console.log("repetido en la fila ",fila," columna ",i )
            }else{
                console.log("perfecto") 
            }
        }
       
        
    };
};

function RepetidoC(fila,columna){
    let numeroOriginal = sudoku[fila][columna];
for (var i = 0; i< sudoku.length;i++){
    let x = sudoku[i][columna];
    
    if (columna != i){
        if (numeroOriginal == x){
            console.log("repetido en la fila ",i," columna ",columna )
        }else{
            console.log("perfecto") 
        }
    }
   
    
};
};

RepetidoC(8,8)