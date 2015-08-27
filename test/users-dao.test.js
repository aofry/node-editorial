var usersDao = require('../lib/users-dao.js');

describe('users-dao', function () {
    var newUserName = "user" + Math.random();

    beforeEach(function () {

    });

    describe('users dao CRUD', function () {

        it('should check save new user', function (done) {
            usersDao.insert({username: newUserName, password: "otherpass1"}, function (updatedUser) {
                //console.log("inserted user: " + JSON.stringify(updatedUser));
                if (updatedUser == null)
                    throw new Error('could not insert new user');
                done();
            });
        });

        it('should check del new user', function (done) {
            usersDao.del(newUserName, function (updatedUser) {
                //console.log("deleted user: " + JSON.stringify(updatedUser));
                if (updatedUser == null)
                    throw new Error('could not del new user');
                done();
            });
        });

        it('should check update existing user', function (done) {
            usersDao.update({username: "adi", password: "pass"}, function (updatedUser) {
                //console.log("updated user: " + JSON.stringify(updatedUser));
                if (updatedUser == null)
                    throw new Error('could not update user');
                done();
            });
        });

        it('should check get user', function (done) {
            usersDao.get("adi", function (user) {
                //console.log("get user: " + JSON.stringify(user));
                if (user == null)
                    throw new Error('could not get user');
                done();
            });
        });

        it('should check get user that does not exist', function (done) {
            usersDao.get(Math.random(), function (user) {
//                console.log("not found user: " + JSON.stringify(user));
                //console.log("not found user: " + user);
                if (user != undefined)
                    throw new Error('get user that is not in the db, should be undefined');
                done();
            });
        });
    });
});
