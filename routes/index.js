const express = require('express');
const router = express.Router();
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const productModel = require('../models/product-model');
const {logOut}= require('../controllers/authController');
const userModel = require('../models/user-model');


router.get('/',(req,res)=>{
    let error = req.flash("error")
    res.render('index',{error,isLoggedIn:false});
})
router.get('/shop',isLoggedIn,async (req,res)=>{
    let products = await productModel.find();
    let success = req.flash("success");
    res.render('shop',{products,success});
})
router.get('/addtocart/:id',isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email});
     user.cart.push(req.params.id);
     await user.save();
     req.flash("success","added to cart");
     res.redirect('/shop');
})
router.get('/cart',isLoggedIn,async (req,res)=>{
    let user = await userModel.findOne({email:req.user.email}).populate('cart');
    res.render('cart',{user});
})
router.get('/logout',logOut);
module.exports=router;
