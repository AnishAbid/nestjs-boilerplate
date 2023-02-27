import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

/*export interface PostModel {
    id?: number;
    date: Date;
    title: string;
    body: string;
    category: string;
}*/
export class PostModel {
    @ApiPropertyOptional({ type: Number })
    id?: number;
    @ApiProperty({ type: String, format: 'date-time' })
    date: Date;
    @ApiProperty({ type: String })
    title: string;
    @ApiProperty({ type: String })
    body: string;
    @ApiProperty({ type: String })
    category: string;
}