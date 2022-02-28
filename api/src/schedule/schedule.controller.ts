import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ScheduleService } from '@app/schedule/schedule.service';
import { GroupNameDto } from '@app/schedule/dto/GroupName.dto';
import { FindGroupResponseInterface } from '@app/schedule/types/findGroupResponse.interface';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('findGroup')
  @UsePipes(new ValidationPipe())
  async findGroup(
    @Body() groupNameDto: GroupNameDto,
  ): Promise<FindGroupResponseInterface> {
    return await this.scheduleService.findGroup(groupNameDto);
  }
}
