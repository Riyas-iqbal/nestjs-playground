import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

const THROTTLE_OPTIONS = [{
  name: "short",
  ttl: 1 * 1000,
  limit: 3,
},{
  name: "long",
  ttl: 10 * 1000,
  limit: 50,
}]

@Module({
  imports: [
    UsersModule, 
    DatabaseModule, 
    EmployeesModule,
    ThrottlerModule.forRoot(THROTTLE_OPTIONS)
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
