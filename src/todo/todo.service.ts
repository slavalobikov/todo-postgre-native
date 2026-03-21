import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { TODO_STATUS } from './todo.controller';

/** When set, filters todos by completion; omit for all todos. */
export type TodoListFilter = {
  status?: 'DONE' | 'NOT_DONE';
};

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  getAll(filter?: TodoListFilter) {
    const status = filter?.status;

    if (status === TODO_STATUS.DONE) {
      return this.todoRepository.findBy({ isDone: true });
    }

    if (status === TODO_STATUS.NOT_DONE) {
      return this.todoRepository.findBy({ isDone: false });
    }

    return this.todoRepository.find();
  }

  async getCurrent(id: number) {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }

    return todo;
  }

  addNew(name: string) {
    const todo = this.todoRepository.create({ name });
    return this.todoRepository.save(todo);
  }

  async remove(id: number) {
    const todo = await this.getCurrent(id);
    await this.todoRepository.remove(todo);
    return { deleted: true };
  }

  async update(id: number, name: string, isDone: boolean) {
    const todo = await this.getCurrent(id);

    todo.name = name;
    todo.isDone = isDone;

    return this.todoRepository.save(todo);
  }

  getAllDone() {
    return this.todoRepository.findBy({ isDone: true });
  }

  getAllNotDone() {
    return this.todoRepository.findBy({ isDone: false });
  }
}
