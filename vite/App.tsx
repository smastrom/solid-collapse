import { createSignal } from 'solid-js';
import { Collapse } from '../src';

const text = `Hello I am bunch of collapsed text that wants to be expanded. `.repeat(30);

export const App = () => {
	const [isOpen, setIsOpen] = createSignal(false);

	return (
		<div style="max-width: 800px; width: 100%;">
			<section style="width: 100%;">
				<h1>Collapse</h1>
				<div>
					<header style="display: flex; justify-content: space-between;">
						<h3>This is a collapse header</h3>
						<button onClick={() => setIsOpen(!isOpen())} id="button">
							Open
						</button>
					</header>
					<Collapse
						id="collapse"
						value={isOpen()}
						as="span"
						class="transition"
						aria-role="region"
						aria-labelledby="X"
					>
						{text}
					</Collapse>
				</div>
			</section>
		</div>
	);
};
