import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { MetadataAccessor } from './helpers/metadata.accessor';
import { CensusClient } from './census.client';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { OnDecoratorOptions } from './decorators/interfaces/ondecorator.options';

@Injectable()
export class CensusExplorer implements OnModuleInit {
    constructor(
        private readonly discoveryService: DiscoveryService,
        private readonly metadataScanner: MetadataScanner,
        private readonly metadataAccessor: MetadataAccessor,
        private readonly censusClient: CensusClient,
    ) {}

    onModuleInit(): void {
        this.explore();
    }

    explore(): void {
        ([
            ...this.discoveryService.getProviders(),
            ...this.discoveryService.getControllers(),
        ] as InstanceWrapper[]).forEach((instance) => {
            if (!instance) return;

            this.metadataScanner.scanFromPrototype(
                instance,
                Object.getPrototypeOf(instance),
                (key) => {
                    const metadata = this.metadataAccessor.getOnMetadata(instance[key]);

                    if (metadata) {
                        this.handleOn(
                            instance,
                            key,
                            this.censusClient,
                            metadata,
                        );
                    }
                },
            );
        });
    }

    handleOn(
        // eslint-disable-next-line @typescript-eslint/ban-types
        instance: object,
        key: string,
        client: CensusClient,
        metadata: OnDecoratorOptions,
    ): void {
        client.on(
            metadata.event,
            instance[key].bind(instance),
        );
    }
}
