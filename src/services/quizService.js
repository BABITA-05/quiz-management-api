import prisma from "../prisma.js";

export const startQuiz = async ({
  subject,
  difficulty,
  numberOfQuestions,
}) => {
  const where = {};

  if (subject && subject.toLowerCase() !== "random") {
    where.subject = {
      equals: subject,
      mode: "insensitive",
    };
  }

  if (difficulty) {
    where.difficulty = {
      equals: difficulty,
      mode: "insensitive",
    };
  }

  const questions = await prisma.question.findMany({
    where,
  });

  const shuffled = questions.sort(() => Math.random() - 0.5);

  const selectedQuestions = shuffled.slice(
    0,
    Number(numberOfQuestions)
  );

  return selectedQuestions.map((question) => {
    const {
      correctAnswer,
      ...questionWithoutAnswer
    } = question;

    return questionWithoutAnswer;
  });
};

export const submitQuiz = async (answers) => {
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

export const getLatestQuizResult = async () => {
  return await prisma.quizResult.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
};