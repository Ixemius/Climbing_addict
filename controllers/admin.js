import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';
import xss from 'xss';
import path from 'path';


// AFFICHAGE DES ARTICLES POSTER PAR LES UTILISATEURS / ADMIN
export const Admin = (req, res) => {
    let sql1 = 'SELECT id , date, title, content FROM Articles ORDER BY date DESC';

    pool.query(sql1, function (error, postsArticle, fields) {
        let sql2 = 'SELECT Products.id, Products.name, description, price, stock_quantity, img_path, date_added, ProductsCategories.name as categories FROM Products INNER JOIN ProductsCategories ON Products.categories_id = ProductsCategories.id ORDER BY date_added DESC';

        pool.query(sql2, function (error, postsProduit, fields) {
            res.render('layout', { template: 'admin', postsProduit: postsProduit, postsArticle: postsArticle });

        });
    });


}

// AJOUTER UN ARTICLES EN TANT QUE UTILISATEURS OU ADMIN
export const AddPost = (req, res) => {

    // récupération des catégories depuis la bdd
    pool.query('SELECT * FROM ArticlesCategories', function (error, categories, fields) {

        // appel du template layout avec add_post où on fait passer les infos auteurs et catégories
        res.render('layout', { template: 'add_post', categories: categories, error: null });
    });
}

// ENVOIE DE LA REQUETE A LA BASE DE DONNEE LORS DU CLIQUE SUBMIT POUR AJOUTER UN ARTICLES 
export const AddPostSubmit = (req, res) => {

    let id = req.session.userId;
    pool.query('SELECT * FROM ArticlesCategories', function (error, categories, fields) {

        const { title, content, categorie } = req.body;

        const safeTitle = xss(title);
        const safeContent = xss(content);
        const inputRegex = /^[a-zA-Z0-9\s!?.,]+$/;
        //verification des inputs
        if (!inputRegex.test(safeTitle)) {
            return res.render('layout', { template: 'add_post', categories: categories, error: 'Le titre n\'est pas valide' });
        }
        if (!inputRegex.test(safeContent)) {
            return res.render('layout', { template: 'add_post', categories: categories, error: 'Le contenus de l\'articles n\'est pas valide' });
        }
        pool.query('INSERT INTO Articles (id, title, content, categorie_id, author_id,date) VALUES (?, ?, ?, ?, ?,NOW())', [uuidv4(), safeTitle, safeContent, categorie, id], function (error, result, fields) {
            console.log(error)
            // une fois le post créé en BDD on redirige vers la page / (home)
            res.redirect('/');
        });

    });
}



// EDITER UN ARTICLES VIA L'INTERFACE ADMIN
export const EditPost = (req, res) => {
    let id = req.params.id;
    // on récupère déjà l'ancien article 
    let sql = 'SELECT * FROM Articles WHERE id = ?';

    pool.query(sql, [id], function (error, editPost, fields) {

        // appel du template pour édition de post
        res.render('layout', { template: 'edit_post', editPost: editPost[0] });
    });
}
// ENVOIE DE LA REQUETE A LA BASE DE DONNEE LORS DE LA VALIDATION DE L'EDITION DE L'ARTICLES VIA L'INTERFACE ADMIN
export const EditPostSubmit = (req, res) => {

    let id = req.params.id;

    // requete de modification d'un post
    let sql = 'UPDATE Articles SET title = ?, content = ? WHERE id = ?';

    pool.query(sql, [req.body.title, req.body.content, id], function (error, result, fields) {

        res.redirect('/admin');
    });
}

// SUPPRESSION D'UN ARTICLE VIA L'INTERFACE ADMIN
export const DeletePost = (req, res) => {

    //on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
    let id = req.params.id;
    console.log(id)

    // requete de suppresion en BDD
    let sql = 'DELETE FROM Articles WHERE id = ?';

    pool.query(sql, [id], function (error, result, fields) {
        if (error) {
            console.log(error)
            res.status(500).send({
                error: 'Error when delete post'
            });
        } else {
            res.status(204).send();
        }
    });
}

// AJOUT D'UN PRODUIT DANS LA BOUTIQUE VIA L'INTERFACE ADMIN
export const AddProduct = (req, res) => {

    // récupération des catégories depuis la bdd
    pool.query('SELECT * FROM ProductsCategories', function (error, categories, fields) {

        // appel du template layout avec add_post où on fait passer les infos auteurs et catégories
        res.render('layout', { template: 'add_product', categories: categories, error: null });
    });
}

// ENVOIE DE LA REQUETE A LA BASE DE DONNEE LORS DE LA VALIDATION DE L'AJOUT DU PRODUIT VIA L'INTERFACE ADMIN
export const AddProductSubmit = (req, res) => {

    pool.query('SELECT * FROM ProductsCategories', function (error, categories, fields) {

        //taille maximal autorisé pour les fichiers envoyé
        const SIZE_MAX = 5 * 1024 * 1024
        //allowed file extension
        const authorizedExtention = ["jpg", "jpeg", "png"]
        const form = new formidable.IncomingForm();

        // error handling and send file
        form.parse(req, (err, fields, files) => {
            console.log(fields)

            if (err) {
                console.error(err);
                return res.status(500).send('Une erreur est survenue lors de l\'upload de l\'image.');
            }
            if (files.img.size > SIZE_MAX) {
                return res.status(500).send("Votre image est trop lourde")
            }

            const safeTitle = xss(fields.name);
            const safeDescription = xss(fields.description);
            const safePrice = xss(fields.price);
            const safeStock_quantity = xss(fields.stock_quantity);

            const inputRegex = /^[a-zA-Z0-9\s]+$/;
            const numberRegex = /^[0-9]+$/;
            //verification des inputs
            if (!inputRegex.test(safeTitle)) {
                return res.render('layout', { template: 'add_product', categories: categories, error: 'Le nom du produit n\'est pas valide' });
            }
            if (!inputRegex.test(safeDescription)) {
                return res.render('layout', { template: 'add_product', categories: categories, error: 'Le description du produit n\'est pas valide' });
            }
            if (!numberRegex.test(safePrice)) {
                return res.render('layout', { template: 'add_product', categories: categories, error: 'Le prix n\'est pas valide' });
            }
            if (!numberRegex.test(safeStock_quantity)) {
                return res.render('layout', { template: 'add_product', categories: categories, error: 'La quantité n\'est pas valide' });
            }

            // chemin du fichier
            const path = files.img.filepath
            //recuperation de l'extension
            const extension = files.img.originalFilename.split(".").pop()
            //dossier final
            const newPath = "public/img/img_boutique/" + files.img.newFilename + "." + extension;

            // verification des extension de fichiers autorisé
            if (!authorizedExtention.includes(extension)) {
                return res.status(500).send("Le fichier n'a pas la bonne extention")
            }

            fs.copyFile(path, newPath, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            // evoie des information a la base de donnée

            // nouveaux chemin pour l'image stocké dans la base de donnée
            const imgPath = "img/img_boutique/" + files.img.newFilename + "." + extension;
            pool.query('INSERT INTO Products (id, name, description, price, stock_quantity, categories_id, img_path, date_added ) VALUES ( ?, ?, ?, ?, ?, ?, ?, NOW())',
                [uuidv4(), safeTitle, safeDescription, safePrice, safeStock_quantity, fields.categories, imgPath], function (error, result, fields) {
                    console.log(error)
                    // redirection vers la page admin apres l'ajout du produit
                    res.redirect('/admin');
                });
        });
    });
}

export const DeleteProduct = (req, res) => {

    //on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
    let id = req.params.id;
    console.log(id)

    // requete de suppresion en BDD
    let sql = 'DELETE FROM Products WHERE id = ?';

    pool.query(sql, [id], function (error, result, fields) {
        if (error) {
            console.log(error)
            res.status(500).send({
                error: 'Error when delete product'
            });
        } else {

            res.status(204).send();
        }
    });
};

export const EditProduct = (req, res) => {


    let id = req.params.id;
    //requetes de recuperations des informations dans la base de donnée
    let sql1 = 'SELECT  id, name, description, price, stock_quantity FROM Products WHERE id = ?';
    pool.query(sql1, [id], function (error, editProduct, fields) {

        let sql2 = "SELECT * FROM ProductsCategories";

        pool.query(sql2, [id], function (error, editProductCate, fields) {
            res.render('layout', { template: 'edit_product', editProduct: editProduct[0], editProductCate: editProductCate });
        });
    });
}

export const EditProductSubmit = (req, res) => {

    let id = req.params.id;

    // requete de modification d'un post
    let sql = 'UPDATE Products SET name = ?, description = ?, price = ?, stock_quantity = ?, categories_id = ? WHERE id = ?';

    pool.query(sql, [req.body.name, req.body.description, req.body.price, req.body.stock_quantity, req.body.categories_name, id], function (error, result, fields) {

        res.redirect('/admin');
    });
}

