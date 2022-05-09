const router = require('express').Router();
const User = require('../models/user');
const FBack = require('../models/fback');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');


router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({
                success: false,
                message: "Hash Issue"
            })
        } else {
            //adding signup data into collection(User)
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash //req.body.password
            });
            // adding data to the collection(User)
            user.save()
                .then(() => {
                    res.json({ success: true, message: "User added successfully" })
                })
                .catch((err) => {
                    if (err.code === 11000)
                        return res.json({ success: false, message: "Email Already Exists" })
                    res.json({ success: false, message: "Authentication Add Failed" })
                })

        }

    })
})



router.post('/login', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then((result) => {
            if (result.length < 1) {
                return res.json({ success: false, message: "User not found " });
            }
            const user = result[0]; // 1st document(row)

            bcrypt.compare(req.body.password, user.password, (err, ret) => {
                if (ret) {
                    const payload = {
                        userId: user._id
                    }
                    const token = jwt.sign(payload, "webBatch");
                    return res.json({ success: true, token: token, message: "Login Success!" });
                } else {
                    return res.json({ success: false, message: "Check ur password" });
                }
            })
        })
        .catch((err) => {
            res.json({ success: false, message: "Authentication Failed" });
        })
})


router.get('/profile', checkAuth, (req, res) => {
    const userId = req.userData.userId;
    User.findById(userId)
        .exec()
        .then((result) => {
            res.json({ success: true, data: result });
        })
        .catch((err) => {
            res.json({ success: false, message: "Server Failed" })
        })
})

router.post('/fbsave', (req, res) => {

    const fback = new FBack({
        username: req.body.username,
        email: req.body.email,
        department: req.body.department,
        year: req.body.year,
        fbdata: req.body.fbdata
    });
    // adding data to the collection(User)
    fback.save()
        .then(() => {
            res.json({ success: true, message: "Feedback added successfully" })
        })
        .catch((err) => {
            if (err.code === 11000)
                return res.json({ success: false, message: "Already feedback registered" })
            res.json({ success: false, message: "Authentication Denied" })
        })

})

router.post('/fbcheck', (req, res) => {
    FBack.find({ email: req.body.email })
        .exec()
        .then((result) => {
            if (result.length < 1) {
                return res.json({ success: true, message: "Please Enter Feedback" });
            } else {
                return res.json({ success: false, message: "User-Feedback Alraedy Registered", data: result });
            }
        })
        .catch((err) => {
            res.json({ success: false, message: "Server Failed" });
        })
})


module.exports = router;