// @flow

// app
import { writeRowsToFile, groupBy } from './impl/utils';
import type { IProcessedTimePadEvent } from './processed-event';

function convertToRows(processedEvents: IProcessedTimePadEvent[]): Array<string[]> {
  const columns = [
    'Id',
    'Name',
    'TagIds',
    'WhiteWords',
    'BlackWords',
    'Description',
    'Description HTML',
  ];
  const rows = processedEvents.map(processedEvent => {
    const {
      event, whiteWords, blackWords, tagIds
    } = processedEvent;

    return [
      event.id.toString(),
      event.name,
      tagIds.join(', '),
      whiteWords.join(', '),
      blackWords.join(', '),
      event.sanitizedDescription,
      event.descriptionHtml,
    ];
  });
  return [columns, ...rows];
}

function isProcessedEventValid(event: IProcessedTimePadEvent): boolean {
  const { whiteWords, blackWords, tagIds } = event;
  if (tagIds.length <= 0) {
    return false;
  }

  if (whiteWords.length > 0) {
    return true;
  }

  return blackWords.length === 0;
}

function isProcessedEventEmpty(event: IProcessedTimePadEvent): boolean {
  const { whiteWords, blackWords, tagIds } = event;
  return tagIds.length === 0 && whiteWords.length === 0 && blackWords.length === 0;
}

export async function writeEventsToFile(events: IProcessedTimePadEvent[], filename: string): Promise<*> {
  const rows = convertToRows(events);
  await writeRowsToFile(rows, filename);
}

export default function writeProcessedEventsToFiles(
  processedEvents: IProcessedTimePadEvent[]
): Promise<*> {
  const eventsByValidity: Map<boolean, IProcessedTimePadEvent[]> = groupBy(
    processedEvents,
    isProcessedEventValid
  );

  const validEvents = eventsByValidity.get(true);
  const invalidEvents = eventsByValidity.get(false);

  const promises = [];
  if (validEvents != null) {
    promises.push(writeEventsToFile(validEvents, 'valid-events.xlsx'));
  }

  if (invalidEvents != null) {
    const invalidEventsByEmptiness: Map<boolean, IProcessedTimePadEvent[]> = groupBy(
      invalidEvents,
      isProcessedEventEmpty
    );

    const emptyInvalidEvents = invalidEventsByEmptiness.get(true);
    if (emptyInvalidEvents != null) {
      promises.push(writeEventsToFile(emptyInvalidEvents, 'empty-invalid-events.xlsx'));
    }

    const notEmptyInvalidEvents = invalidEventsByEmptiness.get(false);
    if (notEmptyInvalidEvents != null) {
      promises.push(writeEventsToFile(notEmptyInvalidEvents, 'non-empty-invalid-events.xlsx'));
    }
  }

  return Promise.all(promises);
}
