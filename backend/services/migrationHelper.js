export function constantToEnumValues(constants) {
  return Object.values(constants).map(status => `'${status.toUpperCase()}'`).join(', ');
}
