import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get() // eg: /users?role=admin
    findAll(@Query('role') role: 'INTERN' | 'ADMIN'){
        console.log(role);
        return 'Hello world'
    }

    @Get('/interns') //eg: /users/interns
    findInters(){
        return 'Hello interns'
    }

    @Get(':id')
    findById(@Param('id') id: string){
        return 'id-' + id 
    } 

    @Post()
    create(@Body() user: {} ){
        return user
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: {} ){
        return {id, ...userUpdate}
    }
}
