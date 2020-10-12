import { ModuleMetadata, Type } from '@nestjs/common';
import { CensusModuleOptions } from './censusmodule.options';
import { CensusOptionsFactory } from './censusoptions.factory';

export interface CensusModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<CensusOptionsFactory>;
    useClass?: Type<CensusOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<CensusModuleOptions> | CensusModuleOptions;
    inject?: any[];
}
