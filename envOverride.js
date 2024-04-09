const fs = require("fs");

const basePath = process.cwd();
const inputEnvFile = `${basePath}/${process.argv[2]}`;
const localEnvFile = `${basePath}/.env.local`;

fs.readFile(inputEnvFile, "utf-8", (error, fileData) => {
  if (error) {
    throw error;
  } else {
    const data = JSON.parse(fileData);
    let fileDataInArray = [];
    for (let key in data) {
      let keyValuePairs = `${key}=${data[key]}`;
      fileDataInArray.push(keyValuePairs);
    }
    fs.writeFileSync(
      localEnvFile,
      fileDataInArray.join("\n").toString(),
      (error) => {
        if (error) throw error;
      }
    );
  }
});
