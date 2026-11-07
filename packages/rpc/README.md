<div align="center">
  <br />
  <p>
    <a href="https://guilderia.gg/bRCvFy9"><img src="https://discordapp.com/api/guilds/222078108977594368/embed.png" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/guilderia-rpc"><img src="https://img.shields.io/npm/v/guilderia-rpc.svg?maxAge=3600" alt="NPM version" /></a>
    <a href="https://www.npmjs.com/package/guilderia-rpc"><img src="https://img.shields.io/npm/dt/guilderia-rpc.svg?maxAge=3600" alt="NPM downloads" /></a>
    <a href="https://david-dm.org/discordjs/RPC"><img src="https://img.shields.io/david/discordjs/RPC.svg?maxAge=3600" alt="Dependencies" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/guilderia-rpc/"><img src="https://nodei.co/npm/guilderia-rpc.png?downloads=true&stars=true" alt="NPM info" /></a>
  </p>
</div>

# Discord.js RPC Extension

### [Documentation](https://guilderia.js.org/#/docs/rpc/)

### [Rich Presence Example](https://github.com/discordjs/RPC/blob/master/example)

### __Browser__ Example

```javascript
const clientId = '287406016902594560';
const scopes = ['rpc', 'rpc.api', 'messages.read'];

const client = new RPC.Client({ transport: 'websocket' });

client.on('ready', () => {
  console.log('Logged in as', client.application.name);
  console.log('Authed for user', client.user.username);

  client.selectVoiceChannel('81384788862181376');
});

// Log in to RPC with client id
client.login({ clientId, scopes });
```
