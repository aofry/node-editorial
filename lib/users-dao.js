var massive = require("massive");

//var dbUser = process.env.POSTGRES_USER;
//var dbPass = process.env.POSTGRES_PASS;
//var dbLocation = process.env.POSTGRES_LOCATION || "localhost:5432";

//var connectionString = "postgres://" + dbUser + ":" + dbPass + "@" + dbLocation + "/editorial";
var connectionString = process.env.POSTGRES_URL || "postgres://postgres:postgres@localhost:5432/editorial";

//TODO https://www.npmjs.com/package/db-migrate
/*
massive.connect({connectionString : connectionString}, function(err,db){
    //db.myTable.find();
    db.run("select * from users where id=$1", [1], function(err,users){
        console.log(users);
        console.log(users[0].username);
    });

    //if id is not given it must be auto increment and then it will be added as new record. if id is provided it is update statment
//   db.users.save({id : 2, username : "sdgfsf", password: "sdgsg"}, function(err,updated){
//     console.log(err);
//     console.log(updated);
//  });
});
*/
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

/*
getUser("adi", function(user){
 console.log("got user: " + JSON.stringify(user));
});

updateUser({username: "myname", password: "theotherpass"}, function(updatedUser) {
 console.log("updated user: " + JSON.stringify(updatedUser));
});

delUser({username: "myname"});
*/

module.exports = {
 get: getUser,
 insert: insertUser,
 update: updateUser,
 del: delUser
};
/*
 CREATE DATABASE editorial
 WITH OWNER = postgres
 ENCODING = 'UTF8'
 TABLESPACE = pg_default
 LC_COLLATE = 'English_United States.1252'
 LC_CTYPE = 'English_United States.1252'
 CONNECTION LIMIT = -1;


 CREATE TABLE users
 (
 username VARCHAR PRIMARY KEY UNIQUE NOT NULL,
 password VARCHAR NOT NULL
 );
 CREATE UNIQUE INDEX unique_username ON users (username);

 INSERT INTO users (username, password) VALUES ('adi', 'pass');
 */

