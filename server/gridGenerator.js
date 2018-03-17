class GridGenerator {
  constructor() {
    this.size = 4;
    const minFrequency = 0.045;
    const frequencies = [
      {
        character: "A",
        score: 11.6
      },
      {
        character: "B",
        score: 4.4
      },
      {
        character: "C",
        score: 5.2
      },
      {
        character: "D",
        score: 3.1
      },
      {
        character: "E",
        score: 2.8
      },
      {
        character: "F",
        score: 4
      },
      {
        character: "G",
        score: 1.6
      },
      {
        character: "H",
        score: 4.2
      },
      {
        character: "I",
        score: 7.2
      },
      {
        character: "J",
        score: 0.5
      },
      {
        character: "K",
        score: 0.4
      },
      {
        character: "L",
        score: 2.4
      },
      {
        character: "M",
        score: 3.8
      },
      {
        character: "N",
        score: 2.2
      },
      {
        character: "O",
        score: 7.6
      },
      {
        character: "P",
        score: 4.3
      },
      {
        character: "Q",
        score: 0.2
      },
      {
        character: "R",
        score: 2.8
      },
      {
        character: "S",
        score: 6.6
      },
      {
        character: "T",
        score: 16
      },
      {
        character: "U",
        score: 1.18
      },
      {
        character: "V",
        score: 0.8
      },
      {
        character: "W",
        score: 5.5
      },
      {
        character: "X",
        score: 0.045
      },
      {
        character: "Y",
        score: 0.76
      },
      {
        character: "Z",
        score: 0.045
      }
    ];
    this.alphabets = [];
    let count = 0;
    for (let i = 0; i<frequencies.length; i++) {
      count = parseInt(frequencies[i].score/minFrequency);
      for(let j=0; j<count; j++) {
        this.alphabets.push(frequencies[i]);
      }
    }
  }

  generate() {
    let grid = [];
    for(let i = 0; i < this.size; i++) {
      let row = [];
      for(let j = 0; j < this.size; j++) {
        const probability = Math.random();
        let index = this.getRandomInt(0, this.alphabets.length - 1);
        row.push(this.alphabets[index]);
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
