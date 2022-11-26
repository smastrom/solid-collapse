import { createEffect, createSignal, mergeProps, ParentComponent, untrack } from 'solid-js';
import { Dynamic } from 'solid-js/web';

type CollapseProps = {
	/** Reactive boolean to trigger collapse. */
	value: boolean;
	/** Class with a transition (height) property. */
	class?: string;
	/** Element tag to render instead of div. */
	as?: keyof HTMLElementTagNameMap;
	/** Callback on expand transition completed. */
	onExpanded?: () => void;
	/** Callback on collapse transition completed. */
	onCollapsed?: () => void;
	id?: string;
	role?: string;
	'aria-labelledby'?: string;
};

const fixedStyles = {
	padding: 0,
	border: 0,
};

const collapsedStyles = {
	display: 'none',
	...fixedStyles,
};

const performanceStyles = {
	'will-change': 'height',
};

const hiddenStyles = {
	overflow: 'hidden',
	height: 0,
};

const nextFrame = typeof window !== 'undefined' ? requestAnimationFrame : () => {};

export const Collapse: ParentComponent<CollapseProps> = (props) => {
	let collapseElem: HTMLElement;

	const mergedProps = mergeProps(
		{ class: '', as: 'div', value: true, onCollapsed: () => {}, onExpanded: () => {} },
		props
	);

	const [style, setStyle] = createSignal(!mergedProps.value ? collapsedStyles : fixedStyles);

	createEffect((prevValue) => {
		const isExpanding = mergedProps.value;
		const isUpdate = typeof prevValue !== 'undefined' && prevValue !== isExpanding;

		untrack(() => {
			if (isUpdate) {
				requestAnimationFrame(() => {
					if (isExpanding) {
						setStyle({
							...fixedStyles,
							...performanceStyles,
							...hiddenStyles,
						});
						nextFrame(() => {
							setStyle((prevStyle) => ({
								...prevStyle,
								...getHeightStyles(collapseElem.scrollHeight),
							}));
						});
					} else {
						setStyle((prevStyle) => ({
							...prevStyle,
							...performanceStyles,
							...getHeightStyles(collapseElem.scrollHeight),
						}));
						nextFrame(() => {
							setStyle((prevStyle) => ({
								...prevStyle,
								...hiddenStyles,
							}));
						});
					}
				});
			}
		});

		return isExpanding;
	});

	function onTransitionEnd(event: TransitionEvent) {
		if (event.target === collapseElem && event.propertyName === 'height') {
			if (mergedProps.value) {
				if (
					collapseElem?.scrollHeight === parseFloat((event.target as HTMLElement).style.height)
				) {
					setStyle(fixedStyles);
					mergedProps.onExpanded();
				}
			} else {
				if (collapseElem?.style.height === '0px') {
					setStyle(collapsedStyles);
					mergedProps.onCollapsed();
				}
			}
		}
	}

	return (
		<Dynamic
			style={style()}
			id={mergedProps.id}
			ref={(ref: HTMLElement) => (collapseElem = ref)}
			aria-labelledby={mergedProps['aria-labelledby']}
			role={mergedProps.role}
			component={mergedProps.as}
			class={mergedProps.class}
			onTransitionEnd={onTransitionEnd}
		>
			{mergedProps.children}
		</Dynamic>
	);
};

function getHeightStyles(height = 0) {
	return {
		'--sc-auto-duration': `${getAutoDuration(height)}ms`,
		height: `${height}px`,
	};
}

/**
 * Forked from:
 * https://github.com/mui/material-ui/blob/master/packages/mui-material/src/styles/createTransitions.js#L35
 */

function getAutoDuration(height = 0) {
	if (height === 0) {
		return 0;
	}

	const constant = height / 36;
	return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
