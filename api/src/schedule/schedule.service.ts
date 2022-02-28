import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GroupNameDto } from '@app/schedule/dto/GroupName.dto';
import axios, { AxiosResponse } from 'axios';
import { FindGroupResponseInterface } from '@app/schedule/types/findGroupResponse.interface';

@Injectable()
export class ScheduleService {
  async findGroup(
    groupName: GroupNameDto,
  ): Promise<FindGroupResponseInterface | any> {
    console.log(groupName);
    const res = await axios
      .get(
        `https://jutter.online/mai/api/groups/search/${groupName.groupName}`,
        {
          method: 'GET',
          headers: {
            ApiKey: process.env.VUE_APP_SCHEDULE_API_KEY,
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((e) => {
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
      });

    return res;
  }
}
