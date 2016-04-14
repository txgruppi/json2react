[![GitHub license](https://img.shields.io/github/license/txgruppi/json2react.svg?style=flat-square)](https://github.com/txgruppi/json2react)
[![David](https://img.shields.io/david/txgruppi/json2react.svg?style=flat-square)](https://github.com/txgruppi/json2react)
[![npm](https://img.shields.io/npm/v/json2react.svg?style=flat-square)](https://www.npmjs.com/package/json2react)
[![Travis](https://img.shields.io/travis/txgruppi/json2react.svg?style=flat-square)](https://travis-ci.org/txgruppi/json2react)
[![Codecov](https://img.shields.io/codecov/c/github/txgruppi/json2react.svg?style=flat-square)](https://codecov.io/github/txgruppi/json2react)

# json2react

Use JSON to create React Stateless Components.

`json2react` allows you to create React Stateless Components from JSON using a simple schema.

## Why?

I needed a way to store static views on the database as data, not as HTML code.

Using this library you can fetch some remote data which represents an UI and render it with React.

## Install

Like any other NPM package

```sh
npm install --save json2react
```

## Usage

You can use it with:

- `React.render`
- As the return value, or part of it, of a stateless component
- As the return value, or part of it, of a component's `render` method

```javascript
import { createElement } from "react";
import j2r from "json2react";

const jsonUI = {
  type: "div",
  props: {
    style: { textAlign: "center" },
  },
  children: [
    { type: "h1", children: "It works!" },
    {
      type: "p",
      children: {
        type: "small",
        children: "This component was created from JSON",
      },
    },
  ],
};

ReactDOM.render(j2r(createElement, jsonUI), document.body);
```

You can pass a mapper function as second argument to map types to components.

```javascript
import { createElement } from "react";
import j2r from "json2react";
import MyDivComponent from "./MyDivComponent";

const jsonUI = {
  type: "MyDivComponent",
  props: {
    style: { textAlign: "center" },
  },
  children: [
    { type: "h1", children: "It works!" },
    {
      type: "p",
      children: {
        type: "small",
        children: "This component was created from JSON",
      },
    },
  ],
};

const mapTypeToComponent = (type, props) => {
  switch (type) {
    case "MyDivComponent": return MyDivComponent;
  }
  return type;
};

ReactDOM.render(j2r(createElement, mapTypeToComponent, jsonUI), document.body);
```

## Schema

Please check the file http://github.com/txgruppi/json2react/blob/v0.0.0/schema.json for the detailed schema description.

## Tests

Only tests

```sh
npm test
```

Tests and coverage

```sh
npm run coverage
```

## License

GPLv3
