class Trie {
  constructor() {
    this.head = {
      children: {}
    };
  }

  add(key) {
    let curIndex = 0,
      curNode = this.head;
    while(typeof curNode.children[key[curIndex]] !== "undefined" && curIndex < key.length) {
      curNode = curNode.children[key[curIndex]];
      curIndex += 1;
    }
    while(curIndex < key.length) {
      curNode.children[key[curIndex]] = {
        wordEnd: curIndex === key.length - 1,
        children: {}
      };
      curNode = curNode.children[key[curIndex]];
      curIndex += 1;
    }
  }

  search(key) {
    let curIndex = 0,
      curNode = this.head;
    while(typeof curNode.children[key[curIndex]] !== "undefined" && curIndex < key.length) {
      curNode = curNode.children[key[curIndex]];
      if(curIndex === key.length - 1 && curNode.wordEnd) {
        return { status: true, hasWordChain: this.hasProperties(curNode.children) };
      }

      curIndex += 1;
    }
    let hasWordChain;
    if(curIndex < key.length - 1) {
      hasWordChain = typeof curNode.children[key[curIndex]] !== "undefined";
    }
    else {
      hasWordChain = this.hasProperties(curNode.children);
    }
    return { status: false, hasWordChain };
  }

  hasProperties(o) {
    for(let prop in o) {
      if(o.hasOwnProperty(prop))
        return true;
    }

    return false;
  }
}

module.exports = Trie;
