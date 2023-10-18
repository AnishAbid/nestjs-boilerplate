import { Body, ClassSerializerInterceptor, Controller, Delete, Get,
     Param, ParseIntPipe, Patch, Post,
      Put, Query, UseInterceptors } from "@nestjs/common";
import { identity } from "rxjs";
import { UserService } from "./user.service";
import {UserObject, GetQuery, UpdateObject} from "./user.interface"
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
    ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import { Public } from "src/decorators/custom.decorator";
/* 
@UseInterceptors(ClassSerializerInterceptor)
use this to overwrite/manipulate/serialize incoming or out going object.
*/
@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
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
@UseInterceptors(ClassSerializerInterceptor)
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