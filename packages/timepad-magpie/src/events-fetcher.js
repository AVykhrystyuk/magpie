/* eslint-disable class-methods-use-this */
// @flow

// app
import type {ITimePadEvent} from './event.js.flow';

export default class TimePadEventsFetcher {
  fetchEvents(): Promise<ITimePadEvent[]> {
    throw new TypeError('Abstract method');
  }
}
