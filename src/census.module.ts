import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { CensusClient } from './census.client';
import { CensusModuleOptions } from './interfaces/censusmodule.options';
import { CensusModuleAsyncOptions } from './interfaces/censusmoduleasync.options';
import { CENSUS_MODULE_OPTIONS } from './census.constants';
import { CensusOptionsFactory } from './interfaces/censusoptions.factory';
import { CensusExplorer } from './census.explorer';

@Module({
    imports: [DiscoveryModule],
})
export class CensusModule {
    static forRoot(options: CensusModuleOptions): DynamicModule {
        return {
            module: CensusModule,
            providers: [
                CensusExplorer,
                {
                    provide: CENSUS_MODULE_OPTIONS,
                    useValue: options || {},
                },
                {
                    provide: CensusClient,
                    useValue: new CensusClient(options.serviceID, options),
                },
            ],
            exports: [CensusClient],
        };
    }

    static forRootAsync(options: CensusModuleAsyncOptions): DynamicModule {
        return {
            module: CensusModule,
            imports: options.imports || [],
            providers: [
                CensusExplorer,
                CensusModule.createConfigAsyncProviders(options),
                {
                    provide: CensusClient,
                    useFactory: async (options: CensusModuleOptions): Promise<CensusClient> => new CensusClient(options.serviceID, options),
                    inject: [CENSUS_MODULE_OPTIONS],
                },
            ],
            exports: [CensusClient],
        };
    }

    private static createConfigAsyncProviders(options: CensusModuleAsyncOptions): Provider {
        if (options) {
            if (options.useFactory) {
                return {
                    provide: CENSUS_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject ?? [],
                };
            }

            return {
                provide: CENSUS_MODULE_OPTIONS,
                useFactory: async (factory: CensusOptionsFactory): Promise<CensusModuleOptions> => await factory.createCensusOptions(),
                inject: [options.useExisting ?? options.useClass],
            };
        }

        return {
            provide: CENSUS_MODULE_OPTIONS,
            useValue: {},
        };
    }
}
