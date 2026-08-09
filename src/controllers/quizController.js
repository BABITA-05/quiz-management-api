import { startQuiz,
    submitQuiz,
    getLatestQuizResult,
 } from "../services/quizService.js";

export const startQuizController = async (req, res) => {
  try {
    const { subject, difficulty, numberOfQuestions } = req.body;

    if (!numberOfQuestions || numberOfQuestions <= 0) {
      return res.status(400).json({
        success: false,
        message: "numberOfQuestions must be greater than 0",
      });
    }

    const questions = await startQuiz({
      subject,
      difficulty,
      numberOfQuestions,
    });

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found",
      });
    }

    res.status(200).json({
      success: true,
      totalQuestions: questions.length,
      data: questions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const submitQuizController = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: "answers must be an array",
      });
    }

    const result = await submitQuiz(answers);

    res.status(200).json({
      success: true,
      message: "Quiz submitted successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQuizResultController = async (req, res) => {
  try {
    const result = await getLatestQuizResult();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No quiz result found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};