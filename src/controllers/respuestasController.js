import express from "express";
import RespuestasService from "../services/respuestasService.js"

const router = express.Router();
const respuestasService = new RespuestasService();

router.post('/', async (req, res) => {
    try {
        const { user_id, pregunta_id, respuesta_seleccionada, es_respuesta_correcta } = req.body;
        const respuestaCreada = await respuestasService.crearRespuesta(user_id, pregunta_id, respuesta_seleccionada, es_respuesta_correcta);
        if (respuestaCreada) {
            res.status(200).json("Respuesta creada");   
        } else{
            res.status(400).json("Respuesta no creada");   
        }
    } catch (error) {
        console.error('Error al crear respuesta:', error.message);
        res.status(500).send('Error al crear respuesta');
    }
});

export default router;
