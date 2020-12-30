'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  customerId: {type: Schema.Types.ObjectId, ref:'customer'},
  trainerId: {type: Schema.Types.ObjectId, ref:'trainer'},
  sessionId: {type: Schema.Types.ObjectId, ref:'session'},
  messages: [{
    msgDate: Date,
    msgTime: Number,
    msg: String
  }]
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;