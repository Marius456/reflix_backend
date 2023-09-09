"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const movieScema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    rating: { type: Number, required: true },
    summary: { type: String, required: true },
    genres: { type: [String], required: true },
    posterLink: { type: String },
    trailerLink: { type: String },
});
exports.Movie = mongoose_1.default.model('movie', movieScema);
//# sourceMappingURL=movie.model.js.map