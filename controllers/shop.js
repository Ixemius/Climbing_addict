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
        let totalAmount = products[0].price * quantity;
        let imgPath = products[0].img_path;

        let newOrders = {
            id: uuidv4(),
            total_amount: totalAmount,
            user_id: userId,
            product_id: id,
            img_path: imgPath
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
    let sql = 'SELECT * FROM Orders'

    pool.query(sql,function(error,order){
        res.render('layout', {template: 'bucket', order: order});
    })
}
