'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  email: String,
  name: String,
  surname: String,
  weigth: Number,
  heigth: Number,
  birthdate: Date,
  perimeters: [{
    perDate: Date,
    perChest: Number,
    perWaist: Number,
    perHip: Number  
  }],
  skinTurgor: [{
    skinDate: Date,
    skin1: Number,
  }], 
  objective: String,
  injuriesDiseases: String,
  trainerId: {type: Schema.Types.ObjectId, ref:'trainer'}
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;