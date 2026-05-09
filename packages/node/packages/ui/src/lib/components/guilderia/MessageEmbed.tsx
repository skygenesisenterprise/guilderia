import type { PropsWithChildren, ReactNode } from 'react';
import { GuilderiaMessageEmbedAuthor, type IGuilderiaMessageEmbedAuthor } from './MessageEmbedAuthor.js';
import type { IGuilderiaMessageEmbedField } from './MessageEmbedField.js';
import { GuilderiaMessageEmbedFields } from './MessageEmbedFields.js';
import { GuilderiaMessageEmbedFooter, type IGuilderiaMessageEmbedFooter } from './MessageEmbedFooter.js';
import { GuilderiaMessageEmbedImage, type IGuilderiaMessageEmbedImage } from './MessageEmbedImage.js';
import { GuilderiaMessageEmbedThumbnail, type IGuilderiaMessageEmbedThumbnail } from './MessageEmbedThumbnail.js';
import { GuilderiaMessageEmbedTitle, type IGuilderiaMessageEmbedTitle } from './MessageEmbedTitle.js';

export interface IGuilderiaMessageEmbed {
	readonly author?: IGuilderiaMessageEmbedAuthor | undefined;
	readonly authorNode?: ReactNode | undefined;
	readonly fields?: IGuilderiaMessageEmbedField[];
	readonly footer?: IGuilderiaMessageEmbedFooter | undefined;
	readonly footerNode?: ReactNode | undefined;
	readonly image?: IGuilderiaMessageEmbedImage;
	readonly thumbnail?: IGuilderiaMessageEmbedThumbnail;
	readonly title?: IGuilderiaMessageEmbedTitle | undefined;
	readonly titleNode?: ReactNode | undefined;
}

export function GuilderiaMessageEmbed({
	author,
	authorNode,
	fields,
	title,
	titleNode,
	image,
	children,
	thumbnail,
	footer,
	footerNode,
}: PropsWithChildren<IGuilderiaMessageEmbed>) {
	return (
		<div className="py-0.5" id="outer-embed-wrapper">
			<div className="grid max-w-max border-l-4 border-l-blurple rounded bg-[rgb(47_49_54)]" id="embed-wrapper">
				<div className="max-w-128 flex">
					<div className="pb-4 pl-3 pr-4 pt-2">
						{author ? <GuilderiaMessageEmbedAuthor {...author} /> : (authorNode ?? null)}
						{title ? <GuilderiaMessageEmbedTitle {...title} /> : (titleNode ?? null)}
						{children ? <div className="mt-2 text-sm">{children}</div> : null}
						{fields ? <GuilderiaMessageEmbedFields fields={fields} /> : null}
						{image ? <GuilderiaMessageEmbedImage {...image} /> : null}
						{footer ? <GuilderiaMessageEmbedFooter {...footer} /> : (footerNode ?? null)}
					</div>

					{thumbnail ? <GuilderiaMessageEmbedThumbnail {...thumbnail} /> : null}
				</div>
			</div>
		</div>
	);
}
