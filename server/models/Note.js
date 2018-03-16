const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {type:String, maxLength:10},
  content : String
}, { timestamps : true });

module.exports = mongoose.model('Note', NoteSchema);
