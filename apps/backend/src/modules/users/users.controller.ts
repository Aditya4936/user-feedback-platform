import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req) {
        const user = await this.usersService.findByEmail(req.user.email);
        if (!user) {
            return req.user;
        }
        // Return user data without the password
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    }
}
