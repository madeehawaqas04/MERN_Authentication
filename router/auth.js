//const { response } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')

require('../db/conn');
const User = require("../models/userSchema");

// router.use(cookieParser());
//setup express app
const app = express()

// let’s you use the cookieParser in your application
app.use(cookieParser());

router.use(cookieParser());


router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill all fields" })
    }

    try {

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "email address already exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        } else {

            const user = new User({ name, email, phone, work, password, cpassword })

            //pwd hashing'

            await user.save();

            res.status(200).json({ message: "user reqister successfuly" });
        }

    } catch (err) {
        console.log(err);
    }

});

//login code


router.post('/signinUser', async (req, res) => {
    res.cookie(`Cookie token name`, `encrypted cookie string Value`);
    console.log('req.body');
    console.log(req.body);
   // console.log(res.cookie);
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" });
        }

        const userLogin = await User.findOne({ email: email });

        console.log('userLogin');
        console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            console.log('isMatch');
            console.log(isMatch);

            if (isMatch) {
                token = await userLogin.generateAuthToken();
                console.log(token);
                //console.log(userLogin);

                res.cookie(`Cookie token name`, `encrypted cookie string Value`);

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

                return res.status(200).json(userLogin);
            }
            else {
                return res.status(400).json({ error: "Invalid credential" });
            }
        } else {
            return res.status(400).json({ error: "Invalid credential" });
        }

    } catch (err) {
        console.log(err);
    }
});
//aboutus

router.get('/about', authenticate, (req, res) => {
    console.log('Hello about');
    //console.log(req.rootUser);
    res.send(req.rootUser);
    //console.log(req.cookies)
});

//get user data for contactus and home page
router.get('/getdata', authenticate, (req, res) => {
    //console.log('hi get data');
    res.send(req.rootUser);
});

// get userdata

router.get("/getalldata", async (req, res) => {
    try {
        console.log('getalldata');
        const userdata = await User.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
});



router.post("/registeruser", async (req, res) => {
    console.log('register');
    console.log(req.body);
    const { name, email, age, phone, work, address, desc } = req.body;

    if (!name || !email || !age || !phone || !work || !address || !desc) {
        res.status(422).json("plz fill the data");
    }

    try {

        const preuser = await User.findOne({ email: email });
        // console.log("hiiiiiiiiiiiii one");
        // console.log("find one");
        console.log(preuser);

        if (preuser) {
            res.status(422).json("this is user is already present");
        } else {
            const adduser = new User({
                name, email, age, phone, work, address, desc
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})



//get individual user data

router.get('/getuserByID/:id', async (req, res) => {

    try {
        console.log(req.params);
        const { id } = req.params;

        const userindividual = await User.findById({ _id: id });
        console.log('await User.findById({ _id: id })');
        console.log(userindividual);
        res.status(201).json(userindividual);

    }
    catch (err) {
        res.status(422).json(error);
    }

});

//update user data
router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateduser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
});

//delete user

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteuser = await User.findByIdAndDelete({ _id: id });

        console.log(deleteuser);
        res.status(201).json(deleteuser);

    } catch (error) {
        res.status(422).json(error);
    }


});



router.post('/contact', authenticate, async (req, res) => {
    try {

        const { name, email, phone, message } = req.body;
        console.log('contact req.body');
        console.log(req.body);
        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "Please fill the contact form" });
        }

        const userContact = await User.findOne({ _id: req.userID });

        console.log(userContact);
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            return res.status(200).json({ message: "Send message successfully" });
            //return res.status(200).json({ message: "user signin successfully" });

        }

    } catch (error) {
        console.log(error);

    }


});

//logout

router.get('/Logout', (req, res) => {
    console.log('Hello logout');
    //console.log(req.rootUser);
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User logout');
    //console.log(req.cookies)
});


module.exports = router;


