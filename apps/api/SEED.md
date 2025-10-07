# Database Seeding

This document explains how to populate your database with default data using the seed script.

## 🌱 What is Seeding?

Database seeding is the process of populating your database with initial/default data. This is especially useful for:
- **Development**: Having consistent test data
- **Demo**: Showing the application with realistic data
- **Testing**: Ensuring your app works with expected data structure

## 🚀 How to Run the Seed

### Option 1: From API Directory
```bash
cd apps/api
pnpm db:seed
```

### Option 2: From Root Directory
```bash
pnpm db:seed
```

## 🔄 Reset and Seed (Complete Reset)

If you want to completely reset your database and reseed it:

### Option 1: From API Directory
```bash
cd apps/api
pnpm db:reset
```

### Option 2: From Root Directory
```bash
pnpm db:reset
```

## 📊 Default Data

The seed script populates your `metrics` table with 4 default metrics:

| Title | Value | Change | Type | Icon |
|-------|-------|--------|------|------|
| Total Users | 1,240 | +12.5% | increase | users |
| Active Sessions | 89 | -3.2% | decrease | activity |
| Revenue | 24,500 | +8.7% | increase | dollar-sign |
| Conversion Rate | 3.24 | +2.1% | increase | trending-up |

## 🛠️ Customizing the Seed Data

To modify the default data, edit the `apps/api/prisma/seed.ts` file:

```typescript
const metrics = await prisma.metric.createMany({
  data: [
    {
      title: "Your Custom Metric",
      value: 1000,
      change: 5.5,
      changeType: "increase",
      icon: "your-icon",
    },
    // Add more metrics...
  ],
});
```

## ⚠️ Important Notes

1. **Seed clears existing data**: The script deletes all existing metrics before inserting new ones
2. **Auto-generated fields**: `id`, `createdAt`, and `updatedAt` are automatically handled
3. **Change types**: Must be exactly `"increase"` or `"decrease"`
4. **Icons**: Should match the icon names used in your frontend components

## 🔍 Verify Seeding

After running the seed, you can verify the data:

1. **Check the console output** - it shows what was seeded
2. **Use DBeaver** - connect and view the metrics table
3. **Use Prisma Studio** - run `pnpm db:studio` to inspect the data
4. **Check your frontend** - the metrics should appear in your dashboard

## 🚨 Troubleshooting

### Database Connection Issues
```bash
# Make sure your .env file is configured
cd apps/api
cp env.example .env
# Edit .env with your database credentials
```

### Prisma Client Issues
```bash
# Regenerate Prisma client
cd apps/api
pnpm db:generate
```

### Permission Issues
```bash
# Make sure your database user has proper permissions
# Check your DATABASE_URL in .env
```
