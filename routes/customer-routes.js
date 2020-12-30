'use strict';

const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Customer = require("../models/customer");

// [AMN] Helper functions to check that the user is or not login (check Firebase solution)
// HELPER FUNCTIONS

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
} = require("../helpers/middlewares");

// <-------------- C U S T O M E R   R O U T E S ---------------->

// Customer routes - CRUD (R - read the customer by email) - receives email by query (?)
// "/customer?customerEmail="
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.get("/customer", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    
    try {
        let customerData = await Customer.findOne({email: req.query.customerEmail});
        res.status(200).json(customerData);
    } catch (error) {
        res.json(error);
    }
    return;
});

// Customer routes - CRUD (R - read ALL the customers that belong to the trainer) 
// "/customers"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.get("/customers", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    
    try {
        let customersData = await Customer.find();
        res.status(200).json(customersData);
    } catch (error) {
        res.json(error);
    }
    return;
});


// Customer routes - CRUD (C - create the customer) - receives email by query (?) and data by params
// "/customercreate?customerEmail="
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.post("/customercreate", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {

    try {
        let newCustomer = await Customer.create({
            email: req.query.customerEmail,
            name: req.body.customerName,
            surname: req.body.customerSurname,   
            weigth: req.body.customerWeigth,
            heigth: req.body.customerHeigth,
            birthdate: req.body.customerBirthdate,
            perimeters: req.body.customerPerimeters[0], // See customer schema: this is an array of objects
            skinTurgor: req.body.customerSkinTurgor[0], // See customer schema: this is an array of objects.
            objective: req.body.customerObjective,
            injuriesDiseases: req.body.customerInjDis,
            trainerId: req.body.trainerId
        });
        res.status(200).json(newCustomer);
    } catch (error) {
        res.json(error);
    }
    return;
});

// Customer routes - CRUD (U - update the customer) - receives _id by params and data by body
// "/customerupdate:customerId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.put("/customerupdate/:customerId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const customerId = req.params.customerId;
    const { customerEmail, 
            customerName, 
            customerSurname,
            customerWeigth,
            customerHeigth,
            customerBirthdate,
            customerPerimeters,
            customerSkinTurgor,
            customerObjective,
            customerInjDis,
            trainerId } = req.body;

    try {
        let customerUpdated = await Customer.findByIdAndUpdate(customerId, 
                                    { email: customerEmail, 
                                      name: customerName, 
                                      surname: customerSurname,
                                      weigth: customerWeigth,
                                      heigth: customerHeigth,
                                      birthdate: customerBirthdate,
                                      perimeters: customerPerimeters,
                                      skinTurgor: customerSkinTurgor,
                                      objective: customerObjective,
                                      injuriesDiseases: customerInjDis,
                                      trainerId: trainerId }, (error, register) => 
        {
            if (error || !register) {
                res.json({ message: `Customer with ${customerId} doesn't exists and/or error: ${error}`});
            } else {
                res.json({ message: `Customer with ${customerId} has been updated successfully.` }); 
            }
        })  
    } catch (error) {
        res.json(error);
    }
    return;
});

// Customer routes - CRUD (D - delete the customer) - receives _id by params
// "/customerdelete:customerId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.delete("/customerdelete/:customerId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const customerId = req.params.customerId;

    try {
        let customerDeleted = await Customer.findByIdAndRemove(customerId, (error, register) => {
            if (error || !register) {
                res.json({ message: `Customer with ${customerId} doesn't exists and/or error: ${error}`});                
            } else {
                res.json({ message: `Customer with ${customerId} has been deleted successfully.` });        
            }
        })
    } catch (error) {
        res.json(error);
    }
    return;
});

// <-------------- C U S T O M E R   R O U T E S ---------------->

module.exports = router;