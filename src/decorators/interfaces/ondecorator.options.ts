import { ClientEvents } from 'ps2census';

export interface OnDecoratorOptions {
    name: keyof ClientEvents;
}
