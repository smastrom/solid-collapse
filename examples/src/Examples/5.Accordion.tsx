import { createSignal, For } from 'solid-js';
import { ChevronIcon } from '../Components/Icons/ChevronIcon';
import { Collapse } from '../../pkg';

import styles from '../Components/AppLayout/styles.module.css';

import fakeList from '../lib/fakeList.json';

export const AccordionJSX = () => {
	const [signalsArr, setSignalsArr] = createSignal(fakeList.map(() => false));

	const handleAccordion = (targetIndex: number) => {
		const falseArr = fakeList.map(() => false);
		falseArr[targetIndex] = !signalsArr()[targetIndex];
		setSignalsArr(falseArr);
	};

	return (
		<For each={fakeList}>
			{({ title, description }, index) => (
				<div class={styles.collapseContainer} style="margin-bottom: 20px;">
					<div class={styles.collapseHeader}>
						{title}
						<button
							onClick={() => handleAccordion(index())}
							class={`${styles.chevronIcon} ${
								signalsArr()[index()] ? `${styles.rotate} ${styles.activeChevron}` : ''
							}`}
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

export const AccordionCode = `
import fakeList from '../lib/fakeList.json';

export const App = () => {
	const [signalsArr, setSignalsArr] = createSignal(fakeList.map(() => false));

	const handleAccordion = (targetIndex) => {
		const falseArr = fakeList.map(() => false);
		falseArr[targetIndex] = !signalsArr()[targetIndex];
		setSignalsArr(falseArr);
	};

	return (
		<For each={fakeList}>
			{({ title, description }, index) => (
				<div class={styles.collapseContainer} style="margin-bottom: 20px;">
					<div class={styles.collapseHeader}>
						{title}
						<button
							onClick={() => handleAccordion(index())}
							class={\`\${styles.chevronIcon} \${
								signalsArr()[index()] ? \`\${styles.rotate} \${styles.activeChevron}\` : ''
							}\`}
						>
							<ChevronIcon />
						</button>
					</div>
					<Collapse  state={signalsArr()[index()]} class={styles.fastCollapseTransition}>
						<div class={styles.collapseContent}>{description}</div>
					</Collapse>
				</div>
			)}
		</For>
	);
}`;
