/**
 * The above TypeScript code seeds user data into a database using Prisma client.
 */
import { PrismaClient, Prisma } from "../prisma/app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    email: "alice@example.com",
    password: "password123",
    profile: {
      create: {
        firstName: "Alice",
        lastName: "Smith",
        bio: "I love whales!",
        avatarUrl: "https://i.pravatar.cc/150?img=1",
        phone: "123-456-7890",
      },
    },
    settings: {
      create: {
        theme: "dark",
        emailNotifications: true,
        language: "en",
        currency: "USD",
        verificationStatus: false,
      },
    },
  },
  {
    email: "bob@example.com",
    password: "password456",
    profile: {
      create: {
        firstName: "Bob",
        lastName: "Johnson",
        bio: "Ocean explorer.",
        avatarUrl: "https://i.pravatar.cc/150?img=2",
        phone: "987-654-3210",
      },
    },
    settings: {
      create: {
        theme: "light",
        emailNotifications: false,
        language: "fr",
        currency: "EUR",
        verificationStatus: true,
      },
    },
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main()
  .then(() => {
    console.log("Seeding complete.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
