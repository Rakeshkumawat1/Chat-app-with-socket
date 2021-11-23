const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signin = () => {
    return function (req, res) {
        User.findOne({ email: req.body.email })
            .exec(async (error, user) => {
                if (error) return res.status(400).json({ error });
                if (user) {
                    const pwdMatch = await bcrypt.compare(req.body.password, user.hash_password)
                    if (pwdMatch == true && user.role === 'admin') {
                        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
                        const { _id, firstName, lastName, email, role, fullName } = user;
                        res.cookie('token', token, { expiresIn: '7d' });
                        res.status(200).json({
                            token,
                            user: {
                                _id, firstName, lastName, email, role, fullName
                            }
                        });
                    } else {
                        return res.status(400).json({
                            error: 'Invalid password!'
                        });
                    }
                } else {
                    return res.status(400).json({ error: 'Internel server error!' });
                }
            })

    }


};

exports.signup = () => {
    return function (req, res) {
        User.findOne({ email: req.body.email })
            .exec(async (error, user) => {
                if (user) return res.status(400).json({
                    error: 'Admin already registered'
                });

                const {
                    firstName,
                    lastName,
                    email,
                    password
                } = req.body;

                const hash_password = await bcrypt.hash(password, 10)
                const _user = new User({
                    firstName,
                    lastName,
                    email,
                    hash_password,
                    username: Math.random().toString(),
                    role: 'admin'
                });

                _user.save().then(data => {
                    if (data) {
                        return res.status(201).json({
                            message: 'Admin created successfully'
                        });
                    } else {
                        return res.status(400).json({ error: 'Internel server error!' });
                    }
                }).catch(err => res.json(err));

            });
    }
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully...!'
    });
}

