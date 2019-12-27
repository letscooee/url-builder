# URL Builder

[![npm version](https://badge.fury.io/js/%40wizpanda%2Furl-builder.svg)](https://badge.fury.io/js/%40wizpanda%2Furl-builder)
![](https://github.com/wizpanda/url-builder/workflows/Build%20And%20Test%20Cases/badge.svg)

A simple wrapper for TypeScript to build & parse a URL.
  
## Installation

```shell script
npm i @wizpanda/url-builder
```

## Usage

```typescript
import {URLBuilder} from '@wizpanda/url-builder';

const urlBuilder = new URLBuilder('https://example.com/try?foo=bar&age=20');
urlBuilder.setQueryParam('foo', 'bar-new');
urlBuilder.appendQueryParam('name', 'Jon');

console.log(urlBuilder.toString() === 'https://example.com/try?foo=bar-new&age=20&name=Jon');
console.log(urlBuilder.getQueryParam('foo') === 'bar-new');

urlBuilder.setPath('/save');
urlBuilder.setQueryString('name=Jon&country=India');

console.log(urlBuilder.toString() === 'https://example.com/save?name=Jon&country=India');
```

## Release

```shell script
npm publish --access public
```
