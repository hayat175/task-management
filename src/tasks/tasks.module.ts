import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist';
// import { TaskRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule], //this line allows us dependancy injection
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
