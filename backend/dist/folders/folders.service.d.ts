import { PrismaService } from '../prisma/prisma.service';
import { CreateFolderDto, UpdateFolderDto } from './dto';
export declare class FoldersService {
    private prisma;
    constructor(prisma: PrismaService);
    createFolder(userId: string, createFolderDto: CreateFolderDto): Promise<{
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
    getUserFolders(userId: string): Promise<({
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
    updateFolder(userId: string, folderId: string, updateFolderDto: UpdateFolderDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: import("@prisma/client").$Enums.FolderColor;
        userId: string;
    }>;
    deleteFolder(userId: string, folderId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: import("@prisma/client").$Enums.FolderColor;
        userId: string;
    }>;
}
