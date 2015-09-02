require('db-migrate');

exports.up = function(db, callback) {
  db.createTable('users', {
    columns: {
      username: { type: 'string', primaryKey: true, autoIncrement: false, notNull: true },
      password: {  type: 'string', notNull: true}  // shorthand notation
    },
    ifNotExists: true
  }, createUsersIndex);

  function createUsersIndex(err) {
    if (err) { callback(err); return; }
    db.addIndex('users', 'unique_username', ['username'], callback);
  }
};

exports.down = function(db, callback) {
  db.dropTable('users', callback);
  //callback();
};
