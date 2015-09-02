var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.insert('users', ['username', 'password'], ['adi', 'pass'], callback);
  //callback();
};

exports.down = function(db, callback) {
  db.runSql("delete FROM users WHERE username=?", ['adi'], callback);
  //callback();
};
