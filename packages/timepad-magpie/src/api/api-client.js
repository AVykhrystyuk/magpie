/* eslint-disable no-unused-vars,class-methods-use-this */
// @flow

// app
import type { IApiTimePadEvent } from './event';

export interface IApiTimePadRequestParams {
  limit: number;
  skip: number;
}

export interface IApiTimePadEventsResponse {
  total: number;
  values: IApiTimePadEvent[];
}

export default class TimePadApiClient {
  get maxRequestsPerMinute(): number {
    throw new TypeError('Abstract getter');
  }

  get maxRecordsPerRequest(): number {
    throw new TypeError('Abstract getter');
  }

  fetchEvents(params: IApiTimePadRequestParams): Promise<IApiTimePadEventsResponse> {
    throw new TypeError('Abstract method');
  }
}
