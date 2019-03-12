/* eslint-disable no-console */
// @flow strict

// lib
import { createTagAnalyzer, TagAnalyzer } from 'magpie-shared';
// app
import DependencyInjectionContainer from './dependency-injection-container';
import type { DependencyResolver } from './dependency-injection-container';
import TimePadApiClient from '../api/api-client';
import TimePadApiClientImpl from '../api/impl/api-client';
import ApiTimePadEventsFetcher from '../api/events-fetcher';
import ApiTimePadEventsFetcherImpl from '../api/impl/events-fetcher';
import TimePadEventsFetcher from '../events-fetcher';
import TimePadEventsFetcherImpl from '../impl/events-fetcher';
import App from '../app';

export default function buildDependencyResolver(): DependencyResolver {
  const container = new DependencyInjectionContainer();

  // prettier-ignore
  container.registerAll([
    { token: TimePadApiClient, factory: () => new TimePadApiClientImpl() },
    {
      token: ApiTimePadEventsFetcher,
      factory: r => new ApiTimePadEventsFetcherImpl(
        r.resolve(TimePadApiClient)
      ),
    },
    {
      token: TimePadEventsFetcher,
      factory: r => new TimePadEventsFetcherImpl(
        r.resolve(ApiTimePadEventsFetcher)
      ),
    },
    { token: TagAnalyzer, factory: createTagAnalyzer },
    {
      token: App,
      factory: r => new App(
        r.resolve(TimePadEventsFetcher),
        r.resolve(TagAnalyzer)
      ),
    },
  ]);

  return container;
}
