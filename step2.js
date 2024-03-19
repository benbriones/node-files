"use strict";

const fsP = require('fs/promises');

const argv = process.argv;

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
    let urlPromise = await fetch(`${path}`); // change to response
    const promiseData = await urlPromise.text(); //
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

if (isValidUrl(argv[2])) {
  webCat(argv[2])
} else {
  cat(argv[2])
}

/*
Add a new function, webCat. This should take a URL and, using fetch, should read the content of
that URL and print it to the console.

Modify the code that invoked cat so that, based on the command-line args, it decides
whether the argument is a file path or a URL and calls either cat or webCat, respectively.
This doesn’t need to be complicated; don’t forget about the URL class that JavaScript provides.
*/