import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    id: Number,
    date: Date,
    title: String,
    body: String,
    category: String
});