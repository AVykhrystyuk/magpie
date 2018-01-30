// @flow

// app
import ApiTimePadEventsFetcher from './api/events-fetcher';
import stripHtml from './utils/stripHtml';
import type {IApiTimePadEvent} from './api/event.js.flow';
import type {ITimePadEvent} from './event.js.flow';

export default class TimePadEventsFetcher {
  _eventsFetcher: ApiTimePadEventsFetcher;

  constructor(eventsFetcher: ApiTimePadEventsFetcher) {
    this._eventsFetcher = eventsFetcher;
  }

  async fetchEvents(): Promise<ITimePadEvent[]> {
    const apiEvents = await this._eventsFetcher.fetchEvents();
    return apiEvents.map(TimePadEventsFetcher._createEvent);
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
