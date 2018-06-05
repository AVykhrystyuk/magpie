// @flow

// lib
import {Injectable as InjectableImpl} from 'container-ioc';

export type InjectionToken = Object;
export type DecorateFunction = (target: Object) => void;

export default function Injectable(injections?: InjectionToken[]): DecorateFunction {
  return InjectableImpl(injections);
}
