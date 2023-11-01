import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Chat } from "src/schemas/chat.schema";

@Injectable()
export class ChatRepository {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>) {}

  async create(content: string, sender: string) {
    const chat =   await this.chatModel.create({content,sender});
    return chat;
  }

  async getByIDs(ids: Types.ObjectId[]) {
    return await this.chatModel.find({ _id: { $in: ids }});
  }
}
