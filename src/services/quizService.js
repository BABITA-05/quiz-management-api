import prisma from "../prisma.js";

export const startQuiz = async (
  playerId,
  subject,
  difficulty,
  numberOfQuestions
) => {
  const player = await prisma.player.findUnique({
    where: {
      id: Number(playerId),
    },
  });

  if (!player) {
    throw new Error("Player not found");
  }

  const where = {};

  if (subject && subject.toLowerCase() !== "random") {
    where.subject = subject;
  }

  if (difficulty) {
    where.difficulty = difficulty;
  }

  const questions = await prisma.question.findMany({
    where,
  });

  const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

  const selectedQuestions = shuffledQuestions.slice(
    0,
    Number(numberOfQuestions)
  );

  return selectedQuestions.map((question) => ({
    id: question.id,
    subject: question.subject,
    difficulty: question.difficulty,
    question: question.question,
    optionA: question.optionA,
    optionB: question.optionB,
    optionC: question.optionC,
    optionD: question.optionD,
  }));
};

export const submitQuiz = async (playerId, answers) => {
  const questionIds = answers.map((answer) => Number(answer.questionId));

  const questions = await prisma.question.findMany({
    where: {
      id: {
        in: questionIds,
      },
    },
  });

  let correctAnswers = 0;
  let attemptedQuestions = 0;

  answers.forEach((answer) => {
    if (!answer.answer) {
      return;
    }

    attemptedQuestions++;

    const question = questions.find(
      (question) => question.id === Number(answer.questionId)
    );

    if (
      question &&
      question.correctAnswer.toLowerCase() ===
        answer.answer.toLowerCase()
    ) {
      correctAnswers++;
    }
  });

  const totalQuestions = answers.length;
  const wrongAnswers = attemptedQuestions - correctAnswers;
  const finalScore = correctAnswers;

  const percentage =
    totalQuestions > 0
      ? (correctAnswers / totalQuestions) * 100
      : 0;

  const result = await prisma.quizResult.create({
    data: {
      playerId: Number(playerId),
      totalQuestions,
      attemptedQuestions,
      correctAnswers,
      wrongAnswers,
      finalScore,
      percentage,
    },
  });

  return result;
};

export const getLatestQuizResult = async (playerId) => {
  return await prisma.quizResult.findFirst({
    where: {
      playerId: Number(playerId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};