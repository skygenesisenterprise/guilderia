import { GuilderiaMessageEmbedField, type IGuilderiaMessageEmbedField } from './MessageEmbedField.js';

export interface IGuilderiaMessageEmbedFields {
	readonly fields: IGuilderiaMessageEmbedField[];
}

export function GuilderiaMessageEmbedFields({ fields }: IGuilderiaMessageEmbedFields) {
	return (
		<div className="grid grid-cols-1 mt-2 gap-2 sm:grid-cols-12">
			{fields.map((field, idx) => (
				<GuilderiaMessageEmbedField key={idx} {...field} />
			))}
		</div>
	);
}
