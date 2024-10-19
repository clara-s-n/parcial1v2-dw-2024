import { FastifyPluginAsync } from "fastify";
import * as comentarioService from "../../../../services/comentarios.js";
import {IdTema} from "../../../../types/tema.js";
import {CommentSchema} from "../../../../types/comentario.js";
//import {Type} from "@sinclair/typebox";
//import {IdUsuarioSchema} from "../../../../types/usuario.js";

const temasRoutes: FastifyPluginAsync = async (
    fastify,
    opts
): Promise<void> => {
    fastify.get("/", {
        schema: {
            summary: "Obtener todos los comentarios de un tema",
            tags: ["comentarios"],
            params: IdTema,
            response: {
                200: {
                    description: "Lista de comentarios",
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: CommentSchema,
                            },
                        },
                    },
                },
            }
        },
        onRequest: [fastify.verifyJWT],
        handler: async function (request, reply) {
            const { id_tema } = request.params as IdTema;
            return comentarioService.findAll(id_tema);
        },
    });

    fastify.post("/", {
        schema: {
            summary: "Crear un comentario en un tema",
            tags: ["comentarios"],
            params: IdTema,
            body: CommentSchema,
            response: {
                201: {
                    description: "Comentario creado",
                    content: {
                        "application/json": {
                            schema: CommentSchema,
                        },
                    },
                },
            }
        },
        onRequest: [fastify.verifyJWT],
        handler: async function (request, reply) {
            const { id_tema } = request.params as IdTema;
            const { id_usuario } = request.user as { id_usuario: number };
            const { descripcion } = request.body as { descripcion: string };
            return comentarioService.create(id_tema, id_usuario, descripcion);
        },
    });
}

export default temasRoutes;