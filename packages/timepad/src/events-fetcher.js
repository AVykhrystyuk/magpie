/* eslint-disable class-methods-use-this */
// @flow strict

// app
import type { ITimePadEvent } from './event';

export default class TimePadEventsFetcher {
  fetchEvents(): Promise<ITimePadEvent[]> {
    throw new TypeError('Abstract method');
  }
}
