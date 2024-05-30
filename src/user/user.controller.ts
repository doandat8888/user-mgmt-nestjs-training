import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/interfaces/user.interface';
import { UserDto } from 'src/dtos/user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('/')
    getAllUser(): User[]{
        return this.userService.getAllUser();
    }

    @Post('/create')
    createNewUser(@Body() userDto: UserDto): User {
        return this.userService.createNewUser(userDto);
    }

    @Patch('/update/:username')
    updateUser(@Body() userDto: Partial<UserDto>, @Param('username') username: string): User {
        return this.userService.updateUser(userDto, username);
    }

    @Delete('/delete/:username')
    deleteUser(@Param('username') username: string) {
        return this.userService.deleteUser(username);
    }

    @Get('/search')
    searchUser(@Query() searchParams): User[] {
        return this.userService.searchUser(searchParams);
    }
}
