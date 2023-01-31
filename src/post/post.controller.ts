import Controller from '../shared/interfaces/controller.interface';
import {Router, Request, Response, NextFunction} from "express";
import postModel from "./post.model";
import {PostDto} from "./dto/post.dto";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import RequestByUser from "../shared/interfaces/request-by-user.interface";
import {multerStorage} from "../lib/multer";
import {PostStatus} from "../shared/enums/post-status.enum";
import HttpException from "../shared/exceptions/http-exception";

class PostController implements Controller {
    public path: string = '/posts';
    public router: Router = Router();
    private postModel = postModel;

    constructor() {
        this.startRoutes();
    }

    startRoutes() {
        this.router.get(`${this.path}`, this.getPosts)
        this.router
            .all(`${this.path}/*`, authMiddleware)
            .patch(`${this.path}/:id/like`, this.likePost)
            .post(`${this.path}`, authMiddleware, multerStorage, validationMiddleware(PostDto), this.createPost);

    }

    private getPosts = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const posts = await this.postModel.find({}).sort('create_at').populate('author')
            response.json(posts);
        } catch (error) {
            next(error);
        }
    }

    private createPost = async (request: RequestByUser, response: Response, next: NextFunction) => {
        try {
            const postDto: PostDto = request.body;
            const newPost = new this.postModel({
                ...postDto,
                author: request.user._id,
                image: request.files[0].location,
                create_at: Date.now()
            });
            const save = await newPost.save();
            await save.populate('author').execPopulate();
            response.json({
                post: save
            })
        } catch (e) {
            next(e);
        }
    }

    private likePost = async (request: RequestByUser, response: Response, next: NextFunction) => {
        try {
            const id = request.params.id;
            const user = request.user;
            const post = await this.postModel.findById(id).exec();
            const userLikeExist = post?.likes?.includes(user._id);
            if (userLikeExist) {
                return response.json(new HttpException(302, 'Post contains a like from the user'));
            }
            if (post) {
                await post.updateOne({ likes: [...post.likes, user._id] }, {new: true})
                response.json(post);
            }
        } catch (e) {
            next(e);
        }
    }
}
export default PostController;