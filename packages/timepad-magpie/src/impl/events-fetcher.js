// @flow

// lib
import {Injectable} from 'container-ioc';

// app
import TimePadEventsFetcher from '../events-fetcher';
import ApiTimePadEventsFetcher from '../api/events-fetcher';
import stripHtml from './utils/stripHtml';
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
    return apiEvents.map(TimePadEventsFetcherImpl._createEvent);
  }

  static _createEvent(apiEvent: IApiTimePadEvent): ITimePadEvent {
    const description = apiEvent.description_html
      ? stripHtml(apiEvent.description_html)
      : apiEvent.description_short;

    return {
      id: apiEvent.id,
      name: apiEvent.name,
      description,
    };
  }
}
