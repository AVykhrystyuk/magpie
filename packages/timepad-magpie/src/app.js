/* eslint-disable no-console,dot-notation */
// @flow

// lib
import {TagDetector, BlackListedWordsFinder, WhiteListedWordsFinder} from 'magpie-shared';
import autobind from 'autobind-decorator';

// app
import {Injectable} from './ioc';
import type {ITimePadEvent} from './event';
import type {IProcessedTimePadEvent} from './processed-event';
import TimePadEventsFetcher from './events-fetcher';
import writeProcessedEventsToFiles from './write-processed-events-to-files';

@Injectable([TimePadEventsFetcher, BlackListedWordsFinder, WhiteListedWordsFinder, TagDetector])
export default class App {
  _timePadEventsFetcher: TimePadEventsFetcher;
  _blackListedWordsFinder: BlackListedWordsFinder;
  _whiteListedWordsFinder: WhiteListedWordsFinder;
  _tagDetector: TagDetector;

  constructor(
    timePadEventsFetcher: TimePadEventsFetcher,
    blackListedWordsFinder: BlackListedWordsFinder,
    whiteListedWordsFinder: WhiteListedWordsFinder,
    tagDetector: TagDetector
  ) {
    this._timePadEventsFetcher = timePadEventsFetcher;
    this._blackListedWordsFinder = blackListedWordsFinder;
    this._whiteListedWordsFinder = whiteListedWordsFinder;
    this._tagDetector = tagDetector;
  }

  async run(): Promise<*> {
    const events = await this._timePadEventsFetcher.fetchEvents();
    console.log('Done grabbing timePad events');
    console.log('Total grabbed events count: ', events.length);

    console.log();
    console.log(events.slice(0, 2));

    const processedEvents = events.map(this._createProcessedEvent);
    await writeProcessedEventsToFiles(processedEvents);
  }

  @autobind
  _createProcessedEvent(event: ITimePadEvent): IProcessedTimePadEvent {
    const whiteWords = this._findWhiteWords(event);
    const blackWords = this._findBlackWords(event);
    const tagIds = this._findTagIds(event);
    return {
      event,
      whiteWords,
      blackWords,
      tagIds,
    };
  }

  _findBlackWords(event: ITimePadEvent): string[] {
    const {name, sanitizedDescription} = event;

    const blackWords = this._blackListedWordsFinder.findAll(name);
    if (blackWords.length !== 0) {
      return blackWords;
    }

    return this._blackListedWordsFinder.findAll(sanitizedDescription);
  }

  _findWhiteWords(event: ITimePadEvent): string[] {
    const {name, sanitizedDescription} = event;

    const whiteWords = this._whiteListedWordsFinder.findAll(name);
    if (whiteWords.length !== 0) {
      return whiteWords;
    }

    return this._whiteListedWordsFinder.findAll(sanitizedDescription);
  }

  _findTagIds(event: ITimePadEvent): string[] {
    const {name, sanitizedDescription} = event;

    const tagIds = this._tagDetector.detectAll(name);
    if (tagIds.length !== 0) {
      return tagIds;
    }

    return this._tagDetector.detectAll(sanitizedDescription);
  }
}
