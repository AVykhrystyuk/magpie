/* eslint-disable max-len */
/* eslint-disable flowtype/no-types-missing-file-annotation */

interface TypedPropertyDescriptor<T> {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  value?: T;
  get?: () => T;
  set?: (value: T) => void;
}

declare type ClassDecorator = <TFunction: Function>(target: TFunction) => TFunction | void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | Symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

declare module 'autobind-decorator' {
    declare var autobind: ClassDecorator & MethodDecorator;

    declare export var boundMethod: MethodDecorator;
    declare export var boundClass: ClassDecorator;

    declare export default typeof autobind;
}
