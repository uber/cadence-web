export default function parseErrorMessageForQueryTypes(
  message: string
): Array<string> {
  const errorMatches =
    message.match(/(KnownQueryTypes|knownTypes)=\[(.*)\]/)?.[2] ?? undefined;

  if (!errorMatches) {
    return [];
  }

  // Test that this works with Java too
  return errorMatches.split(/, | /).filter((q) => q);
}
