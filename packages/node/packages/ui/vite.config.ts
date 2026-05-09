import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		dts(),
		react(),
		Unocss({
			content: { pipeline: { include: ['.storybook/preview.ts'] } },
			configFile: '../../unocss.config.ts',
		}),
	],
	build: {
		lib: {
			entry: [
				'src/lib/index.ts',
				'src/lib/components/Alert.tsx',
				'src/lib/components/Section.tsx',
				'src/lib/components/guilderia/Message.tsx',
				'src/lib/components/guilderia/MessageAuthor.tsx',
				'src/lib/components/guilderia/MessageAuthorReply.tsx',
				'src/lib/components/guilderia/MessageBaseReply.tsx',
				'src/lib/components/guilderia/MessageEmbed.tsx',
				'src/lib/components/guilderia/MessageEmbedAuthor.tsx',
				'src/lib/components/guilderia/MessageEmbedField.tsx',
				'src/lib/components/guilderia/MessageEmbedFields.tsx',
				'src/lib/components/guilderia/MessageEmbedFooter.tsx',
				'src/lib/components/guilderia/MessageEmbedImage.tsx',
				'src/lib/components/guilderia/MessageEmbedThumbnail.tsx',
				'src/lib/components/guilderia/MessageEmbedTitle.tsx',
				'src/lib/components/guilderia/MessageInteraction.tsx',
				'src/lib/components/guilderia/MessageReply.tsx',
				'src/lib/components/guilderia/Messages.tsx',
			],
			formats: ['es'],
			name: 'ui',
		},
		rollupOptions: {
			external: [
				'react',
				'react-dom',
				'@ariakit/react/disclosure',
				'@react-icons/all-files/vsc/VscFlame',
				'@react-icons/all-files/vsc/VscInfo',
				'@react-icons/all-files/vsc/VscWarning',
				'@react-icons/all-files/vsc/VscChevronDown',
				'@react-icons/all-files/fi/FiCheck',
			],
		},
	},
});
