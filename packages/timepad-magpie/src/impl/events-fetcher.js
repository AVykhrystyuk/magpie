/* eslint-disable no-irregular-whitespace,max-len */
// @flow

// lib
import {Injectable} from 'container-ioc';

// app
import TimePadEventsFetcher from '../events-fetcher';
import ApiTimePadEventsFetcher from '../api/events-fetcher';
import sanitizeHtml, {stripHtml} from './utils/sanitize-html';
import type {IApiTimePadEvent} from '../api/event.js.flow';
import type {ITimePadEvent} from '../event.js.flow';

@Injectable([ApiTimePadEventsFetcher])
export default class TimePadEventsFetcherImpl extends TimePadEventsFetcher {
  _eventsFetcher: ApiTimePadEventsFetcher;

  constructor(eventsFetcher: ApiTimePadEventsFetcher) {
    super();
    this._eventsFetcher = eventsFetcher;
  }

  async fetchEvents(): Promise<ITimePadEvent[]> {
    const apiEvents = await this._eventsFetcher.fetchEvents();
    return apiEvents
      .filter(TimePadEventsFetcherImpl._filterEvent)
      .map(TimePadEventsFetcherImpl._createEvent);
  }

  static _filterEvent(apiEvent: IApiTimePadEvent): boolean {
    const descriptionText = apiEvent.description_html
      ? stripHtml(apiEvent.description_html)
      : apiEvent.description_short;

    return descriptionText != null;
  }

  static _createEvent(apiEvent: IApiTimePadEvent): ITimePadEvent {
    const descriptionSanitizedHtml = apiEvent.description_html
      ? sanitizeHtml(apiEvent.description_html)
      : '';

    return {
      id: apiEvent.id,
      name: apiEvent.name,
      descriptionHtml: descriptionSanitizedHtml,
      __description_html__: apiEvent.description_html,
      __description_short__: apiEvent.description_short,
    };
  }
}
