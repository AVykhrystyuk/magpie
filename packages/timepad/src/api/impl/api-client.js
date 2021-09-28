/* eslint-disable class-methods-use-this */
// @flow strict

// lib
import axios from 'axios';
import type { $AxiosXHR, Axios } from 'axios';

// app
import { TimePadApiClient } from '../api-client';
import type { ApiTimePadRequestParams, IApiTimePadEventsResponse } from '../api-client';
// suppressing the follwoing flowlint error until the bug is fixed - https://github.com/facebook/flow/issues/5749
// flowlint untyped-import:off
import categories from './config/categories.json';
import excludedOrganizations from './config/excluded-organizations.json';
// flowlint untyped-import:error

type InternalApiTimePadRequestParams = {|
  limit: number;
  skip: number;
  category_ids: string;
  fields: string;
  organization_ids_exclude?: string;
  starts_at_min?: string;
|};

function commaJoin<T>(array: T[]): string {
  return array.join(',');
}

const MAX_REQUESTS_PER_MINUTE: number = 60; // max limit allowed by timePad
const MAX_RECORDS_PER_REQUEST: number = 100; // max limit allowed by timePad

export class TimePadApiClientImpl extends TimePadApiClient {
  _apiClient: Axios = axios.create({
    baseURL: 'https://api.timepad.ru/v1/',
  });

  _defaultParams: InternalApiTimePadRequestParams = {
    // starts_at_min: '2017-01-01',
    limit: MAX_RECORDS_PER_REQUEST,
    skip: 0,
    category_ids: commaJoin(categories.map(c => c.id)),
    fields: commaJoin(['location', 'organization', 'description_short', 'description_html']),
    organization_ids_exclude: commaJoin(excludedOrganizations.map(o => o.id)),
  };

  get maxRequestsPerMinute(): number {
    return MAX_REQUESTS_PER_MINUTE;
  }

  get maxRecordsPerRequest(): number {
    return MAX_RECORDS_PER_REQUEST;
  }

  async fetchEvents(params: ApiTimePadRequestParams): Promise<IApiTimePadEventsResponse> {
    const requestParams = {
      ...this._defaultParams,
      ...params,
    };

    if (requestParams.limit > MAX_RECORDS_PER_REQUEST) {
      requestParams.limit = MAX_RECORDS_PER_REQUEST;
    }

    const requestConfig = {
      params: requestParams,
    };
    try {
      const response: $AxiosXHR<IApiTimePadEventsResponse> = await this._apiClient.get(
        '/events.json',
        requestConfig
      );
      return response.data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      throw err;
    }
  }
}
