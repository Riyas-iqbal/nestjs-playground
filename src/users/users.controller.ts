import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    
    /**
     * This automatically creates a new instance for userService and it is also mentioned in the
     * documentation that if this instance was created elsewhere it will pull the instance from there
     * following the singleton principle 
     */
    constructor(private readonly userService: UsersService) {}

    @Get() // eg: /users?role=admin
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN'){
        return this.userService.findAll(role)
    }

    @Get('/interns') //eg: /users/interns
    findInters(){
        return this.userService.findAll('INTERN')
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number){
        return this.userService.findOne(id)
    } 

    @Post()
    create(@Body() user: CreateUserDto ){
        return this.userService.create(user)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() userUpdate: UpdateUserDto ){
        return this.userService.update(id, userUpdate)
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.userService.delete(id)
    }
}
