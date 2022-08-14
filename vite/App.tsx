import { createSignal } from 'solid-js';
import { Collapse } from '../src';

const text = `Hello I am bunch of collapsed text that wants to be expanded. `.repeat(30);

export const App = () => {
	const [isOpen, setIsOpen] = createSignal(false);

	return (
		<div>
			<section>
				<h1>Basic</h1>
				<div style="width: 500px;">
					<header style="display: flex; justify-content: space-between;">
						<h3>This is a collapse header</h3>
						<button onClick={() => setIsOpen(!isOpen())}>Open</button>
					</header>
					<Collapse
						id="collapse"
						value={isOpen()}
						as="span"
						class="transition"
						aria-role="region"
						aria-labelledby="X"
						data-testid="test-basic"
					>
						{text}
					</Collapse>
				</div>
			</section>

			<section>
				<h1>Loop</h1>
				<div style="width: 500px;"></div>
			</section>

			<section>
				<h1>Accordion</h1>
				<div style="width: 500px;"></div>
			</section>
		</div>
	);
};
