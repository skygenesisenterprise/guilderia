export interface IGuilderiaMessageEmbedFooter {
	readonly content?: string;
	readonly icon?: string;
	readonly timestamp?: string;
}

export function GuilderiaMessageEmbedFooter({ content, icon, timestamp }: IGuilderiaMessageEmbedFooter) {
	return (
		<div className="mt-2 flex items-center text-xs">
			{icon ? <img alt="Icon" className="mr-2 rounded-full" height="20" src={icon} width="20" /> : null}

			{content}
			{content && timestamp ? <span className="mx-1 font-medium">•</span> : null}
			{timestamp}
		</div>
	);
}
