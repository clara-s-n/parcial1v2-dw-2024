import { Static, Type } from "@sinclair/typebox";

export const CommentSchema = Type.Object(
    {
        id_tema: Type.Integer({ description: "Identificador único del tema" }),
        id_usuario: Type.Integer({ description: "Identificador único del usuario" }),
        descripcion: Type.String({ description: "Comentario del usuario" })
    },
    { examples: [{ id_tema: 1, id_usuario: 1, descripcion: "Comentario del tema 1" }] }
    );

export const IdComentarioSchema = Type.Object(
    {
        id_comentario: Type.Integer({ description: "Identificador único del comentario" }),
    },
    { examples: [{ id_comentario: 1 }] }
    );

export type CommentType = Static<typeof CommentSchema>;

export const PutSchemaType = Type.Partial(CommentSchema)
export type PutSchemaType = Static<typeof PutSchemaType>;