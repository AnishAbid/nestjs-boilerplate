import {BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import { UserObject, GetQuery, UpdateObject } from './user.interface';
import {Model} from "mongoose";
@Injectable()
export class UserService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<UserObject>) {}
    private logger: any;
    async findAll(query): Promise<any>{
        try {
            let result = await this.userModel.find(query)
            if(!result)
                return new NotFoundException()
            return result 
        } catch (error) {
            return new InternalServerErrorException(error)
        }
         
    } 
    async findOne(id: string): Promise<any> {
        try {
            let result = await this.userModel.findOne({_id:id});
            if(!result)
                return new NotFoundException()
            return result 
        } catch (error) {
            return new InternalServerErrorException(error)
        }
        
    }
    async findByEmail(email): Promise<any> {
        try {
            let result = await this.userModel.findOne({email:email});
            if(!result)
                return new NotFoundException()
            return result 
        } catch (error) {
            return new InternalServerErrorException(error)
        }
        
    }
    async  create(user: UserObject): Promise<any> {
        try {
            let result = await this.userModel.create(user);
            return result;
        } catch (error) {
            if(error.code ==11000)
                return new UnprocessableEntityException("User with same credentials already exists")
            else
            return new InternalServerErrorException(error)     
        }
        
    }
    async delete(id: string): Promise<any> {
        try {
            let result = await this.userModel.deleteOne({_id:id});
            return result
        } catch (error) {
            return new InternalServerErrorException(error)
        }
        
    }
    async update(id:string, data: UpdateObject): Promise<any>{
        try {
            //this.logger.log(`Updating post with id: ${id}`);
            let updatedUser = await this.userModel.findOneAndUpdate({_id:id},data,{new:true});
            return updatedUser  
        } catch (error) {
            return new InternalServerErrorException(error)
        }
        

    }
}