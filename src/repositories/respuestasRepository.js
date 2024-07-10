import { DBconfig } from "../BD/BD.js";
import pg from "pg";

export default class RespuestasRepository{
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        this.DBClient.connect();   
    }
    async crearRespuesta (user_id, respuesta_seleccionada, es_respuesta_correcta) {
        const fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const query = 'INSERT INTO Respuestas (userid, respuesta_seleccionada, es_respuesta_correcta, fecha_creacion) VALUES ($1, $2, $3, $4) RETURNING *';
        console.log(query)
        const values = [user_id, respuesta_seleccionada, es_respuesta_correcta, fecha];
        const { rows } = await this.DBClient.query(query, values);
        return rows[0];
    };
}

