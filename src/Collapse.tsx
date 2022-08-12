import {
	Accessor,
	createEffect,
	mergeProps,
	on,
	onMount,
	ParentComponent,
	Setter,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';

export const getAria = (
	id: string,
	isOpen: Accessor<boolean>,
	setIsOpen: Setter<boolean>
) => ({
	tabindex: 0,
	'aria-controls': id,
	'aria-expanded': isOpen(),
	onKeyDown: (event: KeyboardEvent) => {
		if (event.code === 'Enter' || event.code === 'Space') {
			event.preventDefault();
			event.stopPropagation();
			setIsOpen(!isOpen());
		}
	},
});

type Props = {
	signal: Accessor<boolean>;
	as?: keyof HTMLElementTagNameMap;
	class?: string;
	ariaId?: string;
	id?: string;
};

export const Collapse: ParentComponent<Props> = (props) => {
	let collapseElem = null as unknown as HTMLElement;

	const mergedProps = mergeProps({ class: '', as: 'div' }, props);

	onMount(() => {
		if (!mergedProps.signal()) {
			collapseElem.style.height = '0';
			collapseElem.style.overflow = 'hidden';
			collapseElem.style.display = 'none';
		}
	});

	createEffect(
		on(
			mergedProps.signal,
			() => {
				if (mergedProps.signal()) {
					collapseElem.style.display = '';
					collapseElem.style.height = `${collapseElem.scrollHeight}px`;
				} else if (!mergedProps.signal()) {
					collapseElem.style.overflow = 'hidden';
					collapseElem.style.height = '0';
				}
			},
			{ defer: true }
		)
	);

	const handleTransitionEnd = () => {
		if (mergedProps.signal()) {
			collapseElem.style.height = `${collapseElem.scrollHeight}px`;
			collapseElem.style.overflow = '';
		} else {
			collapseElem.style.display = 'none';
		}
	};

	const setRef = (internalRef: HTMLElement) => {
		collapseElem = internalRef;
	};

	const a11yProps = () => {
		if (mergedProps.ariaId) {
			return {
				id: mergedProps.ariaId,
				'aria-role': 'region',
			};
		}

		return {
			id: mergedProps.id,
		};
	};

	return (
		<Dynamic
			{...a11yProps()}
			ref={setRef}
			component={mergedProps.as}
			class={mergedProps.class}
			onTransitionEnd={handleTransitionEnd}
		>
			{mergedProps.children}
		</Dynamic>
	);
};
