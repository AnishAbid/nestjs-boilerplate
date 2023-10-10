import { IsEmail, IsNotEmpty, IsString, IsObject, IsOptional, IsDate } from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class SignUpObj {

/* 
To Accept Partial Object
constructor(partial:Partial<SignUpObj>){
    Object.assign(this,partial)
} */
    @ApiPropertyOptional({ type: String })
    @IsString()
    first_name?: String;

    @ApiPropertyOptional({ type: String })
    @IsString()
    last_name?: String;

    @ApiProperty({type: String})
    @IsNotEmpty()
    email: String;

    @ApiProperty({type: String})
    @IsNotEmpty()
    @IsString()
    password: String;

    @ApiPropertyOptional({type: Object})
    @IsOptional()
    @IsObject()
    profile_image?: Object;

    @ApiPropertyOptional({type: Date})
    @IsString()
    dob?: Date;
    
    @ApiPropertyOptional({type: String})
    @IsString()
    gender?: String
}
export class SignInObj{
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: String;
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    password: String
}
/* export class SignInObj{
    //@ApiProperty({type: String})
    email: String;
    //@ApiProperty({type: String})
    password: String
} */
/* Implementaion with nestjs validator package */
/* export class SignUpObj {
    first_name?: String;
    last_name?: String;
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: String;
    @IsNotEmpty()
    @IsString()
    password: String;
    profile_image?: String;
    Dob?: Date;
    gender?: String
} */
