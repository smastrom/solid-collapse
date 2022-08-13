import { Setter } from 'solid-js';

export const setKeyDown = (setter: Setter<boolean>) => ({
	tabIndex: 0,
	onKeyDown: (event: KeyboardEvent) => {
		if (event.code === 'Enter' || event.code === 'Space') {
			event.stopPropagation();
			event.preventDefault();
			setter((accessor) => !accessor);
		}
	},
});
