import { DateResolver, DateTimeResolver, JSONResolver, SafeIntResolver } from 'graphql-scalars';
import type { SharedModule } from './__generated__/types';

// Remove descriptions from resolvers
// `scalar JSON` in `module.graphql.ts` does not have a description
// and it messes up the static analysis
JSONResolver.description = undefined;
DateTimeResolver.description = undefined;
SafeIntResolver.description = undefined;
DateResolver.description = undefined;

export const resolvers: SharedModule.Resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,
  JSON: JSONResolver,
  JSONSchemaObject: JSONResolver,
  SafeInt: SafeIntResolver,
  Query: {
    noop: () => true,
  },
  Mutation: {
    noop: () => true,
  },
};
