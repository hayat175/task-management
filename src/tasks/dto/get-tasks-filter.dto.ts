import { TaskStatus } from '../task-status.enum';

export class getTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
