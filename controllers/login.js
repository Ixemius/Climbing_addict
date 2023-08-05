import pool from '../config/database.js';
import bcrypt from 'bcrypt';
import xss from 'xss';

// AFFICHAGE DE LA PAGE DE CONNEXION (LOGIN)
export const Login = function (req, res) {
    // Renvoyer le rendu de la page "layout" avec le template "login" et sans erreur (error=null) pour afficher la page de connexion
    res.render('layout', { template: 'login', error: null });
}

// TRAITEMENT DU FORMULAIRE DE CONNEXION (LOGIN)
export const LoginSubmit = function (req, res) {
    // Récupérer l'e-mail et le mot de passe saisis par l'utilisateur depuis le corps de la requête
    const { email, password } = req.body;

    // Expressions régulières pour valider le format de l'e-mail et du mot de passe
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
    const inputRegex = /^[a-zA-Z0-9\s!,?.]+$/;

    // Utiliser la bibliothèque xss pour prévenir les attaques XSS en nettoyant les données saisies
    const safePassword = xss(password);
    const safeEmail = xss(email);

    // Vérifier si l'e-mail ou le mot de passe sont vides
    if (email === '' || password === '') {
        return res.render('layout', { template: 'login', error: 'Veuillez remplir les champs de saisie' });
    }

    // Vérifier si l'e-mail est au bon format à l'aide de l'expression régulière
    if (!emailRegex.test(safeEmail)) {
        return res.render('layout', { template: 'login', error: 'L\'e-mail ou le mot de passe n\'est pas valide' });
    }

    // Vérifier si le mot de passe a au moins 8 caractères et ne contient pas de caractères spéciaux
    if (safePassword.length < 8 || !inputRegex.test(safePassword)) {
        return res.render('layout', { template: 'login', error: 'Le mot de passe doit contenir au moins 8 caractères et ne doit pas contenir de caractères spéciaux' });
    } else {
        // Si les validations sont passées, rechercher l'utilisateur dans la base de données avec l'e-mail fourni
        pool.query('SELECT * from Users WHERE email = ?', [email], function (error, result) {
            if (error) {
                console.error(error);
            } else {
                // Vérifier si l'utilisateur existe dans la base de données
                if (result.length < 1) {
                    return res.render('layout', { template: 'login', error: 'L\'e-mail n\'est pas valide ou le mot de passe est incorrect' });
                } else {
                    // Comparer le mot de passe saisi avec le mot de passe haché stocké dans la base de données
                    bcrypt.compare(password, result[0].password, function (error, isAllowed) {
                        if (isAllowed) {
                            // Si les mots de passe correspondent, définir les informations de session de l'utilisateur
                            req.session.userId = result[0].id
                            if (result[0].role === 'admin') {
                                // Si l'utilisateur est un administrateur, définir isAdmin à true et rediriger vers la page d'administration
                                req.session.isAdmin = true;
                                req.session.connected = true;
                                res.redirect('/admin');
                            } else {
                                // Sinon, définir isUser à true et rediriger vers la page d'accueil
                                req.session.isUser = true;
                                req.session.connected = true;
                                res.redirect("/");
                            }
                        } else {
                            // Si les mots de passe ne correspondent pas, afficher un message d'erreur
                            return res.render('layout', { template: 'login', error: 'L\'e-mail n\'est pas valide ou le mot de passe est incorrect' });
                        }
                    })
                }
            }
        });
    }
}

// DÉCONNEXION DE L'UTILISATEUR
export const Logout = function (req, res) {
    // Détruire la session de l'utilisateur pour le déconnecter
    req.session.destroy(function (error) {
        if (error) {
            console.error(error);
        }

        // Redirection vers la page d'accueil après la déconnexion
        res.redirect('/');
    });
};
