var express = require('express');
var router = express.Router();
const ObjectID = require('mongodb').ObjectID;

router.get('/rdv', (req, res, next) =>{
  req.collection.find({})
    .toArray()
    .then(results => res.json(results))
    .catch(error => res.send(error));
});

router.post('/rdv',(req, res, next) => {
  const { rdvDate, name, email } = req.body;
  if (!rdvDate || !name || !email) {
    return res.status(400).json({
      message: 'Rdv date,name and email are required'
    });
  }

  const payload = { rdvDate, name, email };
  req.collection.insertOne(payload)
  .then(result => res.json(result))
  .catch(error => res.send(error));
});


router.delete('/rdv/:id', (req, res, next) => {
  const { id } = req.params;
  const _id = ObjectID(id);

    req.collection.deleteOne({ _id })
    .then(result => res.json(result.ops[0]))
    .catch(error => res.send(error));
});


module.exports = router;
