const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

const router = express.Router();


router.get('/', (req, res) => {
  db('zoos').select('name')
  .then(zoos => {
    console.log(zoos)
    zoos.length === 0 ?
    res.status(200).json({message: 'No Zoos Listed, Send a Post request to list a Zoo'})
    :
    res.status(200).json(zoos)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('zoos').where({ id }).select('name')
  .then(zoo => {
    console.log(zoo)
    zoo.length === 0 ?
    res.status(400).json({message: 'No Zoo Listed, check your id'})
    :
    res.status(200).json(zoo)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


router.post('/', (req, res) => {

  !req.body.name ?
  res.status(400).json({message: 'You need a valid name'})
  :
  null

  const name = req.body;

  db.insert(name).into('zoos')
  .then(count => {
    console.log(count);
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('zoos').where({id}).del()
  .then(count => {
    console.log(count);
    count === 0 ?
    res.status(400).json({message: 'Error deleting Zoo, check your id'})
    :
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


router.put('/:id', (req, res) => {
  const { id } = req.params;

  !req.body.name ?
  res.status(400).json({message: 'You need a valid name'})
  :
  null

  const name = req.body;

  db('zoos').where({id}).update(name)
  .then(count => {
    console.log(count);
    count === 0 ?
    res.status(400).json({message: 'Error updating Zoo, check your id'})
    :
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


module.exports = router;
