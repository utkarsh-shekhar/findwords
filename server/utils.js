function generateGrid() {
  return {
    "grid": [
      [{"character": "A", "score": 1},{"character": "A", "score": 1},{"character": "A", "score": 1},{"character": "A", "score": 1}],
      [{"character": "A", "score": 1},{"character": "A", "score": 1},{"character": "A", "score": 1},{"character": "A", "score": 1}],
      [{"character": "A", "score": 1},{"character": "A", "score": 1},{"character": "A", "score": 1},{"character": "A", "score": 1}],
      [{"character": "A", "score": 1},{"character": "A", "score": 1},{"character": "A", "score": 1},{"character": "A", "score": 1}]
    ],
    "count": 10,
    "word_list": ["ABC"]
  };
}

function getScore(list, word) {
  return 10;
}

module.exports = {
  "generateGrid": generateGrid,
  "getScore": getScore
}