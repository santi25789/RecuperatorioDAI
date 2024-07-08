import { DBconfig } from '../BD/BD.js';
import pg from "pg";

export default class PreguntasRepository {
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        this.DBClient.connect();   
    }
    async crearPregunta(pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta) {
        const fecha = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const query = 'INSERT INTO Preguntas (pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta, fecha_creacion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta, fecha];
        const { rows } = await this.DBClient.query(query, values);
        return rows[0];
    }

    async actualizarPregunta(id, pregunta, opcion_1, opcion_2, opcion_3, opcion_4, respuesta_correcta) {
    let query = 'UPDATE Preguntas SET';
    const values = [];
    let setClause = '';
    if (pregunta !== undefined) {
        setClause += ' pregunta = $' + (values.length + 1) + ',';
        values.push(pregunta);
    }
    if (opcion_1 !== undefined) {
        setClause += ' opcion_1 = $' + (values.length + 1) + ',';
        values.push(opcion_1);
    }
    if (opcion_2 !== undefined) {
        setClause += ' opcion_2 = $' + (values.length + 1) + ',';
        values.push(opcion_2);
    }
    if (opcion_3 !== undefined) {
        setClause += ' opcion_3 = $' + (values.length + 1) + ',';
        values.push(opcion_3);
    }
    if (opcion_4 !== undefined) {
        setClause += ' opcion_4 = $' + (values.length + 1) + ',';
        values.push(opcion_4);
    }
    if (respuesta_correcta !== undefined) {
        setClause += ' respuesta_correcta = $' + (values.length + 1) + ',';
        values.push(respuesta_correcta);
    }
    if (setClause.endsWith(',')) {
        setClause = setClause.slice(0, -1);
    }
    query += setClause + ' WHERE id = $' + (values.length + 1) + ' RETURNING *';
    values.push(id);
    console.log(query);
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
            query += ' WHERE pregunta ILIKE $1';
            values.push(`%${palabra_clave}%`);
        }
        query += ` ORDER BY fecha_creacion`;
        console.log(query)
        const { rows } = await this.DBClient.query(query, values);
        return rows;
    }
}
