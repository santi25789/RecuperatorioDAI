import express from "express";

const app=express();

app.use(express.json());
app.use("/preguntas", preguntasController);
app.use("/respuestas", respuestasController);
const port = 5432;

app.listen(port, () => { 
    console.log(`Listening on http://localhost:${port}`) 
})