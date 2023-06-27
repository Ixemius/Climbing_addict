import pool from "../config/database.js";

export const Home = (req, res) => {

    // requete SQL qui va nous récupérer les informations 
    let sql = 'SELECT Users.name, Articles.id as auteur_id, Articles.date as date_publi, title, content FROM Articles INNER JOIN Users ON Articles.author_id = Users.id ORDER BY date_publi DESC';

   pool.query(sql,function (error, posts) {
            res.render('layout', {template: 'home', posts: posts});
    });
}


