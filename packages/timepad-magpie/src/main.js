/* eslint-disable no-console */
// lib
import {Container} from 'container-ioc';
import {TagDetectorImpl} from 'magpie-shared';
// app
import TimePadApiClient from './api/api-client';
import TimePadApiClientImpl from './api/impl/api-client';
import ApiTimePadEventsFetcher from './api/events-fetcher';
import ApiTimePadEventsFetcherImpl from './api/impl/events-fetcher';
import TimePadEventsFetcher from './events-fetcher';
import TimePadEventsFetcherImpl from './impl/events-fetcher';
import App from './app';

const tagDetector = new TagDetectorImpl();
const tagIds = tagDetector.detectAll('Go to Piter.JS meetup');
console.log(tagIds);

const container = new Container();

container.register([
  {token: TimePadApiClient, useClass: TimePadApiClientImpl},
  {token: ApiTimePadEventsFetcher, useClass: ApiTimePadEventsFetcherImpl},
  {token: TimePadEventsFetcher, useClass: TimePadEventsFetcherImpl},
  App,
]);

const app = container.resolve(App);
app.run();
