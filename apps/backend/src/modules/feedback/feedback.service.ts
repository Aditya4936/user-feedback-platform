import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Feedback } from './feedback.schema';
import { Model, Types } from 'mongoose';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectModel(Feedback.name) private feedbackModel: Model<Feedback>,
    ) { }

    async create(dto: CreateFeedbackDto, userId: string) {
        return this.feedbackModel.create({
            ...dto,
            userId: new Types.ObjectId(userId),
        });
    }

    async findAll() {
        return this.feedbackModel
            .find()
            .populate("userId", "name email")
            .sort({ createdAt: -1 });
    }

    async findByUser(userId: string, page = 1, limit = 10) {
        const filter = { userId: new Types.ObjectId(userId) };
        const [data, total] = await Promise.all([
            this.feedbackModel
                .find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 }),
            this.feedbackModel.countDocuments(filter),
        ]);

        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    async update(
        feedbackId: string,
        dto: CreateFeedbackDto,
        userId: string,
    ) {
        const feedback = await this.feedbackModel.findById(feedbackId);

        if (!feedback) {
            throw new NotFoundException("Feedback not found");
        }

        if (feedback.userId.toString() !== userId) {
            throw new ForbiddenException("You can only update your own feedback");
        }

        Object.assign(feedback, dto);
        return feedback.save();
    }

    async delete(
        feedbackId: string,
        userId: string,
    ) {
        const feedback = await this.feedbackModel.findById(feedbackId);

        if (!feedback) {
            throw new NotFoundException("Feedback not found");
        }

        if (feedback.userId.toString() !== userId) {
            throw new ForbiddenException("You can only delete your own feedback");
        }

        await feedback.deleteOne();
        return { message: "Feedback deleted successfully" };
    }

    async findAllPaginated(page = 1, limit = 10, rating?: number) {
        const filter: any = {};
        if (rating) filter.rating = rating;

        const [data, total] = await Promise.all([
            this.feedbackModel
                .find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ createdAt: -1 })
                .populate("userId", "name email"),
            this.feedbackModel.countDocuments(filter),
        ]);

        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }
}
