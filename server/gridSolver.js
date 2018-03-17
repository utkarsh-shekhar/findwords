class GridSolver {
  constructor() {
    this.directions = {
      NORTH: [0, -1],
      SOUTH: [0, 1],
      EAST: [1, 0],
      WEST: [-1, 0],
      NORTHEAST: [-1, 1],
      NORTHWEST: [-1, -1],
      SOUTHEAST: [1, 1],
      SOUTHWEST: [1, -1]
    };
    this.count = 0;
    this.wordList = [];
  }

  nextCordinate(x, y, direction) {
    let cordinate = this.directions[direction];
    return [x + cordinate[0], y + cordinate[1]];
  }

  isUsedCordinate(x, y, usedCordinates) {
    for(let i = 0; i < usedCordinates.length; i++) {
      if(x === usedCordinates[i][0] && y === usedCordinates[i][1]) {
        return true;
      }
    }
    return false;
  }

  isValidCordinate(x, y) {
    if(x < 0 || x >= this.size || y < 0 || y >= this.size) {
      return false;
    }
    return true;
  }

  findWords(x, y, prevWord = "", usedCordinates = []) {
    if(!this.isValidCordinate(x, y) || this.isUsedCordinate(x, y, usedCordinates)) return;

    usedCordinates.push([x, y]);
    let word = prevWord + this.grid[x][y].character;
    let wordStatus = this.dictionary.search(word);
    console.log(word, wordStatus)
    if(wordStatus.status){
      this.count++;
      this.wordList.push(word);
    }

    if(!wordStatus.hasWordChain) return;
    Object.keys(this.directions).forEach((direction) => {
      let cordinate = this.nextCordinate(x, y, direction);
      this.findWords(cordinate[0], cordinate[1], word, usedCordinates);
    });
  }

  solve(grid, dictionary) {
    this.grid = grid;
    this.size = grid.length;
    this.dictionary = dictionary;
    for(let i = 0; i < this.size; i++) {
      for(let j = 0; j < this.size; j++) {
        this.findWords(i, j);
      }
    }

    return this.wordList;
  }
}

module.exports = GridSolver;
