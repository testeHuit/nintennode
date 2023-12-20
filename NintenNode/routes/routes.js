const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');

const HTTP_CREATED = 201;
const HTTP_CONFLICT = 409;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

module.exports = {
    register: async function (req, res) {
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;

        if (!username || !password || !email) {
            return res.status(HTTP_BAD_REQUEST).json({ 'error': 'missing parameters' });
        }

        try {
            const userFound = await models.User.findOne({
                attributes: ['username'],
                where: { username: username }
            });

            if (!userFound) {
                const bcryptedPassword = await bcrypt.hash(password, 5);
                const newUser = await models.User.create({
                    username: username,
                    password: bcryptedPassword,
                    email: email
                });

                // Générer un token JWT après la création réussie de l'utilisateur
                const token = jwt.sign({ userId: newUser.id }, 'votre_clé_secrète');

                return res.status(HTTP_CREATED).json({
                    'userId': newUser.id,
                    'token': token,
                    'username': newUser.username,
                    'email': newUser.email
                });
            } else {
                return res.status(HTTP_CONFLICT).json({ 'error': 'user already exists' });
            }
        } catch (err) {
            console.error(err);
            return res.status(HTTP_INTERNAL_SERVER_ERROR).json({ 'error': 'unable to verify user' });
        }
    }
};
