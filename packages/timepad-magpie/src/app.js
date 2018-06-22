/* eslint-disable no-console,dot-notation */
// @flow

// lib
import {TagDetector, BlackListedWordsFinder} from 'magpie-shared';
import autobind from 'autobind-decorator';

// app
import {Injectable} from './ioc';
import type {ITimePadEvent} from './event';
import type {IProcessedTimePadEvent} from './processed-event';
import TimePadEventsFetcher from './events-fetcher';
import writeProcessedEventsToFiles from './write-processed-events-to-files';

@Injectable([TimePadEventsFetcher, BlackListedWordsFinder, TagDetector])
export default class App {
  _timePadEventsFetcher: TimePadEventsFetcher;
  _blackListedWordsFinder: BlackListedWordsFinder;
  _tagDetector: TagDetector;

  constructor(
    timePadEventsFetcher: TimePadEventsFetcher,
    blackListedWordsFinder: BlackListedWordsFinder,
    tagDetector: TagDetector
  ) {
    this._timePadEventsFetcher = timePadEventsFetcher;
    this._blackListedWordsFinder = blackListedWordsFinder;
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
    const blackWords = this._findBlackWords(event);
    const tagIds = this._findTagIds(event);
    return {
      event,
      blackListedWords: blackWords,
      detectedTagIds: tagIds,
    };
  }

  _findBlackWords(event: ITimePadEvent): string[] {
    const {name, sanitizedDescription} = event;

    const nameBlackWords = this._blackListedWordsFinder.findAll(name);
    if (nameBlackWords.length !== 0) {
      return nameBlackWords;
    }

    return this._blackListedWordsFinder.findAll(sanitizedDescription);
  }

  _findTagIds(event: ITimePadEvent): string[] {
    const {name, sanitizedDescription} = event;

    const nameTagIds = this._tagDetector.detectAll(name);
    if (nameTagIds.length !== 0) {
      return nameTagIds;
    }

    return this._tagDetector.detectAll(sanitizedDescription);
  }
}
