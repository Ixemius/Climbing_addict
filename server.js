import express from "express";
import session from 'express-session';
import router from "./router/routes.js";
import parseurl from "parseurl";


const app = express();
const port = 8000;
const hostname = "localhost";

const BASE_URL = `http://${hostname}:${port}`;

// on indique à express où sont les fichiers statiques js, image et css
app.use(express.static("public"));

//initialisation du système de sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

// utilisation des template EJS grâce au modules npm "ejs"
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('view options', { pretty: true });


//pour l'utilisation du json à la réception des données formulaire
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.locals.isAdmin = !!req.session.isAdmin;
    res.locals.isUser = !!req.session.isUser;
    res.locals.conneted = !!req.session.connected;
    res.locals.userId = req.session.userId;
    res.locals.categorieId = req.session.categorieId;

    next();
});

app.use(function (req, res, next) {
    const route = parseurl(req).pathname;

    const adminProtectedRoutes = [
        '/admin',
        '/edit_post/:id',
        '/delete_post/:id',
        '/add_product',
        '/delete_product/:id',
        '/edit_product/:id',
    ];

    const userProtectedRoutes = [
        '/add_bucket',
        '/add_bucket/:id',
        '/bucket_submit',
        '/delete_bucket/:id',
        '/add_post',
    ];
    if (adminProtectedRoutes.indexOf(route) > -1 && !req.session.isAdmin) {
        res.redirect('/');
    } else if (userProtectedRoutes.indexOf(route) > -1 && !req.session.connected) {
        res.redirect('/');
    } else {
        next();
    }
});

//appel du routeur
app.use('/', router);

// lancement du serveur sur un port choisi 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('listening port ' + PORT + ' all is ok');
})