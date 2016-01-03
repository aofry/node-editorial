var massive = require("massive");

var connectionString = process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/editorial";

var massiveInstance = massive.connectSync({connectionString : connectionString});

var getUser = function(username, res) {
 massiveInstance.users.findOne({username : username}, function(err,user){
  console.log(user);
  //console.log(users[0].username);
  if (err)
   res(err);
  if (res)
   res(user);
 });
};

var insertUser = function(user, res) {
 massiveInstance.users.insert(user, function(err,updated){
  console.log(updated);
  if (err)
   console.log(err);
  if (res)
   res(updated);
 });
};

var updateUser = function(user, res) {
 massiveInstance.users.save(user, function(err,updated){
  console.log(updated);
  if (err) {
   console.log(err);
   res(err);
  }
  if (res)
   res(updated);
 });
};

var delUser = function(usernameToDelete, res) {
 massiveInstance.users.destroy({username: usernameToDelete}, function(err,updated){
  console.log(updated);
  if (err) {
   console.log(err);
   res(err);
  }
  if (res)
   res(updated);
 });
};


module.exports = {
 get: getUser,
 insert: insertUser,
 update: updateUser,
 del: delUser
};
