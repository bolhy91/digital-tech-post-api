import {IsString} from 'class-validator';

export class UserDto {
    @IsString()
    name: string;
    @IsString()
    surname: string;
    @IsString()
    username: string;
    avatar: string;
}