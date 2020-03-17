import { query } from '../db/index';
import User from '../domain/User';
import { hashPassword } from '../util/auth';

export function updateUserById(userId, data) {
  return query(User.updateUserByIdSQL(userId, data));
}

export async function addUser(data) {
  const { username, password, display_name } = data;
  const hashed = await hashPassword(password);
  const user = new User(username, display_name, hashed);
  const { rows } = await query(user.getAddUserSQL());
  return rows[0];
}

export async function findOne(fields) {
  const { rows } = await query(User.findOneSql(fields));
  return rows[0];
}

export function deleteUserById(userId) {
  return query(User.deleteUserByIdSQL(userId));
}
