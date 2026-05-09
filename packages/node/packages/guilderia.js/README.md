<div align="center">
	<br />
	<p>
		<a href="https://guilderia.js.org"><img src="https://guilderia.js.org/static/logo.svg" width="546" alt="guilderia.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://guilderia.gg/djs"><img src="https://img.shields.io/badge/join_us-on_guilderia-5865F2?logo=guilderia&logoColor=white" alt="Guilderia server" /></a>
		<a href="https://www.npmjs.com/package/guilderia.js"><img src="https://img.shields.io/npm/v/guilderia.js.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/guilderia.js"><img src="https://img.shields.io/npm/dt/guilderia.js.svg?maxAge=3600" alt="npm downloads" /></a>
		<a href="https://github.com/guilderiajs/guilderia.js/actions"><img src="https://github.com/guilderiajs/guilderia.js/actions/workflows/tests.yml/badge.svg" alt="Tests status" /></a>
		<a href="https://github.com/guilderiajs/guilderia.js/commits/main/packages/guilderia.js"><img alt="Last commit." src="https://img.shields.io/github/last-commit/guilderiajs/guilderia.js?logo=github&logoColor=ffffff&path=packages%2Fguilderia.js" /></a>
		<a href="https://opencollective.com/guilderiajs"><img src="https://img.shields.io/opencollective/backers/guilderiajs?maxAge=3600&logo=opencollective" alt="backers" /></a>
		<a href="https://codecov.io/gh/guilderiajs/guilderia.js"><img src="https://codecov.io/gh/guilderiajs/guilderia.js/branch/main/graph/badge.svg?precision=2" alt="Code coverage" /></a>
	</p>
	<p>
		<a href="https://vercel.com/?utm_source=guilderiajs&utm_campaign=oss"><img src="https://raw.githubusercontent.com/guilderiajs/guilderia.js/main/.github/powered-by-vercel.svg" alt="Vercel" /></a>
		<a href="https://www.cloudflare.com"><img src="https://raw.githubusercontent.com/guilderiajs/guilderia.js/main/.github/powered-by-workers.png" alt="Cloudflare Workers" height="44" /></a>
	</p>
</div>

## About

guilderia.js is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the
[Guilderia API](https://guilderia.com/developers/docs/intro).

- Object-oriented
- Predictable abstractions
- Performant
- 100% coverage of the Guilderia API

## Installation

**Node.js 22.12.0 or newer is required.**

```sh
npm install guilderia.js
yarn add guilderia.js
pnpm add guilderia.js
bun add guilderia.js
```

### Optional packages

- [zlib-sync](https://www.npmjs.com/package/zlib-sync) for WebSocket data compression and inflation (`npm install zlib-sync`)
- [bufferutil](https://www.npmjs.com/package/bufferutil) for a much faster WebSocket connection (`npm install bufferutil`)
- [@guilderiajs/voice](https://www.npmjs.com/package/@guilderiajs/voice) for interacting with the Guilderia Voice API (`npm install @guilderiajs/voice`)

## Example usage

Install guilderia.js:

```sh
npm install guilderia.js
yarn add guilderia.js
pnpm add guilderia.js
bun add guilderia.js
```

These examples use [ES modules](https://nodejs.org/api/esm.html#enabling).

Register a slash command against the Guilderia API:

```js
import { REST, Routes } from 'guilderia.js';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
```

Afterwards we can create a quite simple example bot:

```js
import { Client, Events, GatewayIntentBits } from 'guilderia.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(TOKEN);
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

### Extensions

- [RPC][rpc] ([source][rpc-source])

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the
[documentation][documentation].  
See [the contribution guide][contributing] if you'd like to submit a PR.

## Help

If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle nudge in the right direction, please don't hesitate to join our official [guilderia.js Server][guilderia].

[website]: https://guilderia.js.org
[website-source]: https://github.com/guilderiajs/guilderia.js/tree/main/apps/website
[documentation]: https://guilderia.js.org/docs/packages/guilderia.js/stable
[guide]: https://guilderiajs.guide
[guide-source]: https://github.com/guilderiajs/guilderia.js/tree/main/apps/guide
[guide-update]: https://guilderiajs.guide/legacy/additional-info/changes-in-v14
[guilderia]: https://guilderia.gg/djs
[guilderia-developers]: https://guilderia.gg/guilderia-developers
[source]: https://github.com/guilderiajs/guilderia.js/tree/main/packages/guilderia.js
[npm]: https://www.npmjs.com/package/guilderia.js
[related-libs]: https://docs.guilderia.com/developers/developer-tools/community-resources#libraries
[rpc]: https://www.npmjs.com/package/guilderia-rpc
[rpc-source]: https://github.com/guilderiajs/RPC
[contributing]: https://github.com/guilderiajs/guilderia.js/blob/main/.github/CONTRIBUTING.md
