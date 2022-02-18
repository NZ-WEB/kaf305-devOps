import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { MembersService } from '@app/members/members.service';
import { MembersDto } from '@app/members/dto/members.dto';
import { MemberResponseInterface } from '@app/members/types/memberResponse.interface';
import { MembersResponseInterface } from '@app/members/types/membersResponse.interface';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createMember(
    @User() currentUser: UserEntity,
    @Body('members') membersDto: MembersDto,
  ): Promise<MemberResponseInterface> {
    const member = await this.membersService.createMember(
      currentUser,
      membersDto,
    );
    return this.membersService.buildMembersResponse(member);
  }

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<MembersResponseInterface> {
    return await this.membersService.findAll(query);
  }

  @Get(':slug')
  async getMember(
    @Param('slug') slug: string,
  ): Promise<MemberResponseInterface> {
    const member = await this.membersService.findBySlug(slug);
    return this.membersService.buildMembersResponse(member);
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteMember(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.membersService.deleteMember(slug);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  async updateMember(
    @Body('members') memberDto: MembersDto,
    @Param('slug') slug: string,
  ): Promise<MemberResponseInterface> {
    const member = await this.membersService.updateMember(memberDto, slug);
    return await this.membersService.buildMembersResponse(member);
  }
}
