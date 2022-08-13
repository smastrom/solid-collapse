import { createEffect, createResource, createSignal, For, Show, untrack } from 'solid-js';
import { ChevronIcon } from '../Components/Icons/ChevronIcon';
import { Collapse } from 'solid-collapse';

import styles from '../Components/AppLayout/styles.module.css';
import { Spinner } from '../Components/Spinner';

const fetchPosts = async () =>
	(await fetch('https://jsonplaceholder.typicode.com/posts/')).json();

type Post = {
	title: string;
	body: string;
};

export const AsyncForLoopJSX = () => {
	const [posts] = createResource<Post[]>(fetchPosts);
	const [signalsArr, setSignalsArr] = createSignal<boolean[]>([]);

	createEffect(() => {
		const fetchedPosts = posts();
		untrack(() => {
			if (posts() as Post[]) {
				setSignalsArr(() => (fetchedPosts as Post[]).map(() => false));
			}
		});
	});

	createEffect(() => {
		console.log(signalsArr());
	});

	const handleOpen = (signalIndex: number) => {
		const copySignals = [...signalsArr()];
		copySignals[signalIndex] = !signalsArr()[signalIndex];
		setSignalsArr(copySignals);
	};

	return (
		<div>
			<Show
				when={Array.isArray(posts())}
				fallback={<Spinner style="margin: auto; display: flex;" />}
			>
				<For each={posts()}>
					{(post, index) => (
						<div class={styles.collapseContainer}>
							<div class={styles.collapseHeader}>
								{post.title}
								<button
									onClick={() => handleOpen(index())}
									aria-label="Open Collapse"
									class={`${styles.chevronButton} ${
										signalsArr()[index()] ? `${styles.rotate} ${styles.activeChevron}` : ''
									}`}
								>
									<ChevronIcon />
								</button>
							</div>
							<Show when={signalsArr()?.length > 0} fallback="Ciao">
								<Collapse state={signalsArr()[index()]} class={styles.fastCollapseTransition}>
									<div class={styles.collapseContent}>{post.body}</div>
								</Collapse>
							</Show>
						</div>
					)}
				</For>
			</Show>
		</div>
	);
};

export const AsyncForLoopCode = `
const fetchPosts = async () =>
	(await fetch('https://jsonplaceholder.typicode.com/posts/')).json();

const App = () => {
	const [posts] = createResource(fetchPosts);
	const [signalsArr, setSignalsArr] = createSignal([]);

	createEffect(() => {
		const fetchedPosts = posts();
		untrack(() => {
			if (posts()) {
				setSignalsArr(() => fetchedPosts.map(() => false));
			}
		});
	});

	const handleOpen = (signalIndex) => {
		const copySignals = [...signalsArr()];
		copySignals[signalIndex] = !signalsArr()[signalIndex];
		setSignalsArr(copySignals);
	};

	return (
		<Show when={posts()}>
			<For each={posts()}>
				{(post, index) => (
					<div class={styles.collapseContainer}>
						<div class={styles.collapseHeader}>
							{post.title}
							<button
								onClick={() => handleOpen(index())}
								aria-label="Open Collapse"
								class={styles.chevronButton}
							>
								<ChevronIcon />
							</button>
						</div>
						<Show when={signalsArr()?.length > 0}>
							<Collapse  state={signalsArr()[index()]} class={styles.collapseTransition}>
								<div class={styles.collapseContent}>{post.body}</div>
							</Collapse>
						</Show>
					</div>
				)}
			</For>
		</Show>
	);
};`;
