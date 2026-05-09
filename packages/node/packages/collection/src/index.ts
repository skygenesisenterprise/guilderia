export * from './collection.js';

/**
 * The {@link https://github.com/guilderiajs/guilderia.js/blob/main/packages/collection#readme | @guilderiajs/collection} version
 * that you are currently using.
 */
// This needs to explicitly be `string` so it is not typed as a "const string" that gets injected by esbuild
export const version = '[VI]{{inject}}[/VI]' as string;
