import { BadRequestException, Injectable, Query } from '@nestjs/common';
import { users } from 'src/data/users';
import { UserDto } from 'src/dtos/user.dto';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
    getAllUser(): User[] {
        return users;
    }

    findUser(username: string) {
        return users.find((user) => user.username === username);
    }
    
    createNewUser(user: UserDto): User{
        const userExist = this.findUser(user.username);
        if(userExist) {
            throw new BadRequestException('User already exists');
        }
        users.push(user);
        return user;
    }
    updateUser(user: Partial<UserDto>, username: string): User {
        const userExist = this.findUser(username);
        if(!userExist) {
            throw new BadRequestException('User not found');
        }
        Object.keys(user).forEach(key => {
            if (userExist[key] !== undefined) {
                userExist[key] = user[key];
            }
        })
        return userExist;
    }

    deleteUser(username: string): string {
        const userExist = this.findUser(username);
        if(!userExist) {
            throw new BadRequestException('User not found');
        }
        const index = users.indexOf(userExist);
        users.splice(index, 1);
        return "Delete user successfully"
    }

    searchUser(@Query() searchParams): User[] {
        for (const key in searchParams) {
            // Check if user has key
            if (!users[0][key]) {
                throw new BadRequestException('This property is not exist');
            }
        }
        const searchResult = this.findUsersByParams(searchParams);
        if (searchResult.length === 0) {
            throw new BadRequestException('User not found');
        }
        return searchResult;
    }

    findUsersByParams(searchParams: string[]): User[] {
        return users.filter(user => {
            for (const key in searchParams) {
                if (searchParams[key]) {
                    if (key === "projects") {
                        const projects = searchParams[key];
                        for (const project of projects) {
                            if (!user[key].includes(project)) {
                                return false;
                            }
                        }
                    } else {
                        if (user[key].toLowerCase().indexOf(searchParams[key].toLowerCase()) === -1) {
                            return false;
                        }
                    }
                }
            }
            return true;
        });
    }
}
