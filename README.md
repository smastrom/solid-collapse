# Solid Collapse

Tiny and performant collapse component for SolidJS.

[Demo and examples]()

<br />

## Features

- Pure CSS height transition, no javascript animations
- Minimal API: Just pass a signal and you're ready to go
- Works within loops / async loops
- Suitable for accordions
- Super lightweight, only 500B gzipped

<br />

## :jigsaw: API

| Props     | Description                            | Type    | Default | Required           |
| --------- | -------------------------------------- | ------- | ------- | ------------------ |
| **state** | Boolean value to trigger collapse      | boolean | `false` | :white_check_mark: |
| **class** | Classname of your transition           | string  | `''`    | :x:                |
| **as**    | Element tag to render instead of `div` | string  | `div`   | :x:                |

`id`, `aria-role`, `aria-labelledby` are supported as well.

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
  transition: height 400ms cubic-bezier(0.65, 0, 0.35, 1);
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
      <Collapse state={isOpen()} class="my-transition">
        I am a bunch of collapsed text that wants to be expanded
      </Collapse>
    </div>
  );
};
```

:warning: Do not style the collapse itself! Instead, style the elements inside.

<br />

## :open_umbrella: Accessibility

Since this package just provides a collapsible element, you are in charge of linking your trigger element to it.

### Focusable trigger

If your trigger is [focusable](https://html.spec.whatwg.org/multipage/interaction.html#focusable)
(like a `summary` or a `button`), you already have out-of-the-box keyboard controls.

You just have to set the aria-attributes as displayed below:

```jsx
const ID = 'my_collapse_id';

const App = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen())}
        aria-controls={ID} // 2.
        aria-expanded={isOpen()} // 3.
      >
        Expand me
      </button>
      <Collapse
        state={isOpen()}
        class="collapse"
        id={ID} // 1.
        aria-role="region" // 4.
      >
        I am a bunch of collapsed text that wants to be expanded
      </Collapse>
    </div>
  );
};
```

[W3C Reference](https://www.w3.org/WAI/GL/wiki/Using_the_WAI-ARIA_aria-expanded_state_to_mark_expandable_and_collapsible_regions)

### Non-focusable trigger

If your trigger is not a native focusable element (like a `div`), in addition to aria attributes, you have to manually enable keyboard controls.

You can create a reusable function like the following one and spread it in your element.

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

const ID = 'my_collapse_id';

const App = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen())}
        aria-controls={ID}
        aria-expanded={isOpen()}
        {...setKeyDown(setIsOpen)} // Spread the function
      >
        Expand me
      </div>
      <Collapse state={isOpen()} class="collapse" id={ID} aria-role="region">
        I am a bunch of collapsed text that wants to be expanded
      </Collapse>
    </div>
  );
};
```

<br />

## :cyclone: For loops, accordions

Please check the examples on the [demo website]().

<br />

## :dvd: License

0BSD Licensed. Copyright (c) Simone Mastromattei 2022.
