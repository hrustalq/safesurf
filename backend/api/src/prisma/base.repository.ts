import { NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PaginationDto } from '../utils/pagination.util';

export abstract class BaseRepository<T> {
  protected constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string,
  ) {}

  async findAll(params: PaginationDto): Promise<{ data: T[]; total: number }> {
    const [data, total] = await Promise.all([
      this.prisma[this.modelName].findMany({
        skip: params.skip,
        take: params.limit,
        orderBy: params.sortBy ? { [params.sortBy]: params.sortOrder } : undefined,
        where: params.search
          ? {
              OR: [
                { name: { contains: params.search, mode: 'insensitive' } },
                { description: { contains: params.search, mode: 'insensitive' } },
              ],
            }
          : undefined,
      }),
      this.prisma[this.modelName].count(),
    ]);

    return { data, total };
  }

  async findById(id: string): Promise<T> {
    const record = await this.prisma[this.modelName].findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }

    return record;
  }

  async create(data: any): Promise<T> {
    return this.prisma[this.modelName].create({
      data,
    });
  }

  async update(id: string, data: any): Promise<T> {
    try {
      return await this.prisma[this.modelName].update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<T> {
    try {
      return await this.prisma[this.modelName].delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
      }
      throw error;
    }
  }
} 