import { ON_DECORATOR } from '../census.constants';
import { OnDecoratorOptions } from './interfaces/ondecorator.options';
import { ClientEvents } from 'ps2census';

export function On(options: OnDecoratorOptions | keyof ClientEvents): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(ON_DECORATOR, options, target, propertyKey);
        return descriptor;
    };
}
