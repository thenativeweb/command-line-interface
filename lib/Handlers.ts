import { OptionDefinition } from './elements/OptionDefinition';

export interface Handlers {
  commandFailed: ({ ex }: {
    ex: unknown;
  }) => void;

  commandUnknown: ({ unknownCommandName, recommendedCommandName }: {
    unknownCommandName: string;
    recommendedCommandName: string;
    ancestors: string[];
  }) => void;

  optionInvalid: ({ optionDefinition, reason }: {
    optionDefinition: OptionDefinition;
    reason: string;
  }) => void;

  optionMissing: ({ optionDefinition }: {
    optionDefinition: OptionDefinition;
  }) => void;

  optionUnknown: ({ optionName }: {
    optionName: string;
  }) => void;
}
