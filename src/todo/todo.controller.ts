import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';

export enum TODO_STATUS {
  DONE = 'DONE',
  NOT_DONE = 'NOT_DONE',
}

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll(@Query('status') status?: string) {
    if (status === undefined || status === '') {
      return this.todoService.getAll();
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (status !== TODO_STATUS.DONE && status !== TODO_STATUS.NOT_DONE) {
      throw new BadRequestException(
        'Query "status" must be DONE or NOT_DONE when provided',
      );
    }

    return this.todoService.getAll({ status });
  }

  /** Must be registered before @Get(':id') or "done" is captured as an id. */
  @Get('done')
  getAllDone() {
    return this.todoService.getAllDone();
  }

  @Get('not-done')
  getAllNotDone() {
    return this.todoService.getAllNotDone();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todoService.getCurrent(Number(id));
  }

  @Post()
  addNew(@Body('name') name: string) {
    return this.todoService.addNew(name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('isDone') isDone: boolean,
  ) {
    return this.todoService.update(Number(id), name, isDone);
  }
}
