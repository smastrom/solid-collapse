![npm](https://img.shields.io/npm/v/solid-collapse?color=46c119) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/smastrom/solid-collapse/Tests?color=46c119&label=tests) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/solid-collapse?color=46c119)

# Solid Collapse

Tiny and performant collapse component for SolidJS.

[Demo and examples](https://solid-collapse.onrender.com)

<br />

## :jigsaw: API

| Props           | Description                                 | Type       | Default    | Required           |
| --------------- | ------------------------------------------- | ---------- | ---------- | ------------------ |
| **value**       | Boolean value to control collapse           | boolean    | `false`    | :white_check_mark: |
| **class**       | Class with a transition (height) property   | string     | `''`       | :white_check_mark: |
| **as**          | Element tag to render instead of `div`      | string     | `div`      | :x:                |
| **onExpanded**  | Readonly reactive value to control collapse | () => void | `() => {}` | :x:                |
| **onCollapsed** | Readonly reactive value to control collapse | () => void | `() => {}` | :x:                |

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
        <p class="my-content-class">
          I am a bunch of collapsed text that wants to be expanded
        </p>
      </Collapse>
    </div>
  );
};
```

<br />

## :clock1: Auto Duration

Solid Collapse automatically calculates the optimal duration according to the content height. You can use it by referencing the variable `--sc-auto-duration` in your transition property:

```css
.my-transition {
  transition: height var(--vc-auto-duration) ease-out;
}
```

<br />

## :cyclone: For loops, accordions

Please check the examples on the [demo website](https://solid-collapse.onrender.com).

<br />

## :no_mouth: Caveats

1. Assigning a `ref` to Collapse is not possible. If you need to access its DOM node, you can call `document.getElementById` inside an `onMount` callback

2. You will have to make your UI compliant by manually implementing [ARIA practices](https://w3c.github.io/aria-practices/examples/) according to your use case.

<br />

## :dvd: License

MIT Licensed. Copyright (c) Simone Mastromattei 2022.
