import { Controller, Post, Body, Patch, Param, ParseUUIDPipe, Get} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from './decorators/auth.decorator';
import { ApiAuth } from './decorators/api.decorator';

@ApiAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth([])
  @Get()
  findAll(){
    return this.userService.findAll();
  }

  @Auth([])
  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.registerUser(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto){
    return this.userService.loginUser(loginUserDto);
  }

  @Auth([])
  @Patch('/update/:userEmail')
  update(@Param('userEmail') userEmail: string, @Body() updateUserDto: UpdateUserDto){
    return this.userService.update(userEmail, updateUserDto);
  }


}
