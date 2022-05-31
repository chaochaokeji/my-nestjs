import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) public model: Model<UserDocument>) {}

  async insertOne(user): Promise<User> {
    return this.model.create(user);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.model.findOne({ email, status: 0 }).select({ password: 1 });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.model.findById(id);
  }

  /**
   * 判断username是否重复
   */
  async isHasUsername(username: string): Promise<boolean> {
    return (await this.model.findOne({ username })) ? true : false;
  }

  /**
   * 判断email是否重复
   */
  async isHasEmail(email: string): Promise<boolean> {
    return (await this.model.findOne({ email })) ? true : false;
  }
}
