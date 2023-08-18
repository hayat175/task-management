import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';
@Entity() //this decorator will tell its not just a class but also entity in database
export class Task {
  //creating our columns

  @PrimaryGeneratedColumn('uuid') //will id primary column and auto generate id
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true }) //i want exclude user when i get the tasks in plain texts . So we will not see the user username and password .
  user: User;
}
