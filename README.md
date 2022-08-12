# Solid Collapse

Tiny and performant collapse component for SolidJS.

[Demo and examples]()

<br />

## Features

- Pure dynamic CSS height transition, no javascript animations
- Minimal API: Just pass a signal and you're ready to go
- Fully accessible with keyboard navigation
- Works within loops
- Super lightweight, only 500B gzipped

<br />

## API

| Props      | Description                            | Type                | Default     | Required           |
| ---------- | -------------------------------------- | ------------------- | ----------- | ------------------ |
| **signal** | Signal to control collapse             | Accessor\<boolean\> | `undefined` | :white_check_mark: |
| **as**     | Element tag to render instead of `div` | string              | `div`       | :x:                |
| **ariaId** | Id to set if using `getAria`.          | string              | `undefined` | :x:                |

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
      <Collapse signal={isOpen} class="my-transition">
        I am a bunch of collapsed text that wants to be expanded
      </Collapse>
    </div>
  );
};

// Add the class and pass the Accessor
```

:warning: Do not style the collapse itself! Instead, style the elements inside.

<br />

## Accessibility

If you want to obtain keyboard navigation and assistive technologies support:

1. Define an ID and pass it to `ariaId` prop (I'm using createUniqueId from Solid, but you can just write your own string).
2. Import `getAria` and spread the function in your trigger element by passing the arguments as displayed below.

```jsx
import { createSignal, createUniqueId } from 'solid-js';
import { Collapse, getAria } from 'solid-collapse';

const App = () => {
  const [isOpen, setIsOpen] = createSignal(false);

  const id = createUniqueId();

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen())}
        {...getAria(id, isOpen, setIsOpen)}
      >
        Expand me
      </button>
      <Collapse signal={isOpen} class="collapse" ariaId={id}>
        I am a bunch of collapsed text that wants to be expanded
      </Collapse>
    </div>
  );
};
```

Use **ariaId** instead of **id** only if using accessibility features. If not, just set it as usual:

```jsx
<Collapse signal={isOpen} class="collapse" id="my_collapse_id">
  I am a bunch of expanded text
</Collapse>
```

### Keyboard Controls

- **Space / Enter** - Collapse expand the component
- **Up Arrow / Tab** - Navigate to next focusable element
- **Down Arrow / Tab+Shift** -Navigate to previous focusable element

<br />

## For loops

Please check the examples on the [demo website]().

<br />

## License

0BSD Licensed. Copyright (c) Simone Mastromattei 2022.
