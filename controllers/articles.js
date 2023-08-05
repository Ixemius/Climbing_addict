import pool from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

// AFFICHAGE D4UN ARTICLE EN DETAIL SUR UNE AUTRE PAGE
export const Details = (req, res) => {

	let id = req.params.id;

	let sql = 'SELECT id, title, content, date FROM Articles WHERE id = ?';
	let sql2 = 'SELECT * FROM ArticlesComments WHERE article_id = ?';

	pool.query(sql, [id], function (error, post, fields) {
		console.log(post)

		pool.query(sql2, [id], function (error, comments, fields) {

			res.render('layout', { template: 'articles', post: post[0], comments: comments });
		});
	});
}

// AJOUT D'UN COMMENTAIRE SUR LA PAGE DETAILS DES ARTICLES PAR LES UNTILISATEUR ET ADMIN
export const AddComment = (req, res) => {

	const { name, content } = req.body;

	let id = req.params.id;
	let userId = req.session.userId
	const inputRegex = /^[a-zA-Z0-9\s!:,?.]+$/;

	if (!inputRegex.test(name) || !inputRegex.test(content)) {
		return res.render('layout', { template: 'articles', error: 'le nom ou le contenue de votre commentaire ne doit pas contenir de caractéres spéciaux' });
	}

	let sql = 'INSERT INTO ArticlesComments (id, name, content, article_id, author_id, date) VALUES (?, ?, ?, ?, ?, NOW())';
	pool.query(sql, [uuidv4(), req.body.name, req.body.content, id, userId], function (error, result, fields) {
		console.log(error);
		console.log(result)
		res.redirect('/article/' + id);
	});
}

