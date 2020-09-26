import { ON_DECORATOR } from '../constants/census.constants';
import { OnDecoratorOptions } from './interfaces/ondecorator.options';

export function On(options: OnDecoratorOptions): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        Reflect.defineMetadata(ON_DECORATOR, options, target, propertyKey);
        return descriptor;
    };
}
