import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        { id: 0, name: 'userA', occupation: 'Beruf1' },
        { id: 1, name: 'userB', occupation: 'Beruf2' },
    ];

    getUsers(occupation?: 'Beruf1' | 'Beruf2') {
        console.log(this.users);
        if (occupation) {
            return this.users.filter((user) => user.occupation === occupation)
        }
        return this.users;
    }

    getOneUser(id: number) {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            throw new Error('user not found');
        }
        return user;
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = {     // erstelle neuen User      
            ...createUserDto,
            id: Date.now(),
        };
        this.users.push(newUser);   // append newUser zum Array users
        return newUser;
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map((user) => {
            if (user.id === id) {
                return { ...user, ...updateUserDto };
            }
            return user;
        });
        return this.getOneUser(id);
    }

    removeUser(id: number) {
        const toBeRemoved = this.getOneUser(id);

        this.users = this.users.filter((user) => user.id !== id);
        return toBeRemoved;
    }
}