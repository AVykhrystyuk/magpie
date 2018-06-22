// @flow

// app
import {writeRowsToFile, groupBy} from './utils';
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

export async function writeEventsToFile(events: IProcessedTimePadEvent[], filename: string): Promise<*> {
  const rows = convertToRows(events);
  await writeRowsToFile(rows, filename);
}

export default async function writeProcessedEventsToFiles(
  processedEvents: IProcessedTimePadEvent[]
): Promise<*> {
  const eventsByValidity: Map<boolean, IProcessedTimePadEvent[]> = groupBy(
    processedEvents,
    isProcessedEventValid
  );

  const validEvents = eventsByValidity.get(true);
  const invalidEvents = eventsByValidity.get(false);

  if (validEvents) {
    await writeEventsToFile(validEvents, 'valid-events.xlsx');
  }

  if (invalidEvents) {
    await writeEventsToFile(invalidEvents, 'invalid-events.xlsx');
  }
}
