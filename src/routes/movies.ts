import express from 'express';
import { Movie } from '../models/movie.model';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const successfulResult = await Movie.find({}).exec();
      res.json(successfulResult);
    }
    catch (error) {
      res.status(400).json(error);
    }
});

router.get('/genres', async (req, res) => {
  try {
    const successfulResult = await Movie.distinct("genres").exec();
    res.json(successfulResult);
  }
  catch (error) {
    res.status(400).json(error);
  }
});

router.get('/genres/:genre', async (req, res) => {
    const genre = req.params.genre  
    try {
      const successfulResult = await Movie.find({genres: genre}).exec();
      res.json(successfulResult);
    }
    catch (error) {
      res.status(400).json(error);
    }
});

router.get('/title/:title', async (req, res) => {
  const  title  =  req.params.title  
  try {
    const successfulResult = await Movie.findOne({title: title}).exec();
    res.json(successfulResult);
  }
  catch (error) {
    res.status(400).json(error);
  }
});

router.get('/:id', async (req, res) => {
  const  id  =  req.params.id  
  try {
    const successfulResult = await Movie.findOne({_id: id}).exec();
    res.json(successfulResult);
  }
  catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;