/* eslint-disable max-len */
/* eslint-disable flowtype/no-types-missing-file-annotation */

export interface IConstructor {
    new(...args: any[]): any;
}

declare module 'container-ioc' {
    declare export type ProviderToken = any;
    declare export type IInjectionInstance = any;

    declare export type LifeTimeValue = number;
    declare export var LifeTime: {
        Persistent: LifeTimeValue,
        PerRequest: LifeTimeValue,
    };

    declare export interface IProvider {
        token?: ProviderToken;
        lifeTime?: LifeTimeValue;
        useValue?: any;
        useClass?: IConstructor;
        useFactory?: any;
        inject?: ProviderToken[];
    }

    declare export type RegistrationProvider = IProvider | IConstructor;

    declare export interface IContainerOptions {
        parent?: IContainer;
        defaultLifeTime?: LifeTimeValue;
    }

    declare export interface IContainer {
        register(provider: RegistrationProvider | RegistrationProvider[]): void;
        resolve(token: ProviderToken): IInjectionInstance;
        resolveInternal(token: ProviderToken, container: IContainer, traceMessage?: string): IInjectionInstance;
        createScope(): IContainer;
        createChild(): IContainer;
        setParent(parent: IContainer): void;
    }

    declare export class Container implements IContainer {
        constructor(options?: IContainerOptions): Container;
        register(provider: RegistrationProvider | RegistrationProvider[]): void;
        resolve(token: ProviderToken): IInjectionInstance;
        createScope(): IContainer;
        createChild(): IContainer;
        setParent(parent: IContainer): void;
        resolveInternal(token: ProviderToken, container: IContainer, traceMessage?: string): IInjectionInstance;
    }
}
