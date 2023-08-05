import pool from "../config/database.js";

// AFFICHAGE DE LA PAGE D'ACCUEIL
export const Home = (req, res) => {

    // Requête SQL pour récupérer les informations des articles avec le nom de l'auteur associé
    let sql = 'SELECT Users.name, Articles.id as auteur_id, Articles.date as date_publi, title, content FROM Articles INNER JOIN Users ON Articles.author_id = Users.id ORDER BY date_publi DESC';

    // Exécuter la requête SQL pour récupérer les articles et les détails de leurs auteurs
    pool.query(sql, function (error, posts) {
        // Renvoyer le rendu de la page "layout" avec les articles récupérés pour l'affichage sur la page d'accueil
        res.render('layout', { template: 'home', posts: posts });
    });
}

// AFFICHAGE DE LA PAGE D'ERREUR 404 (PAGE NON TROUVÉE)
export const NotFound = (req, res) => {

    // Définir le statut de la réponse HTTP comme 404 (non trouvé) et afficher la page d'erreur "not_found"
    res.status(404).render('not_found');
}

// AFFICHAGE DE LA PAGE DES POLITIQUES
export const Policies = (req, res) => {

    // Renvoyer le rendu de la page "layout" avec le template "policies" pour afficher la page des politiques
    res.render('layout', { template: 'policies' });
}
