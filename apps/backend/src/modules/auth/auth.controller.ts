import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) { }

   @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authservice.login(dto);
  }
  @Post("signup")
  signup(@Body() dto: SignupDto) {
    return this.authservice.signup(dto);
  }
}
