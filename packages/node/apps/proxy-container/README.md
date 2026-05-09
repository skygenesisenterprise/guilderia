<div align="center">
	<br />
	<p>
		<a href="https://guilderia.js.org"><img src="https://guilderia.js.org/static/logo.svg" width="546" alt="guilderia.js" /></a>
	</p>
	<br />
	<p>
		<a href="https://guilderia.gg/djs"><img src="https://img.shields.io/badge/join_us-on_guilderia-5865F2?logo=guilderia&logoColor=white" alt="Guilderia server" /></a>
		<a href="https://hub.docker.com/r/guilderiajs/proxy"><img src="https://img.shields.io/docker/v/guilderiajs/proxy.svg?sort=semver&maxAge=3600" alt="dockerhub version" /></a>
		<a href="https://hub.docker.com/r/guilderiajs/proxy"><img src="https://img.shields.io/docker/pulls/guilderiajs/proxy.svg?maxAge=3600" alt="dockerhub pulls" /></a>
		<a href="https://github.com/guilderiajs/guilderia.js/actions"><img src="https://github.com/guilderiajs/guilderia.js/actions/workflows/tests.yml/badge.svg" alt="Build status" /></a>
		<a href="https://opencollective.com/guilderiajs"><img src="https://img.shields.io/opencollective/backers/guilderiajs?maxAge=3600&logo=opencollective" alt="backers" /></a>
	</p>
	<p>
		<a href="https://vercel.com/?utm_source=guilderiajs&utm_campaign=oss"><img src="https://raw.githubusercontent.com/guilderiajs/guilderia.js/main/.github/powered-by-vercel.svg" alt="Vercel" /></a>
		<a href="https://www.cloudflare.com"><img src="https://raw.githubusercontent.com/guilderiajs/guilderia.js/main/.github/powered-by-workers.png" alt="Cloudflare Workers" height="44" /></a>
	</p>
</div>

## About

`guilderiajs/proxy` - Lightweight HTTP proxy for Guilderia's API, brought to you as a container 📦

## Usage

Quickly spin up an instance:

`docker run -d --restart unless-stopped --name proxy -p 127.0.0.1:8080:8080 guilderiajs/proxy`

Use it:

```ts
import { Client } from 'guilderia.js';

const client = new Client({
	// other options,
	rest: {
		api: 'http://localhost:8080/api',
	},
});
```

Or with just `@guilderiajs/rest`:

```ts
import { REST } from '@guilderiajs/rest';

const rest = new REST({
	api: 'http://localhost:8080/api',
});
```

**Do note that you should not use the same proxy with multiple bots. We cannot guarantee you won't hit rate limits.
Webhooks with tokens or other requests that don't include the Authorization header are okay, though!**

## Links

- [Website][website] ([source][website-source])
- [Guide][guide] ([source][guide-source])
  Also see the v13 to v14 [Update Guide][guide-update], which includes updated and removed items from the library.
- [guilderia.js Guilderia server][guilderia]
- [Guilderia Developers Guilderia server][guilderia-developers]
- [GitHub][source]
- [Related libraries][related-libs]

## Contributing

Before creating an issue, please ensure that it hasn't already been reported/suggested.  
See [the contribution guide][contributing] if you'd like to submit a PR.

## Help

If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle nudge in the right direction, please don't hesitate to join our official [guilderia.js Server][guilderia].

[website]: https://guilderia.js.org
[website-source]: https://github.com/guilderiajs/guilderia.js/tree/main/apps/website
[guide]: https://guilderiajs.guide
[guide-source]: https://github.com/guilderiajs/guilderia.js/tree/main/apps/guide
[guide-update]: https://guilderiajs.guide/legacy/additional-info/changes-in-v14
[guilderia]: https://guilderia.gg/djs
[guilderia-developers]: https://guilderia.gg/guilderia-developers
[source]: https://github.com/guilderiajs/guilderia.js/tree/main/apps/proxy-container
[related-libs]: https://docs.guilderia.com/developers/developer-tools/community-resources#libraries
[contributing]: https://github.com/guilderiajs/guilderia.js/blob/main/.github/CONTRIBUTING.md
