/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("🧹 Clearing existing data...");
  await prisma.metric.deleteMany();
  await prisma.analytics.deleteMany();

  // Seed metrics data
  console.log("📊 Seeding metrics data...");
  const metrics = await prisma.metric.createMany({
    data: [
      {
        title: "Total Users",
        value: 1240,
        change: 12.5,
        changeType: "increase",
        icon: "users",
      },
      {
        title: "Active Sessions",
        value: 89,
        change: -3.2,
        changeType: "decrease",
        icon: "activity",
      },
      {
        title: "Revenue",
        value: 24500,
        change: 8.7,
        changeType: "increase",
        icon: "dollar-sign",
      },
      {
        title: "Conversion Rate",
        value: 3.24,
        change: 2.1,
        changeType: "increase",
        icon: "trending-up",
      },
    ],
  });

  console.log(`✅ Successfully seeded ${metrics.count} metrics!`);

  // Seed analytics data
  console.log("📈 Seeding analytics data...");
  const analytics = await prisma.analytics.createMany({
    data: [
      {
        label: "Jan",
        value: 400,
        date: new Date("2024-01-01"),
      },
      {
        label: "Feb",
        value: 300,
        date: new Date("2024-02-01"),
      },
      {
        label: "Mar",
        value: 600,
        date: new Date("2024-03-01"),
      },
      {
        label: "Apr",
        value: 800,
        date: new Date("2024-04-01"),
      },
      {
        label: "May",
        value: 500,
        date: new Date("2024-05-01"),
      },
      {
        label: "Jun",
        value: 750,
        date: new Date("2024-06-01"),
      },
    ],
  });

  console.log(`✅ Successfully seeded ${analytics.count} analytics records!`);

  // Display seeded data
  const allMetrics = await prisma.metric.findMany({
    orderBy: { createdAt: "asc" },
  });

  console.log("\n📋 Seeded metrics:");
  allMetrics.forEach((metric, index) => {
    console.log(
      `${index + 1}. ${metric.title}: ${metric.value} (${metric.change > 0 ? "+" : ""}${metric.change}%)`
    );
  });

  const allAnalytics = await prisma.analytics.findMany({
    orderBy: { date: "asc" },
  });

  console.log("\n📈 Seeded analytics:");
  allAnalytics.forEach((analytics, index) => {
    console.log(
      `${index + 1}. ${analytics.label}: ${analytics.value} (${analytics.date.toISOString().split('T')[0]})`
    );
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("\n🎉 Database seed completed successfully!");
  })
  .catch(async (e) => {
    console.error("❌ Error during seed:", e);
    await prisma.$disconnect();
    throw e;
  });
