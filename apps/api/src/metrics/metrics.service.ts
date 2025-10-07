import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateMetricDto, UpdateMetricDto } from "./dto";

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.metric.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findOne(id: string) {
    const metric = await this.prisma.metric.findUnique({
      where: { id },
    });

    if (!metric) {
      throw new NotFoundException("Metric not found");
    }

    return metric;
  }

  async create(createMetricDto: CreateMetricDto) {
    return this.prisma.metric.create({
      data: createMetricDto,
    });
  }

  async update(id: string, updateMetricDto: UpdateMetricDto) {
    try {
      return await this.prisma.metric.update({
        where: { id },
        data: updateMetricDto,
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException("Metric not found");
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.metric.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new NotFoundException("Metric not found");
      }
      throw error;
    }
  }
}
