# yandex-metrika-wrapper

[![NPM](https://nodei.co/npm/yandex-metrika-wrapper.png)](https://npmjs.org/package/yandex-metrika-wrapper)


`yandex-metrika-wrapper` is a TypeScript wrapper for the [Yandex Metrika API](https://yandex.ru/support/metrica/), providing a strongly-typed and easy-to-use interface for tracking user interactions and sending data to Yandex Metrika.

## Features

- TypeScript support with generics for goal names and parameters.
- Easy integration with Yandex Metrika for tracking events, page views, and user actions.
- Automatically injects the Yandex Metrika script into your webpage.
- Supports initializing multiple Metrika counters.

## Installation

Install the package via npm:

```bash
npm install yandex-metrika-wrapper
```

## Getting Started

### 1. Inserting the Yandex Metrika Script

Before using the Metrika service, you need to insert the Yandex Metrika script into your webpage:

```typescript
import { YandexMetrikaService } from 'yandex-metrika-wrapper';

// Insert the Yandex Metrika script into the page
YandexMetrikaService.insertMetrika();
```

### 2. Initializing Metrika Counters

Initialize one or more Metrika counters with their configurations:

```typescript
YandexMetrikaService.initMetrika([
    { id: 123456, accurateTrackBounce: true },
    { id: 654321, webvisor: true },
]);
```

### 3. Using the Metrika Service

Define your goals and their associated parameter types:

```typescript
type MyGoals = 'purchase' | 'signup';

interface MyGoalParams {
    purchase: { orderId: number };
    signup: { userId: string };
}

// Instantiate MetrikaService with specific goals and their parameters
const metrikaService = new YandexMetrikaService<MyGoals, MyGoalParams>(123456);

// Track a 'purchase' goal
metrikaService.reachGoal('purchase', { orderId: 123 });

// Track a 'signup' goal
metrikaService.reachGoal('signup', { userId: 'abc123' });
```

### Full Example

Here's a complete example showing how to set up and use `yandex-metrika-wrapper`:

```typescript
import { YandexMetrikaService } from 'yandex-metrika-wrapper';

// Insert the Yandex Metrika script into the page
YandexMetrikaService.insertMetrika();

// Initialize Metrika counters
YandexMetrikaService.initMetrika([
    { id: 123456, accurateTrackBounce: true },
]);

// Define your goals and their parameter types
type MyGoals = 'purchase' | 'signup';
interface MyGoalParams {
    purchase: { orderId: number };
    signup: { userId: string };
}

// Create an instance of MetrikaService
const metrikaService = new YandexMetrikaService<MyGoals, MyGoalParams>(123456);

// Track a purchase event
metrikaService.reachGoal('purchase', { orderId: 123 });

// Track a signup event
metrikaService.reachGoal('signup', { userId: 'abc123' });
```

## API Reference

### `YandexMetrikaService`

#### `insertMetrika(alternativeUrl?: string)`

Inserts the Yandex Metrika script into the page. Call this method before tracking any events.

- `alternativeUrl` (optional): A custom URL for the Yandex Metrika script.

#### `initMetrika(counterConfigs: CounterConfig[])`

Initializes one or more Yandex Metrika counters.

- `counterConfigs`: An array of counter configurations, each including an `id` and other initialization parameters.

#### `reachGoal<T extends G>(goal: T, params: P[T], counterId?: number): Promise<void>`

Tracks a goal with specific parameters.

- `goal`: The name of the goal.
- `params`: The parameters for the goal, inferred based on the goal name.
- `counterId` (optional): A specific counter ID to use. Defaults to the `defaultCounterId` passed in the constructor.

## Types

### `GoalParams`

Defines the structure for goal parameters. Extend this interface to define your own goal parameter types.

### Example

```typescript
interface MyGoalParams {
    purchase: { orderId: number };
    signup: { userId: string };
}
```

## License

MIT