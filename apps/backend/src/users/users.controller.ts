import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    // Dependency Injection
    constructor( private readonly usersService: UsersService) {}

    // GET /users?occpuation= --> []
    @Get()
    getUsers(@Query('occupation') occupation: 'Beruf1' | 'Beruf2') {
        return this.usersService.getUsers(occupation);
    }

    // GET /users/:id --> { ... }
    @Get(':id')
    getOneUser(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.usersService.getOneUser(id);
        } catch (error) {
            throw new NotFoundException();
        }    
    }

    // POST /users
    @Post()
    createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {  // ValidationPipes überprüfen, ob die Regeln des dto eingehalten wurden
        return this.usersService.createUser(createUserDto);
    }

    // PUT /users/:id --> { ... }
    @Put(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }
    
    // DELETE / users/:id
    @Delete(':id')
    removeUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.removeUser(id);
    }
}