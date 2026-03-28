// parser.js

const fs = require('fs');
const path = require('path');

class Parser {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = {};
  }

  async parse() {
    const fileBuffer = await fs.promises.readFile(this.filePath);
    const fileData = fileBuffer.toString('utf8');
    this.data = JSON.parse(fileData);
  }

  get data() {
    return this._data;
  }
}

module.exports = Parser;