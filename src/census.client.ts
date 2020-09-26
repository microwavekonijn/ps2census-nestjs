import { Client } from 'ps2census';
import { OnApplicationBootstrap } from '@nestjs/common';

export class CensusClient extends Client implements OnApplicationBootstrap {
    async onApplicationBootstrap(): Promise<void> {
        await this.watch();
    }
}
