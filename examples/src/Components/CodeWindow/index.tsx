import { Accessor, createEffect, createSignal, onCleanup, onMount, Setter } from 'solid-js';
import Prism from 'prismjs';
import { ChevronIcon } from '../Icons/ChevronIcon';
import type { CurrentView } from '../AppLayout';

import styles from './styles.module.css';

type Props = {
	view: Accessor<CurrentView>;
	prevClick: () => void;
	nextClick: () => void;
	length: number;
	setVisibility: Setter<boolean>;
};

export const CodeWindow = ({ view, prevClick, nextClick, length, setVisibility }: Props) => {
	let nextButtonRef = null as unknown as HTMLButtonElement;
	let prevButtonRef = null as unknown as HTMLButtonElement;
	let containerRef = null as unknown as HTMLDivElement;
	let contentRef = null as unknown as HTMLPreElement;

	/* Lifecycle */

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		document.addEventListener('keydown', handleEscape);
		document.documentElement.style.overflow = 'hidden';
	});

	/**
	 * Using low-level prism API to avoid duplicated code, when code state changes
	 * as suggested at: https://github.com/preactjs/preact/issues/3236
	 */

	const [prismCode, setPrismCode] = createSignal('');

	createEffect(() => {
		setPrismCode(Prism.highlight(view().data.code, Prism.languages.jsx, 'jsx'));

		if (view().index > view().prevIndex) {
			contentRef.classList.add('nextAnim');
		} else if (view().index < view().prevIndex) {
			contentRef.classList.add('prevAnim');
		}
	});

	onCleanup(() => {
		document.removeEventListener('click', handleClickOutside);
		document.removeEventListener('keydown', handleEscape);
		document.documentElement.style.overflow = 'auto';
	});

	/* Handlers */

	const handleClickOutside = (event: MouseEvent) => {
		if (
			!containerRef.contains(event.target as Node) &&
			event.target !== prevButtonRef &&
			event.target !== nextButtonRef
		) {
			setVisibility(false);
		}
	};

	const handleEscape = (event: KeyboardEvent) => {
		if (event.code === 'Escape') {
			setVisibility(false);
		}
	};

	const cleanAnim = () => {
		contentRef.classList.remove('nextAnim');
		contentRef.classList.remove('prevAnim');
	};

	return (
		<div class={styles.wrapper}>
			<section class={styles.container} ref={containerRef}>
				<h1 class={styles.title}>{view().data.name}</h1>
				<nav class={styles.linksNav}>
					<button>Copy Code</button>
					<a
						href="https://github.com/smastrom/solid-collapse/tree/main/examples/src/Examples"
						target="_blank"
					>
						View Source
					</a>
				</nav>

				<div class={styles.content}>
					<nav aria-hidden={view().index === 0 ? 'true' : undefined}>
						{view().index !== 0 && (
							<button
								ref={prevButtonRef}
								onClick={prevClick}
								class={`${styles.navButton} ${styles.prevButton}`}
								aria-label={`See previous example code`}
							>
								<ChevronIcon />
							</button>
						)}
					</nav>

					<pre tabIndex={-1} class="language-jsx" ref={contentRef} onAnimationEnd={cleanAnim}>
						<code class="language-jsx" innerHTML={prismCode()} />
					</pre>

					<nav aria-hidden={view().index === length - 1 ? 'true' : undefined}>
						{view().index !== length - 1 && (
							<button
								ref={nextButtonRef}
								onClick={nextClick}
								class={`${styles.navButton} ${styles.nextButton}`}
								aria-label={`See next example code`}
							>
								<ChevronIcon />
							</button>
						)}
					</nav>
				</div>
			</section>
		</div>
	);
};
