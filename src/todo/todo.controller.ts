import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll(): { id: number; name: string }[] {
    return this.todoService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todoService.getCurrent(id);
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
