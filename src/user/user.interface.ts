import { IsEmail, IsNotEmpty,IsString } from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class UserObject {
    @ApiPropertyOptional({ type: Number })
    id?: Number;
    @ApiPropertyOptional({ type: String })
    first_name?: String;

    @ApiPropertyOptional({ type: String })
    last_name?: String;

    @ApiProperty({type: String})
    email: String;

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
@ApiPropertyOptional()
dob?:Date

@ApiPropertyOptional()
gender: String
}