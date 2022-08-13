import { createSignal, For } from 'solid-js';
import { ChevronIcon } from '../Components/Icons/ChevronIcon';
import { Collapse } from '../../pkg';

import fakeList from '../lib/fakeList.json';
import styles from '../Components/AppLayout/styles.module.css';

export const ForLoopJSX = () => {
	const [signalsArr, setSignalsArr] = createSignal(fakeList.map(() => false));

	const handleOpen = (signalIndex: number) => {
		const copySignals = [...signalsArr()];
		copySignals[signalIndex] = !signalsArr()[signalIndex];
		setSignalsArr(copySignals);
	};

	return (
		<For each={fakeList}>
			{({ title, description }, index) => (
				<div class={styles.collapseContainer} style="margin-bottom: 20px;">
					<div class={styles.collapseHeader}>
						{title}
						<button
							onClick={() => handleOpen(index())}
							aria-label="Open Collapse"
							class={`${styles.chevronIcon}`}
						>
							<ChevronIcon />
						</button>
					</div>
					<Collapse state={signalsArr()[index()]} class={styles.fastCollapseTransition}>
						<div class={styles.collapseContent}>{description}</div>
					</Collapse>
				</div>
			)}
		</For>
	);
};

export const ForLoopCode = `
import fakeList from '../lib/fakeList.json';

const App = () => {
	const [signalsArr, setSignalsArr] = createSignal(fakeList.map(() => false));

	const handleOpen = (signalIndex: number) => {
		const copySignals = [...signalsArr()];
		copySignals[signalIndex] = !signalsArr()[signalIndex];
		setSignalsArr(copySignals);
	};

	return (
		<For each={fakeList}>
			{({ title, description }, index) => (
				<div class={styles.collapseContainer}>
					<div class={styles.collapseHeader}>
						{title}
						<button
							onClick={() => handleOpen(index())}
							aria-label="Open Collapse"
							class={styles.chevronIcon}
						>
							<ChevronIcon />
						</button>
					</div>
					<Collapse  state={signalsArr()[index()]} class={styles.collapseTransition}>
						<div class={styles.collapseContent}>{description}</div>
					</Collapse>
				</div>
			)}
		</For>
	);
}`;
