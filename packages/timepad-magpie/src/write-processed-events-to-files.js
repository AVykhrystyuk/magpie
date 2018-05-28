// @flow

// lib
import {groupBy} from 'lodash';
// app
import {writeRowsToFile} from './tools';
import type {IProcessedTimePadEvent} from './processed-event';

function convertToRows(processedEvents: IProcessedTimePadEvent[]): Array<string[]> {
  const columns = [
    'Id',
    'Name',
    'BlackListedWords',
    'DetectedTagIds',
    'Description',
    'Description HTML',
  ];
  const rows = processedEvents.map(processedEvent => {
    const {event, blackListedWords, detectedTagIds} = processedEvent;

    return [
      event.id.toString(),
      event.name,
      blackListedWords.join(', '),
      detectedTagIds.join(', '),
      event.sanitizedDescription,
      event.descriptionHtml,
    ];
  });
  return [columns, ...rows];
}

function isProcessedEventValid(event: IProcessedTimePadEvent): boolean {
  return event.blackListedWords.length === 0 && event.detectedTagIds.length > 0;
}

export default async function writeProcessedEventsToFiles(
  processedEvents: IProcessedTimePadEvent[]
): Promise<*> {
  const processedEventsByValidity = groupBy(processedEvents, isProcessedEventValid);

  const validEvents = processedEventsByValidity.true;
  const invalidEvents = processedEventsByValidity.false;

  const validRows = convertToRows(validEvents);
  const invalidRows = convertToRows(invalidEvents);

  await writeRowsToFile(validRows, 'valid-events.xlsx');
  await writeRowsToFile(invalidRows, 'invalid-events.xlsx');
}
