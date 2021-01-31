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

// Customer routes - CRUD (R - read ALL the customers that belong to the trainer) 
// receives trainerId by params.
// "/customers:trainedId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

console.log("I'm before customers + trainerId");
router.get("/customers/:trainerId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const trainerId = req.params.trainerId;
    console.log("Within customers: ", trainerId);
    try {
        console.log("Calling customers");
        let customersData = await Customer.find({trainerId: trainerId});
        console.log("Customer data: ", customersData);
        res.status(200).json(customersData);
    } catch (error) {
        res.json(error);
    }
    return;
});


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

// Customer routes - CRUD (C - create the customer) - receives email by query (?) and data by params
// "/customercreate?customerEmail="
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.post("/customercreate", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {

    try {
        let newCustomer = await Customer.create({
            email: req.query.email,
            name: req.body.name,
            surname: req.body.surname,   
            weigth: req.body.weigth,
            heigth: req.body.heigth,
            birthdate: req.body.birthdate,
            perimeters: req.body.perimeters[0], // See customer schema: this is an array of objects
            skinTurgor: req.body.skinTurgor[0], // See customer schema: this is an array of objects.
            objective: req.body.objective,
            injuriesDiseases: req.body.injuriesDiseases,
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
    const { email, 
            name, 
            surname,
            weigth,
            heigth,
            birthdate,
            perimeters,
            skinTurgor,
            objective,
            injuriesDiseases,
            trainerId } = req.body.customerData;

    try {
        let customerUpdated = await Customer.findByIdAndUpdate(customerId, 
                                    { email: email, 
                                      name: name, 
                                      surname: surname,
                                      weigth: weigth,
                                      heigth: heigth,
                                      birthdate: birthdate,
                                      perimeters: perimeters,
                                      skinTurgor: skinTurgor,
                                      objective: objective,
                                      injuriesDiseases: injuriesDiseases,
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