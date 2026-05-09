import { Events } from 'guilderia.js';

/** @type {import('./index.js').Event<Events.ClientReady>} */
export default {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
