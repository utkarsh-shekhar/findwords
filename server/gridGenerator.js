class GridGenerator {
  constructor() {
    this.size = 4;
    this.vowels = [
          {
        character: "A",
        score: 1
      },
      {
        character: "E",
        score: 1
      },
      {
        character: "I",
        score: 1
      },
      {
        character: "O",
        score: 1
      },
      {
        character: "U",
        score: 1
      },
    ];
    this.consonants = [
      {
        character: "B",
        score: 1
      },
      {
        character: "C",
        score: 1
      },
      {
        character: "D",
        score: 1
      },
      {
        character: "F",
        score: 1
      },
      {
        character: "G",
        score: 1
      },
      {
        character: "H",
        score: 1
      },
      {
        character: "J",
        score: 1
      },
      {
        character: "K",
        score: 1
      },
      {
        character: "L",
        score: 1
      },
      {
        character: "M",
        score: 1
      },
      {
        character: "N",
        score: 1
      },
      {
        character: "P",
        score: 1
      },
      {
        character: "Q",
        score: 1
      },
      {
        character: "R",
        score: 1
      },
      {
        character: "S",
        score: 1
      },
      {
        character: "T",
        score: 1
      },
      {
        character: "V",
        score: 1
      },
      {
        character: "W",
        score: 1
      },
      {
        character: "X",
        score: 1
      },
      {
        character: "Y",
        score: 1
      },
      {
        character: "Z",
        score: 1
      }
    ];
  }

  generate() {
    let grid = [];
    for(let i = 0; i < this.size; i++) {
      let row = [];
      for(let j = 0; j < this.size; j++) {
        const probability = Math.random();
        let index, alphabetArray;
        if(probability < 0.4) {
          index = this.getRandomInt(0, this.vowels.length - 1);
          alphabetArray = this.vowels;
        } else {
          index = this.getRandomInt(0, this.consonants.length - 1);
          alphabetArray = this.consonants;
        }
        row.push(alphabetArray[index]);
      }
      grid.push(row);
    }
    return grid;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = GridGenerator;
