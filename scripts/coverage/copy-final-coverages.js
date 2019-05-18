/* eslint-disable no-console, import/no-extraneous-dependencies */
// eslint-disable-next-line strict, lines-around-directive
'use strict';

const globOriginal = require('glob');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const rimraf = require('rimraf');

const copyFile = promisify(fs.copyFile);
const glob = promisify(globOriginal);

const TARGET_DIR_OPTION_NAME = '--target-dir';

(async function main() {
  const targetFolder = getTargetFolderFromProcessArguments(TARGET_DIR_OPTION_NAME);
  if (targetFolder == null) {
    throw new Error(`Target folder is not specified, please use '${TARGET_DIR_OPTION_NAME}' argument`);
  }

  makeCleanFolder(targetFolder);

  const copyFileCommands = await copyFinalCoverages(targetFolder);
  if (copyFileCommands.length < 1) {
    throw new Error('No final coverage files found. Make sure tests are run for individual packages');
  }

  console.log(`${copyFileCommands.length} files are copied:`);
  copyFileCommands.forEach(({ from, to }) => {
    console.log(`${from} -> ${to}`);
  });
}());

async function copyFinalCoverages(targetFolder) {
  const inPackagesGlob = 'packages/**/';

  const options = {
    ignore: `${inPackagesGlob}node_modules/**/coverage/coverage-final.json`
  };
  const filePaths = await glob(`${inPackagesGlob}coverage/coverage-final.json`, options);
  if (filePaths.length < 1) {
    return [];
  }

  const copyFileCommands = filePaths.map(p => createCopyFileCommand(p, targetFolder));
  const promises = copyFileCommands.map(({ from, to }) => copyFile(from, to));
  await Promise.all(promises);

  return copyFileCommands;
}

function createCopyFileCommand(filePath, targetFolder) {
  return {
    from: filePath,
    to: path.join(targetFolder, flattenFilePath(filePath)),
  };
}

function flattenFilePath(filePath) {
  const segments = filePath.split(path.sep);
  return segments.join('_');
}

function makeCleanFolder(folder) {
  rimraf.sync(folder);
  fs.mkdirSync(folder);
}

function getTargetFolderFromProcessArguments(targetDirOptionName) {
  const argv = process.argv.slice(2);
  const index = argv.indexOf(targetDirOptionName);
  if (index < 0) {
    return null;
  }

  return argv[index + 1];
}
