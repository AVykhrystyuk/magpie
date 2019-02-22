// @flow

// lib
import { Container, LifeTime } from 'container-ioc';
import autobind from 'autobind-decorator';

export interface DependencyResolver {
  resolve<T: {}>(classAsToken: Class<T>): T;
}

export type FactoryFunction<T> = (resolver: DependencyResolver) => T;
export type Registeration<T> = {
  token: Class<T>,
  factory: FactoryFunction<T>,
  singleton?: boolean,
};

export default class DependencyInjectionContainer implements DependencyResolver {
  container = new Container();

  registerAll<T>(registrations: Registeration<T>[]): void {
    registrations.forEach(this.register);
  }

  @autobind
  register<T>(registration: Registeration<T>): void {
    const { token, factory, singleton } = registration;

    this.container.register({
      token,
      useFactory: () => factory(this),
      lifeTime: singleton ? LifeTime.PerRequest : LifeTime.Persistent,
    });
  }

  resolve<T: {}>(classAsToken: Class<T>): T {
    return this.container.resolve(classAsToken);
  }
}
