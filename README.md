# command-line-interface

command-line-interface is a foundation for CLI applications.

## Status

| Category         | Status                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/command-line-interface)](https://www.npmjs.com/package/command-line-interface) |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/command-line-interface)                                          |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/command-line-interface)                                      |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/command-line-interface/workflows/Release/badge.svg?branch=main) |
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

Before being able to run a CLI, you must create a command. A command represents a piece of logic callable from the command line. In that sense, a command has a `name`, a `description`, a list of `optionDefinitions`, and a `handle` function. Optionally, you may also specify `remarks` to show in the command's help:

```javascript
const hello = {
  name: 'hello',
  description: 'Say hello on the command line.',
  remarks: `
    If you don't specify a name, 'Jane' will be used as default.
  `,

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

Then you can use the `runCli` function to run your CLI application. For that, hand over the command and provide the command line options, usually taken from `process.argv`:

```javascript
await runCli({ rootCommand: hello, argv: process.argv });
```

Now you can run your CLI application and use it to say hello:

```shell
$ node app.js
Hello Jane!
```

Since you configured a `name` option, you may adjust the name by providing it:

```shell
$ node app.js --name Jenny
Hello Jenny!
```

Since you also configured the `name` option to accept the shorthand `n`, you can also provide it like this:

```shell
$ node app.js -n Jenny
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

*Please note that it is highly recommended to put the interface for a command's options into a file of its own instead of putting it into the same file as the command it belongs to. This makes it easier to extend and re-use interfaces when implementing sub-commands.*

Additionally, provide the correct type for the constant that contains the command:

```typescript
const hello: Command<HelloOptions> = {
  // ...
};
```

Everything else stays the same, but now you will have type support.

### Defining options

As you have already seen, you can define options for commands. An option needs to have at least a `name` and a `type`, with the following types being supported and verified at runtime:

- `boolean`
- `number`
- `string`

Additionally, you may provide a `description` and an `alias`. While the former is used when printing the usage, the latter is used to give a single-character alias for an otherwise lengthy option. You have seen this with the alias `n` for the option `name` in the examples above.

Sometimes it makes sense to allow providing an option more than once. For that, set the `multiple` property in the option definitions to `true`. This lets you provide the appropriate option multiple times on the command line:

```shell
$ node.js app.js --name Jane --name Jenny
```

If an option is mandatory, set the `isRequired` property to `true`. For optional options, it usually makes sense to specify a default value. For that, use the `defaultValue` property and set it to the desired value. This can be seen in the example above as well.

If you want to give a dedicated name to an option's parameter, you can set it using the `parameterName` property. This sometimes makes sense, to e.g. show off that a parameter is not just a `string`, but a `url` or another domain-specific concept.

You can also define whether an option is the default option of a command by setting the `defaultOption` property to `true`. In this case you can skip the option's name, and just provide its value.

*Note that only commands that don't have sub-commands can have a `defaultOption`. This limitation exists, because default options might otherwise conflict with sub-commands.*

Last but not least, you may specify a `validate` function for an option definition. Inside this function you are free to do whatever you need to do to ensure that the option's given value is valid. However, if you throw an exception from within this function, command-line-interface aborts the command's execution, and shows an error message:

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
      defaultValue: 'Jane',
      validate (value) {
        if (value.length > 20) {
          throw new Error('The name must be less than 20 characters.');
        }
      }
    }
  ],

  handle ({ options }) {
    console.log(`Hello ${options.name}!`);
  }
};
```

### Implementing sub-commands

For more complex applications, you might want to set up a variety of commands, and let the user decide which one to run. Typical CLI applications that make use of this concept are `git` and `docker`. The command that you hand over to `runCli` is the so-called *root command*.

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

All the options that are given on the command line to the parent command are handed over to the `handle` function of the sub-command.

*Please note that if you are using TypeScript, make sure to derive the sub-commands options interface from the parent commands' one.*

### Printing the usage

By default, all commands automatically come with a `--help` flag. Additionally, every application automatically gets a dedicated `help` command that you can use to show help for each command.

Sometimes you may want to show the usage manually from within a command. For that, add the parameters `getUsage` and `ancestors` to your `handle` function, run the `getUsage` function and hand over an object with the property `commandPath` containing an array with the path to the name of the current command. You may use the `ancestors` array to get the list of names of the parent commands:

```javascript
const hello = {
  name: 'hello',
  description: 'Say hello on the command line.',

  optionDefinitions: [
    // ...
  ],

  handle ({ options, getUsage, ancestors }) {
    console.log(getUsage(
      { commandPath: [ ...ancestors, 'hello' ] }
    ));
  }
};
```

### Customizing handling errors

By default, command-line-interface takes care of handling any errors that occur. However, sometimes you may want to customize handling errors, e.g. to format them before displaying them. For that, hand over the optional `handlers` parameter to the `runCli` function, and provide functions for the error types you want to customize:

```javascript
await runCli({
  rootCommand: hello,
  argv: process.argv,
  handlers: {
    commandFailed ({ ex }) {
      // ...
    },

    commandUnknown ({ unknownCommandName, recommendedCommandName, ancestors }) {
      // ...
    },

    optionInvalid ({ optionDefinition, reason }) {
      // ...
    },

    optionMissing ({ optionDefinition }) {
      // ...
    },

    optionUnknown ({ optionName }) {
      // ...
    }
  }
});
```

*Please note that if you do not provide all handlers, the remaining ones stick to the default behavior.*

## Running quality assurance

To run quality assurance for this module use [roboter](https://www.npmjs.com/package/roboter):

```shell
$ npx roboter
```
