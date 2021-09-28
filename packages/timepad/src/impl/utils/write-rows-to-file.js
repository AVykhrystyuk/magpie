// @flow strict

import fs from 'fs';
import { promisify } from 'util';
import { write, utils } from 'xlsx';

const writeFile = promisify(fs.writeFile);

export function writeRowsToFile(
  rows: Array<Array<string>>,
  filename: string = 'rows.xlsx'
): Promise<*> {
  const worksheet = utils.aoa_to_sheet(rows);

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const buffer = write(workbook, { type: 'buffer', bookType: 'xlsx' });
  return writeFile(filename, buffer);

  // writeFile(workbook, 'SheetJS.xlsx');
}
