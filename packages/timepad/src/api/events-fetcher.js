/* eslint-disable class-methods-use-this */
// @flow strict

// app
import type { IApiTimePadEvent } from './event';

export class ApiTimePadEventsFetcher {
  fetchEvents(): Promise<IApiTimePadEvent[]> {
    throw new TypeError('Abstract method');
  }
}
