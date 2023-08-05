import pool from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

// AFFICHAGE D'UN ARTICLE EN DÉTAIL SUR UNE AUTRE PAGE
export const Details = (req, res) => {

	// Récupérer l'ID de l'article depuis les paramètres de la requête
	let id = req.params.id;

	// Requête SQL pour récupérer les détails de l'article avec l'ID correspondant
	let sql = 'SELECT id, title, content, date FROM Articles WHERE id = ?';

	// Requête SQL pour récupérer les commentaires de l'article avec l'ID correspondant
	let sql2 = 'SELECT * FROM ArticlesComments WHERE article_id = ?';

	// Exécuter la première requête pour récupérer les détails de l'article
	pool.query(sql, [id], function (error, post, fields) {
		console.log(post)

		// Exécuter la deuxième requête pour récupérer les commentaires de l'article
		pool.query(sql2, [id], function (error, comments, fields) {

			// Renvoyer le rendu de la page "layout" avec les détails de l'article et ses commentaires
			res.render('layout', { template: 'articles', post: post[0], comments: comments });
		});
	});
}

// AJOUT D'UN COMMENTAIRE SUR LA PAGE DÉTAILS DES ARTICLES PAR LES UTILISATEURS ET ADMINISTRATEURS
export const AddComment = (req, res) => {

	// Récupérer le nom et le contenu du commentaire depuis le corps de la requête
	const { name, content } = req.body;

	// Récupérer l'ID de l'article depuis les paramètres de la requête
	let id = req.params.id;

	// Récupérer l'ID de l'utilisateur connecté depuis la session
	let userId = req.session.userId

	// Expression régulière pour vérifier que le nom et le contenu du commentaire ne contiennent pas de caractères spéciaux
	const inputRegex = /^[a-zA-Z0-9\s!:,?.]+$/;

	// Vérifier si le nom et le contenu du commentaire respectent l'expression régulière
	if (!inputRegex.test(name) || !inputRegex.test(content)) {
		// Rediriger vers la page "articles"
		return res.redirect('/article/' + id);
	}

	// Requête SQL pour insérer le nouveau commentaire dans la table ArticlesComments
	let sql = 'INSERT INTO ArticlesComments (id, name, content, article_id, author_id, date) VALUES (?, ?, ?, ?, ?, NOW())';

	// Exécuter la requête SQL pour ajouter le commentaire dans la base de données
	pool.query(sql, [uuidv4(), req.body.name, req.body.content, id, userId], function (error, result, fields) {
		console.log(error);
		console.log(result)

		// Rediriger l'utilisateur vers la page de détails de l'article après avoir ajouté le commentaire
		res.render('layout', { template: 'article', errorMessage: req.session.errorMessage });
	});
}