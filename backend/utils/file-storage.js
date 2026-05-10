const fs = require("fs/promises");
const path = require("path");

async function readJson(filePath) {
  const absolutePath = path.resolve(filePath);
  const content = await fs.readFile(absolutePath, "utf8");
  return JSON.parse(content);
}

async function writeJson(filePath, data) {
  const absolutePath = path.resolve(filePath);
  await fs.writeFile(absolutePath, JSON.stringify(data, null, 2), "utf8");
}

module.exports = {
  readJson,
  writeJson,
};
