<div align="center">
	<br />
	<p>
		<a href="https://guilderia.js.org"><img src="https://guilderia.js.org/static/logo.svg" width="546" alt="guilderia.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://guilderia.gg/djs"><img src="https://img.shields.io/badge/join_us-on_guilderia-5865F2?logo=guilderia&logoColor=white" alt="Guilderia server" /></a>
		<a href="https://www.npmjs.com/package/@guilderiajs/brokers"><img src="https://img.shields.io/npm/v/@guilderiajs/brokers.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/@guilderiajs/brokers"><img src="https://img.shields.io/npm/dt/@guilderiajs/brokers.svg?maxAge=3600" alt="npm downloads" /></a>
		<a href="https://github.com/guilderiajs/guilderia.js/actions"><img src="https://github.com/guilderiajs/guilderia.js/actions/workflows/tests.yml/badge.svg" alt="Build status" /></a>
		<a href="https://github.com/guilderiajs/guilderia.js/commits/main/packages/brokers"><img alt="Last commit." src="https://img.shields.io/github/last-commit/guilderiajs/guilderia.js?logo=github&logoColor=ffffff&path=packages%2Fbrokers" /></a>
		<a href="https://opencollective.com/guilderiajs"><img src="https://img.shields.io/opencollective/backers/guilderiajs?maxAge=3600&logo=opencollective" alt="backers" /></a>
		<a href="https://codecov.io/gh/guilderiajs/guilderia.js"><img src="https://codecov.io/gh/guilderiajs/guilderia.js/branch/main/graph/badge.svg?precision=2&flag=brokers" alt="Code coverage" /></a>
	</p>
	<p>
		<a href="https://vercel.com/?utm_source=guilderiajs&utm_campaign=oss"><img src="https://raw.githubusercontent.com/guilderiajs/guilderia.js/main/.github/powered-by-vercel.svg" alt="Vercel" /></a>
		<a href="https://www.cloudflare.com"><img src="https://raw.githubusercontent.com/guilderiajs/guilderia.js/main/.github/powered-by-workers.png" alt="Cloudflare Workers" height="44" /></a>
	</p>
</div>

## About

`@guilderiajs/brokers` is a powerful set of message brokers

## Installation

**Node.js 22.12.0 or newer is required.**

```sh
npm install @guilderiajs/brokers
yarn add @guilderiajs/brokers
pnpm add @guilderiajs/brokers
```

## Example usage

These examples use [ES modules](https://nodejs.org/api/esm.html#enabling).

### pub sub

```ts
// publisher.js
import { PubSubRedisBroker } from '@guilderiajs/brokers';
import Redis from 'ioredis';

// Considering this only pushes events, the group and name are not important.
const broker = new PubSubRedisBroker(new Redis(), { group: 'noop', name: 'noop' });

await broker.publish('test', 'Hello World!');
await broker.destroy();

// subscriber.js
import { PubSubRedisBroker } from '@guilderiajs/brokers';
import Redis from 'ioredis';

const broker = new PubSubRedisBroker(new Redis(), {
	// This is the consumer group name. You should make sure to not re-use this
	// across different applications in your stack, unless you absolutely know
	// what you're doing.
	group: 'subscribers',
	// With the assumption that this service will scale to more than one instance,
	// you MUST ensure `UNIQUE_CONSUMER_ID` is unique across all of them and
	// also deterministic (i.e. if instance-1 restarts, it should still be instance-1)
	name: `consumer-${UNIQUE_CONSUMER_ID}`,
});
broker.on('test', ({ data, ack }) => {
	console.log(data);
	void ack();
});

await broker.subscribe(['test']);
```

### RPC

```ts
// caller.js
import { RPCRedisBroker } from '@guilderiajs/brokers';
import Redis from 'ioredis';

const broker = new RPCRedisBroker(new Redis(), { group: 'noop', name: 'noop' });

console.log(await broker.call('testcall', 'Hello World!'));
await broker.destroy();

// responder.js
import { RPCRedisBroker } from '@guilderiajs/brokers';
import Redis from 'ioredis';

const broker = new RPCRedisBroker(new Redis(), {
	// Equivalent to the group/name in pubsub, refer to the previous example.
	group: 'responders',
	name: `consumer-${UNIQUE_ID}`,
});
broker.on('testcall', ({ data, ack, reply }) => {
	console.log('responder', data);
	void ack();
	void reply(`Echo: ${data}`);
});

await broker.subscribe(['testcall']);
```

## Links

- [Website][website] ([source][website-source])
- [Documentation][documentation]
- [Guide][guide] ([source][guide-source])
  Also see the v13 to v14 [Update Guide][guide-update], which includes updated and removed items from the library.
- [guilderia.js Guilderia server][guilderia]
- [Guilderia Developers Guilderia server][guilderia-developers]
- [GitHub][source]
- [npm][npm]
- [Related libraries][related-libs]

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the
[documentation][documentation].  
See [the contribution guide][contributing] if you'd like to submit a PR.

## Help

If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle nudge in the right direction, please don't hesitate to join our official [guilderia.js Server][guilderia].

[website]: https://guilderia.js.org
[website-source]: https://github.com/guilderiajs/guilderia.js/tree/main/apps/website
[documentation]: https://guilderia.js.org/docs/packages/brokers/stable
[guide]: https://guilderiajs.guide
[guide-source]: https://github.com/guilderiajs/guilderia.js/tree/main/apps/guide
[guide-update]: https://guilderiajs.guide/legacy/additional-info/changes-in-v14
[guilderia]: https://guilderia.gg/djs
[guilderia-developers]: https://guilderia.gg/guilderia-developers
[source]: https://github.com/guilderiajs/guilderia.js/tree/main/packages/brokers
[npm]: https://www.npmjs.com/package/@guilderiajs/brokers
[related-libs]: https://docs.guilderia.com/developers/developer-tools/community-resources#libraries
[contributing]: https://github.com/guilderiajs/guilderia.js/blob/main/.github/CONTRIBUTING.md
