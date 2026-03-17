import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  private todoList: { id: number; name: string; isDone: boolean }[] = [
    { id: 0, name: 'dsaaaa', isDone: false },
  ];

  getAll() {
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
}
