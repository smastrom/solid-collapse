import { createSignal, createUniqueId, For } from 'solid-js';

import { Collapse } from '../src/Collapse';

import styles from './App.module.css';

const App = () => {
	const [isOpen, setIsOpen] = createSignal(false);

	const id = createUniqueId();
	const list = new Array(10).fill(false);

	let signalsArr = list.map((initialVal) => createSignal(initialVal));

	const handleOpen = (signalIndex: number) => {
		const [isOpen, setIsOpen] = signalsArr[signalIndex];
		setIsOpen(!isOpen());
	};

	const ids = list.map(() => createUniqueId());

	return (
		<div class={styles.App}>
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

				<div style="max-width: 600px; padding: 20px">
					<For each={list}>
						{(_, index) => (
							<div>
								<button onClick={() => handleOpen(index())}>Open / Close</button>
								<Collapse signal={signalsArr[index()][0]} class="collapseTransitionFast">
									Phasellus sit amet bibendum mauris. Aliquam in euismod leo, eu posuere ipsum.
									Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
									inceptos himenaeos.
								</Collapse>
							</div>
						)}
					</For>
				</div>
			</header>
		</div>
	);
};

export default App;
