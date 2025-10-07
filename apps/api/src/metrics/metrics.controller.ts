import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { MetricsService } from "./metrics.service";
import { CreateMetricDto, UpdateMetricDto } from "./dto";

@Controller("metrics")
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Post()
  create(@Body() createMetricDto: CreateMetricDto) {
    return this.metricsService.create(createMetricDto);
  }

  @Get()
  findAll() {
    return this.metricsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.metricsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMetricDto: UpdateMetricDto) {
    return this.metricsService.update(id, updateMetricDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: string) {
    return this.metricsService.remove(id);
  }
}
