import {
  Admin,
  AdminRepository,
  adminSchema,
  Trainee,
  TraineeRepository,
  traineeSchema,
  Trainer,
  TrainerRepository,
  trainerSchema,
  User,
  UserRepository,
  userSchema,
} from '@models/index';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
        discriminators: [
          { name: Admin.name, schema: adminSchema },
          { name: Trainee.name, schema: traineeSchema },
          { name: Trainer.name, schema: trainerSchema },
          // { name: User.name, schema: userSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [
    AdminRepository,
    TraineeRepository,
    TrainerRepository,
    UserRepository,
  ],
  exports: [
    AdminRepository,
    TraineeRepository,
    TrainerRepository,
    UserRepository,
  ],
})
export class UserModule {}
