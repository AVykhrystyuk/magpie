// @flow

// app
import type {ITimePadEvent} from './event';

export interface IProcessedTimePadEvent {
  event: ITimePadEvent;
  whiteWords: string[];
  blackWords: string[];
  tagIds: string[];
}
