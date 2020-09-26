import { OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { CensusClient } from './census.client';
import { CensusResolver } from './interfaces/census.resolver';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { OnResolver } from './resolvers/on.resolver';

export class CensusService implements OnApplicationBootstrap {
    private readonly resolvers: CensusResolver[];

    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly metadataScanner: MetadataScanner,
        private readonly censusClient: CensusClient,
        onResolver: OnResolver,
    ) {
        this.resolvers = [
            onResolver,
        ];
    }

    onApplicationBootstrap(): void {
        this.resolve(
            this.discoveryService.getProviders(),
            this.discoveryService.getControllers(),
        );
    }

    resolve(providers: InstanceWrapper[], controllers: InstanceWrapper[]): void {
        providers.concat(controllers).forEach(({instance}) => {
            if (instance) {
                this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (methodName) => {
                    this.resolvers.forEach((resolver) => {
                        resolver.resolve({
                            instance,
                            methodName,
                            censusClient: this.censusClient,
                        });
                    });
                });
            }
        });
    }
}
