import {BadRequestException, Body, Inject, Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import { UserObject,MutateUser} from '../user.interface';
import {Model} from "mongoose";
import { Field, Int, ObjectType, Resolver, Query, ResolveField, Args, Parent, Mutation } from '@nestjs/graphql';
import { Public } from 'src/decorators/custom.decorator';
@Resolver(of => UserObject)
@Injectable()
export class UserResolver {
  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<UserObject>
    
  ) {}
  @Public()
  @Query(returns => UserObject)
  async getUserById(@Args('id') id: string) {
    return this.userModel.findOne({_id:id});
  }
  @Public()
  @Query(returns => [UserObject])
  async getAllUsers() {
    return this.userModel.find();
  }
  @Public()
  @Mutation(returns => UserObject)
  async create(@Args('UserObject') user:MutateUser) {
    return this.userModel.create(user);
  }

  /* @ResolveField()
  async posts(@Parent() author: GetUserObject) {
    const { id } = author;
    return this.userModel.findAll({ authorId: id });
  } */
}