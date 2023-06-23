import pool from "../config/database.js";

export const About = (req, res) => {

    // requete SQL qui va nous récupérer les informations 
   pool.query(function (error, posts, fields) {
            // appelle du template layout.ejs 
            // on fait passer la variable template pour dire à layout.ejs quel template charger, dans notre cas home.ejs
            //on fait passer en paramètre les information récupéré en BDD sous la variable posts
            res.render('layout', {template: 'about', posts: posts});
    });
}