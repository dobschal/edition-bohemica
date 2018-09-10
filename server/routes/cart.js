const express           = require('express');
const security          = require("../services/security");
const { userRoles }     = security;
const { sendOrderEmailToCustomer, sendOrderEmailToProducer } = require("../services/email");
const Order             = require("../models/Order");

const router  = express.Router();

module.exports = function ( io ) {    

    router.post('/cart/submit', function(req, res, next) {

        //  input data
        const { 
            cart, 
            totalPrice, 
            totalPorto, 
            country, 
            name, 
            city, 
            street, 
            houseNumber, 
            zipCode, 
            email
        } = req.body;          

        //  order model instance from input data
        let order = new Order({
            products: cart.map( product => {
                return {
                    hasPorto: product.hasPorto,
                    title: product.title,
                    subtitle: product.subtitle,
                    isbn: product.isbn,
                    amount: product.amount
                }
            }),
            totalPorto,
            totalPrice,
            recipientEmail: email,
            recipientName: name,
            recipientStreet: street,
            recipientHouseNumber: houseNumber,
            recipientZipCode: zipCode,
            recipientCity: city,
            recipientCountry: country
        });

        //  save order in database and send mails...
        order.save( (err, savedOrder) => {
            if( err ) return next(err);            
            sendOrderEmailToProducer( savedOrder ).then( response => {
                res.send({ success: "Send email...", order: savedOrder });
            }).catch( err => {
                next( err );
            });
        });
        
    });

    return router;
};

