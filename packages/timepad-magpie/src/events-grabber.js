/* eslint-disable no-console */
// @flow

// lib
import util from 'util';

// app
import type TimePadApiClient, { ITimePadEventsResponse } from './api-client';
import type { ITimePadEvent } from './event.js.flow';

const delay = setTimeout[util.promisify.custom];

export default class TimePadEventsGrabber {
  _timePadApi: TimePadApiClient;
  _requestCountPerMinute: number;
  _recordCountPerRequest: number;

  _fetchedEvents: ITimePadEvent[];
  _eventsTotal: number;
  _highestEventsTotal: number;

  constructor(timePadApi: TimePadApiClient) {
    this._timePadApi = timePadApi;

    this._requestCountPerMinute = 60; // max limit  allowed by timePad
    this._recordCountPerRequest = 100; // max limit  allowed by timePad
  }

  async grabEvents(): Promise<ITimePadEvent[]> {
    this._fetchedEvents = [];
    this._eventsTotal = 0;
    this._highestEventsTotal = 0;

    await this._fetchEachChunksOfEvents();

    return this._fetchedEvents;
  }

  async _fetchEachChunksOfEvents(): Promise<*> {
    await this._fetchNextChunkOfEvents();

    const allRecordFetched = this._fetchedEvents.length >= this._eventsTotal;
    if (!allRecordFetched) {
      this._highestEventsTotal = Math.max(this._highestEventsTotal, this._eventsTotal);

      const requiredRequestCount = Math.ceil(this._highestEventsTotal / this._recordCountPerRequest);
      const delayRequired = requiredRequestCount > this._requestCountPerMinute;
      if (delayRequired) {
        const delayMilliseconds = Math.ceil(60 / this._requestCountPerMinute) * 1000;
        console.log('next request required delay (milliseconds): ', delayMilliseconds);
        await delay(delayMilliseconds);
      }

      await this._fetchEachChunksOfEvents();
    }
  }

  async _fetchNextChunkOfEvents(): Promise<*> {
    const eventsResponse: ITimePadEventsResponse = await this._timePadApi.fetchEvents({
      limit: this._recordCountPerRequest,
      skip: this._fetchedEvents.length,
    });

    const { values: events, total } = eventsResponse;

    this._fetchedEvents.push(...events);
    this._eventsTotal = total;

    console.log('fetchedEventsCount', this._fetchedEvents.length);
    console.log('eventsTotal', this._eventsTotal);
    console.log(' ___ ');
  }
}
