// apps/backend/src/modules/users/entities/user.entity.ts
import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  email: string;
  password?: string;
  name: string | null;
  avatarUrl: string | null;
  googleId: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}