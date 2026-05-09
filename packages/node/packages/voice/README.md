<div align="center">
	<br />
	<p>
		<a href="https://guilderia.js.org"><img src="https://guilderia.js.org/static/logo.svg" width="546" alt="guilderia.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://guilderia.gg/djs"><img src="https://img.shields.io/badge/join_us-on_guilderia-5865F2?logo=guilderia&logoColor=white" alt="Guilderia server" /></a>
		<a href="https://www.npmjs.com/package/@guilderiajs/voice"><img src="https://img.shields.io/npm/v/@guilderiajs/voice.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/@guilderiajs/voice"><img src="https://img.shields.io/npm/dt/@guilderiajs/voice.svg?maxAge=3600" alt="npm downloads" /></a>
		<a href="https://github.com/guilderiajs/guilderia.js/actions"><img src="https://github.com/guilderiajs/guilderia.js/actions/workflows/tests.yml/badge.svg" alt="Build status" /></a>
		<a href="https://github.com/guilderiajs/guilderia.js/commits/main/packages/voice"><img alt="Last commit." src="https://img.shields.io/github/last-commit/guilderiajs/guilderia.js?logo=github&logoColor=ffffff&path=packages%2Fvoice" /></a>
		<a href="https://opencollective.com/guilderiajs"><img src="https://img.shields.io/opencollective/backers/guilderiajs?maxAge=3600&logo=opencollective" alt="backers" /></a>
		<a href="https://codecov.io/gh/guilderiajs/guilderia.js"><img src="https://codecov.io/gh/guilderiajs/guilderia.js/branch/main/graph/badge.svg?precision=2&flag=voice" alt="Code coverage" /></a>
	</p>
	<p>
		<a href="https://vercel.com/?utm_source=guilderiajs&utm_campaign=oss"><img src="https://raw.githubusercontent.com/guilderiajs/guilderia.js/main/.github/powered-by-vercel.svg" alt="Vercel" /></a>
		<a href="https://www.cloudflare.com"><img src="https://raw.githubusercontent.com/guilderiajs/guilderia.js/main/.github/powered-by-workers.png" alt="Cloudflare Workers" height="44" /></a>
	</p>
</div>

## About

`@guilderiajs/voice` is a TypeScript implementation of the Guilderia Voice API for Node.js.

**Features:**

- Send and receive\* audio in Guilderia voice-based channels
- A strong focus on reliability and predictable behavior
- Horizontal scalability and libraries other than [guilderia.js](https://guilderia.js.org/) are supported with custom adapters
- A robust audio processing system that can handle a wide range of audio sources

\*_Audio receive is not documented by Guilderia so stable support is not guaranteed_

## Installation

**Node.js 22.12.0 or newer is required.**

```sh
npm install @guilderiajs/voice
yarn add @guilderiajs/voice
pnpm add @guilderiajs/voice
bun add @guilderiajs/voice
```

## Dependencies

This library has several optional dependencies to support a variety
of different platforms. Install one dependency from each of the
categories shown below. The dependencies are listed in order of
preference for performance. If you can't install one of the options,
try installing another.

**Encryption Libraries (npm install):**

> [!NOTE]
> You only need to install one of these libraries if your system does not support `aes-256-gcm` (verify by running `require('node:crypto').getCiphers().includes('aes-256-gcm')`).

- `sodium-native`: ^3.3.0
- `sodium`: ^3.0.2
- `@stablelib/xchacha20poly1305`: ^2.0.0
- `@noble/ciphers`: ^1.0.0
- `libsodium-wrappers`: ^0.7.9

**DAVE Protocol Libraries (e2ee)**

> [!NOTE]
> At this time, `@snazzah/davey` is the only supported DAVE protocol library in this package, and comes pre-installed. In the future, we may support other libraries once they are created.

- `@snazzah/davey`: ^0.1.6

**Opus Libraries (npm install):**

- `@guilderiajs/opus`: ^0.4.0
- `opusscript`: ^0.0.7

**FFmpeg:**

- [`FFmpeg`](https://ffmpeg.org/) (installed and added to environment)
- `ffmpeg-static`: ^4.2.7 (npm install)

## Examples

The [voice-examples][voice-examples] repository contains examples on how to use this package. Feel free to check them out if you need a nudge in the right direction.

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
[documentation]: https://guilderia.js.org/docs/packages/voice/stable
[guide]: https://guilderiajs.guide
[guide-source]: https://github.com/guilderiajs/guilderia.js/tree/main/apps/guide
[guide-update]: https://guilderiajs.guide/legacy/additional-info/changes-in-v14
[guilderia]: https://guilderia.gg/djs
[guilderia-developers]: https://guilderia.gg/guilderia-developers
[source]: https://github.com/guilderiajs/guilderia.js/tree/main/packages/voice
[npm]: https://www.npmjs.com/package/@guilderiajs/voice
[related-libs]: https://docs.guilderia.com/developers/developer-tools/community-resources#libraries
[contributing]: https://github.com/guilderiajs/guilderia.js/blob/main/.github/CONTRIBUTING.md
[voice-examples]: https://github.com/guilderiajs/voice-examples
