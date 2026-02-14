import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })
export class Feedback extends Document {
    @Prop({ required: true })
    subject: string;

    @Prop({ required: true })
    message: string;

    @Prop({ type: Number, min: 1, max: 5 })
    rating: number;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;
}
export const FeedbackSchema = SchemaFactory.createForClass(Feedback);