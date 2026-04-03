import { prisma } from "../../src/lib/db";
import { UserSchema } from "../../src/modules/user/user.model";

async function main() {
  const users: UserSchema[] = [
    {
      email: "alex.doe@example.com",
      first_name: "Alex",
      last_name: "Doe",
      phone_number: "+1234567890",
      birthdate: "1992-05-15",
      gender: "Non-binary",
      profile_image: "https://picsum.photos/200/300",
    },
    {
      email: "jordan.smith@example.com",
      first_name: "Jordan",
      last_name: "Smith",
      phone_number: "+1987654321",
      birthdate: "1988-11-02",
      gender: "Male",
      profile_image: undefined,
    },
    {
      email: "casey.v@example.com",
      first_name: "Casey",
      last_name: "Vaughan",
      phone_number: "+1555010203",
      birthdate: "1995-07-22",
      gender: "Female",
      profile_image: "https://picsum.photos/200/300",
    },
  ];

  for (const userData of users) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
  }
}

try {
  await main();
  console.log("Seeding completed.");
} catch (e) {
  console.error("Seeding failed:", e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
