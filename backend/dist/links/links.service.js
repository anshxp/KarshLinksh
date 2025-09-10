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
exports.LinksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LinksService = class LinksService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createLinkDto) {
        console.log('=== CREATE LINK START ===');
        console.log('Input DTO:', createLinkDto);
        let shortCode = createLinkDto.customCode || createLinkDto.shortCode;
        const isCustomCode = !!(createLinkDto.customCode || createLinkDto.shortCode);
        console.log('Custom code provided:', isCustomCode);
        console.log('Initial shortCode:', shortCode);
        if (!shortCode) {
            console.log('Generating unique shortCode...');
            shortCode = await this.generateUniqueShortCode();
            console.log('Generated shortCode:', shortCode);
        }
        const data = {
            originalUrl: createLinkDto.originalUrl,
            shortCode,
            ...(createLinkDto.title && { title: createLinkDto.title }),
            ...(createLinkDto.description && { description: createLinkDto.description }),
            ...(createLinkDto.favicon && { favicon: createLinkDto.favicon }),
            ...(createLinkDto.isActive !== undefined && { isActive: createLinkDto.isActive }),
            ...(createLinkDto.expiresAt && { expiresAt: new Date(createLinkDto.expiresAt) }),
            ...(createLinkDto.password && { password: createLinkDto.password }),
        };
        console.log('Final data object:', data);
        try {
            console.log('Attempting to create link...');
            const result = await this.prisma.link.create({ data });
            console.log('Link created successfully:', result.id);
            return result;
        }
        catch (error) {
            console.log('Error occurred:', error.code, error.message);
            if (error.code === 'P2002' && error.meta?.target?.includes('shortCode')) {
                if (isCustomCode) {
                    console.log('Custom code conflict, throwing ConflictException');
                    throw new common_1.ConflictException(`Short code '${shortCode}' is already taken`);
                }
                else {
                    console.log('Generated code conflict, retrying with timestamp...');
                    data.shortCode = this.generateShortCode() + Date.now().toString(36);
                    console.log('New shortCode:', data.shortCode);
                    return await this.prisma.link.create({ data });
                }
            }
            console.log('Rethrowing error');
            throw error;
        }
    }
    async findAll(query = {}) {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        return this.prisma.link.findMany({
            skip,
            take: Number(limit),
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.link.findUnique({
            where: { id },
        });
    }
    async findByShortCode(shortCode) {
        const link = await this.prisma.link.findUnique({
            where: { shortCode },
        });
        if (link && link.isActive) {
            await this.prisma.link.update({
                where: { shortCode },
                data: { clicks: { increment: 1 } },
            });
        }
        return link;
    }
    async update(id, updateLinkDto) {
        return this.prisma.link.update({
            where: { id },
            data: updateLinkDto,
        });
    }
    async remove(id) {
        return this.prisma.link.delete({
            where: { id },
        });
    }
    generateShortCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
    async generateUniqueShortCode() {
        let shortCode;
        let attempts = 0;
        const maxAttempts = 10;
        do {
            shortCode = this.generateShortCode();
            const existingLink = await this.prisma.link.findUnique({
                where: { shortCode },
            });
            if (!existingLink) {
                return shortCode;
            }
            attempts++;
        } while (attempts < maxAttempts);
        return this.generateShortCode() + Date.now().toString(36);
    }
};
exports.LinksService = LinksService;
exports.LinksService = LinksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LinksService);
//# sourceMappingURL=links.service.js.map