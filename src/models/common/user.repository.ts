import { AbstractRepository } from '@models/abstract.repository';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.schema.js';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }
}
