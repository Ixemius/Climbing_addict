import pool from "../config/database.js";
import { v4 as uuidv4 } from 'uuid';

export const Shop = (req, res) => {
    let sql = 'SELECT id, name, description, price, img_path FROM Products';
    // requete SQL qui va nous récupérer les informations 
    pool.query(sql,function (error, products, fields) {

        res.render('layout', { template: 'shop', products: products });
    });
}

export const AddBucketSubmit = (req, res) => {
    let id = req.params.id;
    let userId = req.session.userId;
    let sql1 = 'SELECT * from Products WHERE id = ?';
    
    pool.query(sql1,[id] ,function (error, products, fields) {
        let quantity = parseInt(req.body.quantity);
        let productName = products[0].name;
        let totalAmount = products[0].price * quantity;
        let imgPath = products[0].img_path;

        let newOrders = {
            id: uuidv4(),
            total_amount: totalAmount,
            user_id: userId,
            product_id: id,
            img_path: imgPath,
            quantity: quantity,
            product_name: productName
        }

        let sql2 = 'INSERT INTO Orders SET ?'

        pool.query(sql2,[newOrders], (error) =>{
            if(error){
                console.error(error)
            }
            res.redirect('/shop');
        })
        
    });

}
export const dipslayBucket = (req, res) => {
    let id = req.session.userId;
    let sql = 'SELECT * FROM Orders WHERE user_id = ?'

    pool.query(sql,[id],function(error,order){
        res.render('layout', {template: 'bucket', order: order});
    })
}

export const BucketSubmit = (req,res) => {
    let id = req.session.userId;
    let sql = 'DELETE FROM Orders WHERE user_id = ?'

    pool.query(sql,[id],function(error,bucket){
        res.render('layout', {template: 'bucket_submit', bucket: bucket})

    })
}
export const DeleteBucket = (req, res) => {

    //on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
    let id = req.body.id;
    console.log(id)


    
    // requete de suppresion en BDD
    let sql = 'DELETE FROM Orders WHERE id = ?';

    pool.query(sql, [id], function (error, result, fields) {
        if (error) {
            console.log(error)
            res.status(500).send({
                error: 'Error when delete bucket'
            });
        } else {
                res.status(204).send();
        }
    });
}