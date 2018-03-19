const mongoose = require('mongoose');

const MAX_TITLE = 144;
const MAX_CONTENT = 610;

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required() {
      // Required if no content
      return !this.content;
    },
  },
  content: {
    type: String,
    required() {
      // Required if no title
      return !this.title;
    },
  },
}, { timestamps: true });


// Validators
NoteSchema.path('title').validate(v => v.length <= MAX_TITLE, '{VALUE} is too long.');
NoteSchema.path('content').validate(v => v.length <= MAX_CONTENT, '{VALUE} is too long.');

module.exports = mongoose.model('Note', NoteSchema);
