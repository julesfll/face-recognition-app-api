const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f9df86dfece3466cb2cc27a89fb42e1b',
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
};

const handleImage = (db) => (req, res) => {
  const { id } = req.body;
  // db('users') === db.from('users')
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      entries.length ? res.json(entries[0]) : res.status(400).json('Not found');
    })
    .catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleImage,
  handleApiCall,
};
