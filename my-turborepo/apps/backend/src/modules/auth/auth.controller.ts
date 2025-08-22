// apps/backend/src/modules/auth/auth.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // ... existing methods

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    // This route is hit after successful Google login
    // The user object with JWT is returned from the validateGoogleUser method
    // req.user will contain the data returned by validate method of GoogleStrategy
    return req.user;
  }
}