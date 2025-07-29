const mongoose = require('mongoose');

const personagemSchema = new mongoose.Schema({
    name: String,
    alias: String,
    power: String,
    passive: String,
    description: String,
    skills: [String],
    equipment: [String],
    fisico: Number,
    tecnica: Number,
    elemento: Number,
    mental: Number,
    agilidade: Number,
    carisma: Number,
    poder: Number,
    rank: String
});

// Use sempre o mesmo nome do collection no Mongo ou deixe o Mongoose pluralizar automaticamente
module.exports = mongoose.model('personagem', personagemSchema, 'personagens');
