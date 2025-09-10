import { AuthService } from './auth.service';
import type { Request, Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: Request, res: Response): Promise<void>;
    getProfile(req: Request): Promise<{
        id: string;
        name: string | null;
        email: string;
        avatar: string | null;
        plan: import("@prisma/client").$Enums.Plan;
    }>;
}
