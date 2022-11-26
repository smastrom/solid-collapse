import { createSignal, Index } from 'solid-js';
import { ChevronIcon } from './ChevronIcon';
import { Collapse } from '../src/Collapse';
import { ExampleHeader } from './ExampleHeader';
import fakeData from './fakeData.json';

export function Accordion() {
	const [questions, setQuestions] = createSignal(
		fakeData.map(({ title, answer }, index) => ({
			title,
			answer,
			isExpanded: index === 2, // Mount with question num. 3 opened
		}))
	);

	function handleAccordion(clickedIndex: number) {
		setQuestions((questions) =>
			questions.map((question, index) => ({
				...question,
				isExpanded: clickedIndex === index ? !questions[clickedIndex].isExpanded : false,
			}))
		);
	}

	function getToggleAriaAttrs(index: number, isExpanded: boolean) {
		return {
			id: `accordion_btn_${index}`,
			'aria-controls': `region_${index}`,
			'aria-expanded': isExpanded,
		};
	}

	function getCollapseAriaAttrs(index: number) {
		return {
			id: `region_${index}`,
			role: 'region',
			'aria-labelledby': `accordion_btn_${index}`,
		};
	}

	return (
		<div class="ExampleWrapper">
			<ExampleHeader title="Accordion" name="Accordion" />

			<Index each={questions()}>
				{(q, index) => (
					<section class="CollapseContainer">
						<button
							class={`CollapseHeader ${!q().isExpanded ? 'CollapseHeaderActive' : ''}`}
							onClick={() => handleAccordion(index)}
							{...getToggleAriaAttrs(index, q().isExpanded)}
						>
							{q().title}
							<span class={`ChevronButton ${q().isExpanded ? 'ActiveChevron' : ''}`}>
								<ChevronIcon />
							</span>
						</button>
						<Collapse
							value={q().isExpanded}
							class="CollapseTransition"
							{...getCollapseAriaAttrs(index)}
						>
							<p class="CollapseContent">{q().answer}</p>
						</Collapse>
					</section>
				)}
			</Index>
		</div>
	);
}
