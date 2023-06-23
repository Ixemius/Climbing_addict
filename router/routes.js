import express from "express";
import pool from "../config/database.js";

const router = express.Router();


//appel des controllers
import {Home} from "../controllers/home.js";
import {Login, LoginSubmit, Logout} from "../controllers/login.js";
import {Shop} from "../controllers/shop.js";
import {About} from "../controllers/about.js";
import {Register, RegisterSubmit} from "../controllers/register.js";
import {Admin, AddPost, AddPostSubmit, AddProduct, AddProductSubmit, DeletePost, EditPost, EditPostSubmit, DeleteProduct, EditProductSubmit, EditProduct} from "../controllers/admin.js";
import {Details,AddComment } from "../controllers/articles.js"

//liste des routes

//HOME PAGE
router.get('/', Home);

router.post('/', Home);

// //LOGIN PAGE
router.get('/login', Login);

router.post('/login', LoginSubmit);

//LOGOUT PAGE
router.get('/logout', Logout)

// PAGE SHOP
router.get('/shop', Shop);

router.post('/shop', Shop);

// //REGSITER PAGE
router.get('/register', Register);

router.post('/register', RegisterSubmit);

//PAGE ABOUT
router.get('/about', About);

router.post('/about', About);

// //ADMIN PAGE
router.get('/admin', Admin);

router.get('/add_post', AddPost);

router.post('/add_post', AddPostSubmit);

router.get('/edit_post/:id', EditPost);

router.post('/edit_post/:id', EditPostSubmit);

router.delete('/delete_post/:id', DeletePost);

router.get('/add_product', AddProduct);

router.post('/add_product', AddProductSubmit);

router.delete('/delete_product/:id',DeleteProduct)

router.get('/edit_product/:id', EditProduct);

router.post('/edit_product/:id', EditProductSubmit);

//DETAIL PAGE
router.get('/article/:id', Details);

//ADD COMMENTS
router.post('/add_comment/:id', AddComment);


// EDIT POST



export default router;
