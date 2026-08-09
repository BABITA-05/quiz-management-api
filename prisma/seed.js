import prisma from "../src/prisma.js";

async function main() {
  await prisma.question.deleteMany();

  await prisma.question.createMany({
    data: [
      {
        subject: "Math",
        difficulty: "Easy",
        question: "What is 2 + 2?",
        optionA: "3",
        optionB: "4",
        optionC: "5",
        optionD: "6",
        correctAnswer: "4",
      },
      {
        subject: "Science",
        difficulty: "Easy",
        question: "Water freezes at?",
        optionA: "0°C",
        optionB: "50°C",
        optionC: "100°C",
        optionD: "-10°C",
        correctAnswer: "0°C",
      },
      {
        subject: "Computer",
        difficulty: "Easy",
        question: "CPU stands for?",
        optionA: "Central Processing Unit",
        optionB: "Central Process Unit",
        optionC: "Computer Processing Unit",
        optionD: "Control Processing Unit",
        correctAnswer: "Central Processing Unit",
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });