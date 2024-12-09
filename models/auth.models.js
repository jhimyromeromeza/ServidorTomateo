import mongoose from "mongoose";

const authSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 30, 
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
}, {timestamps: true});

const User = mongoose.model('User', authSchema);

export default User;