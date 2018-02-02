/* eslint-disable no-console,no-await-in-loop */
// @flow

// lib
import util from 'util';
import {Injectable} from 'container-ioc';

// app
import ApiTimePadEventsFetcher from '../events-fetcher';

import TimePadApiClient from '../api-client';
import type {IApiTimePadEventsResponse} from '../api-client';
import type {IApiTimePadEvent} from '../event.js.flow';

const delay = setTimeout[util.promisify.custom];

@Injectable([TimePadApiClient])
export default class ApiTimePadEventsFetcherImpl extends ApiTimePadEventsFetcher {
  _timePadApi: TimePadApiClient;
  _requestCountPerMinute: number;
  _recordCountPerRequest: number;

  _fetchedEvents: IApiTimePadEvent[];
  _eventsTotal: number;
  _highestEventsTotal: number;

  constructor(timePadApi: TimePadApiClient) {
    super();
    this._timePadApi = timePadApi;
    this._requestCountPerMinute = 60; // max limit  allowed by timePad
    this._recordCountPerRequest = 100; // max limit  allowed by timePad
  }

  async fetchEvents(): Promise<IApiTimePadEvent[]> {
    this._fetchedEvents = [];
    this._eventsTotal = 0;
    this._highestEventsTotal = 0;

    await this._fetchEachChunksOfEvents();

    return this._fetchedEvents;
  }

  async _fetchEachChunksOfEvents(): Promise<*> {
    await this._fetchNextChunkOfEvents();

    while (this._fetchedEvents.length < this._eventsTotal) {
      this._highestEventsTotal = Math.max(this._highestEventsTotal, this._eventsTotal);

      const requiredRequestCount = Math.ceil(this._highestEventsTotal / this._recordCountPerRequest);
      const delayRequired = requiredRequestCount > this._requestCountPerMinute;
      if (delayRequired) {
        const delayMilliseconds = Math.ceil(60 / this._requestCountPerMinute) * 1000;
        console.log('next request required delay (milliseconds): ', delayMilliseconds);
        await delay(delayMilliseconds);
      }

      await this._fetchNextChunkOfEvents();
    }
  }

  async _fetchNextChunkOfEvents(): Promise<*> {
    const eventsResponse: IApiTimePadEventsResponse = await this._timePadApi.fetchEvents({
      limit: this._recordCountPerRequest,
      skip: this._fetchedEvents.length,
    });

    const {values: events, total} = eventsResponse;

    this._fetchedEvents.push(...events);
    this._eventsTotal = total;

    console.log('fetchedEventsCount', this._fetchedEvents.length);
    console.log('eventsTotal', this._eventsTotal);
    console.log(' ___ ');
  }
}
