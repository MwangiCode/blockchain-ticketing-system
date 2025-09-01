/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '@/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  await prisma.user.upsert({
    where: { email: 'admin@tickets.com' },
    update: {},
    create: {
      email: 'admin@tickets.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await hashPassword('user123');
  const user = await prisma.user.upsert({
    where: { email: 'user@tickets.com' },
    update: {},
    create: {
      email: 'user@tickets.com',
      password: userPassword,
      name: 'Regular User',
      role: 'USER',
    },
  });

  // Create events
  const events = await Promise.all([
    prisma.event.upsert({
      where: { id: '1' },
      update: {},
      create: {
        name: 'Summer Music Festival',
        description: 'The biggest music festival of the year featuring top artists from around the world. Join us for a weekend of amazing music, food, and fun!',
        date: new Date('2024-07-15T18:00:00Z'),
        venue: 'City Park Amphitheater',
        totalTickets: 5000,
        availableTickets: 3500,
        price: 89.99,
      },
    }),
    prisma.event.upsert({
      where: { id: '2' },
      update: {},
      create: {
        name: 'Tech Conference 2024',
        description: 'Annual technology conference showcasing the latest innovations in AI, blockchain, and web development. Network with industry leaders and enthusiasts.',
        date: new Date('2024-08-22T09:00:00Z'),
        venue: 'Convention Center',
        totalTickets: 2000,
        availableTickets: 1200,
        price: 299.99,
      },
    }),
    prisma.event.upsert({
      where: { id: '3' },
      update: {},
      create: {
        name: 'Comedy Night Special',
        description: 'An evening of laughter with top comedians from Netflix and Comedy Central. Prepare for a night of non-stop jokes and entertainment.',
        date: new Date('2024-06-30T20:00:00Z'),
        venue: 'Downtown Comedy Club',
        totalTickets: 300,
        availableTickets: 150,
        price: 45.50,
      },
    }),
    prisma.event.upsert({
      where: { id: '4' },
      update: {},
      create: {
        name: 'Food & Wine Expo',
        description: 'Sample gourmet foods and fine wines from around the world. Cooking demonstrations, wine tastings, and culinary competitions.',
        date: new Date('2024-09-10T11:00:00Z'),
        venue: 'Exhibition Hall',
        totalTickets: 1500,
        availableTickets: 1000,
        price: 75.00,
      },
    }),
  ]);

  console.log('Seeding completed successfully!');
  console.log('Created users:');
  console.log(`- Admin: admin@tickets.com / admin123`);
  console.log(`- User: user@tickets.com / user123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });