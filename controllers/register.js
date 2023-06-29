import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import xss from 'xss';

export const Register = function (req, res) {
    res.render('layout', { template: 'register', error : null });
}

export const RegisterSubmit = function (req, res) {

    const {email, name,firstname, password, confirmPassword} = req.body;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
    const inputRegex = /^[a-zA-Z0-9\s]+$/;

    // protection contre les failles XSS (cross-site scripting)
    const safeEmail = xss(email);
    const safeName = xss(name);
    const safeFirstname = xss(firstname);
    const safePassword = xss(password);
    const safeConfirmPassword = xss(confirmPassword);

    if (!emailRegex.test(safeEmail)) {
        return res.render('layout', {template : 'register', error:'L\'e-mail n\'est pas valide'});
    }
    if (safeName.length < 3 || !inputRegex.test(safeName)) {
        return res.render('layout', {template : 'register', error:'Le prénom doit contenir au moins 3 caractères et ne doit pas contenir de caractères spéciaux'});
    }
    if (safeFirstname.length < 3 || !inputRegex.test(safeFirstname)) {
        return res.render('layout', {template : 'register', error:'Le nom doit contenir au moins 3 caractères et ne doit pas contenir de caractères spéciaux'});
    }
    if (safePassword.length < 8) {
        return res.render('layout', {template : 'register', error:'Le mot de passe doit contenir au moins 8 caractères et ne doit pas contenir de caractères spéciaux'});
    }
    if (safeConfirmPassword !== safePassword ) {
        return res.render('layout', {template : 'register', error:'La confirmation du mot de passe ne correspond pas ou contient des caractères spéciaux'});
    }
    
    bcrypt.hash(req.body.password, 10, function (error, hash) {
        if (error) {
            console.log(error);
        } else {
            const newUser = {
                id: uuidv4(),
                name : req.body.name,
                firstname : req.body.firstname,
                email: req.body.email,
                password: hash,
                role: 'user'
            };



            pool.query('INSERT INTO Users SET ?', [newUser], function (error, result) {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur de base de données');
                } else {
                    req.session.isUser = true;
                    req.session.connected = true;
                    res.redirect('/');
                }
            });
        }
    });
}