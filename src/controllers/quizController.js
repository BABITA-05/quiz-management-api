import { startQuiz,
    submitQuiz,
    getLatestQuizResult,
 } from "../services/quizService.js";

export const startQuizController = async (req, res) => {
  try {
    const {
      playerId,
      subject,
      difficulty,
      numberOfQuestions,
    } = req.body;

    if (!playerId) {
      return res.status(400).json({
        success: false,
        message: "Player ID is required",
      });
    }

    const questions = await startQuiz(
      playerId,
      subject,
      difficulty,
      numberOfQuestions
    );

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const submitQuizController = async (req, res) => {
  try {
   const { playerId, answers } = req.body;

if (!playerId) {
  return res.status(400).json({
    success: false,
    message: "Player ID is required",
  });
}

const result = await submitQuiz(playerId, answers);

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
    const result = await getLatestQuizResult(req.params.playerId);

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