import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: {type:String,unique:true},
    password: String,
    profile_image: String,
    dob: Date,
    gender: String
});