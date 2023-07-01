const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const verify = require('../mildleware/verify');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    try {
        // console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        const user = await newUser.save();
        const jwtAuthToken = jwt.sign({ user: user._id }, process.env.SECRET_KEY, { expiresIn: "10d" });
        const { password, ...info } = user._doc;
        // console.log({ info });
        res.status(201).json({ ...info, jwtAuthToken });
    } catch (err) {
        // console.log(err);
        res.status(404).json(err);
    }
});


// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ error: 'Your details are invalid' });
        }
        const comparePass = await bcrypt.compare(req.body.password, user.password);
        if (!comparePass) {
            return res.status(401).json({ error: 'Your details are invalid' });
        }

        const jwtAuthToken = jwt.sign({ user: user._id }, process.env.SECRET_KEY, { expiresIn: "10d" });
        const { password, ...info } = user._doc;

        // console.log({ info });
        res.status(201).json({ jwtAuthToken, ...info });
    } catch (err) {
        // console.log(err);
        res.status(404).json(err);
    }
});


// Update
router.put('/:id', verify, async (req, res) => {
    try {
        if (req.params.id) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);
                req.body.password = hash;
            }
            const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            const { password, ...info } = updateUser._doc;
            // console.log({ info });
            res.status(200).json({ info });
            // console.log(updateUser);
            // res.status(201).json(updateUser);
        }
    } catch (err) {
        // console.log(err);
        res.status(404).json(err);
    }
});



// Delete
router.delete('/:id', verify, async (req, res) => {
    try {
        if (req.params.id) {
            if (req.body.password) {
                const user = await User.findById({ _id: req.params.id });
                if (!user) {
                    return res.status(401).json('Your details are invalid');
                }
                const comparePass = await bcrypt.compare(req.body.password, user.password);
                if (!comparePass) {
                    return res.status(401).json('Your details are invalid');
                }
                await User.findByIdAndDelete(req.params.id);
                // const { password, ...info } = updateUser._doc;
                // console.log({info} );
                // res.status(201).json({info});
                // console.log('Account has been Deleted');
                res.status(202).json('Account has been Deleted');
            }
        }
    } catch (err) {
        // console.log(err);
        res.status(404).json(err);
    }
});


// Get User
router.get('/find/:id', verify, async (req, res) => {
    try {
        if (req.params.id) {
            const user = await User.findById(req.params.id);
            const { password, ...info } = user._doc;
            // console.log({ info });
            res.status(201).json({ info });
        }
    } catch (err) {
        // console.log(err);
        res.status(404).json(err);
    }

});


// Get All User
router.get('/', verify, async (req, res) => {
    const query = req.query.new;
    try {
        const user = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        // const { password, ...info } = user._doc;
        // console.log({ info });
        // res.status(201).json({ info });
        // console.log(user);
        res.status(201).json(user);
    } catch (err) {
        // console.log(err);
        res.status(404).json(err);
    }

});


module.exports = router;