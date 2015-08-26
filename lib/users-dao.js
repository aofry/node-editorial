var massive = require("massive");

var dbUser = process.env.POSTGRES_USER;
var dbPass = process.env.POSTGRES_PASS;
var dbLocation = process.env.POSTGRES_LOCATION || "localhost:5432";

var connectionString = "postgres://" + dbUser + ":" + dbPass + "@" + dbLocation + "/editorial";

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
 massiveInstance.run("select * from users where username=$1", [username], function(err,users){
  console.log(users);
  console.log(users[0].username);
  res(users[0]);
 });
};


getUser("adi", function(user){
 console.log("got user: " + JSON.stringify(user));
});
/*
 CREATE DATABASE editorial
 WITH OWNER = postgres
 ENCODING = 'UTF8'
 TABLESPACE = pg_default
 LC_COLLATE = 'English_United States.1252'
 LC_CTYPE = 'English_United States.1252'
 CONNECTION LIMIT = -1;

 CREATE TABLE public.users
 (
 id INT PRIMARY KEY NOT NULL,
 username varchar  NOT NULL,
 password varchar  NOT NULL
 role VARCHAR;
 );
 ALTER TABLE public.users
 ADD CONSTRAINT unique_id UNIQUE (id);
 ALTER TABLE public.users
 ADD CONSTRAINT unique_username UNIQUE (username);


 */

