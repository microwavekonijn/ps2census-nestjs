import { DynamicModule, Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { CensusClient } from './census.client';
import { CensusModuleOptions } from './interfaces/censusmodule.options';
import { CensusModuleAsyncOptions } from './interfaces/censusmoduleasync.options';

@Module({
    imports: [DiscoveryModule],
})
export class CensusModule {
    static forRoot(options: CensusModuleOptions): DynamicModule {
        return {
            module: CensusModule,
            providers: [],
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
            providers: [],
            exports: [CensusClient],
        };
    }
}
