# TagInput Component

A simple React (TypeScript) component for adding and managing multiple tags.  
Supports Enter key, custom separator (like `,` or `-`), and adding tags on blur.

---

## Features

- Add tags using Enter key or a custom separator (default is `,`)
- Add tag when input loses focus (onBlur)
- Remove tags by clicking the `×` button
- Prevent duplicate tags
- Limit max number of tags (via `maxTags` prop)
- No UI libraries – all styles are manually written
- Includes unit tests for all key features

---

## How to use

```tsx
import TagInput from './components/TagInput';

<TagInput maxTags={5} separator="-" />

```

## Props

| Prop        | Type     | Default | Description                     |
|-------------|----------|---------|---------------------------------|
| `maxTags`   | number   | 10      | Max number of tags allowed      |
| `separator` | string   | `,`     | Character to split tag input    |


## Run the project

```bash
npm install
npm start

```

---

## Run tests

```bash
npm test -- TagInput.test.tsx

```

---

## Test coverage

- Renders correctly
- Add tag by Enter or separator
- Remove tag
- Prevent duplicate tags
- Add multiple tags at once
- Show warning if max limit is reached