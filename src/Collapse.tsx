import {
	createEffect,
	mergeProps,
	onCleanup,
	onMount,
	ParentComponent,
	untrack,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';

type CollapseProps = {
	/** Reactive read-only value to trigger collapse. */
	value: boolean;
	/** Element tag to render instead of div. */
	as?: keyof HTMLElementTagNameMap;
	/** Classname with your transition. */
	class?: string;
	id?: string;
	'aria-labelledby'?: string;
	'aria-role'?: string;
};

/** Thank you for using **solid-collapse**. For more info read
 * the documentation at https://github.com/smastrom/solid-collapse.
 */
export const Collapse: ParentComponent<CollapseProps> = (props) => {
	let collapseElem: HTMLElement;

	const mergedProps = mergeProps({ class: '', as: 'div', value: false }, props);

	onMount(() => {
		if (!mergedProps.value) {
			collapseElem.style.overflow = 'hidden';
			collapseElem.style.height = '0px';
			collapseElem.style.display = 'none';
		}
	});

	createEffect((prevState) => {
		const currentState = mergedProps.value;
		untrack(() => {
			if (prevState !== currentState) {
				let requestId: number;
				let prevFrame: DOMHighResTimeStamp;

				const handleAnim = (nextFrame: DOMHighResTimeStamp) => {
					if (typeof prevFrame === 'undefined') {
						prevFrame = nextFrame;
						if (currentState) {
							collapseElem.style.height = '0px';
							return requestAnimationFrame(handleAnim);
						}
						collapseElem.style.height = `${collapseElem.scrollHeight}px`;
						return requestAnimationFrame(handleAnim);
					}

					if (typeof prevFrame === 'number') {
						if (currentState) {
							collapseElem.style.display = 'block';
							collapseElem.style.height = `${collapseElem.scrollHeight}px`;
						} else {
							collapseElem.style.overflow = 'hidden';
							collapseElem.style.height = '0px';
						}
					}
				};

				requestId = requestAnimationFrame(handleAnim);
				onCleanup(() => cancelAnimationFrame(requestId));
			}
		});
		return currentState;
	});

	const handleTransitionEnd = () => {
		if (mergedProps.value) {
			collapseElem.style.overflow = '';
			collapseElem.style.height = '';
		} else {
			collapseElem.style.display = 'none';
		}
	};

	const setRef = (internalRef: HTMLElement) => (collapseElem = internalRef);

	return (
		<Dynamic
			id={mergedProps.id}
			ref={setRef}
			aria-labelledby={mergedProps['aria-labelledby']}
			aria-role={mergedProps['aria-role']}
			component={mergedProps.as}
			class={mergedProps.class}
			onTransitionEnd={handleTransitionEnd}
		>
			{mergedProps.children}
		</Dynamic>
	);
};
