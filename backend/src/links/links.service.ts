import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto, UpdateLinkDto } from './dto';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto) {
    console.log('=== CREATE LINK START ===');
    console.log('Input DTO:', createLinkDto);
    
    // Use customCode or shortCode if provided, otherwise generate one
    let shortCode = createLinkDto.customCode || createLinkDto.shortCode;
    const isCustomCode = !!(createLinkDto.customCode || createLinkDto.shortCode);
    
    console.log('Custom code provided:', isCustomCode);
    console.log('Initial shortCode:', shortCode);
    
    // Generate shortCode if not provided
    if (!shortCode) {
      console.log('Generating unique shortCode...');
      shortCode = await this.generateUniqueShortCode();
      console.log('Generated shortCode:', shortCode);
    }
    
    // Create basic link data
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
    } catch (error) {
      console.log('Error occurred:', error.code, error.message);
      if (error.code === 'P2002' && error.meta?.target?.includes('shortCode')) {
        if (isCustomCode) {
          console.log('Custom code conflict, throwing ConflictException');
          throw new ConflictException(`Short code '${shortCode}' is already taken`);
        } else {
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

  async findAll(query: any = {}) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    
    return this.prisma.link.findMany({
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.link.findUnique({
      where: { id },
    });
  }

  async findByShortCode(shortCode: string) {
    const link = await this.prisma.link.findUnique({
      where: { shortCode },
    });

    if (link && link.isActive) {
      // Increment click count
      await this.prisma.link.update({
        where: { shortCode },
        data: { clicks: { increment: 1 } },
      });
    }

    return link;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    return this.prisma.link.update({
      where: { id },
      data: updateLinkDto,
    });
  }

  async remove(id: string) {
    return this.prisma.link.delete({
      where: { id },
    });
  }

  private generateShortCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  private async generateUniqueShortCode(): Promise<string> {
    let shortCode: string;
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
    
    // If we can't generate a unique code after 10 attempts, make it longer
    return this.generateShortCode() + Date.now().toString(36);
  }
}
