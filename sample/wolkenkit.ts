interface DebugParams extends Params {
  debug: boolean;
}

const getGlobalParamDefinitions = (): Record<string, ParamDefinition> => ({
  debug: {
    type: 'boolean',
    description: 'Enables the debug mode.'
  }
});

interface HelpCommandParams extends Params, DebugParams {
  verbose: boolean;
}

const getHelp = ({ parentParamDefinitions }: {
  parentParamDefinitions: Record<string, ParamDefinition>;
}): Command<HelpCommandParams> => {
  return {
    name: 'help',
    description: 'Shows the help.',

    paramDefinitions: {
      ...parentParamDefinitions,
      verbose: { type: 'boolean', description: '...' }
    },

    handle ({ debug, verbose }): void {
      // ...
    }
  };
};

interface BuildCommandParams extends Params, DebugParams {
  mode: 'production' | 'development'
}

const build: Command<BuildCommandParams> = {
  name: 'build',
  description: 'Builds a wolkenkit application.',

  handle ({ mode, debug }): void {
    // ...
  }
};

const cli = new Cli({
  name: 'wolkenkit',
  commands: {
    help: getHelp({ parentParamDefinitions: getGlobalParamDefinitions() }),
    build
  },
  defaultCommand: 'help'
});

cli.run(process.argv.slice(2));
