export const validateQuestion = (req, res, next) => {
  const {
    subject,
    difficulty,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
  } = req.body;

  if (
    !subject ||
    !difficulty ||
    !question ||
    !optionA ||
    !optionB ||
    !optionC ||
    !optionD ||
    !correctAnswer
  ) {
    return res.status(400).json({
      success: false,
      message: "All question fields are required",
    });
  }

  const validDifficulties = ["Easy", "Medium", "Hard"];

  if (!validDifficulties.includes(difficulty)) {
    return res.status(400).json({
      success: false,
      message: "Difficulty must be Easy, Medium, or Hard",
    });
  }

  const options = [optionA, optionB, optionC, optionD];

  if (!options.includes(correctAnswer)) {
    return res.status(400).json({
      success: false,
      message: "Correct answer must match one of the options",
    });
  }

  next();
};