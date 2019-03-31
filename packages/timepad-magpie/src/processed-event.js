// @flow strict
// lib
import type { TagAnalysisResult } from '@magpie/shared';

// app
import type { ITimePadEvent } from './event';

export interface IProcessedTimePadEvent {
  event: ITimePadEvent;
  analysisResult: TagAnalysisResult;
}
