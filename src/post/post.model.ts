import mongoose from "mongoose";
import {PostStatus} from "../shared/enums/post-status.enum";
import {User} from "../user/user.interface";
import {Post} from "./post.interface";

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
        enum: PostStatus,
        default: PostStatus.DRAFTED
    }
});

const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);

export default postModel;