const SIZE = 9;
const DIGITS = [1,2,3,4,5,6,7,8,9]
function testMatrixCell(matrix, row, col, num){{
  //console.log(col,row, num)
    //duplicate in row
    //console.log(row,col,num)
    for(let i = 0; i < SIZE ; i++)
        if (i!=col && matrix[row][i] == num){
          //console.log("false")
          return false;
        }
            
 
    //duplicate in row
    for (let i = 0; i < SIZE ; i++)
        if (i!=row && matrix[i][col] == num){
          return false;
        }
            
 
    // duplicate in small square
    let startSquareRow = row - row % 3; //2 => 0; 5 => 3
    let startSquareCol = col - col % 3;
         
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if ((col != j + startSquareCol || row != i + startSquareRow) && matrix[i + startSquareRow][j + startSquareCol] == num) return false;
        //console.log(true)
    return true;
  }
}

const allowedDigits = (matrix,i,j) =>{
  if (matrix[i][j] === 0) {
    allowed =  [...DIGITS];
  } else {
    if (typeof matrix[i][j] === 'number') return matrix[i][j]
  }
  const allowedTester=(d) => testMatrixCell(matrix,i,j,d)
    
  allowed = allowed.filter(allowedTester)
  if (allowed.length === 1) allowed = allowed[0]
  return allowed
}

//function solveSudoku(matrix,col,row) {
module.exports = function solveSudoku(matrix) {  
  for (let i=0; i<SIZE;i++)
    for (let j=0; j<SIZE;j++){
      //if (!testMatrixCell(matrix,i,j, matrix[i][j])) return false
      matrix[i][j] = allowedDigits(matrix,i,j)
    }

  return matrix
}

const initial = [
  [5, 3, 4, 6, 7, 8, 9, 0, 0],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];
//console.log("start",solveSudoku(initial))


//  module.exports = function solveSudoku(matrix) {
// your solution