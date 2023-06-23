import pool from '../config/database.js';
import bcrypt from 'bcrypt';

export const Login = function (req, res) {
    res.render('layout', { template: 'login', error: null });
}

export const LoginSubmit = function (req, res) {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        return res.render('layout', { template: 'login', error: 'Veulliez remplir les champs de saisis' });
    } else {
        pool.query('SELECT * from Users WHERE email = ?', [email], function (error, result) {
            if (error) {
                console.error(error);
            } else {
                if (result.length < 1) {
                    return res.render('layout', { template: 'login', error: 'L\'e-mail n\'est pas valide ou le mot de pass est incorrect' });
                } else {
                    bcrypt.compare(password, result[0].password, function (error, isAllowed) {
                        if (isAllowed) {
                            req.session.userId = result[0].id
                            if (result[0].role === 'admin') {
                                req.session.isAdmin = true;
                                res.redirect('/admin');
                            } else {
                                req.session.isUser = true;
                                res.redirect("/")
                            }
                        }
                        else {
                            return res.render('layout', { template: 'login', error: 'L\'e-mail n\'est pas valide ou le mot de pass est incorrect' });
                        }
                    })
                }
            }
        });
    }
}

export const Logout = function (req, res) {
    req.session.destroy(function (error) {
        if (error) {
            console.error(error);
        }

        // Redirection sur page d'accueil
        res.redirect('/');
    });
};