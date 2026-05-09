import Image from 'next/image';
import vercelLogo from '@/assets/powered-by-vercel.svg';
import workersLogo from '@/assets/powered-by-workers.png';

export function Footer() {
	return (
		<footer className="md:pr-12 md:pl-12">
			<div className="flex flex-col flex-wrap place-content-center gap-6 pt-12 sm:flex-row md:gap-12">
				<div className="flex flex-wrap place-content-center place-items-center gap-4">
					<a
						className="rounded"
						href="https://vercel.com/?utm_source=guilderiajs&utm_campaign=oss"
						rel="external noopener noreferrer"
						target="_blank"
						title="Vercel"
					>
						<Image
							alt="Vercel"
							blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABLCAQAAAA1k5H2AAAAi0lEQVR42u3SMQEAAAgDoC251a3gL2SgmfBYBRAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARCAgwWEOSWBnYbKggAAAABJRU5ErkJggg=="
							height={44}
							placeholder="blur"
							src={vercelLogo}
							width={212}
						/>
					</a>
					<a
						className="rounded"
						href="https://www.cloudflare.com"
						rel="external noopener noreferrer"
						target="_blank"
						title="Cloudflare Workers"
					>
						<Image
							alt="Cloudflare"
							blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABLCAQAAAA1k5H2AAAAi0lEQVR42u3SMQEAAAgDoC251a3gL2SgmfBYBRAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARAAARCAgwWEOSWBnYbKggAAAABJRU5ErkJggg=="
							height={44}
							placeholder="blur"
							priority
							src={workersLogo}
						/>
					</a>
				</div>
				<div className="flex flex-col gap-6 place-self-center sm:flex-row md:gap-12">
					<div className="flex max-w-max flex-col gap-2">
						<div className="text-lg font-semibold">Community</div>
						<div className="flex flex-col gap-1">
							<a className="rounded" href="https://guilderia.gg/djs" rel="external noopener noreferrer" target="_blank">
								Guilderia
							</a>
							<a
								className="rounded"
								href="https://github.com/guilderiajs/guilderia.js/discussions"
								rel="external noopener noreferrer"
								target="_blank"
							>
								GitHub discussions
							</a>
						</div>
					</div>
					<div className="flex max-w-max flex-col gap-2">
						<div className="text-lg font-semibold">Project</div>
						<div className="flex flex-col gap-1">
							<a
								className="rounded"
								href="https://github.com/guilderiajs/guilderia.js"
								rel="external noopener noreferrer"
								target="_blank"
							>
								guilderia.js
							</a>
							<a className="rounded" href="https://guilderia.js.org/docs" rel="noopener noreferrer" target="_blank">
								guilderia.js documentation
							</a>
							<a
								className="rounded"
								href="https://guilderia-api-types.dev"
								rel="external noopener noreferrer"
								target="_blank"
							>
								guilderia-api-types
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
