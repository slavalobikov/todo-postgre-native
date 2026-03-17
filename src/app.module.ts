import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      type: process.env.POSTGRESQL_DB_TYPE,
      host: process.env.POSTGRESQL_DB_HOST,
      port: Number(process.env.POSTGRESQL_DB_PORT),
      username: process.env.POSTGRESQL_DB_USERNAME,
      password: process.env.POSTGRESQL_DB_PASSWORD,
      database: process.env.POSTGRESQL_DB,
      entities: [Todo],
      synchronize: true,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
