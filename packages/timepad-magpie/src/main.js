/* eslint-disable no-console */
// lib
import {Container} from 'container-ioc';
import {calculate} from 'magpie-shared';
// app
import TimePadApiClient from './api/api-client';
import TimePadApiClientImpl from './api/impl/api-client';
import ApiTimePadEventsFetcher from './api/events-fetcher';
import ApiTimePadEventsFetcherImpl from './api/impl/events-fetcher';
import TimePadEventsFetcher from './events-fetcher';
import TimePadEventsFetcherImpl from './impl/events-fetcher';
import App from './app';

const calculationResult = calculate({value1: 1, value2: 4});
console.log('working!, result is :', calculationResult);

const container = new Container();

container.register([
  {token: TimePadApiClient, useClass: TimePadApiClientImpl},
  {token: ApiTimePadEventsFetcher, useClass: ApiTimePadEventsFetcherImpl},
  {token: TimePadEventsFetcher, useClass: TimePadEventsFetcherImpl},
  App,
]);

const app = container.resolve(App);
app.run();
