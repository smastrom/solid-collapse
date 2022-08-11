# Solid Collapse

Tiny and performant collapse component for SolidJS.

[Demo and examples]()

<br />

## Features

- Pure CSS height transition, no _requestAnimationFrame_ or any other JS height computation
- Minimal API: Just define a CSS transition and a signal and you're ready to go

<br />

## API

| Props  | Description                             | Type                | Default   | Required           |
| ------ | --------------------------------------- | ------------------- | --------- | ------------------ |
| signal | Signal to control collapse              | Accessor\<boolean\> | undefined | :white_check_mark: |
| class  | CSS class that includes your transition | string              | undefined | :x:                |
| as     | Element tag to render instead of `div`  | string              | div       | :x:                |

<br/>

## Installation

```bash
yarn add solid-collapse
# npm i -S solid-collapse
# pnpm i solid-collapse
```

<br/>

## Usage

**1. In a CSS file:**

```css
.collapse {
  transition: height 400ms cubic-bezier(0.65, 0, 0.35, 1);
}
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
      <button onClick={() => setIsOpen(!isOpen())}>Expand me</button>
      <Collapse signal={isOpen} class="collapse">
        I am a bunch of expanded text
      </Collapse>
    </div>
  );
};
```

<br />

## Accessibility

Since this package doesn't provide any element to trigger the collapse, you are in charge of
setting up accessibility:

```jsx
import { createSignal, createUniqueId } from 'solid-js';
import { Collapse } from 'solid-collapse';

const App = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const id = createUniqueId();

  const ariaTrigger = {
    'aria-expanded': isOpen(),
    'aria-controls': id,
    tabindex: 0,
    onKeyDown: (event) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        setIsOpen(!isOpen());
      }
    },
  };

  const ariaCollapse = {
    id,
    role: 'region',
  };

  return (
    <div>
      <div onClick={() => setIsOpen(!isOpen())} {...ariaTrigger}>
        Expand me
      </div>
      <Collapse as="p" signal={isOpen} class="collapse" {...ariaCollapse}>
        I am a bunch of expanded text
      </Collapse>
    </div>
  );
};
```

This code is enough to have assistive technologies support and keyboard navigation.

> **Note:** `tabindex` is not necessary if the trigger is a native interactive element like a button or an anchor.
