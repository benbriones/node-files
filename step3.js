"use strict";

const fsP = require('fs/promises');

const [, , arg1, file1, content] = process.argv;

/** takes text file, reads it and returns contents */

async function cat(path, isWriteFlag=false) {
  try {

    let contents = await fsP.readFile(path, 'utf8');

    if (isWriteFlag) {
      return contents;
    }

    console.log(contents);

  } catch (err) {

    console.log("error! error code=", err.code);
    process.exit(1);

  }
}


/** Logs the content of a website */
async function webCat(path, isWriteFlag=false) {
  let response;
  try {

    //TODO: response!!!
    response = await fetch(`${path}`);

  } catch (err) {

    console.log("error! error code=", err.code);
    process.exit(1);

  }
  const promiseData = await response.text();

  if (isWriteFlag) {
    return promiseData;
  }

  console.log(promiseData);
}


/** Determines if URL is valid */
function isValidUrl(arg) {
  try {
    new URL(arg);
    return true;
  } catch (err) {
    return false;
  }
}

/** takes content to write, writes content to be written into file1 */
async function writeOutput(contentToPrint) {

  try {

    await fsP.writeFile(file1, contentToPrint, "utf8");

  } catch (err) {

    console.log("error! error code=", err);
    process.exit(1);

  }
}


/** handles terminal submit  */
async function main() {
  if (isWriteFlag) {
    let contentToPrint;

    if (isValidUrl(content)) {
      contentToPrint = await webCat(content, true);
    } else {
      contentToPrint = await cat(content, true);

    }

    await writeOutput(contentToPrint);

  } else {

    if (isValidUrl(arg1)) {
      await webCat(arg1);
    } else {
      await cat(arg1);
    }

  }
}

main();
