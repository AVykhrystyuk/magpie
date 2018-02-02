/* eslint-disable class-methods-use-this */
// @flow

// app
import type {IApiTimePadEvent} from './event.js.flow';

export default class ApiTimePadEventsFetcher {
  fetchEvents(): Promise<IApiTimePadEvent[]> {
    throw new TypeError('Abstract method');
  }
}
