import { Controller, Post, Body, Patch, Param, ParseUUIDPipe, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from './decorators/auth.decorator';
import { ApiAuth } from './decorators/api.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Auth([])
  @Get()
  @ApiResponse({
    status: 201,
    example: {
      userId: "UUID",
      userEmail: "user1@gmail.com",
      userPassword: "213erdvfe5",
      userRoles: ["Admin","Manager"]
    } as User
  })
  findAll() {
    return this.userService.findAll();
  }

  @Auth([])
  @Post('signup')
  @ApiResponse({
    status: 201,
    example: {
      userId: "UUID",
      userEmail: "user1@gmail.com",
      userPassword: "213erdvfe5",
      userRoles: ["Admin","Manager"]
    } as User
  })
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    example: {
      userId: "UUID",
      userEmail: "user1@gmail.com",
      userPassword: "213erdvfe5",
      userRoles: ["Admin","Manager"]
    } as User
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Auth([])
  @ApiResponse({
    status: 201,
    example: {
      userId: "UUID",
      userEmail: "user1@gmail.com",
      userPassword: "213erdvfe5",
      userRoles: ["Admin","Manager"]
    } as User
  })
  @Patch('/update/:userEmail')
  update(@Param('userEmail') userEmail: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userEmail, updateUserDto);
  }


}
