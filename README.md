# command-line-interface

command-line-interface is a foundation for CLI applications.

## Status

| Category         | Status                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/command-line-interface)](https://www.npmjs.com/package/command-line-interface) |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/command-line-interface)                                          |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/command-line-interface)                                      |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/command-line-interface/workflows/Release/badge.svg?branch=master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/command-line-interface)                                |

## Installation

```shell
$ npm install command-line-interface
```

## Quick Start

First you need to add a reference to command-line-interface to your application.

```javascript
const { runCli, Command } = require('command-line-interface');
```

If you use TypeScript, use the following code instead:

```typescript
import { runCli, Command } from 'command-line-interface';
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
