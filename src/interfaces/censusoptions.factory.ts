import { CensusModuleOptions } from './censusmodule.options';

export interface CensusOptionsFactory {
    createCensusOptions(): Promise<CensusModuleOptions> | CensusModuleOptions;
}
