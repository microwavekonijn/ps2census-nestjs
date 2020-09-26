import { CensusClient } from '../census.client';

export interface CensusResolveOptions {
    instance: Record<string, any>;
    methodName: string;
    censusClient: CensusClient;
}
