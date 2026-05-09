import type { ReactNode } from 'react';
import type { IGuilderiaMessageAuthorReply } from './MessageAuthorReply.js';
import { GuilderiaMessageBaseReply } from './MessageBaseReply.js';

export interface IGuilderiaMessageReply {
	readonly author?: IGuilderiaMessageAuthorReply | undefined;
	readonly authorNode?: ReactNode | undefined;
	readonly content: string;
}

export function GuilderiaMessageReply({ author, authorNode, content }: IGuilderiaMessageReply) {
	return (
		<GuilderiaMessageBaseReply author={author} authorNode={authorNode}>
			<div className="cursor-pointer select-none text-sm text-[rgb(163_166_170)] leading-snug hover:text-white">
				{content}
			</div>
		</GuilderiaMessageBaseReply>
	);
}
