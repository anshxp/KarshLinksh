import { Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [LinksController],
  providers: [LinksService, PrismaService],
  exports: [LinksService],  // 👈 make it available outside this module
})
export class LinksModule {}
