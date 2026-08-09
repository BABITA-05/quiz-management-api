import prisma from "../prisma.js";

export const createQuestion = async (data) => {
  return await prisma.question.create({
    data,
  });
};

export const getAllQuestions = async () => {
  return await prisma.question.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getQuestionById = async (id) => {
  return await prisma.question.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const updateQuestion = async (id, data) => {
  return await prisma.question.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

export const deleteQuestion = async (id) => {
  return await prisma.question.delete({
    where: {
      id: Number(id),
    },
  });
};

export const getQuestionsBySubject = async (subject) => {
  return await prisma.question.findMany({
    where: {
      subject: {
        equals: subject,
        mode: "insensitive",
      },
    },
    orderBy: {
      id: "asc",
    },
  });
};

export const getQuestionsByDifficulty = async (difficulty) => {
  return await prisma.question.findMany({
    where: {
      difficulty: {
        equals: difficulty,
        mode: "insensitive",
      },
    },
    orderBy: {
      id: "asc",
    },
  });
};

export const getRandomQuestions = async (count = 5) => {
  const questions = await prisma.question.findMany();

  const shuffled = questions.sort(() => Math.random() - 0.5);

  return shuffled.slice(0, Number(count));
};