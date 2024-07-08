import PreguntasRepository from '../repositories/preguntasRepository.js';

const preguntasRepository = new PreguntasRepository();

export default class PreguntasService {
    async crearPregunta(pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta) {
        return await preguntasRepository.crearPregunta(pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta);
    }

    async actualizarPregunta(id, pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta) {
        return await preguntasRepository.actualizarPregunta(id, pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta);
    }

    async eliminarPregunta(id) {
        return await preguntasRepository.eliminarPregunta(id);
    }

    async obtenerPreguntaAzar() {
        return await preguntasRepository.obtenerPreguntaAzar();
    }

    async obtenerTodasLasPreguntas(palabra_clave) {
        return await preguntasRepository.obtenerTodasLasPreguntas(palabra_clave);
    }
}
