export function ExampleHeader({ title, name }: { title: string; name: string }) {
	return (
		<div class="ExampleHeader">
			<h1>{title}</h1>
			<a
				href={`https://github.com/smastrom/solid-collapse/blob/main/app/${name}.tsx`}
				target="_blank"
			>
				View Code
			</a>
		</div>
	);
}
