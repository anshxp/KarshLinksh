import type { Response } from 'express';
import { AppService } from './app.service';
import { LinksService } from './links/links.service';
export declare class AppController {
    private readonly appService;
    private readonly linksService;
    constructor(appService: AppService, linksService: LinksService);
    getHello(): string;
    redirect(shortCode: string, res: Response): Promise<void>;
}
