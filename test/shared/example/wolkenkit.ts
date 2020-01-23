interface DebugOptions extends Options {
  debug: boolean;
}

const getGlobalOptionDefinitions = (): Record<string, OptionDefinition> => ({
  debug: {
    type: 'boolean',
    description: 'Enables the debug mode.'
  }
});

interface HelpCommandOptions extends Options, DebugOptions {
  verbose: boolean;
}

const getHelp = ({ parentOptionDefinitions }: {
  parentOptionDefinitions: Record<string, OptionDefinition>;
}): Command<HelpCommandOptions> => {
  return {
    name: 'help',
    description: 'Shows the help.',

    OptionDefinitions: {
      ...parentOptionDefinitions,
      verbose: { type: 'boolean', description: '...' }
    },

    handle ({ debug, verbose }): void {
      // ...
    }
  };
};

interface BuildCommandOptions extends Options, DebugOptions {
  mode: 'production' | 'development'
}

const build: Command<BuildCommandOptions> = {
  name: 'build',
  description: 'Builds a wolkenkit application.',

  handle ({ mode, debug }): void {
    // ...
  }
};

const cli = new Cli({
  name: 'wolkenkit',
  commands: {
    help: getHelp({ parentOptionDefinitions: getGlobalOptionDefinitions() }),
    build
  },
  defaultCommand: 'help'
});

cli.run(process.argv.slice(2));
