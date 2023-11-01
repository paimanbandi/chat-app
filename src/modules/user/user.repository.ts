import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(user: CreateUserDto) {
    return await this.userModel.create({ ...user });
  } 

  async findOneByUsername(username: string) {
    return await this.userModel.findOne({ username }).exec();
  }

  async find() {
    return await this.userModel.find().select('username').exec();
  }
}
