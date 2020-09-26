import { CensusResolver } from '../interfaces/census.resolver';
import { CensusResolveOptions } from '../interfaces/censusresolve.options';
import { OnDecoratorOptions } from '../decorators/interfaces/ondecorator.options';
import { ON_DECORATOR } from '../constants/census.constants';

export class OnResolver implements CensusResolver {
    public resolve({censusClient, instance, methodName}: CensusResolveOptions): void {
        const metadata: OnDecoratorOptions = Reflect.getMetadata(ON_DECORATOR, instance, methodName);

        if (metadata) {
            censusClient.on(metadata.event, (...data) => {
                void instance[methodName](...data);
            });
        }
    }
}
