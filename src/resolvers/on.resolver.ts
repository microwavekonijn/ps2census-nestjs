import { CensusResolver } from '../interfaces/census.resolver';
import { CensusResolveOptions } from '../interfaces/censusresolve.options';
import { OnDecoratorOptions } from '../decorators/interfaces/ondecorator.options';
import { ON_DECORATOR } from '../constants/census.constants';
import { ClientEvents } from 'ps2census';

export class OnResolver implements CensusResolver {
    public resolve({censusClient, instance, methodName}: CensusResolveOptions): void {
        const metadata: OnDecoratorOptions | keyof ClientEvents = Reflect.getMetadata(ON_DECORATOR, instance, methodName);

        if (metadata) {
            const event = typeof metadata == 'string' ? metadata : metadata.event;

            censusClient.on(event, (...data) => {
                void instance[methodName](...data);
            });
        }
    }
}
