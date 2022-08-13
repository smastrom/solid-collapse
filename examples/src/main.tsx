import { render } from 'solid-js/web';

import { App } from './Components/AppLayout';

import './styles/dracula.css';
import './styles/fonts.css';
import './styles/index.css';
import './styles/animations.css';

render(() => <App />, document.getElementById('root') as HTMLElement);
