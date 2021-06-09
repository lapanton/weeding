const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  willbe: {type: String, required: true},
  time: {type: String, required: false},
  children: {type: String, required: false},
  childquantity: {type: String, required: false},
  stay: {type: String, required: false},
  parking: {type: String, required: false},
  parkingPlace: {type: String, required: false},
  songs: {type: String, required: false},
  traditions: {type: String, required: false},
  moscow: {type: String, required: false},
  transfer: {type: String, required: false},
  muzei: {type: Array, required: false},
  master: {type: Array, required: false},
  more: {type: Array, required: false},
  date: {type: Date, default: Date.now},
  clicks: {type: Number, default: 0},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Link', schema)
