import { FastifyPluginAsync } from "fastify";
import * as comentarioService from "../../../../../services/comentarios.js";
import {CommentSchema, CommentType, IdComentarioSchema} from "../../../../../types/comentario.js";
import {IdTema} from "../../../../../types/tema.js";
import {Type} from "@sinclair/typebox";


const comentariosRoute: FastifyPluginAsync = async (
    fastify,
    opts
): Promise<void> => {
    // Ruta para editar un comentario
    fastify.put("/", {
        schema: {
            summary: "Editar un comentario",
            tags: ["comentarios"],
            params: Type.Intersect([IdTema, IdComentarioSchema]),
            body: CommentSchema,
            response: {
                200: {
                    description: "Comentario editado",
                    content: {
                        "application/json": {
                            schema: CommentSchema,
                        },
                    },
                },
            },
        },
        onRequest: [fastify.verifyJWT, fastify.verifyAdmin],
        handler: async function (request, reply) {
            const { idComentario } = request.params as { idComentario: number };
            const comentario = request.body as CommentType;
            const idTema= comentario.id_tema
            const descripcion = comentario.descripcion
            return comentarioService.modify(idTema, idComentario, descripcion);
        },
    });

    // Ruta para eliminar un comentario
    fastify.delete("/", {
        schema: {
            summary: "Eliminar un comentario",
            tags: ["comentarios"],
            params: Type.Intersect([IdTema, IdComentarioSchema]),
            response: {
                200: {
                    description: "Comentario eliminado",
                    content: {
                        "application/json": {
                            schema: CommentSchema,
                        },
                    },
                },
            },
        },
        onRequest: [fastify.verifyJWT, fastify.verifyCommentCreatorOrAdmin],
        handler: async function (request, reply) {
            const { id_tema } = request.params as { id_tema: number };
            const { id_comentario } = request.params as { id_comentario: number };
            return comentarioService.erase(id_tema, id_comentario);
        },
    });
};

export default comentariosRoute;