import { createSignal, For } from 'solid-js';
import { CodeIcon } from '../Icons/CodeIcon';
import { CodeWindow } from '../CodeWindow';
import { GitHubIcon } from '../Icons/GitHubIcon';

import { BasicConfigCode, BasicConfigJSX } from '../../Examples/1.BasicConfig';
import {
	AccessibleTriggerCode,
	AccessibleTriggerJSX,
} from '../../Examples/2.AccessibleTrigger';
import { ForLoopCode, ForLoopJSX } from '../../Examples/3.ForLoop';
import { AsyncForLoopCode, AsyncForLoopJSX } from '../../Examples/4.AsyncForLoop';
import { AccordionCode, AccordionJSX } from '../../Examples/5.Accordion';

import styles from './styles.module.css';

const Examples = [
	{ name: 'Basic Config', code: BasicConfigCode, component: BasicConfigJSX },
	{ name: 'Accessible Trigger', code: AccessibleTriggerCode, component: AccessibleTriggerJSX },
	{ name: 'For Loop', code: ForLoopCode, component: ForLoopJSX },
	{ name: 'Async For Loop', code: AsyncForLoopCode, component: AsyncForLoopJSX },
	{ name: 'Accordion', code: AccordionCode, component: AccordionJSX },
];

const [isCodeOpen, setIsCodeOpen] = createSignal(false);

export type CurrentView = {
	data: typeof Examples[any];
	index: number;
	prevIndex: number;
};

const [currentView, setCurrentView] = createSignal<CurrentView>({
	data: Examples[0],
	index: 0,
	prevIndex: 0,
});

export const App = () => (
	<div class={styles.wrapper}>
		{/* Header */}

		<header class={styles.header}>
			<a
				aria-label="Go to GitHub Project Page"
				href="https://github.com/smastrom/solid-collapse"
				target="_blank"
				rel="noreferrer"
			>
				<GitHubIcon />
			</a>
			<h1 class={styles.title}>Solid Collapse</h1>
			<nav class={styles.navigation}>
				<For each={Examples}>
					{({ name }, index) => (
						<button
							type="button"
							onClick={() =>
								setCurrentView({
									data: Examples[index()],
									index: index(),
									prevIndex: index() - 1,
								})
							}
							class={`${styles.navButton} ${
								currentView().index === index() ? styles.navButtonActive : ''
							}`}
						>
							{name}
						</button>
					)}
				</For>
			</nav>
		</header>

		{/* Main */}

		<main class={styles.main}>{currentView().data.component}</main>

		{/* Code Popup */}

		{isCodeOpen() && (
			<CodeWindow
				setVisibility={setIsCodeOpen}
				length={Examples.length}
				view={currentView}
				nextClick={() =>
					setCurrentView((currentView) => ({
						data: Examples[currentView.index + 1],
						index: currentView.index + 1,
						prevIndex: currentView.index,
					}))
				}
				prevClick={() =>
					setCurrentView((currentView) => ({
						data: Examples[currentView.index - 1],
						index: currentView.index - 1,
						prevIndex: currentView.index,
					}))
				}
			/>
		)}

		{/* Footer */}

		<button
			type="button"
			class={styles.codeButton}
			onClick={() => {
				setIsCodeOpen(!isCodeOpen());
			}}
		>
			<CodeIcon />
			{isCodeOpen() ? 'Close' : 'View Code'}
		</button>
	</div>
);
