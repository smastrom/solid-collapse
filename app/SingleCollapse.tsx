import { createSignal } from 'solid-js';
import { ChevronIcon } from './ChevronIcon';
import { Collapse } from '../src/Collapse';
import { ExampleHeader } from './ExampleHeader';

export function SingleCollapse() {
	const [isExpanded, setIsExpanded] = createSignal(false);

	function getToggleAriaAttrs() {
		return {
			id: 'single_btn',
			'aria-controls': 'single_collapse',
			'aria-expanded': isExpanded(),
		};
	}

	function getCollapseAriaAttrs() {
		return {
			id: 'single_collapse',
			role: 'region',
			'aria-labelledby': 'single_btn',
		};
	}

	return (
		<div class="ExampleWrapper">
			<ExampleHeader title="Single Collapse" name="SingleCollapse" />

			<section class="CollapseContainer">
				<button
					onClick={() => setIsExpanded(!isExpanded())}
					class={`CollapseHeader ${!isExpanded() ? 'CollapseHeaderActive' : ''}`}
					{...getToggleAriaAttrs()}
				>
					Where can I get some?
					<span class={`ChevronButton ${isExpanded() ? 'ActiveChevron' : ''}`}>
						<ChevronIcon />
					</span>
				</button>
				<Collapse value={isExpanded()} class="CollapseTransition" {...getCollapseAriaAttrs()}>
					<p class="CollapseContent">
						There are many variations of passages of Lorem Ipsum available, but the majority
						have suffered alteration in some form, by injected humour, or randomised words
						which don't look even slightly believable. If you are going to use a passage of
						Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the
						middle of text.
					</p>
				</Collapse>
			</section>
		</div>
	);
}
