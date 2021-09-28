/* eslint-disable no-console,no-await-in-loop */
// @flow strict

// lib
import { promisify } from 'util';

// app
import { ApiTimePadEventsFetcher } from '../events-fetcher';

import { TimePadApiClient } from '../api-client';
import type { IApiTimePadEventsResponse } from '../api-client';
import type { IApiTimePadEvent } from '../event';

const delay = promisify(setTimeout);

export class ApiTimePadEventsFetcherImpl extends ApiTimePadEventsFetcher {
  _timePadApi: TimePadApiClient;

  _fetchedEvents: IApiTimePadEvent[];
  _eventsTotal: number;
  _highestEventsTotal: number;

  _maxRecordsPerRequest: number;
  _maxRequestsPerMinute: number;

  constructor(timePadApi: TimePadApiClient) {
    super();
    this._timePadApi = timePadApi;

    this._maxRecordsPerRequest = this._timePadApi.maxRecordsPerRequest;
    this._maxRequestsPerMinute = this._timePadApi.maxRequestsPerMinute;
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

      const requiredRequestCount = Math.ceil(this._highestEventsTotal / this._maxRecordsPerRequest);
      const delayRequired = requiredRequestCount > this._maxRequestsPerMinute;
      if (delayRequired) {
        const delayMilliseconds = Math.ceil(60 / this._maxRequestsPerMinute) * 1000;
        console.log('next request required delay (milliseconds): ', delayMilliseconds);
        await delay(delayMilliseconds);
      }

      await this._fetchNextChunkOfEvents();
    }
  }

  async _fetchNextChunkOfEvents(): Promise<*> {
    const eventsResponse: IApiTimePadEventsResponse = await this._timePadApi.fetchEvents({
      limit: this._maxRecordsPerRequest,
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
