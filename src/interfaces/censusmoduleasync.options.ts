import { ModuleMetadata } from '@nestjs/common';
import { Type } from '@nestjs/common/interfaces/type.interface';
import { CensusModuleOptions } from './censusmodule.options';

export interface CensusModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<any>;
    useClass?: Type<any>;
    useFactory?: (...args: any[]) => Promise<CensusModuleOptions> | CensusModuleOptions;
    inject?: any[];
}
