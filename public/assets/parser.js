const fs = require('fs');
const path = require('path');
const readline = require('readline');
const xml2js = require('xml2js');

const parser = {
  data: null,
  filePath: null,
  isXML: null,

  init(filePath) {
    this.filePath = filePath;
    this.isXML = this.isXMLFile(filePath);
    this.data = this.parseFile(filePath);
  },

  isXMLFile(filePath) {
    const fileExt = path.extname(filePath);
    return fileExt === '.xml';
  },

  parseFile(filePath) {
    if (this.isXML) {
      return this.parseXML(filePath);
    } else {
      return this.parseJSON(filePath);
    }
  },

  parseXML(filePath) {
    const xmlString = fs.readFileSync(filePath, 'utf-8');
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
      parser.parseString(xmlString, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  parseJSON(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  },

  getData() {
    return this.data;
  }
};

module.exports = parser;