# PS2Census NestJS

## About

Easy integration of the [PS2 Census library](https://github.com/microwavekonijn/ps2census) for NestJS.

## Installation

```
npm install ps2census ps2census-nestjs
```

## Getting started

```ts
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

