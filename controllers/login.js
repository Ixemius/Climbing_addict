import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import xss from 'xss';

export const Login = function (req, res) {
    res.render('layout', { template: 'login', error: null });
}

export const LoginSubmit = function (req, res) {
    const { email, password } = req.body;

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
    const inputRegex = /^[a-zA-Z0-9\s!,?.]+$/;

    const safePassword = xss(password);
    const safeEmail = xss(email);

    if (email === '' || password === '') {
        return res.render('layout', { template: 'login', error: 'Veulliez remplir les champs de saisis' });
    }
    if (!emailRegex.test(safeEmail)) {
        return res.render('layout', { template: 'login', error: 'L\'e-mail ou le mot de passe n\'est pas valide' });
    }
    if (safePassword.length < 8 || !inputRegex.test(safePassword)) {
        return res.render('layout', { template: 'login', error: 'Le mot de passe doit contenir au moins 8 caractères et ne doit pas contenir de caractères spéciaux' });
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
                                req.session.connected = true;
                                res.redirect('/admin');
                            } else {
                                req.session.isUser = true;
                                req.session.connected = true;
                                res.redirect("/");
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