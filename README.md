# react-time-ago

[![npm version](https://img.shields.io/npm/v/react-time-ago.svg?style=flat-square)](https://www.npmjs.com/package/react-time-ago)

International higly customizable relative date/time formatter for React (both for past and future dates).

[See Demo](https://catamphetamine.github.io/react-time-ago/)

Formats a date/timestamp to:

  * just now
  * 5m
  * 15 min
  * 25 minutes
  * an hour ago
  * 1 mo.
  * 5 years ago
  * … or whatever else

## Install

```sh
$ npm install react-time-ago --save
```

The requirement for the default exported component (the one with the tooltip component) is React >= 16 because the tooltip uses `ReactDOM.createPortal()`. For older React versions use the `/no-tooltip` export which doesn't use the tooltip component.

## Use

`react-time-ago` component uses [`wetimejs`](https://github.com/catamphetamine/wetimejs) library internally for generating localized relative time strings. When `react-time-ago` package is installed `wetimejs` package is installed automatically with it. In the application's main file initialize `wetimejs` library with the desired locales. By default no locales are initialized.

#### ./src/index.js

```js
import JavascriptTimeAgo from 'wetimejs'

// The desired locales.
import en from 'wetimejs/locale/en'
import ru from 'wetimejs/locale/ru'

// Initialize the desired locales.
JavascriptTimeAgo.locale(en)
JavascriptTimeAgo.locale(ru)
```

Now `<ReactTimeAgo/>` component can be used on any page. The component refreshes itself every minute (by default).

#### ./src/LastSeen.js

```js
import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function LastSeen({ date }) {
  return (
    <div>
      Last seen:
      <ReactTimeAgo locale="ru">
        {date}
      </ReactTimeAgo>
    </div>
  )
}
```

## Customization

`ReactTimeAgo` component accepts a `timeStyle` property which can be:

  * [`"twitter"`](https://github.com/catamphetamine/wetimejs#twitter-style)
  * [`"time"`](https://github.com/catamphetamine/wetimejs#just-time-style)
  * [`{ gradation, units, flavour }`](https://github.com/catamphetamine/wetimejs#customization)

See [`wetimejs` docs](https://github.com/catamphetamine/wetimejs#advanced) for more info on how to customize the generated output.

## Tooltip

The default component exported from this library comes prepackaged with an optional [`<Tooltip/>`](https://catamphetamine.github.io/react-responsive-ui/#tooltip) component which displays itself "on mouse over" on desktops and "on touch down" on mobile devices. The behaviour of the tooltip is similar to that of the HTML `title` attribute which displays a tooltip "on mouse over". The difference that the custom tooltip also displays itself "on touch down" on mobile devices while the HTML `title` attribute doesn't handle mobile users in any way. That was the primary reason for going with the custom `<Tooltip/>` component instead of the HTML `title` attribute. The other reason is the requirement for custom design.

The tooltip text is a verbose date label. If [`Intl`](https://caniuse.com/#search=intl) is supported (which is the case for all modern web browsers) then [`Intl.DateTimeFormat`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat) is used for formatting the label (`"Thursday, January 11, 2018, 9:53:00 PM"`). Otherwise, it falls back to `date.toString()`.

```js
import TimeAgo from 'react-time-ago'

// Tooltip CSS styles:
import 'react-time-ago/Tooltip.css'
// Also make sure that `document.body` has no `margin`
// otherwise tooltip `left` and `top` positions will be slightly off.

// Shows a verbose date tooltip on mouse over and on touch down.
<TimeAgo tooltipClassName="...">
  {date}
</TimeAgo>
```

```css
.rrui__tooltip {
  margin-top : -0.5em;
  background-color : black;
  color : white;
}

.rrui__tooltip--after-show {
  opacity : 0.85;
}

.rrui__tooltip--before-hide {
  opacity : 0;
}
```

If the default `<Tooltip/>` component doesn't fit the application then use the `TimeAgo` export which doesn't have the `<Tooltip/>`:

```js
import TimeAgo from 'react-time-ago/no-tooltip'
// No custom `<Tooltip/>` will be added,
// just a standard HTML `title` tooltip on mouse over.
<TimeAgo>{date}</TimeAgo>
```

## Future

When given future dates it produces the corresponding output, e.g. "in 5 minutes", "in a year", etc.

<!--
## ES6

This library uses ES6 `Set` so any ES6 polyfill for `Set` is required (e.g. `import 'babel-polyfill'` or `import 'core-js/fn/set'`).
-->

## Props

```js
// Preferred locale.
// E.g. 'ru-RU'.
locale : PropTypes.string,

// Preferred locales (ordered).
// E.g. `['ru-RU', 'en-GB']`.
locales : PropTypes.arrayOf(PropTypes.string),

// The `date` (or `timestamp`).
// E.g. `new Date()` or `1355972400000`.
children : PropTypes.oneOfType
([
  PropTypes.instanceOf(Date),
  PropTypes.number
])
.isRequired,

// Date/time formatting style.
// E.g. 'twitter', 'time', or an object.
// See `wetimejs` docs for more info.
timeStyle,

// Whether HTML `tooltip` attribute should be set
// to verbosely formatted date (is `true` by default).
tooltip : PropTypes.bool.isRequired,

// An optional function returning what will be output in the HTML `title` tooltip attribute.
// (by default it's (date) => new Intl.DateTimeFormat(locale, {…}).format(date))
formatVerboseDate : PropTypes.func,

// `Intl.DateTimeFormat` format for the HTML `title` tooltip attribute.
// Is used when `formatVerboseDate` is not specified.
// By default outputs a verbose date.
verboseDateTimeFormat : PropTypes.object,

// How often to update all `<TimeAgo/>`s on a page.
// (once a minute by default)
updateInterval : PropTypes.number,

// Set to `false` to disable automatic refresh as time goes by.
tick : PropTypes.bool,

// React Component to wrap the resulting `<time/>` React Element.
// Receives `verboseDate` and `children` properties.
// `verboseDate` can be used for displaying verbose date label
// in an "on mouse over" (or "on touch") tooltip.
// See "./source/WithTooltip.js" for usage example.
container : PropTypes.func,

// CSS `style` object.
// E.g. `{ color: white }`.
style : PropTypes.object,

// CSS class name
className : PropTypes.string
```

## License

[MIT](LICENSE)