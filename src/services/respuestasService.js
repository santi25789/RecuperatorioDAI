import RespuestasRepository from "../repositories/respuestasRepository.js"

const respuestasRepository = new RespuestasRepository();

export default class RespuestasService{
    async crearRespuesta (user_id, pregunta_id, respuesta_seleccionada, es_respuesta_correcta) {
        return await respuestasRepository.crearRespuesta(user_id, pregunta_id, respuesta_seleccionada, es_respuesta_correcta);
    };
}

