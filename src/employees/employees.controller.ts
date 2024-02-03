import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { LoggerService } from 'src/logger/logger.service';

@SkipThrottle() //skip throttle for whole controller
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new LoggerService(EmployeesController.name) // the name of the context is passed to the constructor to identify where it was generated

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({default: false}) //Skip throttle for this specific api
  @Get()
  findAll(@Query('role') role?: "INTERN" | "ENGINEER" | "ADMIN" ) {
    return this.employeesService.findAll(role);
  }

  @Throttle({short: {ttl: 1000, limit: 1}}) // custom throttle for this api, this will override the short defined in app.module
  @Get(':id')
  findOne(@Ip() ip:string, @Param('id') id: string) {
    this.logger.log(`Request for All Employees \t${ip}}`)
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
