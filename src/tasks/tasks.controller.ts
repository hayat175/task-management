import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Logger } from '@nestjs/common/services';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';

@Controller('tasks')
//now gaurding the task routes
@UseGuards(AuthGuard()) //so we have protected the entire route now only registered users can access these routes in controller
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(
    private tasksService: TasksService,
  ) // private configService: ConfigService,
  {
    // console.log(configService.get('TEST_VALUE'));
  }

  //If we have any filters defined,call tasksservice.getTasksWithFilter
  //OtherWise just get all tasks
  @Get()
  getTasks(
    @Query() filterDto: getTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving Tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getAllTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" retrieving Task with ID "${id}.Filters: `,
    );
    return this.tasksService.getTaskById(id, user);
  }

  //I want my user Object when creating a task , So we will use that customer get-user decorater we created before
  @Post()
  createTask(
    @Body() CreateTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" has created a new Task. Data: ${JSON.stringify(
        CreateTaskDto,
      )}"`,
    );
    return this.tasksService.createTask(CreateTaskDto, user);
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" has delete a Task successfully`,
    );
    return this.tasksService.deleteTaskById(id, user);
  }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    this.logger.verbose(
      `User "${user.username}" has Update status ${status} successfully`,
    );
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
