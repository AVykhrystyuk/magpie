/* eslint-disable no-unused-vars,class-methods-use-this */
// @flow

// app
import type {IApiTimePadEvent} from './event.js.flow';

export interface IApiTimePadRequestParams {
  limit: number;
  skip: number;
}

export interface IApiTimePadEventsResponse {
  total: number;
  values: IApiTimePadEvent[];
}

export default class TimePadApiClient {
  fetchEvents(params: IApiTimePadRequestParams): Promise<IApiTimePadEventsResponse> {
    throw new TypeError('Abstract method');
  }
}
