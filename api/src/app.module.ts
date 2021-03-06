import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import ormconfig from '@app/ormconfig';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { MembersModule } from './members/members.module';
import { PublicationsModule } from './publications/publications.module';
import { HomePageModule } from './home-page/home-page.module';

@Module({
  imports: [
    TagModule,
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    MembersModule,
    PublicationsModule,
    HomePageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
