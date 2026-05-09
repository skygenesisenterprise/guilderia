import type { InternalRequest, RawFile } from '../utils/types.js';

export interface GuilderiaErrorFieldInformation {
	code: string;
	message: string;
}

export interface GuilderiaErrorGroupWrapper {
	_errors: GuilderiaError[];
}

export type GuilderiaError =
	| GuilderiaErrorFieldInformation
	| GuilderiaErrorGroupWrapper
	| string
	| { [k: string]: GuilderiaError };

export interface GuilderiaErrorData {
	code: number;
	errors?: GuilderiaError;
	message: string;
}

export interface OAuthErrorData {
	error: string;
	error_description?: string;
}

export interface RequestBody {
	files: RawFile[] | undefined;
	json: unknown | undefined;
}

function isErrorGroupWrapper(error: GuilderiaError): error is GuilderiaErrorGroupWrapper {
	return Reflect.has(error as Record<string, unknown>, '_errors');
}

function isErrorResponse(error: GuilderiaError): error is GuilderiaErrorFieldInformation {
	return typeof Reflect.get(error as Record<string, unknown>, 'message') === 'string';
}

/**
 * Represents an API error returned by Guilderia
 */
export class GuilderiaAPIError extends Error {
	public requestBody: RequestBody;

	/**
	 * @param rawError - The error reported by Guilderia
	 * @param code - The error code reported by Guilderia
	 * @param status - The status code of the response
	 * @param method - The method of the request that errored
	 * @param url - The url of the request that errored
	 * @param bodyData - The unparsed data for the request that errored
	 */
	public constructor(
		public rawError: GuilderiaErrorData | OAuthErrorData,
		public code: number | string,
		public status: number,
		public method: string,
		public url: string,
		bodyData: Pick<InternalRequest, 'body' | 'files'>,
	) {
		super(GuilderiaAPIError.getMessage(rawError));

		this.requestBody = { files: bodyData.files, json: bodyData.body };
	}

	/**
	 * The name of the error
	 */
	public override get name(): string {
		return `${GuilderiaAPIError.name}[${this.code}]`;
	}

	private static getMessage(error: GuilderiaErrorData | OAuthErrorData) {
		let flattened = '';
		if ('code' in error) {
			if (error.errors) {
				flattened = [...this.flattenGuilderiaError(error.errors)].join('\n');
			}

			return error.message && flattened
				? `${error.message}\n${flattened}`
				: error.message || flattened || 'Unknown Error';
		}

		return error.error_description ?? 'No Description';
	}

	private static *flattenGuilderiaError(obj: GuilderiaError, key = ''): IterableIterator<string> {
		if (isErrorResponse(obj)) {
			return yield `${key.length ? `${key}[${obj.code}]` : `${obj.code}`}: ${obj.message}`.trim();
		}

		for (const [otherKey, val] of Object.entries(obj)) {
			const nextKey = otherKey.startsWith('_')
				? key
				: key
					? Number.isNaN(Number(otherKey))
						? `${key}.${otherKey}`
						: `${key}[${otherKey}]`
					: otherKey;

			if (typeof val === 'string') {
				yield val;
			} else if (isErrorGroupWrapper(val)) {
				for (const error of val._errors) {
					yield* this.flattenGuilderiaError(error, nextKey);
				}
			} else {
				yield* this.flattenGuilderiaError(val, nextKey);
			}
		}
	}
}
