"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_model_1 = require("../models/movie.model");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    try {
        const successfulResult = await movie_model_1.Movie.find({}).exec();
        res.json(successfulResult);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.get('/genres', async (req, res) => {
    try {
        const successfulResult = await movie_model_1.Movie.distinct("genres").exec();
        res.json(successfulResult);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.get('/genres/:genre', async (req, res) => {
    const genre = req.params.genre;
    try {
        const successfulResult = await movie_model_1.Movie.find({ genres: genre }).exec();
        res.json(successfulResult);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.get('/title/:title', async (req, res) => {
    const title = req.params.title;
    try {
        const successfulResult = await movie_model_1.Movie.findOne({ title: title }).exec();
        res.json(successfulResult);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const successfulResult = await movie_model_1.Movie.findOne({ _id: id }).exec();
        res.json(successfulResult);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
module.exports = router;
//# sourceMappingURL=movies.js.map