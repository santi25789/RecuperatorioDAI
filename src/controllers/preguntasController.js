import express from 'express';
import PreguntasService from '../services/preguntasService.js';

const router = express.Router();
const preguntasService = new PreguntasService();

router.post('/', async (req, res) => {
    try {
        const { pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta } = req.body;
        const preguntaCreada = await preguntasService.crearPregunta(pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta);
        if (preguntaCreada) {
            res.status(200).json("Pregunta creada");
        } else {
            res.status(400).json("Pregunta no creada");
        }
    } catch (error) {
        console.error('Error al crear pregunta:', error.message);
        res.status(500).send('Error al crear pregunta');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta } = req.body;
        const preguntaActualizada = await preguntasService.actualizarPregunta(id, pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta);
        if (preguntaActualizada) {
            res.status(200).json("Pregunta actualizada");
        } else {
            res.status(404).json("Pregunta no encontrada");
        }
    } catch (error) {
        console.error('Error al actualizar pregunta:', error.message);
        res.status(500).send('Error al actualizar pregunta');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const preguntaEliminada = await preguntasService.eliminarPregunta(id);
        if (preguntaEliminada) {
            res.status(200).json("Pregunta eliminada");
        } else {
            res.status(404).json("Pregunta no encontrada");
        }
    } catch (error) {
        console.error('Error al eliminar pregunta:', error.message);
        res.status(500).send('Error al eliminar pregunta');
    }
});

router.get('/azar', async (req, res) => {
    try {
        const preguntaAzar = await preguntasService.obtenerPreguntaAzar();
        res.status(200).json(preguntaAzar);
    } catch (error) {
        console.error('Error al obtener pregunta al azar:', error.message);
        res.status(500).send('Error al obtener pregunta al azar');
    }
});

router.get('/', async (req, res) => {
    try {
        const { palabra_clave } = req.query;
        const preguntas = await preguntasService.obtenerTodasLasPreguntas(palabra_clave);
        res.status(200).json(preguntas);
    } catch (error) {
        console.error('Error al obtener todas las preguntas:', error.message);
        res.status(500).send('Error al obtener todas las preguntas');
    }
});

export default router;
