import { Reflector } from '@nestjs/core';
import { Injectable, Type } from '@nestjs/common';
import { ON_DECORATOR } from '../census.constants';
import { OnDecoratorOptions } from '../decorators/interfaces/ondecorator.options';

@Injectable()
export class MetadataAccessor {
    constructor(
        private readonly reflector: Reflector,
    ) {}

    // eslint-disable-next-line @typescript-eslint/ban-types
    getOnMetadata(target: Type<any> | Function): OnDecoratorOptions | undefined {
        return this.reflector.get(ON_DECORATOR, target);
    }
}
