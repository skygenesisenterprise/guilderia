import type { ReactNode } from 'react';
import type { IGuilderiaMessageAuthorReply } from './MessageAuthorReply.js';
import { GuilderiaMessageBaseReply } from './MessageBaseReply.js';

export interface IGuilderiaMessageInteraction {
	readonly author?: IGuilderiaMessageAuthorReply | undefined;
	readonly authorNode?: ReactNode | undefined;
	readonly command?: string;
}

export function GuilderiaMessageInteraction({ author, authorNode, command }: IGuilderiaMessageInteraction) {
	return (
		<GuilderiaMessageBaseReply author={author} authorNode={authorNode}>
			<span className="mr-1 select-none text-sm text-white leading-snug">used</span>
			<div className="cursor-pointer text-sm text-blurple leading-snug hover:underline">{command}</div>
		</GuilderiaMessageBaseReply>
	);
}
