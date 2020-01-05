export default function solver(input) {
  function isValidSudoku(board) {
    console.log(board)
    for (let i = 0; i < 9; i++) {
      if (!checkLinear(i, board, 'vertical')) {
        return false;
      }
      for (let j = 0; j < 9; j++) {
        if (i % 3 === 0 && j % 3 === 0 && !checkSquare([i, j], board)) {
          return false;
        }
        if (!checkLinear(j, board, 'horizontal')) {
          return false;
        }
      }
    }
    return true;
  }

  function checkSquare([x, y], board) {
    const seen = {};
    for (let i = x; i < x + 3; i++) {
      for (let j = y; j < y + 3; j++) {
        if (seen[board[i][j]]) {
          return false;
        }
         if (board[i][j] !== '.') {
           seen[board[i][j]] = `[${i}, ${j}]`;
         }
      }
    }
    return true;
  }

  function checkLinear(starting, board, direction) {
    const seen = {};
    for (let i = 0; i < 9; i++) {
      const x = direction === 'vertical' ? starting : i;
      const y = direction === 'vertical' ? i : starting;
      if (seen[board[x][y]]) {
        return false;
      }
       if (board[x][y] !== '.') {
        seen[board[x][y]] = `[${x}, ${y}]`;
      }
    }
    return true;
  }

  return JSON.stringify(isValidSudoku(...input));
}
