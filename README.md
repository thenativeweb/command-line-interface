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

First you need to add a reference to command-line-interface to your application:

```javascript
const { runCli, Command } = require('command-line-interface');
```

If you use TypeScript, use the following code instead:

```typescript
import { runCli, Command } from 'command-line-interface';
```

Before being able to run a CLI, you must create a command. A command represents a piece of logic callable from the command line. In that sense, a command has a `name`, a `description`, a list of `optionDefinitions`, and a `handle` function:

```javascript
const hello = {
  name: 'hello',
  description: 'Say hello on the command line.',

  optionDefinitions: [
    {
      name: 'name',
      description: 'The name to use.',
      type: 'string',
      alias: 'n',
      defaultValue: 'Jane'
    }
  ],

  handle ({ options }) {
    console.log(`Hello ${options.name}!`);
  }
};
```

Then you can use the `runCli` function to run your CLI application. For that, hand over the command and provide the command line parameters, usually taken from `process.argv`:

```javascript
await runCli({ rootCommand: hello, argv: process.argv });
```

Now you can run your CLI application and use it to say hello:

```shell
$ node app.js
Hello Jane!
```

Since you configured a `name` option, you may adjust the name by providing the `--name` or `-n` flag:

```shell
$ node app.js --name Jenny
Hello Jenny!
```

You may also ask for help by using the `--help` flag, which is automatically available:

```shell
$ node.js app.js --help
```

The `handle` function may be synchronous or asynchronous, so you may use `async` depending on your needs. If you throw an error from within that function, the CLI application will end with exit code `1`, and print the exception's message as well as its stack trace to the terminal.

### Writing commands using TypeScript

If you are using TypeScript, you may want to use types for the command and its options. First, define an interface for the command's options, such as:

```typescript
export interface HelloOptions {
  name: string;
}
```

*Please note that it is highly recommended to put the interface for a command's options into a file of its own instead of putting it into the same file as the command it belongs to. This make it easier to extend and re-use interfaces when implementing sub-commands.*

Additionally, provide the correct type for the variable that contains the command:

```typescript
const hello: Command<HelloOptions> = {
  // ...
};
```

Everything else stays the same, but now you will have type support.

### Defining options

As you have already seen, you can define options for commands. An option needs to have at least a `name` and a `type`, with the following types being supported:

- `boolean`
- `number`
- `string`

Additionally, you may provide a `description` and an `alias`. While the former is used when printing the usage, the latter is used to give a single-character alias for an otherwise lengthy option. You have seen this with the alias `n` for the option `name` in the examples above.

Sometimes it make sense to allow providing an option more than once. For that, add the `multiple` option to the option definitions, and set it to `on`. This lets you provide the appropriate option value multiple times on the command line:

```shell
$ node.js app.js --name Jane,Jenny
```

If instead you want to provide multiple values, but with an individual flag each, set it to `lazy`:

```shell
$ node.js app.js --name Jane --name Jenny
```

Some options can make use of a default value. For that, use the `defaultValue` property and set it to the desired value. This can be seen in the example above as well.

If you want to give a dedicated name to the value, you can set it using the `parameterName` property. This sometimes makes sense, to e.g. show off that a parameter is not just a `string`, but a `url` or another domain-specific concept.

Last but not least, you can define whether an option is the default option of a command by setting the `defaultOption` property to `true`. In this case you can skip the option's flag, and just provide its value.

### Implementing sub-commands

For more complex applications, you might want to setup a variety of commands, and let the user decide which one to run. Typical CLI applications that make use of this concept are `git` and `docker`. The command that you hand over to `runCli` is the so-called *root command*.

To define additional commands, you need to define them as sub-commands. Actually, you can also define sub-command on sub-commands, and nest them arbitrarily deep (although this doesn't make too much sense). To define a sub-command, first define a command as already known, and then add them using the `subcommands` property of an already defined command:

```javascript
const hello = {
  name: 'hello',
  description: 'Say hello on the command line.',

  optionDefinitions: [
    {
      name: 'name',
      description: 'The name to use.',
      type: 'string',
      alias: 'n',
      defaultValue: 'Jane'
    }
  ],

  handle ({ options }) {
    console.log(`Hello ${options.name}!`);
  },

  subcommands: {
    anotherCommand,
    anotherOtherCommand
  }
};
```

All the flags that are given on the command line to the parent command are handed over to the `handle` function of the sub-command.

*Please note that if you are using TypeScript, make sure to derive the sub-commands options interface from the parent commands' one.*

### Printing the usage

By default, all commands automatically come with a `--help` flag. Additionally, every application automatically gets a dedicated `help` command that you can use to show help for each command.

Sometimes you may want to show the usage manually from within a command. For that, add the parameters `showUsage` and `ancestors` to your `handle` function, run the `showUsage` function and hand over an array containing the path to the name of the current command. You may use the `ancestors` array to get the list of names of the parent commands:

```javascript
const hello = {
  name: 'hello',
  description: 'Say hello on the command line.',

  optionDefinitions: [
    // ...
  ],

  handle ({ options, showUsage, ancestors }) {
    console.log(showUsage([ ...ancestors, 'hello' ]));
  }
};
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```
