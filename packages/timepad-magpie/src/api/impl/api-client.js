/* eslint-disable class-methods-use-this */
// @flow

// lib
import axios from 'axios';
import type {$AxiosXHR, Axios} from 'axios';

// app
import {Injectable} from '../../ioc';
import TimePadApiClient from '../api-client';
import type {IApiTimePadRequestParams, IApiTimePadEventsResponse} from '../api-client';
import categories from './config/categories.json';
import excludedOrganizations from './config/excluded-organizations.json';

interface IInternalApiTimePadRequestParams {
  limit: number;
  skip: number;
  category_ids: string;
  fields: string;
  organization_ids_exclude?: string;
  starts_at_min?: string;
}

const commaJoin = <T>(array: T[]): string => array.join(',');

const MAX_REQUESTS_PER_MINUTE: number = 60; // max limit allowed by timePad
const MAX_RECORDS_PER_REQUEST: number = 100; // max limit allowed by timePad

@Injectable()
export default class TimePadApiClientImpl extends TimePadApiClient {
  _apiClient: Axios = axios.create({
    baseURL: 'https://api.timepad.ru/v1/',
  });

  _defaultParams: IInternalApiTimePadRequestParams = {
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

  async fetchEvents(params: IApiTimePadRequestParams): Promise<IApiTimePadEventsResponse> {
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
    const response: $AxiosXHR<IApiTimePadEventsResponse> = await this._apiClient.get(
      '/events.json',
      requestConfig
    );
    return response.data;
  }
}
