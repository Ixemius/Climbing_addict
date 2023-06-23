import pool from "../config/database.js";
import fs from "fs"
import formidable from "formidable"
import { v4 as uuidv4 } from 'uuid';

// AFFICHAGE DES ARTICLES POSTER PAR LES UTILISATEURS / ADMIN
export const Admin = (req, res) => {
    let sql1 = 'SELECT id , date, title, content FROM Articles ORDER BY date DESC';

    pool.query(sql1, function (error, postsArticle, fields) {
        // console.log(error, posts, fields);
        let sql2 = 'SELECT Products.id, Products.name, description, price, stock_quantity, img_path, date_added, ProductsCategories.name as categories FROM Products INNER JOIN ProductsCategories ON Products.categories_id = ProductsCategories.id ORDER BY date_added DESC';

        pool.query(sql2, function (error, postsProduit, fields) {
            // console.log(error, posts, fields);
            res.render('layout', { template: 'admin', postsProduit: postsProduit, postsArticle: postsArticle });

        });
    });


}

// AJOUTER UN ARTICLES EN TANT QUE UTILISATEURS OU ADMIN
export const AddPost = (req, res) => {

    // récupération des catégories depuis la bdd
    pool.query('SELECT * FROM ArticlesCategories', function (error, categories, fields) {

        // appel du template layout avec add_post où on fait passer les infos auteurs et catégories
        res.render('layout', { template: 'add_post', categories: categories });
    });
}

// ENVOIE DE LA REQUETE A LA BASE DE DONNEE LORS DU CLIQUE SUBMIT POUR AJOUTER UN ARTICLES 
export const AddPostSubmit = (req, res) => {
    let id = req.session.userId;
    const { title, content, categories } = req.body;
    console.log(req.body)
    console.log(id)


    pool.query('INSERT INTO Articles (id, title, content, categorie_id, author_id,date) VALUES (?, ?, ?, ?, ?,NOW())', [uuidv4(), title, content, categories, id], function (error, result, fields) {
        console.log(error)
        // une fois le post créé en BDD on redirige vers la page / (home)
        res.redirect('/');
    });
};

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
        res.render('layout', { template: 'add_product', categories: categories });
    });
}

// ENVOIE DE LA REQUETE A LA BASE DE DONNEE LORS DE LA VALIDATION DE L'AJOUT DU PRODUIT VIA L'INTERFACE ADMIN
export const AddProductSubmit = (req, res) => {

    //max size of the file uploaded
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

        // the file path in the tmp
        const path = files.img.filepath
        //get file extension
        const extension = files.img.originalFilename.split(".").pop()
        // final folder
        const newPath = "public/img/img_boutique/" + files.img.newFilename + "." + extension;


        // option 1
        if (!authorizedExtention.includes(extension)) {
            return res.status(500).send("Le fichier n'a pas la bonne extention")
        }

        fs.copyFile(path, newPath, (err) => {
            if (err) {
                console.log(err)
            }
        })
        // send information to the database

        // new path for the images stored in te BDD
        const imgPath = "img/img_boutique/" + files.img.newFilename + "." + extension;
        pool.query('INSERT INTO Products (id, name, description, price, stock_quantity, categories_id, img_path, date_added ) VALUES ( ?, ?, ?, ?, ?, ?, ?, NOW())',
            [uuidv4(), fields.name, fields.description, fields.price, fields.stock_quantity, fields.categories, imgPath], function (error, result, fields) {
                console.log(error)
                // once the post is created in BDD, we redirect to the page/ (shop)
                res.redirect('/shop');
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
}

export const EditProduct = (req, res) => {


    let id = req.params.id;

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

