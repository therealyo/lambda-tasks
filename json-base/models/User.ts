import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    path: {
        type: String,
        required: true,
    },
    stored: String,
});

const model = mongoose.model("User", userSchema);

export const schema = model.schema;
export default model;
