// @flow

// app
import type {IApiTimePadEvent} from './api/event';

export interface ITimePadEvent {
  id: number;
  name: string;
  descriptionHtml: string;

  sanitizedDescription: string;
  __api__: IApiTimePadEvent;
}
