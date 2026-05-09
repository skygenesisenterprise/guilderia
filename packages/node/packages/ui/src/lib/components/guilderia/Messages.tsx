import type { PropsWithChildren } from 'react';

export interface IGuilderiaMessages {
	readonly rounded?: boolean;
}

export function GuilderiaMessages({ rounded, children }: PropsWithChildren<IGuilderiaMessages>) {
	return (
		<div
			className={`font-source-sans-pro bg-[rgb(54_57_63)] pb-4 pt-0.1 ${rounded ? 'rounded' : ''}`}
			id="messages-wrapper"
		>
			{children}
		</div>
	);
}
