import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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
    findById(@Param('id') id: string){
        return this.userService.findOne(parseInt(id))
    } 

    @Post()
    create(@Body() user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN', age: number } ){
        return this.userService.create(user)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN', age: number } ){
        return this.userService.update(parseInt(id), userUpdate)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.userService.delete(parseInt(id))
    }
}
