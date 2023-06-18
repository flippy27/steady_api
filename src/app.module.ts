import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Habit } from './habits/entities/habit.entity';
import { HabitsModule } from './habits/habits.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';



@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "Marucero33@gmail.com",
          pass: "msglnocczglxlsta",
        },
      },
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new PugAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [
        Habit,
        User

      ],
      synchronize: true,
    }),
    HabitsModule,
    UsersModule,
    MailerModule
    
 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
