const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Trainer = require("../models/trainer");

// [AMN] Helper functions to check that the user is or not login (check Firebase solution)
// HELPER FUNCTIONS

const {
    isLoggedIn,
    isNotLoggedIn,
    validationLoggin,
} = require("../helpers/middlewares");

// <-------------- T R A I N E R   R O U T E S ---------------->

// Trainer routes - CRUD (R - read the trainer by email) - receives email by query (?)
// "/trainer?trainerEmail="
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.get("/trainer", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    
    try {
        let trainerData = await Trainer.findOne({email: req.query.trainerEmail});
        res.status(200).json(trainerData);
    } catch (error) {
        res.json(error);
    }
    return;
});

// Trainer routes - CRUD (C - create the trainer) - receives email by query (?) and data by params
// "/trainercreate?trainerEmail="
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.post("/trainercreate", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {

    try {
        let newTrainer = await Trainer.create({
                email: req.query.trainerEmail,
                name: req.body.trainerName,
                surname: req.body.trainerSurname
            
        });
        res.status(200).json(newTrainer);
    } catch (error) {
        res.json(error);
    }
    return;
});

// Trainer routes - CRUD (U - update the trainer) - receives _id by params and data by body
// "/trainerupdate:trainerId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.put("/trainerupdate/:trainerId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const trainerId = req.params.trainerId;
    const { trainerEmail, trainerName, trainerSurname } = req.body;

    try {
        let trainerUpdated = await Trainer.findByIdAndUpdate(trainerId, { email: trainerEmail, 
                                   name: trainerName, surname: trainerSurname }, (error, register) => {
            if (error || !register) {
                res.json({ message: `Trainer with ${trainerId} doesn't exists and/or error: ${error}`});
            } else {
                res.json({ message: `Trainer with ${trainerId} has been updated successfully.` }); 
            }
                                    })  
        // res.json({ message: `Trainer with ${trainerId} has been updated successfully.` });
    } catch (error) {
        res.json(error);
    }
    return;
});

// Trainer routes - CRUD (D - delete the trainer) - receives _id by params
// "/trainerdelete:trainerId"
// [AMN] Temporarily I ask for isNotLoggedIn to enter in the routes (pending login)

router.delete("/trainerdelete/:trainerId", /*isLoggedIn(),*/ isNotLoggedIn(), async (req, res, next) => {
    const trainerId = req.params.trainerId;

    try {
        let trainerDeleted = await Trainer.findByIdAndRemove(trainerId, (error, register) => {
            if (error || !register) {
                res.json({ message: `Trainer with ${trainerId} doesn't exists and/or error: ${error}`});                
            } else {
                res.json({ message: `Trainer with ${trainerId} has been deleted successfully.` });        
            }
        })
        // res.json({ message: `Trainer with ${trainerId} has been deleted successfully.` });
    } catch (error) {
        res.json(error);
    }
    return;
});

module.exports = router;