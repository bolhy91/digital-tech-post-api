import * as mongoose from 'mongoose';
import {Role} from "../shared/enums/role.enum";
import {User} from "./user.interface";

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    avatar: String,
    role: {
        type: String,
        required: true,
        default: Role.USER,
        enum: Role
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
},)

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
