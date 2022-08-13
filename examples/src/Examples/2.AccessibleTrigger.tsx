import { createSignal } from 'solid-js';
import { setKeyDown } from '../lib/setKeyDown';
import { ChevronIcon } from '../Components/Icons/ChevronIcon';
import { Collapse } from 'solid-collapse';

import styles from '../Components/AppLayout/styles.module.css';

export const AccessibleTriggerJSX = () => {
	const [isOpen, setIsOpen] = createSignal(false);

	return (
		<div class={styles.collapseContainer}>
			<div
				id="example_2_label"
				style="cursor: pointer;"
				aria-controls="example_2"
				class={styles.collapseHeader}
				aria-expanded={isOpen()}
				onClick={() => setIsOpen(!isOpen())}
				{...setKeyDown(setIsOpen)}
			>
				Where can I get some?
				<div
					class={`${styles.chevronButton} ${
						isOpen() ? `${styles.rotate} ${styles.activeChevron}` : ''
					}`}
				>
					<ChevronIcon />
				</div>
			</div>
			<Collapse
				state={isOpen()}
				class={styles.collapseTransition}
				id="example_2"
				aria-role="region"
				aria-labelledby="example_2_label"
			>
				<div class={styles.collapseContent}>
					There are many variations of passages of Lorem Ipsum available, but the majority have
					suffered alteration in some form, by injected humour, or randomised words which don't
					look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
					need to be sure there isn't anything embarrassing hidden in the middle of text. All
					the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as
					necessary, making this the first true generator on the Internet. It uses a dictionary
					of over 200 Latin words, combined with a handful of model sentence structures, to
					generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore
					always free from repetition, injected humour, or non-characteristic words etc.
				</div>
			</Collapse>
		</div>
	);
};

export const AccessibleTriggerCode = `
export const setKeyDown = (setter) => ({
	tabIndex: 0,
	onKeyDown: (event) => {
		if (event.code === 'Enter' || event.code === 'Space') {
			event.stopPropagation();
			event.preventDefault();
			setter((accessor) => !accessor);
		}
	},
});

const App = () => {
	const [isOpen, setIsOpen] = createSignal(false);

	return (
		<div class={styles.collapseContainer}>
			<div
				id="example_2_label"
                class={styles.collapseTrigger}
				aria-controls="example_2"
				aria-expanded={isOpen()}
				onClick={() => setIsOpen(!isOpen())}
				{...setKeyDown(setIsOpen)}
			>
				Where can I get some?
				<div
					class={\`\${styles.chevronButton} \${
						isOpen() ? \`\${styles.rotate} \${styles.activeChevron}\` : ''}\`}
				>
					<ChevronIcon />
				</div>
			</div>
			<Collapse
				 state={isOpen()}
				class={styles.collapseTransition}
				id="example_2"
				aria-role="region"
				aria-labelledby="example_2_label"
			>
				<div class={styles.collapseContent}>
					There are many variations of passages of Lorem Ipsum available, but the majority have
					suffered alteration in some form, by injected humour, or randomised words which don't
					look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
					need to be sure there isn't anything embarrassing hidden in the middle of text.
				</div>
			</Collapse>
		</div>
	);
};
`;
