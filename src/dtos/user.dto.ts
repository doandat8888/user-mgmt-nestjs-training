import { IsArray, IsString } from "class-validator"

export class UserDto {
    @IsString()
    username: string;

    @IsString()
    fullname: string;

    @IsString()
    role: string;

    @IsArray()
    projects: string[];
    
    @IsString()
    activeYn: string;
}