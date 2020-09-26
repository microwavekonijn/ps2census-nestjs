import { ClientEvents } from 'ps2census';

export interface OnDecoratorOptions {
    event: keyof ClientEvents;
}
