const GridGenerator = require("./gridGenerator.js");
const GridSolver = require("./gridSolver.js");
const Trie = require("./trie.js");
const fs = require("fs");

function generateGrid() {

  const generator = new GridGenerator();
  const solver = new GridSolver();
  const dictionary = new Trie();

  const words = fs.readFileSync(__dirname + "/wordlist.txt", "utf-8")
    .split("\n")
    .filter(Boolean);

  words.forEach(word => dictionary.add(word));

  let grids = [];
  for(let i = 0; i <= 200; i++) {
    let grid = generator.generate();
    let wordlist = solver.solve(grid, dictionary);
    grids.push({
      grid,
      wordlist,
      count: wordlist.length
    });
  }
  let grr = grids.filter((grid) => {
    let greaterThan3Length = grid.wordlist.filter(word => word.length > 3).length;
    return grid.count > 150 && greaterThan3Length > 20;
  });
  return grr[0];
}

function getScore(grid, list, word) {
  let score = 0;
  if(list.includes(word)) {
    word.split("").forEach((char) => {
      score += grid.filter(object => object.character === char).score;
    });
  }
  return score;
}

module.exports = {
  "generateGrid": generateGrid,
  "getScore": getScore
};