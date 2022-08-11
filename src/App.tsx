import { Component, createEffect, createSignal, on, onMount } from 'solid-js';

import styles from './App.module.css';

import { a11y } from './a11y';
import { Collapse } from './Collapse';

type Props = {
	class: string;
};

const App: Component = () => {
	const [isOpen, setIsOpen] = createSignal(false);
	const [isOpen2, setIsOpen2] = createSignal(false);

	// let element: HTMLDivElement; // if same component var name, creates issue

	return (
		<div class={styles.App}>
			<div>{`${isOpen()}`}</div>

			<button onClick={() => setIsOpen(!isOpen())}>Open / Close</button>

			<header class={styles.header}>
				<div style="max-width: 600px; padding: 20px">
					<Collapse signal={isOpen} class="collapseTransition">
						Phasellus sit amet bibendum mauris. Aliquam in euismod leo, eu posuere ipsum. Class
						aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
						himenaeos. Nunc eleifend nunc tortor, id bibendum mi rutrum vel. Nulla id tortor
						posuere, placerat urna at, tincidunt justo. Vivamus interdum, velit interdum
						hendrerit pharetra, lorem leo tincidunt ex, id varius odio lacus ut risus. Maecenas
						urna urna, tempus eget varius vitae, dapibus eu tortor. Sed venenatis id orci vitae
						suscipit. Fusce porta, lectus quis consequat eleifend, lacus neque congue purus,
						eget suscipit dolor arcu nec est. Morbi vitae sollicitudin sem. Nulla condimentum
						orci vitae placerat rhoncus. Integer suscipit id metus et cursus. Aenean a gravida
						urna, at porta ex.
					</Collapse>
				</div>
			</header>

			<button onClick={() => setIsOpen2(!isOpen2())}>Open / Close</button>

			<header class={styles.header}>
				<div style="max-width: 600px; padding: 20px">
					<Collapse signal={isOpen2} class="collapseTransition">
						Phasellus sit amet bibendum mauris. Aliquam in euismod leo, eu posuere ipsum. Class
						aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
						himenaeos. Nunc eleifend nunc tortor, id bibendum mi rutrum vel. Nulla id tortor
						posuere, placerat urna at, tincidunt justo. Vivamus interdum, velit interdum
						hendrerit pharetra, lorem leo tincidunt ex, id varius odio lacus ut risus. Maecenas
						urna urna, tempus eget varius vitae, dapibus eu tortor. Sed venenatis id orci vitae
						suscipit. Fusce porta, lectus quis consequat eleifend, lacus neque congue purus,
						eget suscipit dolor arcu nec est. Morbi vitae sollicitudin sem. Nulla condimentum
						orci vitae placerat rhoncus. Integer suscipit id metus et cursus. Aenean a gravida
						urna, at porta ex.
					</Collapse>
				</div>
			</header>
		</div>
	);
};

export default App;
