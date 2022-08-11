# Solid Collapse

Tiny and performant collapse component for SolidJS.

[Demo and examples]()

<br />

## Features

- Pure CSS height transition, no javascript animation
- Minimal API: Just define a signal and a CSS transition and you're ready to go
- Fully accessible with keyboard navigation
- Works within loops
- Super lightweight

<br />

## API

| Props      | Description                            | Type                | Default     | Required           |
| ---------- | -------------------------------------- | ------------------- | ----------- | ------------------ |
| **signal** | Signal to control collapse             | Accessor\<boolean\> | `undefined` | :white_check_mark: |
| **as**     | Element tag to render instead of `div` | string              | `div`       | :x:                |
| **class**  | CSS classes of the collapse element    | string              | `''`        | :x:                |
| **style**  | Inline styles of the collapse element  | string              | `''`        | :x:                |
| **id**     | Id of the collapse element             | string              | `undefined` | :x:                |

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
.my-classname {
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
      <button type="button" onClick={() => setIsOpen(!isOpen())}>
        Expand me
      </button>
      <Collapse signal={isOpen} class="my-classname">
        I am a bunch of collapsed text that wants to be expanded
      </Collapse>
    </div>
  );
};
```

<br />

## Accessibility

If you want to obtain keyboard navigation and assistive technologies support:

1. Create an ID (or write your own) and pass it to `ariaId` prop
2. Import the `getAria` function and spread it in
   your trigger element:

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

If you don't want to use any accessibility feature but you want to set the `id` attribute, just set it as usual:

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
