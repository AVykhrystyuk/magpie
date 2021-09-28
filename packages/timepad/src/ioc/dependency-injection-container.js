// @flow

// lib
import { createContainer } from 'try-di';

export interface DependencyResolver {
  resolve<T>(classAsToken: Class<T>): T;
}

export type FactoryFunction<T> = (resolver: DependencyResolver) => T;
export type Registeration<T> = {
  token: Class<T>,
  factory: FactoryFunction<T>,
  singleton?: boolean,
};

export class DependencyInjectionContainer implements DependencyResolver {
  container: any = createContainer();

  registerAll<T>(registrations: Registeration<T>[]): void {
    registrations.forEach(r => this.register(r));
  }

  register<T>(registration: Registeration<T>): void {
    const { token, factory, singleton } = registration;

    this.container.useFactory({ singleton, for: token, use: () => factory(this) });
  }

  resolve<T>(classAsToken: Class<T>): T {
    return this.container.resolve(classAsToken);
  }
}
