'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
  email: String,
  name: String,
  surname: String
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;