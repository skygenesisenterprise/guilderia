import { ComponentType } from 'guilderia-api-types/v10';
import { describe, expect, test } from 'vitest';
import { MediaGalleryBuilder } from '../../../src/components/v2/MediaGallery';
import { MediaGalleryItemBuilder } from '../../../src/components/v2/MediaGalleryItem';

describe('MediaGallery', () => {
	test('GIVEN an empty media gallery THEN throws error', () => {
		const gallery = new MediaGalleryBuilder();
		expect(() => gallery.toJSON()).toThrow();
	});

	describe('MediaGallery items', () => {
		test('GIVEN a media gallery with pre-defined items THEN return valid toJSON data', () => {
			const items = [
				{ media: { url: 'https://google.com' } },
				{ media: { url: 'https://guilderia.com' }, description: 'Guilderia' },
			];

			const gallery = new MediaGalleryBuilder({
				type: ComponentType.MediaGallery,
				items,
			});

			expect(gallery.toJSON()).toEqual({
				type: ComponentType.MediaGallery,
				items,
			});
		});

		test('GIVEN a media gallery with items added via addItems THEN return valid toJSON data', () => {
			const gallery = new MediaGalleryBuilder();
			const item1 = new MediaGalleryItemBuilder().setURL('https://google.com');
			const item2 = new MediaGalleryItemBuilder().setURL('https://guilderia.com').setDescription('Guilderia');

			gallery.addItems(item1, item2);

			expect(gallery.toJSON()).toEqual({
				type: ComponentType.MediaGallery,
				items: [
					{ media: { url: 'https://google.com' } },
					{ media: { url: 'https://guilderia.com' }, description: 'Guilderia' },
				],
			});
		});

		test('GIVEN a media gallery with items added via addItems with raw objects THEN return valid toJSON data', () => {
			const gallery = new MediaGalleryBuilder();

			gallery.addItems(
				{ media: { url: 'https://google.com' } },
				{ media: { url: 'https://guilderia.com' }, description: 'Guilderia' },
			);

			expect(gallery.toJSON()).toEqual({
				type: ComponentType.MediaGallery,
				items: [
					{ media: { url: 'https://google.com' } },
					{ media: { url: 'https://guilderia.com' }, description: 'Guilderia' },
				],
			});
		});

		test('GIVEN a media gallery with items added via addItems with builder functions THEN return valid toJSON data', () => {
			const gallery = new MediaGalleryBuilder();

			gallery.addItems(
				(builder) => builder.setURL('https://google.com'),
				(builder) => builder.setURL('https://guilderia.com').setDescription('Guilderia'),
			);

			expect(gallery.toJSON()).toEqual({
				type: ComponentType.MediaGallery,
				items: [
					{ media: { url: 'https://google.com' } },
					{ media: { url: 'https://guilderia.com' }, description: 'Guilderia' },
				],
			});
		});

		test('GIVEN a media gallery with array of items passed to addItems THEN return valid toJSON data', () => {
			const gallery = new MediaGalleryBuilder();
			const items = [
				new MediaGalleryItemBuilder().setURL('https://google.com'),
				new MediaGalleryItemBuilder().setURL('https://guilderia.com').setDescription('Guilderia'),
			];

			gallery.addItems(items);

			expect(gallery.toJSON()).toEqual({
				type: ComponentType.MediaGallery,
				items: [
					{ media: { url: 'https://google.com' } },
					{ media: { url: 'https://guilderia.com' }, description: 'Guilderia' },
				],
			});
		});

		test('GIVEN a media gallery with items added via addItems with builder functions THEN return valid toJSON data', () => {
			const gallery = new MediaGalleryBuilder();

			gallery
				.addItems(
					new MediaGalleryItemBuilder().setURL('https://google.com'),
					new MediaGalleryItemBuilder().setURL('https://guilderia.com').setDescription('Guilderia'),
				)
				.spliceItems(1, 1, new MediaGalleryItemBuilder().setURL('https://guilderia.js.org').setDescription('Guilderia.JS'));

			expect(gallery.toJSON()).toEqual({
				type: ComponentType.MediaGallery,
				items: [
					{ media: { url: 'https://google.com' } },
					{ media: { url: 'https://guilderia.js.org' }, description: 'Guilderia.JS' },
				],
			});
		});
	});
});
