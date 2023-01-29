import mongoose from "mongoose";
import {PostStatus} from "../shared/enums/post-status.enum";
import {User} from "../user/user.interface";

const postSchema = new mongoose.Schema({
    image: String,
    message: String,
    likes: Array<User>,
    author: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    create_at: Date,
    location: String,
    status: {
        type: String,
        required: true,
        enum: PostStatus
    }
});

const post = mongoose.model<Post, & mongoose.Document>('Post', postSchema);

export default post;