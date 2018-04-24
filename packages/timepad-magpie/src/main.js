/* eslint-disable no-console,arrow-body-style */
// @flow

// lib
import {Container} from 'container-ioc';
import {
  createTagDetector,
  TagDetector,
  createBlackListedWordsFinder,
  BlackListedWordsFinder
} from 'magpie-shared';
// app
import TimePadApiClient from './api/api-client';
import TimePadApiClientImpl from './api/impl/api-client';
import ApiTimePadEventsFetcher from './api/events-fetcher';
import ApiTimePadEventsFetcherImpl from './api/impl/events-fetcher';
import TimePadEventsFetcher from './events-fetcher';
import TimePadEventsFetcherImpl from './impl/events-fetcher';
import App from './app';

const container = new Container();

container.register([
  {token: TimePadApiClient, useClass: TimePadApiClientImpl},
  {token: ApiTimePadEventsFetcher, useClass: ApiTimePadEventsFetcherImpl},
  {token: TimePadEventsFetcher, useClass: TimePadEventsFetcherImpl},
  {token: TimePadEventsFetcher, useClass: TimePadEventsFetcherImpl},
  {token: BlackListedWordsFinder, useFactory: createBlackListedWordsFinder},
  {token: TagDetector, useFactory: createTagDetector},
  App,
]);

const app = container.resolve(App);
app.run();
