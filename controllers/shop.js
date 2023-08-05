import pool from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';
import pkg from 'lodash';

// AFFICHAGE DE LA PAGE DU MAGASIN (SHOP)
export const Shop = (req, res) => {
    // Requête SQL pour récupérer les informations de tous les produits dans la table "Products"
    let sql = 'SELECT id, name, description, price, img_path FROM Products';
    pool.query(sql, function (error, products, fields) {
        // Renvoyer le rendu de la page "layout" avec le template "shop" et les produits récupérés pour l'affichage sur la page du magasin
        res.render('layout', { template: 'shop', products: products });
    });
}

// AJOUT D'UN PRODUIT AU PANIER (SOUMISSION DU FORMULAIRE D'AJOUT AU PANIER)
export const AddBucketSubmit = (req, res) => {
    // Récupérer l'ID du produit depuis les paramètres de la requête
    let id = req.params.id;
    // Récupérer l'ID de l'utilisateur connecté depuis la session
    let userId = req.session.userId;
    // Requête SQL pour récupérer les informations du produit à ajouter au panier
    let sql1 = 'SELECT * from Products WHERE id = ?';
    pool.query(sql1, [id], function (error, products, fields) {
        // Récupérer la quantité saisie par l'utilisateur pour le produit
        let quantity = parseInt(req.body.quantity);
        // Récupérer le nom du produit et le chemin de l'image
        let productName = products[0].name;
        let amount = products[0].price * quantity;
        let imgPath = products[0].img_path;

        // Créer un nouvel objet "newOrders" qui représente une nouvelle commande dans la table "Orders"
        let newOrders = {
            id: uuidv4(),
            amount: amount,
            user_id: userId,
            product_id: id,
            img_path: imgPath,
            quantity: quantity,
            product_name: productName
        }

        // Requête SQL pour insérer la nouvelle commande dans la table "Orders"
        let sql2 = 'INSERT INTO Orders SET ?'
        pool.query(sql2, [newOrders], (error) => {
            if (error) {
                console.error(error)
            }
            // Rediriger l'utilisateur vers la page du magasin après avoir ajouté la commande au panier
            res.redirect('/shop');
        })

    });
}

// AFFICHAGE DU PANIER DE L'UTILISATEUR
export const dipslayBucket = (req, res) => {
    // Récupérer l'ID de l'utilisateur connecté depuis la session
    let id = req.session.userId;
    // Requête SQL pour récupérer toutes les commandes associées à l'utilisateur dans la table "Orders"
    let sql = 'SELECT * FROM Orders WHERE user_id = ?'
    const { reduce } = pkg;

    pool.query(sql, [id], function (error, order) {
        // Calculer le montant total des commandes dans le panier en utilisant la fonction "reduce" de la bibliothèque "lodash"
        const totalAmount = reduce(order, (sum, product) => sum + product.amount, 0);
        // Renvoyer le rendu de la page "layout" avec le template "bucket" et les commandes récupérées pour affichage sur la page du panier
        res.render('layout', { template: 'bucket', order: order, totalAmount: totalAmount });
    })
}

// SOUMISSION DU FORMULAIRE DE VALIDATION DU PANIER
export const BucketSubmit = (req, res) => {
    // Récupérer l'ID de l'utilisateur connecté depuis la session
    let id = req.session.userId;
    // Requête SQL pour supprimer toutes les commandes associées à l'utilisateur dans la table "Orders"
    let sql = 'DELETE FROM Orders WHERE user_id = ?'

    pool.query(sql, [id], function (error, bucket) {
        // Renvoyer le rendu de la page "layout" avec le template "bucket_submit" pour afficher la page de validation du panier
        res.render('layout', { template: 'bucket_submit', bucket: bucket })
    })
}

// SUPPRESSION D'UN ARTICLE DU PANIER
export const DeleteBucket = (req, res) => {
    // Récupérer l'ID de la commande (article) à supprimer, il a été passé en paramètre de l'URL
    let id = req.params.id;

    // Requête de suppression en BDD pour supprimer la commande associée à l'ID spécifié
    let sql = 'DELETE FROM Orders WHERE id = ?';

    pool.query(sql, [id], function (error, result, fields) {
        if (error) {
            console.log(error)
            res.status(500).send({
                error: 'Erreur lors de la suppression du produit dans le panier'
            });
        } else {
            // Renvoyer une réponse HTTP avec le statut 204 (No Content) pour indiquer que la suppression s'est bien déroulée
            res.status(204).send();
        }
    });
}
