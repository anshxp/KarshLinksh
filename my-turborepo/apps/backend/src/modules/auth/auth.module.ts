// apps/backend/src/modules/auth/auth.module.ts

// ... existing imports
import { GoogleStrategy } from './strategies/google.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma/prisma.service';
@Module({
  imports: [
    // ...
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy, // Add the new strategy here
  ],
})
export class AuthModule {}