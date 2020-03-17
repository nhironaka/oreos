export function getUserSchema(user) {
  const { id, password, ...rest } = user;
  return rest;
}
