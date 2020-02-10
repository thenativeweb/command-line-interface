import { OptionDefinition } from './elements/OptionDefinition';

export interface Handlers {
  commandFailed: ({ ex }: {
    ex: Error;
  }) => void;

  commandUnknown: ({ unknownCommandName, recommendedCommandName }: {
    unknownCommandName: string;
    recommendedCommandName: string;
    ancestors: string[];
  }) => void;

  optionInvalid: ({ optionDefinition }: {
    optionDefinition: OptionDefinition;
  }) => void;

  optionMissing: ({ optionDefinition }: {
    optionDefinition: OptionDefinition;
  }) => void;

  optionUnknown: ({ optionName }: {
    optionName: string;
  }) => void;
}
