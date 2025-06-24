import { Controller, Post, Body } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  @Post()
  createTask(@Body() body: { title: string }) {
    console.log('タスク受信:', body);
    return { message: 'タスクを受信した', data: body };
  }
}
