// src/updates/updates.controller.ts

import { Controller, Get, Request } from '@nestjs/common';
import { UpdatesService } from './updates.service';

@Controller('api/updates')
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @Get()
  async getRecentUpdates(@Request() req: any): Promise<{ data: any[] }> {
    const updates = await this.updatesService.getRecentUpdates(req.user.id);
    return { data: updates };
  }
}
