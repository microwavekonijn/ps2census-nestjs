import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { CensusClient } from './census.client';
import { CensusModuleOptions } from './interfaces/censusmodule.options';
import { CensusModuleAsyncOptions } from './interfaces/censusmoduleasync.options';
import { CensusService } from './census.service';
import { CENSUS_MODULE_OPTIONS } from './constants/census.constants';

@Module({
    imports: [DiscoveryModule],
})
export class CensusModule {
    static forRoot(options: CensusModuleOptions): DynamicModule {
        return {
            module: CensusModule,
            providers: [
                CensusService,
                ...CensusModule.createCensusProvider(options),
            ],
            exports: [CensusClient],
        };
    }

    static forRootAsync(options: CensusModuleAsyncOptions): DynamicModule {
        const connectionProvider = {
            provide: CensusClient,
            useFactory: async (options: CensusModuleOptions): Promise<CensusClient> => new CensusClient(options.serviceID, options),
            inject: [],
        };

        return {
            module: CensusModule,
            imports: options.imports || [],
            providers: [
                CensusService,
                CensusModule.createConfigASyncProviders(options),
                connectionProvider,
            ],
            exports: [CensusClient],
        };
    }

    private static createCensusProvider(options: CensusModuleOptions): Provider[] {
        return [
            {
                provide: CENSUS_MODULE_OPTIONS,
                useValue: options || {},
            },
            {
                provide: CensusClient,
                useValue: new CensusClient(options.serviceID, options),
            },
        ];
    }

    private static createConfigASyncProviders(options: CensusModuleAsyncOptions): Provider {
        if (options) {
            if (options.useFactory) {
                return {
                    provide: CENSUS_MODULE_OPTIONS,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                };
            }

            return {
                provide: CENSUS_MODULE_OPTIONS,
                useFactory: async (optionsFactory: any): Promise<CensusModuleOptions> => await optionsFactory.createCensusOptions(),
                inject: [options.useExisting || options.useClass],
            };
        }

        return {
            provide: CENSUS_MODULE_OPTIONS,
            useValue: {},
        };
    }
}
