export interface IGuilderiaMessageEmbedField {
	readonly inline?: boolean;
	readonly name: string;
	readonly value: string;
}

export function GuilderiaMessageEmbedField({ name, value, inline }: IGuilderiaMessageEmbedField) {
	return (
		<div className={`${inline ? 'sm:col-span-4' : 'sm:col-span-12'} flex flex-col`}>
			<span className="font-medium">{name}</span>
			<span className="text-gray-300">{value}</span>
		</div>
	);
}
