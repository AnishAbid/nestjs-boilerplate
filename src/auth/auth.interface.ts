import { IsEmail, IsNotEmpty,IsString } from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class SignUpObj {

    @ApiPropertyOptional({ type: String })
    first_name?: String;

    @ApiPropertyOptional({ type: String })
    last_name?: String;

    @ApiProperty({type: String})
    @IsNotEmpty()
    email: String;

    @ApiProperty({type: String})
    @IsNotEmpty()
    password: String;

    @ApiPropertyOptional({type: Object})
    profile_image?: Object;

    @ApiPropertyOptional({type: Date})
    dob?: Date;
    
    @ApiPropertyOptional({type: String})
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
