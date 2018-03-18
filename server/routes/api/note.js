const sanitizeHtml = require('sanitize-html');
const Note = require('../../models/Note');

module.exports = (app) => {
  app.get('/api/notes', (req, res, next) => {
    Note.find().sort('-createdAt').exec((err, notes) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ notes });
    });
  });

  /**
   * Get a single note
   * @param req
   * @param res
   * @returns void
   */
  app.get('/api/notes/:id', (req, res,next) => {
    Note.findOne({ _id: req.params.id }).exec((err, note) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json({ note });
    });
  });
  /**
   * Save a note
   * @param req
   * @param res
   * @returns void
   */
  app.post('/api/notes', function (req, res, next) {
    if (!req.body.note.title && !req.body.note.content) {
      // Fill at least title or content
      console.log('empty note');
      // res.status(403).end();
      // return;
    }

    const newNote = new Note(req.body.note);
    // Let's sanitize inputs
    newNote.title = sanitizeHtml(newNote.title);
    newNote.content = sanitizeHtml(newNote.content);
    console.log('newNote : ' + newNote);
    newNote.save((err, saved) => {
      console.log(err);
      console.log(saved);
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.json({ note: saved });
    });
  });

  /**
   * Edit a note
   * @param req
   * @param res
   * @returns void
   */
  app.post('/api/notes/:id', function (req, res, next) {
    if (!req.body.note.title && !req.body.note.content) {
      // Fill at least title or content
      console.log('empty note');
      // res.status(403).end();
      // return;
    }
    const newNote = new Note(req.body.note);
    // Let's sanitize inputs
    newNote.title = sanitizeHtml(newNote.title);
    newNote.content = sanitizeHtml(newNote.content);
    var error = newNote.validateSync();
    if (error) {
      res.status(403).end();
      return;
    }

    Note.update({ _id: req.params.id }, { $set: { title: newNote.title, content: newNote.content }}, (err) => {
      if(err) {
        console.log(err);
        res.status(500).send(err)
      } else {
        res.status(200).send(req.body.note).end();
      }
    });
  });

  app.delete('/api/notes/:id', function (req, res, next) {
    Note.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((note) => res.status(200).end())
      .catch((err) => res.status(500).send(err));
  });

};
