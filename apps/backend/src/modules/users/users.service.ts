import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }
    

    findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }
    create(user: Partial<User>) {
        return this.userModel.create(user);
    }
    
    findAll() {
        return this.userModel.find();
    }
}
