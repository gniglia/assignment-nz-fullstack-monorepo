import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { FastifyReply } from "fastify";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto, UserQueryDto } from "./dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Query() queryParams: UserQueryDto, @Res({ passthrough: true }) reply: FastifyReply) {
    const { users, totalCount } = await this.usersService.findAllWithCount(queryParams);

    // Set X-Total-Count header for pagination compatibility with json-server
    reply.header("X-Total-Count", totalCount.toString());

    return users;
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
