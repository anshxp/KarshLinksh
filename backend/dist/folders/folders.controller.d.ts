import { FoldersService } from './folders.service';
import { CreateFolderDto, UpdateFolderDto } from './dto';
import type { Request } from 'express';
export declare class FoldersController {
    private readonly foldersService;
    constructor(foldersService: FoldersService);
    create(createFolderDto: CreateFolderDto, req: Request): Promise<{
        _count: {
            links: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: import("@prisma/client").$Enums.FolderColor;
        userId: string;
    }>;
    findAll(req: Request): Promise<({
        _count: {
            links: number;
        };
        links: {
            shortCode: string;
            id: string;
            clicks: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: import("@prisma/client").$Enums.FolderColor;
        userId: string;
    })[]>;
    update(id: string, updateFolderDto: UpdateFolderDto, req: Request): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: import("@prisma/client").$Enums.FolderColor;
        userId: string;
    }>;
    remove(id: string, req: Request): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: import("@prisma/client").$Enums.FolderColor;
        userId: string;
    }>;
}
