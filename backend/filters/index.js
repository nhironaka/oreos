const fs = require('fs');

async function readFile(fileName) {
  const data = await fs.readFile(fileName);

  return JSON.parse(data);
}

module.export = {
  readFile,
};