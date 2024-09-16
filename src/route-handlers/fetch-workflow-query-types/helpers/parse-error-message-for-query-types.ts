export default function parseErrorMessageForQueryTypes(
  message: string
): Array<string> | undefined {
  const knownTypesErrorMatch = message.match(
    /(KnownQueryTypes|knownTypes)=\[(.*)?\]/
  );

  if (!knownTypesErrorMatch) {
    return undefined;
  }

<<<<<<< HEAD
  const queryTypes = knownTypesErrorMatch[2];

  return queryTypes ? queryTypes.split(/, | /).filter(Boolean) : [];
=======
  return errorMatches.split(/, | /).filter(Boolean);
>>>>>>> fa52add (Add more changes)
}
