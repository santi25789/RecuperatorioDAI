import DBconfig from '../BD/BD.js';

export default class PreguntasRepository {
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        this.DBClient.connect();   
    }
    async crearPregunta(pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta) {
        const query = 'INSERT INTO Preguntas (pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta, fecha_creacion) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *';
        const values = [pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta];
        const { rows } = await this.DBClient.query(query, values);
        return rows[0];
    }

    async actualizarPregunta(id, pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta) {
        const query = 'UPDATE Preguntas SET pregunta = $1, opcion_1 = $2, opcion_2 = $3, opcion_3 = $4, opcion_4 = $5, respuesta_correcta = $6 WHERE id = $7 RETURNING *';
        const values = [pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta, id];
        const { rows } = await this.DBClient.query(query, values);
        return rows[0];
    }

    async eliminarPregunta(id) {
        const query = 'DELETE FROM Preguntas WHERE id = $1 RETURNING *';
        const { rows } = await this.DBClient.query(query, [id]);
        return rows[0];
    }

    async obtenerPreguntaAzar() {
        const query = 'SELECT * FROM Preguntas ORDER BY RANDOM() LIMIT 1';
        const { rows } = await this.DBClient.query(query);
        return rows[0];
    }

    async obtenerTodasLasPreguntas(palabra_clave) {
        let query = 'SELECT * FROM Preguntas';
        const values = [];

        if (palabra_clave) {
            query += ' WHERE pregunta LIKE $1';
            values.push(`%${palabra_clave}%`);
        }
        query += ` ORDER BY fecha_creacion`;

        const { rows } = await this.DBClient.query(query, values);
        return rows;
    }
}
