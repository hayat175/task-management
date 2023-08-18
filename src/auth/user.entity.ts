import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from 'src/tasks/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_typye) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
//eager: true means whenever we fetch/retrieve object/User from the database then the tasks will be fetched with it .Then we dont need to fetch tasks in seperate line of code
