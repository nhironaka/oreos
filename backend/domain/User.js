import moment from 'moment';

import { USER_STATUS } from '../constants/user';

function User(username, displayName, password, status = USER_STATUS.ACTIVE) {
  this.username = username;
  this.displayName = displayName;
  this.password = password;
  this.status = USER_STATUS[status] || USER_STATUS.ACTIVE;

  function getAddUserSQL() {
    return `\
    INSERT INTO "user" (username, display_name, password, status) \
    VALUES('${this.username}', '${this.displayName}', '${this.password}', \
    '${this.status}') RETURNING *;`;
  }

  this.getAddUserSQL = getAddUserSQL;
}

function findOneSql(fields) {
  return `SELECT * from "user" u WHERE ${Object.entries(fields).map(([key, value]) => `u.${key}='${value}'`).join(' ')} LIMIT 1`;
}

function updateUserByIdSQL(id, user) {
  const sql = ['UPDATE "user" SET'];
  if (user.displayName) {
    sql.push(`display_name=${user.displayName}`);
  }
  if (user.password) {
    sql.push(`password=${user.password}`);
  }
  if (user.status) {
    if (!USER_STATUS[user.status]) {
      throw new Error(`Invalid field for user status. Must be one of  - ${Object.values(USER_STATUS).toLowerCase().join(', ')}`);
    }
    sql.push(`status=${user.status}`);
  }
  if (sql.length < 2) {
    throw new Error(`Unable to update user. Invalid fields - ${Object.values(user).join(', ')}`);
  }
  sql.push(`last_updated='${moment().format('YYYY-MM-DD HH:mm:ss')}' WHERE ID=${id} RETURNING *;`);

  return sql.join(' ');
}

function deleteUserByIdSQL(id) {
  return `DELETE FROM USER WHERE ID = ${id}`;
}

User.USER_STATUS = USER_STATUS;
User.deleteUserByIdSQL = deleteUserByIdSQL;
User.findOneSql = findOneSql;
User.updateUserByIdSQL = updateUserByIdSQL;

export default User;
