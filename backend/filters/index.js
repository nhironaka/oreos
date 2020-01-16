const fs = require('fs');

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(JSON.parse(data));
    });
  })

}

module.exports = { readFile };