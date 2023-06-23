import pool from "../config/database.js";
import formidable from "formidable";

export const Shop = (req, res) => {
    let sql = 'SELECT id, name, description, price, img_path FROM Products';
    // requete SQL qui va nous récupérer les informations 
    pool.query(sql,function (error, products, fields) {

        res.render('layout', { template: 'shop', products: products });
    });
}
