'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  sessionDate: Date,
  sessionTime: Number,
  effortLevel: String,
  satisfactionLevel: String,
  isSessionPaid: Boolean,
  isSessionConfirmed: Boolean,
  customerId: {type: Schema.Types.ObjectId, ref:'customer'},
  trainerId: {type: Schema.Types.ObjectId, ref:'trainer'}
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;