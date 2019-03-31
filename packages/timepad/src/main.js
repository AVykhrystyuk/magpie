// @flow strict

// app
import App from './app';
import { buildDependencyResolver } from './ioc';

const resolver = buildDependencyResolver();
const app = resolver.resolve(App);
app.run();
