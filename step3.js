"use strict";

const fsP = require('fs/promises');

const [, , arg1, file1, content] = process.argv;

/** takes text file, reads it and returns contents */

async function cat(path) {
  try {
    let contents = await fsP.readFile(path, 'utf8');
    console.log(contents);
  } catch (err) {
    console.log("error! error code=", err.code);
    process.exit(1);
  }
}


/** Logs the content of a website */
async function webCat(path) {
  try {
    let urlPromise = await fetch(`${path}`);
    const promiseData = await urlPromise.text();
    console.log(promiseData);
  } catch (err) {
    console.log("error! error code=", err.code);
    process.exit(1);
  }
}

// console.log('$$$$$$$$$$$', new URL(argv[2]) === true);

/** Determines if URL is valid */
function isValidUrl(arg) {
  try {
    new URL(arg);
    return true;
  } catch (err) {
    return false;
  }
}

async function writeOutput() {
  try {
    await fsP.writeFile(file1, content, "utf8");
  } catch (err) {
    console.log("error! error code=", err);
    process.exit(1);
  }
}


if (arg1 === '--out') {
  writeOutput()
} else {

  if (isValidUrl(arg1)) {
    webCat(arg1);
  } else {
    cat(arg1);
  }

}
