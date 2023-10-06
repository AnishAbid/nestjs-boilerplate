import {Inject, Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import { UserModel } from './user.interface';
import {Model} from "mongoose";
@Injectable()
export class UserService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<UserModel>) {}
    private logger: any;
    async findAll(){

    } 
    public findOne(id: number): void {
        
    }
    async create(user: UserModel): Promise<UserModel> {
        const createdPost = this.userModel.create(user);
        return createdPost;
    }
    async delete(id: number): Promise<any> {
        const result = this.userModel.deleteOne({id:id});
        return result
    }
    async update(id:number, data: UserModel): Promise<Omit<UserModel,"email"|"password">>{
        this.logger.log(`Updating post with id: ${id}`);
         const updatedUser = this.userModel.findOneAndUpdate({id:id},data);
         return updatedUser

    }
}