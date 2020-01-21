interface Params {}

interface ParamDefinition {
  type: 'boolean' | 'number' | 'string';
  description: string;
}

abstract class Command<TParams> {
  public abstract name: string;

  public abstract description: string;

  public abstract paramDefinitions: Record<string, ParamDefinition>;

  public abstract handle (params: TParams): void | Promise<void>;
}

class Cli {
  public readonly name: string;

  public readonly commands: Record<string, Command<Params>>;

  public readonly defaultCommand: string;

  constructor ({ name, commands, defaultCommand }: {
    name: string;
    commands: Record<string, Command<Params>>;
    defaultCommand: string;
  }) {
    this.name = name;
    this.commands = commands;
    this.defaultCommand = defaultCommand;
  }

  run (args: string[]): void {
    // ...
  }
}
