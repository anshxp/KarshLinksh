import { Controller, Get, Param, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';
import { LinksService } from './links/links.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly linksService: LinksService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('s/:shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const link = await this.linksService.findByShortCode(shortCode);
    
    if (!link) {
      throw new NotFoundException('Short link not found');
    }

    if (!link.isActive) {
      throw new NotFoundException('Short link is inactive');
    }

    if (link.expiresAt && new Date() > link.expiresAt) {
      throw new NotFoundException('Short link has expired');
    }

    // If password protected, you might want to handle password validation here
    // For now, we'll just redirect

    return res.redirect(HttpStatus.MOVED_PERMANENTLY, link.originalUrl);
  }
}
