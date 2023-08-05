import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import xss from 'xss';

// AFFICHAGE DE LA PAGE D'INSCRIPTION (REGISTER)
export const Register = function (req, res) {
    // Renvoyer le rendu de la page "layout" avec le template "register" et sans erreur (error=null) pour afficher la page d'inscription
    res.render('layout', { template: 'register', error: null });
}

// TRAITEMENT DU FORMULAIRE D'INSCRIPTION (REGISTER)
export const RegisterSubmit = function (req, res) {

    // Récupérer les données saisies par l'utilisateur depuis le corps de la requête
    const { email, name, firstname, password, confirmPassword } = req.body;

    // Expressions régulières pour valider le format des données saisies
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
    const inputRegex = /^[a-zA-Z0-9\s]+$/;

    // Utiliser la bibliothèque xss pour prévenir les attaques XSS en nettoyant les données saisies
    const safeEmail = xss(email);
    const safeName = xss(name);
    const safeFirstname = xss(firstname);
    const safePassword = xss(password);
    const safeConfirmPassword = xss(confirmPassword);

    // Vérifier si l'e-mail est au bon format à l'aide de l'expression régulière
    if (!emailRegex.test(safeEmail)) {
        return res.render('layout', { template: 'register', error: 'L\'e-mail n\'est pas valide' });
    }

    // Vérifier si le prénom a au moins 3 caractères et ne contient pas de caractères spéciaux
    if (safeName.length < 3 || !inputRegex.test(safeName)) {
        return res.render('layout', { template: 'register', error: 'Le prénom doit contenir au moins 3 caractères et ne doit pas contenir de caractères spéciaux' });
    }

    // Vérifier si le nom a au moins 3 caractères et ne contient pas de caractères spéciaux
    if (safeFirstname.length < 3 || !inputRegex.test(safeFirstname)) {
        return res.render('layout', { template: 'register', error: 'Le nom doit contenir au moins 3 caractères et ne doit pas contenir de caractères spéciaux' });
    }

    // Vérifier si le mot de passe a au moins 8 caractères
    if (safePassword.length < 8) {
        return res.render('layout', { template: 'register', error: 'Le mot de passe doit contenir au moins 8 caractères et ne doit pas contenir de caractères spéciaux' });
    }

    // Vérifier si la confirmation du mot de passe correspond au mot de passe saisi et ne contient pas de caractères spéciaux
    if (safeConfirmPassword !== safePassword) {
        return res.render('layout', { template: 'register', error: 'La confirmation du mot de passe ne correspond pas ou contient des caractères spéciaux' });
    }

    // Hacher le mot de passe saisi avant de l'enregistrer dans la base de données
    bcrypt.hash(req.body.password, 10, function (error, hash) {
        if (error) {
            console.log(error);
        } else {
            // Créer un nouvel utilisateur avec un ID unique (UUID)
            const newUser = {
                id: uuidv4(),
                name: req.body.name,
                firstname: req.body.firstname,
                email: req.body.email,
                password: hash,
                role: 'user'
            };

            // Insérer le nouvel utilisateur dans la base de données
            pool.query('INSERT INTO Users SET ?', [newUser], function (error, result) {
                if (error) {
                    console.error(error);
                    res.status(500).send('Erreur de base de données');
                } else {
                    // Si l'inscription est réussie, définir les informations de session de l'utilisateur et rediriger vers la page d'accueil
                    req.session.isUser = true;
                    req.session.connected = true;
                    res.redirect('/');
                }
            });
        }
    });
}
