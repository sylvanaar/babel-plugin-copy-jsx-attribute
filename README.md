# babel-plugin-copy-jsx-attribute

🚧 This project is a work in progress 🚧 

A babel plugin to copy one JSX attribute to another.

Original use case was copying `testID` to `accessibilityLabel` in non-production builds to enable test automation.

## Example

**In**

```jsx
<Label testID={`${props.testID}-error-label`} styles={errorStyles}>
  {props.constraints}
</Label>
```

**Out**

```jsx
<Label
  testID={`${props.testID}-error-label`}
  styles={errorStyles}
  accesibilityLabel={`${props.testID}-error-label`}
>
  {props.constraints}
</Label>
```

## Installation

```sh
$ npm install babel-plugin-copy-jsx-attribute
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["copy-jsx-attribute"]
}
```

### Via CLI

```sh
$ babel --plugins copy-jsx-attribute script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["copy-jsx-attribute"],
});
```
