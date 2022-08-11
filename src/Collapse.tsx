import { Accessor, createEffect, mergeProps, on, onMount, ParentComponent } from 'solid-js';

type Props = {
	signal: Accessor<boolean>;
	class?: string;
	as?: keyof HTMLElementTagNameMap;
};

export const Collapse: ParentComponent<Props> = (props) => {
	let collapseElem = null as unknown as HTMLDivElement;
	const mergedProps = mergeProps({ class: undefined, signal: undefined, as: 'div' }, props);

	onMount(() => {
		collapseElem.style.height = '0';
		collapseElem.style.overflow = 'hidden';
	});

	createEffect(
		on(
			mergedProps.signal,
			() => {
				collapseElem.style.display = '';
				collapseElem.style.height = `${collapseElem.scrollHeight}px`;
				if (mergedProps.signal() === false) {
					setTimeout(() => {
						collapseElem.style.height = '0';
						collapseElem.style.overflow = 'hidden';
					}, 10);
				}
			},
			{ defer: true }
		)
	);

	const handleTransitionEnd = () => {
		setTimeout(() => {
			if (mergedProps.signal()) {
				collapseElem.removeAttribute('style');
			} else {
				collapseElem.style.display = 'none';
			}
		});
	};

	return (
		<div
			ref={collapseElem}
			class={`${mergedProps.class ?? ''}`}
			onTransitionEnd={handleTransitionEnd}
		>
			{props.children}
		</div>
	);
};
