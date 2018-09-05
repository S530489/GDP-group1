const mongoose = require('mongoose')  //initialize
var Schema = mongoose.Schema

const PerformerSchema = new mongoose.Schema({
    performer_id:
    {
        type: Number, 
        required: true 
    },
    form_id:
    {
        type: Number, 
        required: true 
    },
    name: 
    {
        type: String,
        required: true,
        default: 'name/description'
    },
    play_title: 
    {
        type: String,
        required: true,
        default: 'playTitle'
    },
    role: 
    {
        type: String,
        required: true,
        default: 'role'
    },
    chest:
    {
        type: Number, 
        required: true 
    },
    waist:
    {
        type: Number, 
        required: true 
    },
    inseam:
    {
        type: Number, 
        required: true 
    },
    outseam:
    {
        type: Number, 
        required: true 
    },
    shoeSize:
    {
        type: Number, 
        required: true 
    },
    headCircumference:
    {
        type: Number, 
        required: true 
    },
    neck:
    {
        type: Number, 
        required: true 
    },
    armscye:
    {
        type: Number, 
        required: true 
    },
    centerBackWrist:
    {
        type: Number, 
        required: true 
    },
    fullHip:
    {
        type: Number, 
        required: true 
    },
    halfGirth:
    {
        type: Number, 
        required: true 
    },
})

module.exports = mongoose.model('Performer', PerformerSchema)   



