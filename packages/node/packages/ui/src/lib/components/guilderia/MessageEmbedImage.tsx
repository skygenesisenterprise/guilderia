export interface IGuilderiaMessageEmbedImage {
	readonly alt: string;
	readonly height: number;
	readonly url: string;
	readonly width: number;
}

export function GuilderiaMessageEmbedImage({ alt, height, url, width }: IGuilderiaMessageEmbedImage) {
	return <img alt={alt} className="mt-4" height={height} src={url} width={width} />;
}
