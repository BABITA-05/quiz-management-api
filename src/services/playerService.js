import prisma from "../prisma.js";

export const createPlayer = async (data) => {
  return await prisma.player.create({
    data: {
      name: data.name,
      email: data.email,
    },
  });
};

export const getAllPlayers = async () => {
  return await prisma.player.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getPlayerById = async (id) => {
  return await prisma.player.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updatePlayer = async (id, data) => {
  return await prisma.player.update({
    where: {
      id: Number(id),
    },
    data: {
      name: data.name,
      email: data.email,
    },
  });
};

export const deletePlayer = async (id) => {
  return await prisma.player.delete({
    where: {
      id: Number(id),
    },
  });
};

export const getPlayerResults = async (playerId) => {
  return await prisma.quizResult.findMany({
    where: {
      playerId: Number(playerId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};