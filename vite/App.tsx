import { createSignal } from 'solid-js';
import { Collapse } from '../src';

export const App = () => {
	const [isOpen, setIsOpen] = createSignal(false);

	return (
		<div style="width: 500px;">
			<div style="display: flex; justify-content: space-between;">
				<h3>This is a collapse header</h3>{' '}
				<button onClick={() => setIsOpen(!isOpen())}>Open</button>
			</div>
			<Collapse value={isOpen()} as="section" class="transition">
				{`Hello I am bunch of collapsed text that wants to be expanded. `.repeat(30)}
			</Collapse>
		</div>
	);
};
