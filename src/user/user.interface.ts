import { IsEmail, IsNotEmpty, IsString, IsEmpty, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { isDate } from 'util/types';
import { Field, Int, ObjectType, ObjectTypeOptions, InputType } from '@nestjs/graphql';

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
/* We have to duplicate the schema as we cannot use same schema with @ObjectType() and @InputType()
 In some cases it throws "schema must contain uniquely named types but contains multiple types named" error.*/
@InputType()
export class MutateProfile {
    @Field({ nullable: true })
    path?: String
    @Field({ nullable: true })
    type?: String
}
@InputType()
export class MutateUser {
    @Field()
    first_name?: String;

    @Field()
    last_name?: String;

    @Field()
    email: String;

    @Field()
    @Exclude()
    password: String;
    
    @Field(type=>MutateProfile)
    profile_image?:MutateProfile;

    @Field()
    dob?: Date;
    
    @Field()
    gender?: String
    constructor(partial: Partial<UserObject>) {
        Object.assign(this, partial);
      }
}
export class OtpObject {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    otp: string;
  }
  
  export class ResetPassword {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
  
  export class ForgotPassword {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
  }
  
  export class VerificationObj {
    @ApiProperty()
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    otp: string;
  
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    query_type: string;
  }
/* export class GetUserObject {
    @Field({ nullable: false })
    _Id?: String; 

    @Field({ nullable: true })
    @IsString()
    @ApiPropertyOptional({ type: String })
    first_name?: String;

    @Field({ nullable: true })
    @IsString()
    @ApiPropertyOptional({ type: String })
    last_name?: String;

    @Field({ nullable: true })
    @IsNotEmpty()
    @ApiProperty({type: String})
    email: String;
    
    @Field({ nullable: true })
    @ApiPropertyOptional({type: ProfileImage}) 
    profile_image?: ProfileImage;

    @Field({ nullable: true })
    @ApiPropertyOptional({type: Date})
    dob?: Date;
    
    @Field({ nullable: true })
    @ApiPropertyOptional({type: String})
    gender?: String
} */