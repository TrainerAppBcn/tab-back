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
    perChest: Number,
    perWaist: Number,
    perHip: Number  
  }],
  skinTurgor: [{
    skin1: Number,
  }], 
  objective: String,
  injuriesDiseases: String,
  trainerId: {type: Schema.Types.ObjectId, ref:'trainer'},
  name: String,
  surname: String
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;