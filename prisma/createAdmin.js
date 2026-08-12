import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/prisma.js";

const createAdmin = async () => {
  try {
    const password = await bcrypt.hash("admin123", 10);

    const admin = await prisma.admin.create({
      data: {
        name: "Admin",
        email: "admin@gmail.com",
        password,
      },
    });

    console.log("Admin created successfully:");
    console.log({
      id: admin.id,
      name: admin.name,
      email: admin.email,
    });
  } catch (error) {
    console.error("Error creating admin:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();