import type { Meta, StoryObj } from '@storybook/react';
import { GuilderiaMessage } from './Message.jsx';
import { GuilderiaMessageEmbed } from './MessageEmbed.jsx';
import { GuilderiaMessages } from './Messages.jsx';

export default {
	title: 'GuilderiaMessages',
	component: GuilderiaMessages,
	tags: ['autodocs'],
} satisfies Meta<typeof GuilderiaMessages>;

type Story = StoryObj<typeof GuilderiaMessages>;

export const Default = {
	render: ({ ...args }) => (
		<GuilderiaMessages {...args}>
			<GuilderiaMessage
				author={{
					avatar: '/assets/guilderiajs.png',
					bot: true,
					time: 'Today at 21:00',
					username: 'Guide Bot',
				}}
			>
				A _`GuilderiaMessage`_ must be within _`GuilderiaMessages`_.
			</GuilderiaMessage>
			<GuilderiaMessage
				author={{
					avatar: '/assets/guilderiajs.png',
					bot: true,
					time: 'Today at 21:01',
					username: 'Guide Bot',
				}}
				reply={{
					author: {
						avatar: '/assets/guilderiajs.png',
						bot: true,
						username: 'Guide Bot',
					},
					content: 'A _`GuilderiaMessage`_ must be within _`GuilderiaMessages`_.',
				}}
				time="21:02"
			>
				It's much better to see the source code of this page to replicate and learn!
			</GuilderiaMessage>
			<GuilderiaMessage
				author={{
					avatar: '/assets/guilderiajs.png',
					bot: true,
					time: 'Today at 21:02',
					username: 'Guide Bot',
				}}
			>
				This message depicts the use of embeds.
				<>
					<GuilderiaMessageEmbed
						author={{
							avatar: '/assets/guilderiajs.png',
							username: 'Guide Bot',
							url: 'https://guilderia.js.org',
						}}
						footer={{
							content: 'Sometimes, titles just have to be.',
							icon: '/assets/guilderiajs.png',
							timestamp: 'Today at 21:02',
						}}
						title={{ title: 'An amazing title', url: 'https://guilderia.js.org' }}
					>
						This is a description. You can put a description here. It must be descriptive!
					</GuilderiaMessageEmbed>
					<GuilderiaMessageEmbed
						author={{
							avatar: '/assets/guilderiajs.png',
							username: 'Guide Bot',
						}}
						footer={{ content: "When one amazing title just wasn't enough." }}
						thumbnail={{
							alt: 'guilderia.js logo',
							image: '/assets/guilderiajs.png',
						}}
						title={{ title: 'Another amazing title' }}
					>
						Multiple embeds!
					</GuilderiaMessageEmbed>
					<GuilderiaMessageEmbed
						author={{
							avatar: '/assets/guilderiajs.png',
							username: 'Guide Bot',
						}}
						fields={[
							{
								name: 'First field',
								value: 'Some value',
							},
							{
								name: 'Another field',
								value: 'Another value',
								inline: true,
							},
							{
								name: 'A third field',
								value: 'That is inline',
								inline: true,
							},
							{
								name: 'At last',
								value: 'This is the last field',
								inline: true,
							},
						]}
						footer={{ timestamp: 'Today at 21:02' }}
						image={{
							alt: 'guilderia.js logo',
							url: '/assets/guilderiajs.png',
							width: 300,
							height: 300,
						}}
						thumbnail={{
							alt: 'guilderia.js logo',
							image: '/assets/guilderiajs.png',
						}}
						title={{ title: 'Fields are also supported!' }}
					/>
				</>
			</GuilderiaMessage>
			<GuilderiaMessage
				author={{
					avatar: '/assets/guilderiajs.png',
					bot: true,
					time: 'Today at 21:03',
					username: 'Guide Bot',
				}}
				interaction={{
					author: {
						avatar: '/assets/guilderiajs.png',
						bot: true,
						username: 'Guide Bot',
					},
					command: '/interaction',
				}}
			>
				Interactions are supported! I definitely used a command.
			</GuilderiaMessage>
			<GuilderiaMessage
				author={{
					avatar: '/assets/guilderiajs.png',
					bot: true,
					verified: true,
					color: 'text-red-500',
					time: 'Today at 21:04',
					username: 'Guide Bot',
				}}
				reply={{
					author: {
						avatar: '/assets/snek-bot.jpeg',
						bot: true,
						verified: true,
						color: 'text-blue-500',
						username: 'Snek Bot',
					},
					content: 'You can also have verified bots, like me!',
				}}
			>
				Display colors are supported as well!
			</GuilderiaMessage>
		</GuilderiaMessages>
	),
	args: {
		rounded: false,
	},
} satisfies Story;
