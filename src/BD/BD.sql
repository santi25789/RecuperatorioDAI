CREATE TABLE IF NOT EXISTS public."Preguntas"
(
    "UserId" bigint,
    "Respuesta_seleccionada" text COLLATE pg_catalog."default",
    "Es_respuesta_correcta" boolean,
    "Fecha_creacion" date,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999 CACHE 1 )
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Preguntas"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public."Respuestas"
(
    "Pregunta" text COLLATE pg_catalog."default",
    "Opcion_1" text COLLATE pg_catalog."default",
    "Opcion_2" text COLLATE pg_catalog."default",
    "Opcion_3" text COLLATE pg_catalog."default",
    "Opcion_4" text COLLATE pg_catalog."default",
    "Respuesta_correcta" text COLLATE pg_catalog."default",
    "Fecha_creacion" date,
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 999999 CACHE 1 )
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Respuestas"
    OWNER to postgres;

INSERT INTO public."Preguntas" ("UserId", "Respuesta_seleccionada", "Es_respuesta_correcta", "Fecha_creacion")
VALUES
    ('1', 'Opción A', TRUE, '2024-07-08'),
    ('1', 'Opción B', FALSE, '2024-07-08'),
    ('1', 'Opción C', TRUE, '2024-07-07'),
    ('1', 'Opción D', FALSE, '2024-07-06');

INSERT INTO public."Respuestas" ("Pregunta", "Opcion_1", "Opcion_2", "Opcion_3", "Opcion_4", "Respuesta_correcta", "Fecha_creacion")
VALUES
    ('¿Cuál es la capital de Francia?', 'París', 'Madrid', 'Berlín', 'Londres', 'París', '2024-07-08'),
    ('¿En qué año comenzó la Primera Guerra Mundial?', '1914', '1918', '1939', '1870', '1914', '2024-07-08'),
    ('¿Quién escribió "Cien años de soledad"?', 'Gabriel García Márquez', 'Pablo Neruda', 'Julio Cortázar', 'Mario Vargas Llosa', 'Gabriel García Márquez', '2024-07-07'),
    ('¿Cuál es el río más largo del mundo?', 'Amazonas', 'Nilo', 'Misisipi', 'Yangtsé', 'Amazonas', '2024-07-06');
