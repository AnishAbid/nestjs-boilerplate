import { IsEmail, IsNotEmpty, IsString, IsEmpty, IsOptional } from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import { isDate } from 'util/types';

export class UserObject {
    @IsString()
    @ApiPropertyOptional({ type: String })
    first_name?: String;

    @IsString()
    @ApiPropertyOptional({ type: String })
    last_name?: String;

    @IsNotEmpty()
    @ApiProperty({type: String})
    email: String;

    @IsString()
    @ApiProperty({type: String})
    password: String;
    
    @ApiPropertyOptional({type: Object})
    profile_image?: Object;

    @ApiPropertyOptional({type: Date})
    dob?: Date;
    
    @ApiPropertyOptional({type: String})
    gender?: String
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