const userModel = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function(req, res, next) {
        userModel.create({ login: req.body.login, email: req.body.email, password: req.body.password }, function (err) {
            if (err)
                next(err);
            else
                res.json({status: "success", message: "User added successfully!!!", data: null});

        });
    },

    authenticate: function(req, res, next) {
        userModel.findOne({ login: req.body.login }, function(err, userInfo) {
            if (err) {
                next(err);
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({status:"success", message: "user found!", data: {user: userInfo, token:token}});
                } else {
                    res.status(401).json({status:"error", message: "Invalid login/password!", data: null});
                }
            }
        });
    },

    // Handle index actions
    index: function (req, res) {
        userModel.find(function (err, users) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            users.forEach(function (user) {
                user.password = null;
            });
            res.json({
                status: "success",
                message: "Users retrieved successfully",
                data: users
            });
        });
    },

    view: function (req, res) {
        userModel.findById(req.params.user_id, function (err, user) {
            if (err)
                res.status(404).send(err);
            res.json({
                message: 'User details',
                data: user
            });
        });
    }
};
