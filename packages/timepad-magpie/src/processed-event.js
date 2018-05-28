// @flow

// app
import type {ITimePadEvent} from './event';

export interface IProcessedTimePadEvent {
  event: ITimePadEvent;
  blackListedWords: string[];
  detectedTagIds: string[];
}
