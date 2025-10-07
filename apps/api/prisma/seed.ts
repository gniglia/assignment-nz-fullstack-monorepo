/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  console.log("🧹 Clearing existing data...");
  await prisma.user.deleteMany();
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

  // Seed users data
  console.log("👥 Seeding users data...");
  const users = await prisma.user.createMany({
    data: [
      {
        id: "5",
        name: "David Brown Jr",
        email: "david.brown@example.com",
        role: "user",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        createdAt: new Date("2024-02-05T14:30:00Z"),
        lastLogin: new Date("2024-12-15T16:20:00Z"),
        updatedAt: new Date("2025-09-23T18:58:02.663Z"),
      },
      {
        id: "6",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        role: "user",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        createdAt: new Date("2024-02-10T11:20:00Z"),
        lastLogin: new Date("2024-12-19T09:15:00Z"),
        updatedAt: new Date("2024-12-19T09:15:00Z"),
      },
      {
        id: "7",
        name: "Robert Wilson",
        email: "robert.wilson@example.com",
        role: "moderator",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150",
        createdAt: new Date("2024-02-15T08:45:00Z"),
        lastLogin: new Date("2024-12-18T17:30:00Z"),
        updatedAt: new Date("2024-12-18T17:30:00Z"),
      },
      {
        id: "8",
        name: "Lisa Anderson",
        email: "lisa.anderson@example.com",
        role: "admin",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        createdAt: new Date("2024-02-20T13:15:00Z"),
        lastLogin: new Date("2024-12-19T12:45:00Z"),
        updatedAt: new Date("2024-12-19T12:45:00Z"),
      },
      {
        id: "9",
        name: "Michael Garcia",
        email: "michael.garcia@example.com",
        role: "user",
        status: "pending",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
        createdAt: new Date("2024-02-25T16:30:00Z"),
        lastLogin: null,
        updatedAt: new Date("2024-02-25T16:30:00Z"),
      },
      {
        id: "10",
        name: "Jennifer Martinez",
        email: "jennifer.martinez@example.com",
        role: "user",
        status: "inactive",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
        createdAt: new Date("2024-03-01T10:00:00Z"),
        lastLogin: new Date("2024-11-15T14:20:00Z"),
        updatedAt: new Date("2024-11-15T14:20:00Z"),
      },
      {
        id: "11",
        name: "Christopher Lee",
        email: "christopher.lee@example.com",
        role: "moderator",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        createdAt: new Date("2024-03-05T14:45:00Z"),
        lastLogin: new Date("2024-12-17T11:30:00Z"),
        updatedAt: new Date("2024-12-17T11:30:00Z"),
      },
      {
        id: "12",
        name: "Amanda Taylor",
        email: "amanda.taylor@example.com",
        role: "user",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b402?w=150",
        createdAt: new Date("2024-03-10T09:30:00Z"),
        lastLogin: new Date("2024-12-19T08:15:00Z"),
        updatedAt: new Date("2024-12-19T08:15:00Z"),
      },
      {
        id: "13",
        name: "Daniel Rodriguez",
        email: "daniel.rodriguez@example.com",
        role: "admin",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        createdAt: new Date("2024-03-15T12:15:00Z"),
        lastLogin: new Date("2024-12-18T15:45:00Z"),
        updatedAt: new Date("2024-12-18T15:45:00Z"),
      },
      {
        id: "14",
        name: "Michelle White",
        email: "michelle.white@example.com",
        role: "user",
        status: "pending",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        createdAt: new Date("2024-03-20T11:45:00Z"),
        lastLogin: null,
        updatedAt: new Date("2024-03-20T11:45:00Z"),
      },
      {
        id: "15",
        name: "James Thompson",
        email: "james.thompson@example.com",
        role: "moderator",
        status: "inactive",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        createdAt: new Date("2024-03-25T15:20:00Z"),
        lastLogin: new Date("2024-10-20T09:30:00Z"),
        updatedAt: new Date("2024-10-20T09:30:00Z"),
      },
      {
        id: "16",
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        role: "user",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        createdAt: new Date("2024-03-30T13:30:00Z"),
        lastLogin: new Date("2024-12-16T16:20:00Z"),
        updatedAt: new Date("2024-12-16T16:20:00Z"),
      },
      {
        id: "17",
        name: "Kevin Brown",
        email: "kevin.brown@example.com",
        role: "admin",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150",
        createdAt: new Date("2024-04-05T10:15:00Z"),
        lastLogin: new Date("2024-12-19T14:30:00Z"),
        updatedAt: new Date("2024-12-19T14:30:00Z"),
      },
      {
        id: "18",
        name: "Rachel Davis",
        email: "rachel.davis@example.com",
        role: "user",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        createdAt: new Date("2024-04-10T14:45:00Z"),
        lastLogin: new Date("2024-12-17T12:15:00Z"),
        updatedAt: new Date("2024-12-17T12:15:00Z"),
      },
      {
        id: "19",
        name: "Matthew Wilson",
        email: "matthew.wilson@example.com",
        role: "moderator",
        status: "pending",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
        createdAt: new Date("2024-04-15T16:20:00Z"),
        lastLogin: null,
        updatedAt: new Date("2024-04-15T16:20:00Z"),
      },
      {
        id: "20",
        name: "Jessica Garcia",
        email: "jessica.garcia@example.com",
        role: "user",
        status: "inactive",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
        createdAt: new Date("2024-04-20T11:30:00Z"),
        lastLogin: new Date("2024-11-10T08:45:00Z"),
        updatedAt: new Date("2024-11-10T08:45:00Z"),
      },
      {
        id: "21",
        name: "Andrew Martinez",
        email: "andrew.martinez@example.com",
        role: "admin",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        createdAt: new Date("2024-04-25T09:15:00Z"),
        lastLogin: new Date("2024-12-18T10:30:00Z"),
        updatedAt: new Date("2024-12-18T10:30:00Z"),
      },
      {
        id: "22",
        name: "Stephanie Lee",
        email: "stephanie.lee@example.com",
        role: "user",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b402?w=150",
        createdAt: new Date("2024-04-30T12:45:00Z"),
        lastLogin: new Date("2024-12-19T07:20:00Z"),
        updatedAt: new Date("2024-12-19T07:20:00Z"),
      },
      {
        id: "24",
        name: "Nicole Rodriguez",
        email: "nicole.rodriguez@example.com",
        role: "user",
        status: "pending",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        createdAt: new Date("2024-05-10T13:20:00Z"),
        lastLogin: null,
        updatedAt: new Date("2024-05-10T13:20:00Z"),
      },
      {
        id: "25",
        name: "Brandon White",
        email: "brandon.white@example.com",
        role: "admin",
        status: "inactive",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        createdAt: new Date("2024-05-15T11:45:00Z"),
        lastLogin: new Date("2024-09-15T14:30:00Z"),
        updatedAt: new Date("2024-09-15T14:30:00Z"),
      },
      {
        id: "26",
        name: "Ashley Thompson",
        email: "ashley.thompson@example.com",
        role: "user",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
        createdAt: new Date("2024-05-20T14:15:00Z"),
        lastLogin: new Date("2024-12-17T09:45:00Z"),
        updatedAt: new Date("2024-12-17T09:45:00Z"),
      },
      {
        id: "27",
        name: "Justin Johnson",
        email: "justin.johnson@example.com",
        role: "moderator",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150",
        createdAt: new Date("2024-05-25T10:30:00Z"),
        lastLogin: new Date("2024-12-18T16:20:00Z"),
        updatedAt: new Date("2024-12-18T16:20:00Z"),
      },
      {
        id: "28",
        name: "Megan Brown",
        email: "megan.brown@example.com",
        role: "user",
        status: "active",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        createdAt: new Date("2024-05-30T12:20:00Z"),
        lastLogin: new Date("2024-12-19T11:15:00Z"),
        updatedAt: new Date("2024-12-19T11:15:00Z"),
      },
      {
        id: "29",
        name: "Tyler Davis",
        email: "tyler.davis@example.com",
        role: "admin",
        status: "pending",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
        createdAt: new Date("2024-06-05T15:45:00Z"),
        lastLogin: null,
        updatedAt: new Date("2024-06-05T15:45:00Z"),
      },
      {
        id: "30",
        name: "Kayla Wilson",
        email: "kayla.wilson@example.com",
        role: "user",
        status: "inactive",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
        createdAt: new Date("2024-06-10T13:10:00Z"),
        lastLogin: new Date("2024-10-05T12:30:00Z"),
        updatedAt: new Date("2024-10-05T12:30:00Z"),
      },
      {
        id: "YqbfYef",
        name: "John Doe",
        email: "aa@dd.com",
        role: "user",
        status: "active",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John Doe&size=150",
        createdAt: new Date("2025-09-23T17:09:15.878Z"),
        updatedAt: new Date("2025-09-23T17:09:15.878Z"),
      },
    ],
  });

  console.log(`✅ Successfully seeded ${users.count} users!`);

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

  const allUsers = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    take: 5, // Show only first 5 users to avoid cluttering the output
  });

  console.log("\n👥 Sample seeded users:");
  allUsers.forEach((user, index) => {
    console.log(
      `${index + 1}. ${user.name} (${user.email}) - ${user.role} - ${user.status}`
    );
  });
  console.log(`... and ${users.count - 5} more users`);
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
