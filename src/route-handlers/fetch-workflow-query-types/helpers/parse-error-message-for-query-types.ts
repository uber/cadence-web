export default function parseErrorMessageForQueryTypes(
  message: string
): Array<string> {
  const errorMatches =
    message.match(/(KnownQueryTypes|knownTypes)=\[(.*)\]/)?.[2] ?? undefined;

  if (!errorMatches) {
    return [];
  }

  return errorMatches.split(/, | /).filter(Boolean);
}
