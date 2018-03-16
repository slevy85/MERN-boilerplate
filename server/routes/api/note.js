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
   * Save a note
   * @param req
   * @param res
   * @returns void
   */
  app.post('/api/notes', function (req, res, next) {
    if (!req.body.note.title && !req.body.note.content) {
      // Fill at least title or content
      res.status(403).end();
      return;
    }

    const newNote = new Note(req.body.note);
    // Let's sanitize inputs
    newNote.title = sanitizeHtml(newNote.title);
    newNote.content = sanitizeHtml(newNote.content);
    console.log('newNote : ' + newNote);
    newNote.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ note: saved });
    });
  });

  app.delete('/api/notes/:id', function (req, res, next) {
    Note.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((note) => res.status(200).end())
      .catch((err) => res.status(500).send(err));
  });

  app.put('/api/notes/:id/increment', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count++;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.put('/api/notes/:id/decrement', (req, res, next) => {
    Counter.findById(req.params.id)
      .exec()
      .then((counter) => {
        counter.count--;

        counter.save()
          .then(() => res.json(counter))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};
