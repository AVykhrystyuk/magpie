/* eslint-disable no-console */
// @flow

import TimePadApiClient from './api/api-client';
import ApiTimePadEventsFetcher from './api/events-fetcher';
import TimePadEventsFetcher from './events-fetcher';

const timePadApi = new TimePadApiClient();
const apiTimePadEventsFetcher = new ApiTimePadEventsFetcher(timePadApi);
const timePadEventsFetcher = new TimePadEventsFetcher(apiTimePadEventsFetcher);

(async () => {
  const events = await timePadEventsFetcher.fetchEvents();
  console.log('Done grabbing timePad events');
  console.log('Total grabbed events count: ', events.length);

  console.log();
  console.log(events.slice(0, 2));
})();
