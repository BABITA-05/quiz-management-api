import prisma from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.MYJWTSECRETEKEY;

export const registerPlayer = async (name, email, password) => {
  const existingPlayer = await prisma.player.findUnique({
    where: { email },
  });

  if (existingPlayer) {
    throw new Error("Player with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const player = await prisma.player.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: player.id,
    name: player.name,
    email: player.email,
  };
};

export const loginPlayer = async (email, password) => {
  const player = await prisma.player.findUnique({
    where: { email },
  });

  if (!player) {
    throw new Error("Invalid email or password");
  }

  if (!player.password) {
    throw new Error("Please register again to set a password");
  }

  const passwordMatch = await bcrypt.compare(password, player.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: player.id,
      role: "player",
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    player: {
      id: player.id,
      name: player.name,
      email: player.email,
    },
    token,
  };
};

export const loginAdmin = async (email, password) => {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      id: admin.id,
      role: "admin",
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    },
    token,
  };
};