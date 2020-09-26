import { CensusResolveOptions } from './censusresolve.options';

export interface CensusResolver {
    resolve(options: CensusResolveOptions): void;
}
