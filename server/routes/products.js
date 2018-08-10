const express           = require('express');
const Product           = require("../models/Product");
const security          = require("../services/security");
const { userRoles }     = security;
const uploader          = require("../uploadHandlers/productImage");

const router  = express.Router();

module.exports = function ( io ) {    

    router.put('/products/:productId', security.protect([  userRoles.USER, userRoles.ADMIN ]), uploader.single("image"), function(req, res, next) {
        console.log("[Products] Updating Product: ", req.params, req.body);
        const { productId } = req.params;
        let updatedProduct = new Product(req.body);
        Product.findByIdAndUpdate( productId, updatedProduct, { new: true }, ( err, updatedProductInDB ) => {
            if (err) return next(err);
            res.send({ success: true, product: updatedProductInDB });
            io.emit( "ProductChanged", updatedProductInDB );
        });
    });

    router.post('/products', security.protect([  userRoles.USER, userRoles.ADMIN ]), uploader.single("image"), function(req, res, next) {
        let product = new Product(req.body);
        product.image = req.file.path;
        product.save((err, productInDB) => {
            if (err) return next( err );
            res.send({ success: true, info: "Saved product in database.", product: productInDB });
            io.emit( "NewProduct", productInDB );
        });
    });

    router.get('/products', function(req, res, next) {
        const protocoll = req.connection.encrypted ? "https" : "http";
        Product.find(( err, productssFromDB ) => {
            if (err) return next( err );
            res.send( productssFromDB.map( product => {
                if(product.image)
                {
                    product.image = protocoll + "://" + req.headers.host + "/" + product.image;
                }
                return product;
            }));
        });
    });

    router.get('/products/:productId', function(req, res, next) {
        const { productId } = req.params;
        const protocoll = req.connection.encrypted ? "https" : "http";
        Product.findById( productId, ( err, productFromDB ) => {
            if (err) return next( err );            
            if(productFromDB.image)
            {
                productFromDB.image = protocoll + "://" + req.headers.host + "/" + productFromDB.image;
            }
            res.send( productFromDB );
        });
    });

    return router;
};