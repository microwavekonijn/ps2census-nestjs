import { CensusResolveOptions } from './censusresolve.options';

export interface CensusResolve {
    resolve(options: CensusResolveOptions): void;
}
