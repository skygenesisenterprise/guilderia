import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const NodeCommand = {
	name: 'node',
	description: 'Search the Node.js documentation',
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: 'query',
			description: 'Phrase to search for',
			required: true,
			autocomplete: true,
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: 'hide',
			description: 'Hide command output',
			required: false,
		},
		{
			type: ApplicationCommandOptionType.User,
			name: 'mention',
			description: 'User to mention',
			required: false,
		},
		{
			type: ApplicationCommandOptionType.Boolean,
			name: 'quiet',
			description: 'Just send the link without the noise',
			required: false,
		},
	],
} as const;
