# PS2Census NestJS

![CI](https://github.com/microwavekonijn/ps2census-nestjs/workflows/CI/badge.svg)
[![npm version](https://badge.fury.io/js/ps2census-nestjs.svg)](https://www.npmjs.com/package/ps2census-nestjs)
[![David DM Badge](https://david-dm.org/microwavekonijn/ps2census-nestjs.svg)](https://david-dm.org/microwavekonijn/ps2census-nestjs)

## About

Easy integration of the [PS2 Census library](https://github.com/microwavekonijn/ps2census) for NestJS.

## Installation

```
npm install ps2census ps2census-nestjs
```

## Getting started

```ts
import {CensusModule} from 'ps2census-nestjs';

@Module({
  imports:[
    CensusModule.forRoot({
      serviceID: 'your DBG service id',
      // Any other Client options from ps2census
    }),
    // or
    CensusModule.forRootAsync({
      useFactory: () => ({
        serviceID: 'your DBG service id',
        // Any other Client options from ps2census
      }),
    }),
  ],
  providers: [CensusGateway],
})
```

```ts
import { Injectable } from '@nestjs/common';
import {Death} from 'ps2census';
import {CensusClient} from 'ps2census-nestjs';

@Injectable() // Controller decorator can also be used
export class CensusGateway {
  constructor(
    client: CensusClient,
  ) {}

  @On({event: 'death'})
  deathHandler(death: Death): void {
    // Do something
  }
}
```

