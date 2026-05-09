/* eslint-disable no-template-curly-in-string */
import { describe, test, expect, vitest } from 'vitest';
import {
	applicationDirectory,
	chatInputApplicationCommandMention,
	blockQuote,
	bold,
	channelLink,
	channelMention,
	codeBlock,
	Faces,
	formatEmoji,
	heading,
	HeadingLevel,
	hideLinkEmbed,
	hyperlink,
	inlineCode,
	italic,
	linkedRoleMention,
	messageLink,
	orderedList,
	quote,
	roleMention,
	spoiler,
	strikethrough,
	subtext,
	time,
	TimestampStyles,
	underline,
	unorderedList,
	userMention,
	email,
	phoneNumber,
} from '../src/index.js';

describe('Message formatters', () => {
	describe('codeBlock', () => {
		test('GIVEN "guilderia.js" with no language THEN returns "```\\nguilderia.js```"', () => {
			expect<'```\nguilderia.js\n```'>(codeBlock('guilderia.js')).toEqual('```\nguilderia.js\n```');
		});

		test('GIVEN "guilderia.js" with "js" as language THEN returns "```js\\nguilderia.js```"', () => {
			expect<'```js\nguilderia.js\n```'>(codeBlock('js', 'guilderia.js')).toEqual('```js\nguilderia.js\n```');
		});
	});

	describe('inlineCode', () => {
		test('GIVEN "guilderia.js" THEN returns "`guilderia.js`"', () => {
			expect<'`guilderia.js`'>(inlineCode('guilderia.js')).toEqual('`guilderia.js`');
		});
	});

	describe('italic', () => {
		test('GIVEN "guilderia.js" THEN returns "_guilderia.js_"', () => {
			expect<'_guilderia.js_'>(italic('guilderia.js')).toEqual('_guilderia.js_');
		});
	});

	describe('bold', () => {
		test('GIVEN "guilderia.js" THEN returns "**guilderia.js**"', () => {
			expect<'**guilderia.js**'>(bold('guilderia.js')).toEqual('**guilderia.js**');
		});
	});

	describe('underline', () => {
		test('GIVEN "guilderia.js" THEN returns "__guilderia.js__"', () => {
			expect<'__guilderia.js__'>(underline('guilderia.js')).toEqual('__guilderia.js__');
		});
	});

	describe('strikethrough', () => {
		test('GIVEN "guilderia.js" THEN returns "~~guilderia.js~~"', () => {
			expect<'~~guilderia.js~~'>(strikethrough('guilderia.js')).toEqual('~~guilderia.js~~');
		});
	});

	describe('quote', () => {
		test('GIVEN "guilderia.js" THEN returns "> guilderia.js"', () => {
			expect<'> guilderia.js'>(quote('guilderia.js')).toEqual('> guilderia.js');
		});
	});

	describe('blockQuote', () => {
		test('GIVEN "guilderia.js" THEN returns ">>> guilderia.js"', () => {
			expect<'>>> guilderia.js'>(blockQuote('guilderia.js')).toEqual('>>> guilderia.js');
		});
	});

	describe('hideLinkEmbed', () => {
		test('GIVEN "https://guilderia.js.org" THEN returns "<https://guilderia.js.org>"', () => {
			expect<'<https://guilderia.js.org>'>(hideLinkEmbed('https://guilderia.js.org')).toEqual('<https://guilderia.js.org>');
		});

		test('GIVEN new URL("https://guilderia.js.org") THEN returns "<https://guilderia.js.org>"', () => {
			expect<`<${string}>`>(hideLinkEmbed(new URL('https://guilderia.js.org/'))).toEqual('<https://guilderia.js.org/>');
		});
	});

	describe('hyperlink', () => {
		test('GIVEN content and string URL THEN returns "[content](url)"', () => {
			expect<'[guilderia.js](https://guilderia.js.org)'>(hyperlink('guilderia.js', 'https://guilderia.js.org')).toEqual(
				'[guilderia.js](https://guilderia.js.org)',
			);
		});

		test('GIVEN content and URL THEN returns "[content](url)"', () => {
			expect<`[guilderia.js](${string})`>(hyperlink('guilderia.js', new URL('https://guilderia.js.org'))).toEqual(
				'[guilderia.js](https://guilderia.js.org/)',
			);
		});

		test('GIVEN content, string URL, and title THEN returns "[content](url "title")"', () => {
			expect<'[guilderia.js](https://guilderia.js.org "Official Documentation")'>(
				hyperlink('guilderia.js', 'https://guilderia.js.org', 'Official Documentation'),
			).toEqual('[guilderia.js](https://guilderia.js.org "Official Documentation")');
		});

		test('GIVEN content, URL, and title THEN returns "[content](url "title")"', () => {
			expect<`[guilderia.js](${string} "Official Documentation")`>(
				hyperlink('guilderia.js', new URL('https://guilderia.js.org'), 'Official Documentation'),
			).toEqual('[guilderia.js](https://guilderia.js.org/ "Official Documentation")');
		});
	});

	describe('spoiler', () => {
		test('GIVEN "guilderia.js" THEN returns "||guilderia.js||"', () => {
			expect<'||guilderia.js||'>(spoiler('guilderia.js')).toEqual('||guilderia.js||');
		});
	});

	describe('Mentions', () => {
		describe('userMention', () => {
			test('GIVEN userId THEN returns "<@[userId]>"', () => {
				expect(userMention('139836912335716352')).toEqual('<@139836912335716352>');
			});
		});

		describe('channelMention', () => {
			test('GIVEN channelId THEN returns "<#[channelId]>"', () => {
				expect(channelMention('829924760309334087')).toEqual('<#829924760309334087>');
			});
		});

		describe('roleMention', () => {
			test('GIVEN roleId THEN returns "<&[roleId]>"', () => {
				expect(roleMention('815434166602170409')).toEqual('<@&815434166602170409>');
			});
		});

		describe('linkedRoleMention', () => {
			test('GIVEN roleId THEN returns "<id:linked-roles:[roleId]>"', () => {
				expect(linkedRoleMention('815434166602170409')).toEqual('<id:linked-roles:815434166602170409>');
			});
		});

		describe('chatInputApplicationCommandMention', () => {
			test('GIVEN commandId and commandName THEN returns "</[commandName]:[commandId]>"', () => {
				expect(chatInputApplicationCommandMention('815434166602170409', 'airhorn')).toEqual(
					'</airhorn:815434166602170409>',
				);
			});

			test('GIVEN commandId, commandName, subcommandName  THEN returns "</[commandName] [subcommandName]:[commandId]>"', () => {
				expect(chatInputApplicationCommandMention('815434166602170409', 'airhorn', 'sub')).toEqual(
					'</airhorn sub:815434166602170409>',
				);
			});

			test('GIVEN commandId, commandName, subcommandName, and subcommandGroupName, THEN returns "</[commandName] [subcommandGroupName] [subcommandName]:[commandId]>"', () => {
				expect(chatInputApplicationCommandMention('815434166602170409', 'airhorn', 'sub', 'group')).toEqual(
					'</airhorn group sub:815434166602170409>',
				);
			});
		});
	});

	describe('formatEmoji', () => {
		test('GIVEN static emojiId THEN returns "<:emoji:${emojiId}>"', () => {
			expect<`<:emoji:851461487498493952>`>(formatEmoji('851461487498493952')).toEqual('<:emoji:851461487498493952>');
		});

		test('GIVEN static emojiId WITH animated explicitly false THEN returns "<:emoji:[emojiId]>"', () => {
			expect<`<:emoji:851461487498493952>`>(formatEmoji('851461487498493952', false)).toEqual(
				'<:emoji:851461487498493952>',
			);
		});

		test('GIVEN animated emojiId THEN returns "<a:emoji:${emojiId}>"', () => {
			expect<`<a:emoji:827220205352255549>`>(formatEmoji('827220205352255549', true)).toEqual(
				'<a:emoji:827220205352255549>',
			);
		});

		test('GIVEN static id in options object THEN returns "<:emoji:${id}>"', () => {
			expect<`<:emoji:851461487498493952>`>(formatEmoji({ id: '851461487498493952' })).toEqual(
				'<:emoji:851461487498493952>',
			);
		});

		test('GIVEN static id in options object WITH animated explicitly false THEN returns "<:emoji:${id}>"', () => {
			expect<`<:emoji:851461487498493952>`>(formatEmoji({ animated: false, id: '851461487498493952' })).toEqual(
				'<:emoji:851461487498493952>',
			);
		});

		test('GIVEN animated id in options object THEN returns "<a:emoji:${id}>"', () => {
			expect<`<a:emoji:827220205352255549>`>(formatEmoji({ animated: true, id: '827220205352255549' })).toEqual(
				'<a:emoji:827220205352255549>',
			);
		});

		test('GIVEN static id and name in options object THEN returns "<:${name}:${id}>"', () => {
			expect<`<:test:851461487498493952>`>(formatEmoji({ id: '851461487498493952', name: 'test' })).toEqual(
				'<:test:851461487498493952>',
			);
		});

		test('GIVEN static id and name WITH animated explicitly false THEN returns "<:${name}:${id}>"', () => {
			expect<`<:test:851461487498493952>`>(
				formatEmoji({ animated: false, id: '851461487498493952', name: 'test' }),
			).toEqual('<:test:851461487498493952>');
		});

		test('GIVEN animated id and name THEN returns "<a:${name}:${id}>"', () => {
			expect<`<a:test:827220205352255549>`>(
				formatEmoji({ id: '827220205352255549', name: 'test', animated: true }),
			).toEqual('<a:test:827220205352255549>');
		});
	});

	describe('channelLink', () => {
		test('GIVEN channelId THEN returns "https://guilderia.com/channels/@me/${channelId}"', () => {
			expect<'https://guilderia.com/channels/@me/123456789012345678'>(channelLink('123456789012345678')).toEqual(
				'https://guilderia.com/channels/@me/123456789012345678',
			);
		});

		test('GIVEN channelId WITH guildId THEN returns "https://guilderia.com/channels/${guildId}/${channelId}"', () => {
			expect<'https://guilderia.com/channels/987654321987654/123456789012345678'>(
				channelLink('123456789012345678', '987654321987654'),
			).toEqual('https://guilderia.com/channels/987654321987654/123456789012345678');
		});
	});

	describe('messageLink', () => {
		test('GIVEN channelId AND messageId THEN returns "https://guilderia.com/channels/@me/${channelId}/${messageId}"', () => {
			expect<'https://guilderia.com/channels/@me/123456789012345678/102938475657483'>(
				messageLink('123456789012345678', '102938475657483'),
			).toEqual('https://guilderia.com/channels/@me/123456789012345678/102938475657483');
		});

		test('GIVEN channelId AND messageId WITH guildId THEN returns "https://guilderia.com/channels/${guildId}/${channelId}/${messageId}"', () => {
			expect<'https://guilderia.com/channels/987654321987654/123456789012345678/102938475657483'>(
				messageLink('123456789012345678', '102938475657483', '987654321987654'),
			).toEqual('https://guilderia.com/channels/987654321987654/123456789012345678/102938475657483');
		});
	});

	describe('heading', () => {
		test('GIVEN "guilderia.js" THEN returns "# guilderia.js"', () => {
			expect<'# guilderia.js'>(heading('guilderia.js')).toEqual('# guilderia.js');
		});

		test('GIVEN "guilderia.js" AND a heading level 2 from number THEN returns "## guilderia.js"', () => {
			expect<'## guilderia.js'>(heading('guilderia.js', 2)).toEqual('## guilderia.js');
		});

		test('GIVEN "guilderia.js" AND a heading level 3 from enum THEN returns "### guilderia.js"', () => {
			expect<'### guilderia.js'>(heading('guilderia.js', HeadingLevel.Three)).toEqual('### guilderia.js');
		});
	});

	describe('orderedList', () => {
		test('GIVEN ["guilderia.js", "guilderia.js 2", ["guilderia.js 3"]] THEN returns "1. guilderia.js\n1. guilderia.js 2\n  1. guilderia.js"', () => {
			expect(orderedList(['guilderia.js', 'guilderia.js 2', ['guilderia.js 3']])).toEqual(
				'1. guilderia.js\n1. guilderia.js 2\n  1. guilderia.js 3',
			);
		});

		test('GIVEN ["guilderia.js", "guilderia.js 2", ["guilderia.js 3"]] AND a startNumber THEN returns "${startNumber}. guilderia.js\n${startNumber}. guilderia.js 2\n  ${startNumber}. guilderia.js"', () => {
			expect(orderedList(['guilderia.js', 'guilderia.js 2', ['guilderia.js 3']], 50)).toEqual(
				'50. guilderia.js\n50. guilderia.js 2\n  50. guilderia.js 3',
			);
		});
	});

	describe('unorderedList', () => {
		test('GIVEN ["guilderia.js", "guilderia.js 2", ["guilderia.js 3"]] THEN returns "- guilderia.js\n- guilderia.js 2\n  - guilderia.js"', () => {
			expect(unorderedList(['guilderia.js', 'guilderia.js 2', ['guilderia.js 3']])).toEqual(
				'- guilderia.js\n- guilderia.js 2\n  - guilderia.js 3',
			);
		});
	});

	describe('subtext', () => {
		test('GIVEN "guilderia.js" THEN returns "-# guilderia.js"', () => {
			expect<'-# guilderia.js'>(subtext('guilderia.js')).toEqual('-# guilderia.js');
		});
	});

	describe('time', () => {
		test('GIVEN no arguments THEN returns "<t:${bigint}>"', () => {
			vitest.useFakeTimers();
			vitest.setSystemTime(1_566_424_897_579);

			expect<`<t:${bigint}>`>(time()).toEqual('<t:1566424897>');

			vitest.useRealTimers();
		});

		test('GIVEN a date THEN returns "<t:${bigint}>"', () => {
			expect<`<t:${bigint}>`>(time(new Date(1_867_424_897_579))).toEqual('<t:1867424897>');
		});

		test('GIVEN a date and a style from string THEN returns "<t:${bigint}:${style}>"', () => {
			expect<`<t:${bigint}:d>`>(time(new Date(1_867_424_897_579), 'd')).toEqual('<t:1867424897:d>');
		});

		test('GIVEN a date and a format from enum THEN returns "<t:${bigint}:${style}>"', () => {
			expect<`<t:${bigint}:R>`>(time(new Date(1_867_424_897_579), TimestampStyles.RelativeTime)).toEqual(
				'<t:1867424897:R>',
			);
		});

		test('GIVEN a date THEN returns "<t:${time}>"', () => {
			expect<'<t:1867424897>'>(time(1_867_424_897)).toEqual('<t:1867424897>');
		});

		test('GIVEN a date and a style from string THEN returns "<t:${time}:${style}>"', () => {
			expect<'<t:1867424897:d>'>(time(1_867_424_897, 'd')).toEqual('<t:1867424897:d>');
		});

		test.each([
			[TimestampStyles.ShortTime, 't'],
			[TimestampStyles.MediumTime, 'T'],
			[TimestampStyles.ShortDate, 'd'],
			[TimestampStyles.LongDate, 'D'],
			[TimestampStyles.LongDateShortTime, 'f'],
			[TimestampStyles.FullDateShortTime, 'F'],
			[TimestampStyles.ShortDateShortTime, 's'],
			[TimestampStyles.ShortDateMediumTime, 'S'],
			[TimestampStyles.RelativeTime, 'R'],
		])('GIVEN a date and style from enum THEN returns "<t:${time}:${style}>"', (style, expectedStyle) => {
			expect<`<t:1867424897:${typeof style}>`>(time(1_867_424_897, style)).toEqual(`<t:1867424897:${expectedStyle}>`);
		});
	});

	describe('applicationDirectory', () => {
		test('GIVEN application id THEN returns application directory store', () => {
			expect(applicationDirectory('123456789012345678')).toEqual(
				'https://guilderia.com/application-directory/123456789012345678/store',
			);
		});

		test('GIVEN application id AND SKU id THEN returns SKU within the application directory store', () => {
			expect(applicationDirectory('123456789012345678', '123456789012345678')).toEqual(
				'https://guilderia.com/application-directory/123456789012345678/store/123456789012345678',
			);
		});
	});

	describe('email', () => {
		test('GIVEN an email THEN returns "<[email]>"', () => {
			expect<'<test@example.com>'>(email('test@example.com')).toEqual('<test@example.com>');
		});

		test('GIVEN an email AND headers THEN returns "<[email]?[headers]>"', () => {
			expect<`<test@example.com?${string}>`>(email('test@example.com', { subject: 'Hello', body: 'World' })).toEqual(
				'<test@example.com?subject=Hello&body=World>',
			);
		});
	});

	describe('phoneNumber', () => {
		test('GIVEN a phone number with + THEN returns "<[phoneNumber]>"', () => {
			expect<'<+1234567890>'>(phoneNumber('+1234567890')).toEqual('<+1234567890>');
		});

		test('GIVEN a phone number without + THEN throws', () => {
			expect(() =>
				phoneNumber(
					// @ts-expect-error - Invalid input
					'1234567890',
				),
			).toThrowError();
		});
	});

	describe('Faces', () => {
		test('GIVEN Faces.Shrug THEN returns "¯\\_(ツ)_/¯"', () => {
			expect<'¯\\_(ツ)_/¯'>(Faces.Shrug).toEqual('¯\\_(ツ)_/¯');
		});

		test('GIVEN Faces.Tableflip THEN returns "(╯°□°)╯︵ ┻━┻"', () => {
			expect<'(╯°□°)╯︵ ┻━┻'>(Faces.Tableflip).toEqual('(╯°□°)╯︵ ┻━┻');
		});

		test('GIVEN Faces.Unflip THEN returns "┬─┬ノ( º _ ºノ)"', () => {
			expect<'┬─┬ノ( º _ ºノ)'>(Faces.Unflip).toEqual('┬─┬ノ( º _ ºノ)');
		});
	});
});
