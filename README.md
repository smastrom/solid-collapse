![npm](https://img.shields.io/npm/v/solid-collapse?color=46c119) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/smastrom/solid-collapse/Tests?color=46c119&label=tests) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/smastrom/solid-collapse.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/smastrom/solid-collapse/context:javascript) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/solid-collapse?color=46c119)

# Solid Collapse

Tiny and performant collapse component for SolidJS.

[Demo and examples](https://solid-collapse.onrender.com)

<br />

## Features

- Pure CSS dynamic height transition, no javascript animations.
- Minimal API: Just pass a boolean value and you're ready to go.
- Works within loops / async loops
- Accordion-ready - [See examples](https://solid-collapse.onrender.com)
- Super lightweight, only 600B gzipped.

<br />

## :jigsaw: API

| Props     | Description                                 | Type    | Default | Required           |
| --------- | ------------------------------------------- | ------- | ------- | ------------------ |
| **value** | Readonly reactive value to control collapse | boolean | `false` | :white_check_mark: |
| **class** | Classname with your transition              | string  | `''`    | :x:                |
| **as**    | Element tag to render instead of `div`      | string  | `div`   | :x:                |

`id`, `role` and `aria-labelledby` are also supported.

<br/>

## :hammer: Installation

```bash
yarn add solid-collapse
# npm i -S solid-collapse
# pnpm i solid-collapse
```

<br/>

## :lollipop: Usage

**1. In a CSS file:**

```css
.my-transition {
  transition: height 300ms cubic-bezier(0.65, 0, 0.35, 1);
}

/* Name the class however you prefer */
```

> You can find a complete list of CSS easings at [easings.net](https://easings.net/).

**2. In a component file:**

```jsx
import { createSignal } from 'solid-js';
import { Collapse } from 'solid-collapse';

const App = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div>
      <button type="button" onClick={() => setIsOpen(!isOpen())}>
        Expand me
      </button>
      <Collapse value={isOpen()} class="my-transition">
        I am a bunch of collapsed text that wants to be expanded
      </Collapse>
    </div>
  );
};
```

:warning: Do not style the collapse itself! Instead, style the elements inside. The class added to collapse should only have the `transition` property set.

<br />

## :open_umbrella: Accessibility

Although you can render the collapse as any element you prefer, **you can't render it in a `<details>` element** in order to get native assistive technologies support.

That's because the browser's default behavior will prevail over the component's one, preventing necessary styles injection and transitions.

This means that you have to make accessible your UI by manually linking your trigger to the collapse.

### A. Focusable trigger

If your trigger is [focusable](https://html.spec.whatwg.org/multipage/interaction.html#focusable)
(like a `button`), you just have to set the necessary aria-attributes:

```jsx
const B_ID = 'my_button_id';
const C_ID = 'my_collapse_id';

const App = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen())}
        // Trigger attributes
        id={B_ID}
        aria-controls={C_ID}
        aria-expanded={isOpen()}
      >
        <h2>Do you ship your products outside EU?</h2>
      </button>
      <Collapse
        as="p"
        value={isOpen()}
        class="my-transition"
        // Collapse attributes
        id={C_ID}
        role="region"
        aria-labelledby={B_ID}
      >
        Yes, we do ship our products to United States, Japan, Korea and Thailand.
      </Collapse>
    </div>
  );
};
```

> Please note that this is an example that fits the above scenario. Check [W3C](https://www.w3.org/WAI/ARIA/apg/example-index/) examples to make sure your use case is compliant.

### B. Non-focusable trigger

If your trigger is not focusable (like a `div` or `li`), you will have to set keyboard controls manually.

You can create a reusable function that fits your use case and spread in your triggers:

```jsx
import { Collapse, setKeyboard } from 'solid-collapse';

const setKeyDown = (setter) => ({
  tabIndex: 0,
  onKeyDown: (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.stopPropagation();
      event.preventDefault();
      setter((accessor) => !accessor);
    }
  },
});

const D_ID = 'my_div_id';
const C_ID = 'my_collapse_id';

const App = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen())}
        id={D_ID}
        aria-controls={C_ID}
        aria-expanded={isOpen()}
        // Spread the function
        {...setKeyDown(setIsOpen)}
      >
        Open content
      </div>
      <Collapse
        value={isOpen()}
        class="my-transition"
        id={C_ID}
        role="region"
        aria-labelledby={D_ID}
      >
        Some collapsed content
      </Collapse>
    </div>
  );
};
```

<br />

## :cyclone: For loops, accordions

Please check the examples on the [demo website](https://solid-collapse.onrender.com).

<br />

## :no_mouth: Limitations

You can't assign a `ref` to **Collapse**. If you need to access its DOM node, you have two options:

- `document.getElementById` in an `onMount` callback
- Assign a ref to its nearest child

<br />

## :dvd: License

MIT Licensed. Copyright (c) Simone Mastromattei 2022.
