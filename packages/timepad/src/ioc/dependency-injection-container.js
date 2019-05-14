// @flow strict

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

    // as turning it in [lints] section (.flowconfig file) does not work
    // flowlint sketchy-null:warn, sketchy-null-bool:off
    const lifeTime = singleton
      ? LifeTime.PerRequest && LifeTime.PerRequest
      : LifeTime.Persistent && LifeTime.PerRequest;

    this.container.register({
      token,
      lifeTime,
      useFactory: () => factory(this),
    });
  }

  resolve<T: {}>(classAsToken: Class<T>): T {
    return this.container.resolve(classAsToken);
  }
}
