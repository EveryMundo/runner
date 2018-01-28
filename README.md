# @everymundo/runner
Runs a given script only if it is the main one called with node.

This module/package aims to help organizing main node scripts and to help with testing them as well.

## Installation

```sh
npm install @everymundo/runner
```

## Example
Let's say you have a node.js file with a small simple http server
```js
// server.js
const http = require('http');
const logr = require('@everymundo/simple-logr');
const APP_PORT = Math.abs(process.env.APP_PORT) || 8008;

const requestHandler = (req, res) => {
  logr.debug(req.url);
  res.end('Hello Node.js Server!');
};

const server = http.createServer(requestHandler);

server.listen(APP_PORT, (err) => {
  if (err) {
    logr.error('something bad happened', err);
    throw err;
  }

  logr.info(`server runnin on port ${APP_PORT}`);
});
```

It is a regular working code, and you can put it to work by just running:
```sh
node server.js
```

But it is not really easy to test it. As soon as this file is loaded by your test 'test/server.test';

```js
require('../server.test');
```

That will automatically put the server to run, and that is not an ideal effect when you only want to test it.

#### Here comes the runner

By slightly changing the code ...
```js
// server.js
const { run } = require('@everymundo/runner');
const http = require('http');
const logr = require('@everymundo/simple-logr');
const APP_PORT = Math.abs(process.env.APP_PORT) || 8008;

const requestHandler = (req, res) => {
  logr.debug(req.url);
  res.end('Hello Node.js Server!');
};

const server = http.createServer(requestHandler);
const initialize = () => server.listen(APP_PORT, (err) => {
  if (err) {
    logr.error('something bad happened', err);
    throw err;
  }

  logr.info(`server runnin on port ${APP_PORT}`);
});

run(__filename, initialize);
```
... we can guarantee that it will only run its functionality when used by running `node server.js` but not when loading the file via `require('server.js')`;
