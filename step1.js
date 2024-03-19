"use strict";

const fsP = require('fs/promises');

const argv = process.argv;

/** takes text file, reads it and returns contents */
// TODO: maintain distancing, reduce code in try - what we know will cause an error
async function cat(path) {
  let contents;
  try {
    contents = await fsP.readFile(path, 'utf8');
  } catch (err) {

    console.log("error! error code=", err.code);
    process.exit(1);

  }

  console.log(contents);
}

//could be destructured
cat(argv[2]);
