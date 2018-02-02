// @flow

// lib
import axios from 'axios';
import type {Axios} from 'axios';
import {Injectable} from 'container-ioc';

// app
import TimePadApiClient from '../api-client';
import type {IApiTimePadRequestParams, IApiTimePadEventsResponse} from '../api-client';
import categories from './config/categories.json';
import excludedOrganizations from './config/excluded-organizations.json';

interface IInternalApiTimePadRequestParams {
  limit?: number;
  skip?: number;
  category_ids?: string;
  fields?: string;
  organization_ids_exclude?: string;
}

const commaJoin = <T>(array: T[]): string => array.join(',');

@Injectable()
export default class TimePadApiClientImpl extends TimePadApiClient {
  _apiClient: Axios;
  _defaultParams: IInternalApiTimePadRequestParams;

  constructor() {
    super();

    this._apiClient = axios.create({
      baseURL: 'https://api.timepad.ru/v1/',
    });

    this._defaultParams = {
      // starts_at_min: '2017-01-01',
      category_ids: commaJoin(categories.map(c => c.id)),
      fields: commaJoin(['location', 'organization', 'description_short', 'description_html']),
      organization_ids_exclude: commaJoin(excludedOrganizations.map(o => o.id)),
    };
  }

  async fetchEvents(params: IApiTimePadRequestParams): Promise<IApiTimePadEventsResponse> {
    const requestConfig = {
      params: {
        ...this._defaultParams,
        ...params,
      },
    };
    const response = await this._apiClient.get('/events.json', requestConfig);
    return response.data;
  }
}
