import { OnApplicationBootstrap } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { CensusClient } from './census.client';
import { CensusResolve } from './interfaces/census.resolve';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

export class CensusService implements OnApplicationBootstrap {
    private readonly resolvers: CensusResolve[];

    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly metadataScanner: MetadataScanner,
        private readonly censusClient: CensusClient,
    ) {}

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
