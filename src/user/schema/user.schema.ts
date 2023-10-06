import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    profile_image: String,
    Dob: Date,
    gender: String
});