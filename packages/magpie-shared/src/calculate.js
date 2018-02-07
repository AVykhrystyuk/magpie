// @flow

// app
import type {IData} from './data.js.flow';

export default function calculate(data: IData): number {
  return data.value1 + data.value2;
}
