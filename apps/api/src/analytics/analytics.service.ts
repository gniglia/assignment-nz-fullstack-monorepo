import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateAnalyticsDto, UpdateAnalyticsDto } from "./dto";

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.analytics.findMany({
      orderBy: { date: "asc" },
    });
  }

  async findOne(id: string) {
    const analytics = await this.prisma.analytics.findUnique({
      where: { id },
    });

    if (!analytics) {
      throw new NotFoundException("Analytics record not found");
    }

    return analytics;
  }

  async create(createAnalyticsDto: CreateAnalyticsDto) {
    return this.prisma.analytics.create({
      data: createAnalyticsDto,
    });
  }

  async update(id: string, updateAnalyticsDto: UpdateAnalyticsDto) {
    try {
      return await this.prisma.analytics.update({
        where: { id },
        data: updateAnalyticsDto,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException("Analytics record not found");
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.analytics.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException("Analytics record not found");
      }
      throw error;
    }
  }
}
