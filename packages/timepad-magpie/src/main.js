// lib
import {Container} from 'container-ioc';

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
  App,
]);

const app = container.resolve(App);
app.run();
