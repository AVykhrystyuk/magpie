/* eslint-disable no-console */
// @flow

// lib
import {Injectable} from 'container-ioc';

// app
import TimePadEventsFetcher from './events-fetcher';

@Injectable([TimePadEventsFetcher])
export default class App {
  _timePadEventsFetcher: TimePadEventsFetcher;

  constructor(timePadEventsFetcher: TimePadEventsFetcher) {
    this._timePadEventsFetcher = timePadEventsFetcher;
  }

  async run(): Promise<*> {
    const events = await this._timePadEventsFetcher.fetchEvents();
    console.log('Done grabbing timePad events');
    console.log('Total grabbed events count: ', events.length);

    console.log();
    console.log(events.slice(0, 2));
  }
}
