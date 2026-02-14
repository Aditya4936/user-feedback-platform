import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private userservice: UsersService, private jwtservice: JwtService) { }

    async login(dto: LoginDto) {
        const { email, password } = dto;
        const user = await this.userservice.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password,
        );
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }
        const payload = {
            sub: user._id,
            email: user.email,
            role: user.role,
        };
        const accessToken = this.jwtservice.sign(payload);
        return {
            accessToken,
        };
    }
    async signup(dto: SignupDto) {
        const { name, email, password } = dto;

        const existingUser = await this.userservice.findByEmail(email);
        if (existingUser) {
            throw new ConflictException("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userservice.create({
            name,
            email,
            password: hashedPassword
        });

        return {
            message: "User created successfully",
            userId: user.id
        };
    }
}
