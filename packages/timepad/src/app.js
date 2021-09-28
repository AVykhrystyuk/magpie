/* eslint-disable no-console */
// @flow strict

// lib
import os from 'os';
import { TagAnalyzer } from '@magpie/shared';

// app
import type { ITimePadEvent } from './event';
import type { IProcessedTimePadEvent } from './processed-event';
import { TimePadEventsFetcher } from './events-fetcher';
import { writeProcessedEventsToFiles } from './write-processed-events-to-files';

export class App {
  _timePadEventsFetcher: TimePadEventsFetcher;
  _tagAnalyzer: TagAnalyzer;

  constructor(timePadEventsFetcher: TimePadEventsFetcher, tagAnalyzer: TagAnalyzer) {
    this._timePadEventsFetcher = timePadEventsFetcher;
    this._tagAnalyzer = tagAnalyzer;
  }

  async run(): Promise<*> {
    const events = await this._timePadEventsFetcher.fetchEvents();
    console.log('Done grabbing timePad events');
    console.log('Total grabbed events count: ', events.length);

    console.log();
    console.log(events.slice(0, 2));

    const processedEvents = events.map(e => this._createProcessedEvent(e));
    await writeProcessedEventsToFiles(processedEvents);
  }

  _createProcessedEvent(event: ITimePadEvent): IProcessedTimePadEvent {
    const { name, sanitizedDescription } = event;
    const text = name + os.EOL + sanitizedDescription;
    const analysisResult = this._tagAnalyzer.analyze(text);

    return {
      event,
      analysisResult,
    };
  }
}
