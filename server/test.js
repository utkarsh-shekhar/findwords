const GridGenerator = require("./gridGenerator.js");
const GridSolver = require("./gridSolver.js");
const Trie = require("./trie.js");
const fs = require("fs");

const generator = new GridGenerator();
const solver = new GridSolver();
const dictionary = new Trie();

const words = fs.readFileSync(__dirname + "/wordlist.txt", "utf-8")
  .split("\n")
  .filter(Boolean);

words.forEach(word => dictionary.add(word));

var uniqEs6 = (arrArg) => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });
}

let grid = generator.generate();
let wordlist = uniqEs6(solver.solve(grid, dictionary));
let countGreaterThan3 = wordlist.filter(word => word.length > 3).length;
while (wordlist.length < 35) {
  grid = generator.generate();
  wordlist = solver.solve(grid, dictionary);
  countGreaterThan3 = wordlist.filter(word => word.length > 3).length;
}

console.log(grid)
console.log("wordlist", wordlist);
