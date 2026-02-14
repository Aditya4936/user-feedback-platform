import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) { }

    // ─── User endpoints (any authenticated user) ───

    @Post()
    create(@Body() dto: CreateFeedbackDto, @Req() req) {
        return this.feedbackService.create(dto, req.user.userId);
    }

    @Get('my')
    findMy(
        @Req() req,
        @Query("page") page = "1",
        @Query("limit") limit = "10",
    ) {
        return this.feedbackService.findByUser(
            req.user.userId,
            Number(page),
            Number(limit),
        );
    }

    @Put(":id")
    update(
        @Param("id") id: string,
        @Body() dto: CreateFeedbackDto,
        @Req() req,
    ) {
        return this.feedbackService.update(id, dto, req.user.userId);
    }

    @Delete(":id")
    remove(@Param("id") id: string, @Req() req) {
        return this.feedbackService.delete(id, req.user.userId);
    }

    // ─── Admin-only endpoints ───

    @Get("admin/all")
    @UseGuards(RolesGuard)
    @Roles("admin")
    findAllForAdmin(
        @Query("page") page = "1",
        @Query("limit") limit = "10",
        @Query("rating") rating?: string,
    ) {
        return this.feedbackService.findAllPaginated(
            Number(page),
            Number(limit),
            rating ? Number(rating) : undefined,
        );
    }
}
