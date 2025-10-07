/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing metrics
  console.log("🧹 Clearing existing metrics...");
  await prisma.metric.deleteMany();

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
