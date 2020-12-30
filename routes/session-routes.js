'use strict';

const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Session = require("../models/session");

// [AMN] Helper functions to check that the user is or not login (check Firebase solution)
// HELPER FUNCTIONS

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
} = require("../helpers/middlewares");

// <-------------- S E S S I O N   R O U T E S ---------------->

// Session routes - CRUD (R - read all the trainer's sessions by trainer Id) - receives trainer Id by params
// "/sessionsOneTrainer:/trainerId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.get("/sessionsOneTrainer/:trainerId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const trainerId = req.params.trainerId;
    try {
        let sessionsOneTrainerData = await Session.find({trainerId: trainerId});
        res.status(200).json(sessionsOneTrainerData);
    } catch (error) {
        res.json(error);
    }
    return;
});

// Session routes - CRUD (R - read all the trainer's sessions for a given customer by trainer Id & customer Id)
// Receives trainer Id and customer Id by params
// "/sessionsOneTrainerCustomer:/trainerId/:customerId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.get("/sessionsOneTrainerCustomer/:trainerId/:customerId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const trainerId = req.params.trainerId;
    const customerId = req.params.customerId;
    try {
        let sessionsOneTrainerCustomerData = 
            await Session.find({ $and: [{trainerId: trainerId}, {customerId: customerId}] });
        res.status(200).json(sessionsOneTrainerCustomerData);
    } catch (error) {
        res.json(error);
    }
    return;
});

// Session routes - CRUD (R - read all the customer's sessions by customer Id) - receives customer Id by params
// "/sessionsOneCustomer:/customerId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.get("/sessionsOneCustomer/:customerId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const customerId = req.params.customerId;
    try {
        let sessionsOneCustomerData = await Session.find({customerId: customerId});
        res.status(200).json(sessionsOneCustomerData);
    } catch (error) {
        res.json(error);
    }
    return;
});

// Session routes - CRUD (C - create the session) - receives data by params
// "/sessioncreate"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

// Important note about Date and Time:
// - It will arrive from html on the frontend and will go through Javascript till reach the backend.
// - It's important to define in the frontend the date and the time. 
// - Here the date has been defined as type Date in MongoDb "MM/DD/YYYY" (anglo format).
// - Here the time is a number and 4 means 00:04; 34 means 00:34; 134 means 01:34 and 104 means 01:04

router.post("/sessioncreate", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    console.log(req.body.sessionDate)
    try {
        let newSession = await Session.create({
            sessionDate: req.body.sessionDate,
            sessionTime: req.body.sessionTime,
            effortLevel: req.body.sessionEffortLevel,
            satisfactionLevel: req.body.sessionSatisfactionLevel,
            isSessionPaid: req.body.sessionIsSessionPaid,
            isSessionConfirmed: req.body.sessionIsSessionConfirmed,
            customerId: req.body.sessionCustomerId,
            trainerId: req.body.sessionTrainerId
        });
        res.status(200).json(newSession);
    } catch (error) {
        res.json(error);
    }
    return;
});

// Session routes - CRUD (U - update the session) - receives _id by params and data by body
// "/sessionupdate:sessionId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.put("/sessionupdate/:sessionId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const sessionId = req.params.sessionId;
    console.log(sessionId);

    const { sessionDate, 
            sessionTime, 
            sessionEffortLevel,
            sessionSatisfactionLevel,
            sessionIsSessionPaid,
            sessionIsSessionConfirmed,
            sessionCustomerId,
            sessionTrainerId} = req.body;

    try {
        let sessionUpdated = await Session.findByIdAndUpdate(sessionId, 
                                    { sessionDate: sessionDate,
                                      sessionTime: sessionTime,
                                      effortLevel: sessionEffortLevel,
                                      satisfactionLevel: sessionSatisfactionLevel,
                                      isSessionPaid: sessionIsSessionPaid,
                                      isSessionConfirmed: sessionIsSessionConfirmed,
                                      customerId: sessionCustomerId,
                                      trainerId: sessionTrainerId }, (error, register) => 
        {
            if (error || !register) {
                res.json({ message: `Session with ${sessionId} doesn't exists and/or error: ${error}`});
            } else {
                res.json({ message: `Session with ${sessionId} has been updated successfully.` }); 
            }
        })  
    } catch (error) {
        res.json(error);
    }
    return;
});

// Session routes - CRUD (D - delete the session) - receives _id by params
// "/sessiondelete:sessionId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.delete("/sessiondelete/:sessionId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const sessionId = req.params.sessionId;

    try {
        let sessionDeleted = await Session.findByIdAndRemove(sessionId, (error, register) => {
            if (error || !register) {
                res.json({ message: `Session with ${sessionId} doesn't exists and/or error: ${error}`});                
            } else {
                res.json({ message: `Session with ${sessionId} has been deleted successfully.` });        
            }
        })
    } catch (error) {
        res.json(error);
    }
    return;
});

// <-------------- S E S S I O N   R O U T E S ---------------->

module.exports = router;