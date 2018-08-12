/* eslint-disable no-irregular-whitespace,max-len,camelcase */
// @flow

// lib
import os from 'os';

// app
import {Injectable} from '../ioc';
import TimePadEventsFetcher from '../events-fetcher';
import ApiTimePadEventsFetcher from '../api/events-fetcher';
import {stripHtml, sanitizeHtml, stripLinks, removeZeroWidthSpace, isWhitespaceOrEmpty} from './utils';
import type {IApiTimePadEvent} from '../api/event';
import type {ITimePadEvent} from '../event';

function hasName(apiEvent: IApiTimePadEvent): boolean {
  return !isWhitespaceOrEmpty(apiEvent.name);
}

function createEvent(apiEvent: IApiTimePadEvent): ITimePadEvent {
  const {
    id, name, description_html, description_short
  } = apiEvent;

  const description = removeZeroWidthSpace(description_short + os.EOL + description_html);
  const descriptionHtml = sanitizeHtml(description);
  const sanitizedDescription = stripLinks(stripHtml(description));

  return {
    id,
    name,
    sanitizedDescription,
    descriptionHtml,
    __api__: apiEvent,
  };
}

function hasDescription(event: ITimePadEvent): boolean {
  const {descriptionHtml, sanitizedDescription} = event;
  return !isWhitespaceOrEmpty(descriptionHtml) && !isWhitespaceOrEmpty(sanitizedDescription);
}

@Injectable([ApiTimePadEventsFetcher])
export default class TimePadEventsFetcherImpl extends TimePadEventsFetcher {
  _apiEventsFetcher: ApiTimePadEventsFetcher;

  constructor(apiEventsFetcher: ApiTimePadEventsFetcher) {
    super();
    this._apiEventsFetcher = apiEventsFetcher;
  }

  async fetchEvents(): Promise<ITimePadEvent[]> {
    const apiEvents = await this._apiEventsFetcher.fetchEvents();
    return apiEvents
      .filter(hasName)
      .map(createEvent)
      .filter(hasDescription);
  }
}
