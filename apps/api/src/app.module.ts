import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma.module";
import { MetricsModule } from "./metrics/metrics.module";
import { AnalyticsModule } from "./analytics/analytics.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    MetricsModule,
    AnalyticsModule,
    UsersModule,
  ],
})
export class AppModule {}
