var express = require('express');
var router = express.Router();
const storage = require('node-persist');


router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});


router.get('/users', function (req, res) {
    getAllUsers().then(users => {
        res.send(users);
    })
});

async function getAllUsers() {
    let res = await storage.getItem('users');
    if (typeof res === 'undefined') {
        return [];
    }
    return res;
}


async function addUsers(name, surname, idNum, email) {
    let allUsers = await getAllUsers();
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].idNum == idNum || allUsers[i].email == email) {
            return false;
        }
    }
    await allUsers.push({
        name: name,
        surname: surname,
        idNum: idNum,
        email: email
    });

    await storage.setItem('users', allUsers);
    return true;
}

router.post('/registerUser', function (req, res) {
    try {
        storage.clear();
        let results = addUsers(req.body.name, req.body.surname, req.body.idNum, req.body.email);
        results.then(resp => {
            console.log(resp)
            if (!resp) {
                res.send({ status: false, message: "User Already exists" });
                return;
            }else{
                 res.send({ status: true, message: "Your registration was successful" });
            }
        })
    } catch (error) {
        res.send({ status: false, message: "Error in registering you profile" });
    }

});


module.exports = router;