import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from "@nestjs/common";
import { identity } from "rxjs";
import { UserService } from "./user.service";
import {UserObject, GetQuery, UpdateObject} from "./user.interface"
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";

@Controller('user')
@ApiTags('user')
export class UserController{
    constructor(private userService:UserService){}
@Post('/')
create(@Body() data:UserObject){
return this.userService.create(data)
}
@Get('')
getAll(@Query() query:GetQuery){
return this.userService.findAll(query)
}
@Get(':id')
getById(@Param('id') id:string){
return this.userService.findOne(id)
}
@Put(':id')
update(@Param('id') id:string, @Body() data:UpdateObject){
return this.userService.update(id,data)
}
@Delete(':id')
delete(@Param('id') id:string){
return this.userService.delete(id)
}

}