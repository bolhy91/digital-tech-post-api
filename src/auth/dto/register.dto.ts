import {IsString} from 'class-validator';

export class RegisterDto {
    @IsString()
    name: string;
    @IsString()
    surname: string;
    @IsString()
    username: string;
    role?: string;
    avatar?: string;
}
