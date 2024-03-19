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

//could be detrcutured
cat(argv[2]);