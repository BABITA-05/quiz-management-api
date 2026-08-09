import 'dotenv/config'
import express from 'express'

import questionRoutes from "./routes/questionRoutes.js"; 
import quizRoutes from "./routes/quizRoutes.js";
 

const app = express()


app.use(express.json());
app.use("/questions", questionRoutes);
app.use("/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Quiz Management API Running",
  });
});



const PORT = process.env.PORT || 9999

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})