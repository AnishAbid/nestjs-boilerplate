import { IsEmail, IsNotEmpty, IsString, IsEmpty, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { isDate } from 'util/types';
import { Field, Int, ObjectType, ObjectTypeOptions } from '@nestjs/graphql';

@ObjectType()
export class ProfileImage {
    @Field({ nullable: true })
    path?: String
    @Field({ nullable: true })
    type?: String
}

@ObjectType()
export class UserObject {
    @Field()
    @IsString()
    @ApiPropertyOptional({ type: String })
    first_name?: String;

    @Field()
    @IsString()
    @ApiPropertyOptional({ type: String })
    last_name?: String;

    @Field()
    @IsNotEmpty()
    @ApiProperty({type: String})
    email: String;

    @IsString()
    @ApiProperty({type: String})
    @Exclude()
    password: String;
    
    @Field()
    @ApiPropertyOptional({type: ProfileImage})
    profile_image?: ProfileImage;

    @Field()
    @ApiPropertyOptional({type: Date})
    dob?: Date;
    
    @Field()
    @ApiPropertyOptional({type: String})
    gender?: String
    constructor(partial: Partial<UserObject>) {
        Object.assign(this, partial);
      }
}
export class GetQuery {
@IsString()
@ApiPropertyOptional()
dob?:Date
@IsString()
@ApiPropertyOptional()
gender: String
}
export class UpdateObject {
    @IsOptional()
    @ApiPropertyOptional({ type: String })
    first_name?: String;

    @IsOptional()
    @ApiPropertyOptional({ type: String })
    last_name?: String;

    @IsOptional()
    @ApiPropertyOptional({type: Object})
    profile_image?: Object;

    @IsOptional()
    @ApiPropertyOptional({type: Date})
    dob?: Date;

    @IsOptional()
    @ApiPropertyOptional({type: String})
    gender?: String
}