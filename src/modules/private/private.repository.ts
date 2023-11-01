import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Private } from "src/schemas/private.schema";

@Injectable()
export class PrivateRepository {
  constructor(@InjectModel(Private.name) private privateModel: Model<Private>) {}

  async create(message: string, recipient: string) {
    return await this.privateModel.create({ message, recipient });
  }
  async findMessagesByRecipient(userId: string, recipient: string) {
     return this.privateModel.aggregate([
        {
          $match: {
            recipient: recipient
          }
        },
        {
          $lookup: {
            from: 'Chats',
            localField: 'message',
            foreignField: '_id',
            as: 'chatDetails'
          }
        },
        {
          $unwind: '$chatDetails'
        },
        {
          $match: {
            "chatDetails.sender": userId
          }
        },
        {
          $project: {
            "_id": "$chatDetails._id",
            "content": "$chatDetails.content",
            "timestamp": "$chatDetails.timestamp"
          }
        }
      ]).exec();
  }
}
