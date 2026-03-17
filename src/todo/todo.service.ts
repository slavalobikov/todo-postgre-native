import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todoList: { id: number; name: string; isDone: boolean }[] = [
    { id: 0, name: 'dsaaaa', isDone: false },
  ];

  getAll() {
    return this.todoList;
  }

  getCurrent(id: string) {
    const todo = this.todoList.find((el) => String(el.id) === String(id));
    if (!todo) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    return todo;
  }

  addNew(name: string) {
    const lastId = this.todoList.length
      ? this.todoList[this.todoList.length - 1].id
      : -1;

    const todo = { id: lastId + 1, name, isDone: false };
    this.todoList.push(todo);
    return todo;
  }

  remove(id: number) {
    const index = this.todoList.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    this.todoList.splice(index, 1);
    return { deleted: true };
  }

  update(id: number, name: string, isDone: boolean) {
    const index = this.todoList.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with id "${id}" not found`);
    }
    const updated = { ...this.todoList[index], name, isDone };
    this.todoList[index] = updated;
    return updated;
  }
}
