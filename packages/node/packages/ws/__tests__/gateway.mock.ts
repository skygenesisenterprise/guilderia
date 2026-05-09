import type { RESTGetAPIGatewayBotResult } from 'guilderia-api-types/v10';

export const mockGatewayInformation: RESTGetAPIGatewayBotResult = {
	shards: 1,
	session_start_limit: {
		max_concurrency: 3,
		reset_after: 60,
		remaining: 3,
		total: 3,
	},
	url: 'wss://gateway.guilderia.gg',
};
