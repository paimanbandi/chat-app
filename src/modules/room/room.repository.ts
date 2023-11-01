import { Injectable } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Room } from "src/schemas/room.schema";

@Injectable()
export class RoomRepository {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}
  async create(name: string, creator: string) {
    return await this.roomModel.create({ name, creator, participants: [creator]});
  }

  async join(roomId: string, userId: string) {
   const roomObjectId = new Types.ObjectId(roomId);
    const userObjectId = new Types.ObjectId(userId);    

    return await this.roomModel.updateOne(
      { _id: roomObjectId },
      { $addToSet: { participants: userObjectId } }
    ).exec();
  }

  
  async updateMessage(roomId: string, chatId: string) {
    console.log(chatId);
   const roomObjectId = new Types.ObjectId(roomId);
    const chatObjectId = new Types.ObjectId(chatId);    

    const res = await this.roomModel.updateOne(
      { _id: roomObjectId },
      { $addToSet: { messages: chatObjectId } }
    ).exec();
    console.log(res);
    return res;
  }

  async getList(){
    return await this.roomModel.find();
  } 

  async findById(room: string){
    return await this.roomModel.findById(room).exec();
  }
}
