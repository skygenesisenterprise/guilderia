import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const HaikuCommand = {
	name: 'haiku',
	description: 'Send a haiku - 575',
	options: [
		{
			type: ApplicationCommandOptionType.String,
			name: 'query',
			description: 'Haiku name or alias',
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
	],
} as const;
