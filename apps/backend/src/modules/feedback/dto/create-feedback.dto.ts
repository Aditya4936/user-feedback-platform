import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max } from "class-validator";

export class CreateFeedbackDto {
    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    rating?: number;
}