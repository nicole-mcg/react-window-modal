# react-window-modal [![Build Status](https://travis-ci.org/nik-m2/react-window-modal.svg?branch=master)](https://travis-ci.org/nik-m2/react-window-modal) [![npm version](https://badge.fury.io/js/react-window-modal.svg)](https://badge.fury.io/js/react-window-modal)

<p align="center">
    A React wrapper for the <a href="https://www.npmjs.com/package/window-modal">window-modal</a> package;
    <br>
    A modal window element designed to be smooth, clean and user friendly.
    <br>
    Includes many features and <a href="#props">options</a>! 
    <br>
    <a href="https://codesandbox.io/s/vnxjnnz1o7"><b>Demo</b></a>
    <br>
    <img src="https://user-images.githubusercontent.com/20328954/54089282-d78e3d00-433d-11e9-802e-5c404283cc4a.png"/>
    <br>
    Feature and improvement <a href="https://github.com/nik-m2/react-window-modal/issues">suggestions</a> welcome!
</p>

## Features

- Supports TypeScript
- Highly tested
- Movable
- Resizable
- Titles (with icons)
- Minimize
- Close
- Scrollable
- Customizable style (override styles with classnames, may have to use `!important`)
- Many options!

## Setup

```bash
npm install react-window-modal
```

then

```javascript
const WindowModal = require("react-window-modal");
```

or

```javascript
import WindowModal from "react-window-modal";
```

## Usage

```jsx
render() {
    return <WindowModal>contents</WindowModal>
}
```

## Props

<b><sub>* All props are optional</sub></b>

| Name | Type | Description |
| ------------- | ------------- | ----- |
| title | string | The title for the window |
| icon | [IWindowIcon](https://github.com/nik-m2/window-modal/blob/master/docs/IWindowIcon.md) | An icon to use for the window |
| pos | [IPoint](https://github.com/nik-m2/window-modal/blob/master/docs/IPoint.md) | The starting position for the window |
| size | [IPoint](https://github.com/nik-m2/window-modal/blob/master/docs/IPoint.md) | The starting size for the (must be greater than 200!) |
| resizable | boolean | If false, the window cannot be resized by the user |
| movable | boolean | If false, the window cannot be moved by the user |
| compact | boolean | If true, the style for the window's title bar will have less spacing |
| hideClose | boolean | If true, no close button will be added to the window |
| hideMinimize | boolean | If true, no minimize button will be added to the window |

## Events

| Name | Type | Description |
| ------------- | ------------- | ----- |
| onClose | Function | Called when the window is closed |
| onMinimize | Function | Called when the window is minimized |
| onUnminimize | Function | Called when the window is unminimized |
| onResize | Function | Called when the window is resized |
| onMove | Function | Called when the window is moved |
| onFocus | Function | Called when the window is focused |
| onBlur | Function | Called when the window is blurred |
