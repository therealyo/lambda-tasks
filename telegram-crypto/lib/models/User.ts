import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    Currencies: [String]
});

export const User = mongoose.model('User', userSchema);
