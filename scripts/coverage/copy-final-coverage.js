'use strict';

const glob = require('glob');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

//TODO: get it from passed arguments
const OUTPUT_DIR = '.final_coverage';

makeCleanDir(OUTPUT_DIR);

const options = {
  ignore: 'packages/**/node_modules/**/coverage/coverage-final.json'
};

glob('packages/**/coverage/coverage-final.json', options, function (err, files) {
  const copyFileCommands = files.map(createCopyFileCommand);
  copyFileCommands.forEach(({ from, to }) => fs.copyFileSync(from, to));
  console.log(`${copyFileCommands.length} files are copied`);
});

function createCopyFileCommand(file) {
  return {
    from: file,
    to: path.join(OUTPUT_DIR, flattenPath(file)),
  };
}

function flattenPath(file) {
  const segments = file.split(path.sep);
  return segments.join('_');
}

function makeCleanDir(dir) {
  rimraf.sync(dir);
  fs.mkdirSync(dir);
}
