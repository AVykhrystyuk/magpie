// @flow

// lib
import axios from 'axios';
import type { Axios } from 'axios';

// app
import categories from './config/categories.json';
import excludedOrganizations from './config/excluded-organizations.json';
import type { ITimePadEvent } from './event.js.flow';

export interface ITimePadApiRequestParams {
    limit: number,
    skip: number,
}

export interface ITimePadEventsResponse {
    total: number,
    values: ITimePadEvent[],
}

export default class TimePadApiClient {
    _apiClient: Axios;

    constructor() {
        this._apiClient = axios.create({
            baseURL: 'https://api.timepad.ru/v1/'
        });
    }

    async fetchEvents(params: ITimePadApiRequestParams) : Promise<ITimePadEventsResponse> {
        const requestConfig = {
            params: {
                ...params,
                category_ids: categories.map(c => c.id),
                fields: ['location', 'organization', 'description_short', 'description_html'],
                // starts_at_min: '2017-01-01',
                organization_ids_exclude: excludedOrganizations.map(o => o.id)
            }
        };
        const response = await this._apiClient.get('/events.json', requestConfig);
        return response.data;
    }
}