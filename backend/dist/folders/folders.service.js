"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoldersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FoldersService = class FoldersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createFolder(userId, createFolderDto) {
        return this.prisma.folder.create({
            data: {
                ...createFolderDto,
                userId,
            },
            include: {
                _count: {
                    select: { links: true },
                },
            },
        });
    }
    async getUserFolders(userId) {
        return this.prisma.folder.findMany({
            where: { userId },
            include: {
                _count: {
                    select: { links: true },
                },
                links: {
                    take: 3,
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        shortCode: true,
                        clicks: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateFolder(userId, folderId, updateFolderDto) {
        const folder = await this.prisma.folder.findFirst({
            where: { id: folderId, userId },
        });
        if (!folder) {
            throw new common_1.NotFoundException('Folder not found');
        }
        return this.prisma.folder.update({
            where: { id: folderId },
            data: updateFolderDto,
        });
    }
    async deleteFolder(userId, folderId) {
        const folder = await this.prisma.folder.findFirst({
            where: { id: folderId, userId },
        });
        if (!folder) {
            throw new common_1.NotFoundException('Folder not found');
        }
        await this.prisma.link.updateMany({
            where: { folderId },
            data: { folderId: null },
        });
        return this.prisma.folder.delete({
            where: { id: folderId },
        });
    }
};
exports.FoldersService = FoldersService;
exports.FoldersService = FoldersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FoldersService);
//# sourceMappingURL=folders.service.js.map