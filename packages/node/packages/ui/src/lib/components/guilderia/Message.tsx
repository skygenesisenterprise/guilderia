import type { PropsWithChildren, ReactNode } from 'react';
import { GuilderiaMessageAuthor, type IGuilderiaMessageAuthor } from './MessageAuthor.js';
import { GuilderiaMessageInteraction, type IGuilderiaMessageInteraction } from './MessageInteraction.js';
import { GuilderiaMessageReply, type IGuilderiaMessageReply } from './MessageReply.js';

export interface IGuilderiaMessage {
	readonly author?: IGuilderiaMessageAuthor | undefined;
	readonly authorNode?: ReactNode | undefined;
	readonly followUp?: boolean;
	readonly interaction?: IGuilderiaMessageInteraction | undefined;
	readonly interactionNode?: ReactNode | undefined;
	readonly reply?: IGuilderiaMessageReply | undefined;
	readonly replyNode?: ReactNode | undefined;
	readonly time?: string | undefined;
}

export function GuilderiaMessage({
	reply,
	replyNode,
	interaction,
	interactionNode,
	author,
	authorNode,
	followUp,
	time,
	children,
}: PropsWithChildren<IGuilderiaMessage>) {
	return (
		<div className="relative" id="outer-message-wrapper">
			<div
				className={`group py-0.5 pl-18 pr-12 leading-snug hover:bg-[rgb(4_4_5)]/7 ${followUp ? '' : 'mt-4'}`}
				id="message-wrapper"
			>
				{(reply || replyNode) && !followUp ? reply ? <GuilderiaMessageReply {...reply} /> : (replyNode ?? null) : null}
				{(interaction || interactionNode) && !(reply || replyNode) && !followUp ? (
					interaction ? (
						<GuilderiaMessageInteraction {...interaction} />
					) : (
						(interactionNode ?? null)
					)
				) : null}
				<div className="static" id="content-wrapper">
					{followUp ? (
						<span
							className="absolute left-0 mr-1 hidden h-5.5 w-[56px] cursor-default select-none text-right text-xs text-[rgb(163_166_170)] leading-loose group-hover:inline-block"
							id="time"
						>
							{time}
						</span>
					) : author ? (
						<GuilderiaMessageAuthor {...author} />
					) : (
						authorNode
					)}
					<div className="text-white [&>p]:m-0 [&>p]:leading-snug" id="message-content">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
