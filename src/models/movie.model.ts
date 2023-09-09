import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IMovie {
    title: string;
    year: number;
    rating: number;
    summary: string;
    genres: [String];
    posterLink: string;
    trailerLink: string;
}

const movieScema = new Schema<IMovie>({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    rating: { type: Number, required: true },
    summary: { type: String, required: true },
    genres: { type: [String], required: true },
    posterLink: { type: String },
    trailerLink: { type: String },
});

export const Movie = mongoose.model('movie', movieScema);
