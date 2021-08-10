const SIZE = 9;
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function testMatrixCell(matrix, row=0, col=0, num = 0) {
  {
    // console.log("tester",col,row, num)
    //duplicate in row
    //console.log(row,col,num)
    for (let i = 0; i < SIZE; i++){
    //console.log(matrix[row][i])
      if ((i != col) && (matrix[row][i] === num)) {
        //console.log("false!!")
        return false;
      }
    }

    //duplicate in row
    for (let i = 0; i < SIZE; i++)
      if (i != row && matrix[i][col] == num) {
        return false;
      }


    // duplicate in small square
    let startSquareRow = row - row % 3; //2 => 0; 5 => 3
    let startSquareCol = col - col % 3;

    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if ((col != j + startSquareCol || row != i + startSquareRow) && matrix[i + startSquareRow][j + startSquareCol] == num) return false;
    //console.log(true)
    return true;
  }
}

const allowedDigits = (matrix, i, j) => {
  if (matrix[i][j] === 0) {
    allowed = [...DIGITS];
  } else {
    if (typeof matrix[i][j] === 'number') return matrix[i][j]
  }
  const allowedTester = (d) => testMatrixCell(matrix, i, j, d)

  allowed = allowed.filter(allowedTester)
  if (allowed.length === 1) allowed = allowed[0]
  return allowed
}

function getRow(matrix,i){
  return matrix[i]
}

function getCol(matrix,j){
  
  return matrix.map(row => row[j])
}

function getSquare(matrix, row, col){
  const startSquareRow = row - row % 3; //2 => 0; 5 => 3
  const startSquareCol = col - col % 3;
  let square = matrix.splice(startSquareRow,3)
  square = square.map(row => row.splice(startSquareCol,3))
  return square
}

function isSolved(matrix){
  for (let i=0; i<SIZE; i++){
    for (let j=0; j<SIZE; j++){
      if (!testMatrixCell(matrix, i, j)) return false
    }
  }
  return true
}

function printMatrix(matrix){
  let output ='*-----------*-----------*-----------*\n'
  for (let i=0; i<SIZE; i++){
    let line = '| '
    for (let j=0; j<SIZE; j++){
      line = line + ' ' + matrix[i][j] + ' ';
      if (j%3 === 2) line += ' | '
      
    } 
    output = output + line +'\n'
    if (i%3 === 2) output += '*-----------*-----------*-----------*\n'
  }
  console.log(output)
  return output
}
 module.exports = function solveSudoku(matrix, row=0, col=0) {  
// function solveSudoku(matrix, col = 0, row = 0) {
  if (isSolved(matrix)) return matrix;
  row++;
  if (row > SIZE -1){
    col++
    row = 0;
  }
  if (col >= SIZE-1 && row >= SIZE-2) return false;
  for (let i=0; i<SIZE; i++){
    for (let j=0; j<SIZE; j++){
      if (matrix[i][j] === 0){
        for(let test = 1; test <=9; test++){
          if(testMatrixCell(matrix, i, j, test)){
            //console.log('test=',test);
            //console.log('i=',i,' j=',j);
            matrix[i][j] = test;
            // console.log(i,j);
            // printMatrix(matrix);
            const solution = solveSudoku(matrix, i,j);
            //console.log(i,j,test,solution)
            if (solution) return solution
            matrix[i][j] = 0
          } 
          
        }
        if (matrix[i][j] === 0) return false
      }
    }
  }
  return false
}

// const initial = [
//   [5, 3, 4, 6, 7, 8, 9, 0, 0],
//   [6, 7, 2, 1, 9, 5, 3, 4, 8],
//   [1, 9, 8, 3, 4, 2, 5, 6, 7],
//   [8, 5, 9, 7, 6, 1, 4, 2, 3],
//   [4, 2, 6, 8, 5, 3, 7, 9, 1],
//   [7, 1, 3, 9, 2, 4, 8, 5, 6],
//   [9, 6, 1, 5, 3, 7, 2, 8, 4],
//   [2, 8, 7, 4, 1, 9, 6, 3, 5],
//   [3, 4, 5, 2, 8, 6, 1, 7, 9]
// ];
const initial = [
  [6, 5, 0, 7, 3, 0, 0, 8, 0],
  [0, 0, 0, 4, 8, 0, 5, 3, 0],
  [8, 4, 0, 9, 2, 5, 0, 0, 0],
  [0, 9, 0, 8, 0, 0, 0, 0, 0],
  [5, 3, 0, 2, 0, 9, 6, 0, 0],
  [0, 0, 6, 0, 0, 0, 8, 0, 0],
  [0, 0, 9, 0, 0, 0, 0, 0, 6],
  [0, 0, 7, 0, 0, 0, 0, 5, 0],
  [1, 6, 5, 3, 9, 0, 4, 7, 0]
];
// const m = solveSudoku(initial)
// printMatrix(m)
// function isSolvedTEST(initial, sudoku) {
//   for (let i = 0; i < 9; i++) {
//     let [r,c] = [Math.floor(i/3)*3,(i%3)*3];
//     if (
//         (sudoku[i].reduce((s,v)=>(s.delete(v), s), new Set(DIGITS)).size != 0) ||
//         (sudoku.reduce((s,v)=>(s.delete(v[i]), s), new Set(DIGITS)).size != 0) ||
//         (sudoku.slice(r,r+3).reduce((s,v)=>v.slice(c,c+3).reduce((s,v)=>(s.delete(v), s), s), new Set(DIGITS)).size != 0)
//       ) return false;
//   }
//   return initial.every((row, rowIndex) => {
//     return row.every((num, colIndex) => {
//       return num === 0 || sudoku[rowIndex][colIndex] === num;
//     });
//   });
// }
// console.log(isSolvedTEST(initial,m))

//  module.exports = function solveSudoku(matrix) {
// your solution