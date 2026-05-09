# Roadmap backend Go depuis packages/node

## Objectif

Construire le backend Go compatible avec les usages REST exposes par `packages/node`.
Le SDK Node n'ecrit presque jamais les chemins `/api/*` en dur pour les ressources metier:
il appelle `Routes.*` depuis `guilderia-api-types/v10`, puis `@guilderiajs/rest`
prefixe les chemins avec `https://guilderia.com/api/v10`.

Source principale:

- `packages/node/packages/rest/src/lib/utils/constants.ts`: base API par defaut `https://guilderia.com/api`, version `APIVersion`.
- `packages/node/packages/rest/src/lib/REST.ts`: generation de l'URL finale `${api}/v${version}${fullRoute}`.
- `packages/node/packages/core/src/api/*.ts`: wrappers REST metier a implementer en Go.

Etat du backend Go local:

- `server/main.go` annonce `http://localhost:<port>/api/v1`.
- `server/src` est vide dans l'etat courant, donc il n'existe pas encore de matrice de routes Go a comparer.

## Mentions `/api/*` trouvees

Mentions litterales utiles:

- `packages/node/packages/rest/src/lib/utils/constants.ts`: base API `https://guilderia.com/api`.
- `packages/node/packages/rest/__tests__/util.ts`: format attendu `/api/v${DefaultRestOptions.version}${path}`.
- `packages/node/packages/rest/__tests__/GuilderiaAPIError.test.ts`: exemples `/api/v10/guilds/:id`, `/api/v10/users/@me`, `/api/v10/channels/:id`, `/api/v10/oauth2/token`.
- `packages/node/packages/proxy/__tests__/proxyRequests.test.ts`: proxy teste avec `/api/v10/simpleGet`.
- `packages/node/apps/website/src/components/Navigation.tsx`: `/api/docs/sitemap`.
- `packages/node/apps/website/src/components/Sidebar.tsx`: `/api/docs/entrypoints`, `/api/docs/versions`.
- `packages/node/packages/scripts/src/shared.ts`: `https://guilderia.js.org/api/docs/versions`.

Mentions documentaires a ne pas prendre comme routes backend prioritaires:

- liens Node.js, Undici, Rushstack, Netlify sous `/api/...`;
- liens de documentation `guilderia-api-types.dev/api/guilderia-api-types-v10`;
- guides legacy MDX contenant des exemples OAuth2/webhooks.

## Semantique REST a reproduire

Le client Node attend:

- base: `/api/v10` pour la compatibilite SDK Node actuelle;
- compat optionnelle: alias `/api/v1` si le backend Go garde son prefixe courant;
- auth par defaut: header `Authorization: Bot <token>`;
- exceptions `auth: false`: webhooks par token, OAuth2 token exchange/revoke, certains endpoints publics;
- audit log: header `X-Audit-Log-Reason`;
- query string standard;
- JSON par defaut;
- multipart avec champ `payload_json` pour les endpoints avec fichiers;
- erreurs JSON compatibles avec `GuilderiaAPIError`;
- rate limit headers compatibles REST si le SDK doit les consommer correctement.

## Matrice des routes SDK

Scan local: 202 appels `this.rest.*(Routes.*)` dans `packages/node/packages/core/src/api/*.ts`, 185 couples methode/helper uniques.
Les noms ci-dessous sont les helpers `Routes.*`; chaque helper correspond a un chemin sous `/api/v10`.

### Applications et commandes

Fichiers: `applicationCommands.ts`, `applications.ts`, `roleConnections.ts`.

- `GET/POST/PUT applicationCommands`
- `GET/PATCH/DELETE applicationCommand`
- `GET/POST/PUT applicationGuildCommands`
- `GET/PATCH/DELETE applicationGuildCommand`
- `GET/PUT applicationCommandPermissions`
- `GET guildApplicationCommandsPermissions`
- `GET currentApplication`
- `PATCH currentApplication`
- `GET/POST applicationEmojis`
- `GET/PATCH/DELETE applicationEmoji`
- `GET applicationActivityInstance`
- `GET/PUT applicationRoleConnectionMetadata`

Priorite Go:

1. Commands globales et guild commands.
2. Application courante.
3. Emojis d'application.
4. Permissions et role connection metadata.

### OAuth2

Fichier: `oauth2.ts`.

- `GET oauth2CurrentApplication`
- `GET oauth2CurrentAuthorization`
- `POST oauth2TokenExchange`
- `POST oauth2TokenRevocation`
- generation d'URL: `RouteBases.api + Routes.oauth2Authorization()`

Priorite Go:

1. `/oauth2/authorize` pour redirection et scopes.
2. `/oauth2/token` grant authorization code, refresh token, client credentials si supporte.
3. `/oauth2/token/revoke`.
4. `/oauth2/@me` ou equivalent pour application/authorization courante selon le helper `Routes`.

### Utilisateurs

Fichier: `user.ts`.

- `GET user`
- `PATCH user`
- `GET userGuilds`
- `DELETE userGuild`
- `GET userGuildMember`
- `PATCH guildMember`
- `POST userChannels`
- `GET userConnections`
- `GET/PUT userApplicationRoleConnection`

Priorite Go:

1. `GET/PATCH /users/@me`.
2. guilds et member courant.
3. DM channels.
4. connections et role connection.

### Guilds

Fichier: `guild.ts`.

- `GET/PATCH guild`
- `GET guildPreview`
- `PUT/PATCH/GET/DELETE guildMember`
- `GET guildMembers`
- `GET guildMembersSearch`
- `PUT/DELETE guildMemberRole`
- `GET/POST/PATCH guildChannels`
- `GET guildActiveThreads`
- `GET/PUT/DELETE guildBan`
- `GET guildBans`
- `POST guildBulkBan`
- `GET/POST/PATCH/DELETE guildRole`
- `GET/POST/PATCH guildRoles`
- `GET guildRoleMemberCounts`
- `GET/POST guildPrune`
- `GET guildVoiceRegions`
- `GET guildInvites`
- `GET guildIntegrations`
- `DELETE guildIntegration`
- `GET/PATCH guildWidgetSettings`
- `GET guildWidgetJSON`
- `GET guildWidgetImage`
- `GET guildVanityUrl`
- `GET/PATCH guildWelcomeScreen`
- `GET/POST/PATCH/DELETE guildEmoji`
- `GET/POST guildEmojis`
- `GET/POST/PATCH/DELETE guildScheduledEvent`
- `GET guildScheduledEvents`
- `GET guildScheduledEventUsers`
- `GET/PUT/PATCH/DELETE guildTemplate`
- `GET/POST guildTemplates`
- `GET template`
- `GET guildWebhooks`
- `GET/PUT guildOnboarding`
- `GET/POST/PATCH/DELETE guildSoundboardSound`
- `GET/POST guildSoundboardSounds`
- `PUT guildIncidentActions`
- `GET/POST/PATCH/DELETE guildAutoModerationRule`
- `GET/POST guildAutoModerationRules`

Priorite Go:

1. Guild CRUD minimal: fetch/update, members, roles, channels.
2. Moderation: bans, bulk ban, audit log, auto moderation.
3. Assets secondaires: emojis, stickers, soundboard.
4. Discovery/public: preview, widget, vanity URL, welcome screen, templates.
5. Onboarding, incident actions, scheduled events.

### Channels, messages et threads

Fichiers: `channel.ts`, `thread.ts`, `poll.ts`.

- `GET/PATCH/DELETE channel`
- `GET/POST channelMessages`
- `GET/PATCH/DELETE channelMessage`
- `POST channelMessageCrosspost`
- `POST channelBulkDelete`
- `GET/PUT/DELETE channelMessagesPin`
- `GET channelMessagesPins`
- `GET/PUT/DELETE channelMessageOwnReaction`
- `GET/DELETE channelMessageUserReaction`
- `GET/DELETE channelMessageReaction`
- `DELETE channelMessageAllReactions`
- `POST channelTyping`
- `GET/POST channelInvites`
- `POST channelFollowers`
- `GET/POST channelWebhooks`
- `PUT/DELETE channelPermission`
- `POST threads`
- `GET channelThreads`
- `GET channelJoinedArchivedThreads`
- `PUT/DELETE/GET threadMembers`
- `POST sendSoundboardSound`
- `PUT/DELETE channelRecipient`
- `GET pollAnswerVoters`
- `POST expirePoll`

Priorite Go:

1. Channels et messages, avec pagination `before/after/around/limit`.
2. Reactions et pins.
3. Invites, permissions, webhooks channel.
4. Threads et membres de threads.
5. Polls et soundboard.

### Webhooks et interactions

Fichiers: `webhook.ts`, `interactions.ts`.

- `GET/PATCH/DELETE webhook`
- `POST webhook`
- `POST webhookPlatform`
- `GET/PATCH/DELETE webhookMessage`
- `POST interactionCallback`

Priorite Go:

1. Webhook execute par `id/token` sans auth bot.
2. CRUD webhook avec auth quand token absent.
3. Messages webhook.
4. Interaction callback, avec bucket special `/interactions/:id/:token/callback`.
5. Reponses multipart si fichiers presents.

### Gateway, voice, invites, stages

Fichiers: `gateway.ts`, `voice.ts`, `invite.ts`, `stageInstances.ts`.

- `GET gateway`
- `GET gatewayBot`
- `GET voiceRegions`
- `GET/PATCH guildVoiceState`
- `GET/DELETE invite`
- `POST/GET/PATCH/DELETE stageInstance`

Priorite Go:

1. Gateway URL et bot metadata.
2. Voice regions et voice state.
3. Invites.
4. Stage instances.

### Stickers, soundboard global, monetization

Fichiers: `sticker.ts`, `soundboardSounds.ts`, `monetization.ts`.

- `GET sticker`
- `GET stickerPack`
- `GET stickerPacks`
- `GET soundboardDefaultSounds`
- `GET skus`
- `GET skuSubscriptions`
- `GET skuSubscription`
- `GET/POST/DELETE entitlement`
- `GET/POST entitlements`
- `POST consumeEntitlement`

Priorite Go:

1. Stickers et packs.
2. Default soundboard sounds.
3. SKUs, subscriptions, entitlements.

### Documentation website

Fichiers: `apps/website/src/components/*`, `packages/scripts/src/shared.ts`.

- `GET /api/docs/sitemap?packageName=&version=&entryPoint=`
- `GET /api/docs/entrypoints?packageName=&version=`
- `GET /api/docs/versions?packageName=`

Ces endpoints servent le site de documentation Node. Les implementer dans le backend Go seulement si le site docs doit etre servi par Go; sinon les laisser dans le backend Next/website.

## Plan d'implementation Go

### Phase 1 - Socle HTTP

- Creer `server/src/routes` et enregistrer un groupe Gin `/api/v10`.
- Garder un alias `/api/v1` uniquement si l'application existante en depend.
- Ajouter middleware auth bot, extraction audit reason, request ID, JSON errors.
- Definir une enveloppe d'erreur compatible SDK: `code`, `message`, `errors?`.
- Ajouter helpers pagination, snowflake validation, parsing multipart `payload_json`.

### Phase 2 - Domaines critiques SDK

- Implementer Users, Guilds minimal, Channels/Messages.
- Ajouter Application Commands globales/guild.
- Ajouter OAuth2 token/authorize si le login et les bots en dependent.
- Ajouter Webhooks et Interaction callback.

### Phase 3 - Couverture Discord-like complete

- Guild moderation: audit logs, bans, roles, auto moderation.
- Threads, polls, invites, permissions.
- Gateway metadata et voice.
- Assets: emojis, stickers, soundboard.
- Monetization: SKUs, subscriptions, entitlements.

### Phase 4 - Compatibilite SDK

- Tester le SDK Node contre le backend Go avec `DefaultRestOptions.api` pointe sur `http://localhost:<port>/api`.
- Verifier que les routes versionnees resolvent en `/api/v10/...`.
- Ajouter tests de non-regression pour:
  - auth requise vs `auth: false`;
  - query strings;
  - multipart `payload_json`;
  - `X-Audit-Log-Reason`;
  - erreurs JSON;
  - rate limit headers.

## Convention de fichiers proposee

- `server/src/routes/routes.go`: registration globale.
- `server/src/middleware/auth.go`: auth bot et bearer.
- `server/src/middleware/errors.go`: error handler JSON.
- `server/src/controllers/users.go`
- `server/src/controllers/guilds.go`
- `server/src/controllers/channels.go`
- `server/src/controllers/applications.go`
- `server/src/controllers/oauth2.go`
- `server/src/controllers/webhooks.go`
- `server/src/controllers/interactions.go`
- `server/src/models/*.go`
- `server/src/services/*.go`

## Commandes de controle

Reproduire le scan:

```sh
rg -n "/api/" packages/node
rg -n "this\\.rest\\.(get|post|put|patch|delete)\\(Routes\\." packages/node/packages/core/src/api
```

Compter la surface SDK:

```sh
perl -nE 'if (/this\\.rest\\.(get|post|put|patch|delete)\\(Routes\\.([A-Za-z0-9_]+)\\(/) { $total++; $u{uc($1)." ".$2}=1; $m{uc($1)}++ } END { say "calls=$total"; say "unique=".scalar(keys %u); for (sort keys %m) { say "$_=$m{$_}" } }' packages/node/packages/core/src/api/*.ts
```

Resultat du scan actuel:

- appels REST SDK: 202;
- couples methode/helper uniques: 185;
- repartition: `GET=86`, `POST=42`, `DELETE=31`, `PATCH=26`, `PUT=17`.

