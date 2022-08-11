import { Accessor, createComputed, createMemo, createSignal, Setter } from 'solid-js';
import { createStore } from 'solid-js/store';

const getUniqueId = () => (Math.random() + 1).toString(36).substring(7);

export const a11y = (isOpen: Accessor<boolean>, setIsOpen: Setter<boolean>) => {
	const id = `clps_${getUniqueId()}`;
	const isOpenX = isOpen();

	return createMemo(() => [
		{
			'aria-controls': id,
			'aria-expanded': isOpenX,
			onKeyDown: (event: KeyboardEvent) => {
				switch (event.code) {
					case 'Enter':
					case 'Space':
						event.preventDefault();
						event.stopPropagation();
						setIsOpen((isOpen: boolean) => !isOpen);
						break;
				}
			},
		},
		{
			role: 'region',
			id,
		},
	])();
};
