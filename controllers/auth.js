const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const keys = require('../config/keys');

module.exports.register = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        res.status(409).json({
            message: 'This email already used'
        });

        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;

    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt)
    });

    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }

};

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});

    if (!candidate) {
        res.status(404).json({
            message: 'This user does not exist'
        });

        return;
    }

    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);

    if (!passwordResult) {
        res.status(401).json({
            message: 'Wrong password'
        });

        return;
    }

    const token = jwt.sign({
            userId: candidate._id,
            email: candidate.email,
        },
        keys.jwt,
        {
            expiresIn: 3600 // 1 hour
        });

    res.status(200).json({
        token: `Bearer ${token}`
    });
};

