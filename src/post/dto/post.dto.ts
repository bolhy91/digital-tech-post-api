import {IsString, IsNotEmpty, IsEnum} from 'class-validator';
import {PostStatus} from "../../shared/enums/post-status.enum";
export class PostDto {
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    status?: PostStatus

    image?: string;
}