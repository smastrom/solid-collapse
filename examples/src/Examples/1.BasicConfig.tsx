import { createSignal, Setter } from 'solid-js';
import { ChevronIcon } from '../Components/Icons/ChevronIcon';
import { Collapse } from '../../../dist';

import styles from '../Components/AppLayout/styles.module.css';

export const getKeydown = (setIsOpen: Setter<boolean>) => ({
	onKeyDown: (event: KeyboardEvent) => {
		if (event.code === 'Enter' || event.code === 'Space') {
			setIsOpen((isOpen) => !isOpen);
		}
	},
});

export const BasicConfigJSX = () => {
	const [isOpen, setIsOpen] = createSignal(false);
	const [width, setWidth] = createSignal('550');

	return (
		<div class={styles.flexContainer}>
			<div class={styles.range}>
				<label for="example_1_range">Resize Collapse</label>
				<input
					id="example_1_range"
					type="range"
					min="150"
					max="800"
					step="1"
					onInput={(event) => setWidth(event.currentTarget.value)}
				/>
			</div>

			<div class={styles.collapseContainer} style={`max-width: ${width()}px; width: 100%;`}>
				<div class={styles.collapseHeader}>
					Where can I get some?
					<div
						tabindex="0"
						aria-expanded={isOpen()}
						{...getKeydown(setIsOpen)}
						onClick={() => setIsOpen(!isOpen())}
						aria-label="Open Collapse"
						class={`${styles.chevronIcon} ${
							isOpen() ? `${styles.rotate} ${styles.activeChevron}` : ''
						}`}
					>
						<ChevronIcon />
					</div>
				</div>
				<Collapse state={isOpen()} class={styles.collapseTransition}>
					<div class={styles.collapseContent}>
						There are many variations of passages of Lorem Ipsum available, but the majority
						have suffered alteration in some form, by injected humour, or randomised words
						which don't look even slightly believable. If you are going to use a passage of
						Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
						middle of text. All the Lorem Ipsum generators on the Internet tend to repeat
						predefined chunks as necessary, making this the first true generator on the
						Internet. It uses a dictionary of over 200 Latin words, combined with a handful of
						model sentence structures, to generate Lorem Ipsum which looks reasonable. The
						generated Lorem Ipsum is therefore always free from repetition, injected humour, or
						non-characteristic words etc.
					</div>
				</Collapse>
			</div>
		</div>
	);
};

export const BasicConfigCode = `
const App = () => {
    const [isOpen, setIsOpen] = createSignal(false);

    return (
        <div class={styles.collapseContainer}>
            <div class={styles.collapseHeader}>
                Where can I get some?
                <button onClick={() => setIsOpen(!isOpen())}>
                    <ChevronIcon />
                </button>
            </div>
            <Collapse  state={isOpen()} class={styles.collapseTransition}>
                <div class={styles.collapseContent}>
                    There are many variations of passages of Lorem Ipsum available, but the
                    majority have suffered alteration in some form, by injected humour, or
                    randomised words which don't look even slightly believable.
                </div>
            </Collapse>
        </div>
    );
};`;
