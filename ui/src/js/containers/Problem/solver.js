export default function solver(input) {
  function exist(board, word) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === word[0]) {
          const used = new Map([[`${i}-${j}`, true]]);
          if (checkSurrounding([i, j], board, word, 1, used)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  function check(starting, xd, yd, board, word, charIndex, used) {
    const [x, y] = starting;
    if (board[x + xd] && board[x + xd][y + yd] === word[charIndex] && !used.get(`${x + xd}-${y + yd}`)) {
      used.set(`${x + xd}-${y + yd}`, true);
      return checkSurrounding([x + xd, y + yd], board, word, charIndex + 1, used);
    }
    if (used.get(`${x + xd}-${y + yd}`)) {
      console.log(x + xd, y + yd, x, y);
    }
    return false;
  }

  function checkSurrounding(starting, board, word, charIndex, used) {
    if (charIndex === word.length) {
      return true;
    }
    let exists = false;
    // Check right
    exists = check(starting, 0, 1, board, word, charIndex, new Map(used));
    // Check bottom
    exists = exists || check(starting, 1, 0, board, word, charIndex, new Map(used));
    // Check bottom right
    exists = exists || check(starting, 1, 1, board, word, charIndex, new Map(used));
    // Check left
    exists = exists || check(starting, 0, -1, board, word, charIndex, new Map(used));
    // Check top
    exists = exists || check(starting, -1, 0, board, word, charIndex, new Map(used));
    // Check top left
    exists = exists || check(starting, -1, -1, board, word, charIndex, new Map(used));

    return exists;
  }

  return JSON.stringify(exist(...input));
}
