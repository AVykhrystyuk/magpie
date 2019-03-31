/* eslint-disable max-len */
/* eslint-disable flowtype/no-types-missing-file-annotation */

declare module 'xlsx' {
  /**
   * Type of generated workbook
   * @default 'xlsx'
   */
  declare export type BookType = 'xlsx' | 'xlsm' | 'xlsb' | 'xls' | 'xla' | 'biff8' | 'biff5' | 'biff2' | 'xlml' | 'ods' | 'fods' | 'csv' | 'txt' | 'sylk' | 'html' | 'dif' | 'rtf' | 'prn' | 'eth';


  declare export interface WorkSheet /* extends Sheet */ {
    /* empty as not needed */
  }

  declare export interface WorkBook {
    /* empty as not needed */
  }


  declare export interface CommonOptions {
    /* empty as not needed */
  }

  declare export interface AOA2SheetOpts extends CommonOptions /* , DateNFOption */ {
    /* empty as not needed */
  }

  /** Options for write and writeFile */
  declare export interface WritingOptions extends CommonOptions {
    /** Output data encoding */
    type?: 'base64' | 'binary' | 'buffer' | 'file' | 'array' | 'string';

    /**
     * File format of generated workbook
     * @default 'xlsx'
     */
    bookType?: BookType;
  }

  /** General utilities */
  declare export interface XLSX$Utils {
    /* --- Import Functions --- */

    /** Converts an array of arrays of JS data to a worksheet. */
    aoa_to_sheet<T>(data: T[][], opts?: AOA2SheetOpts): WorkSheet;
    aoa_to_sheet(data: any[][], opts?: AOA2SheetOpts): WorkSheet;

    /* --- General Utilities --- */

    /** Creates a new workbook */
    book_new(): WorkBook;

    /** Append a worksheet to a workbook */
    book_append_sheet(workbook: WorkBook, worksheet: WorkSheet, name?: string): void;
  }

  /** Attempts to write the workbook data */
  declare export function write(data: WorkBook, opts?: WritingOptions): any;

  /** Utility Functions */
  declare export var utils: XLSX$Utils;
}
