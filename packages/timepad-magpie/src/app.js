// @flow

import TimePadEventsGrabber from './events-grabber';
import TimePadApiClient from './api-client';

const timePadApi = new TimePadApiClient();
const timePadEventsGrabber = new TimePadEventsGrabber(timePadApi);

(async () => {
    const events = await timePadEventsGrabber.grabEvents();
    console.log('Done grabbing timePad events');
    console.log('Total grabbed events count: ', events.length);
})();