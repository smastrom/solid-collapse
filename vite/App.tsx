import { createSignal } from 'solid-js';
import { Collapse } from '../src';

export const App = () => {
	const [isOpen, setIsOpen] = createSignal(false);

	const text = `Hello I am bunch of collapsed text that wants to be expanded. `.repeat(30);

	return (
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
			>
				<div>{text}</div>
			</Collapse>
		</div>
	);
};
