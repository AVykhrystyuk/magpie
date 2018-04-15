/* eslint-disable no-console */
// @flow

// lib
import {Injectable} from 'container-ioc';
import {TagDetector, BlackListedWordsFinder} from 'magpie-shared';

// app
import TimePadEventsFetcher from './events-fetcher';

@Injectable([TimePadEventsFetcher])
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
    const blackListedWords = this._blackListedWordsFinder.find('Курс по С#');
    console.log('[BlackListedWordsFinder]:', blackListedWords);

    const tagIds = this._tagDetector.detectAll('Go to Piter.JS meetup');
    console.log('[TagDetector]:', tagIds);

    const events = await this._timePadEventsFetcher.fetchEvents();
    console.log('Done grabbing timePad events');
    console.log('Total grabbed events count: ', events.length);

    console.log();
    console.log(events.slice(0, 2));
  }
}
