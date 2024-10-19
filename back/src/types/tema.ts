import { Static, Type } from "@sinclair/typebox";
export const IdTema = Type.Object({
  id_tema: Type.Integer({ description: "Identificador único del tema" }),
});
export type IdTema = Static<typeof IdTema>;

export const Tema = Type.Object(
  {
    id_tema: Type.Integer(),
    id_usuario: Type.Integer(),
    titulo: Type.String({ description: "Titulo del tema" }),
    descripcion: Type.String({ description: "Nombre del tema" }),
  },
  {
    examples: [
      {
        titulo: "Titulo de prueba 1",
        descripcion: "La descripcion del titulo de prueba 1",
      },
      {
        titulo: "Titulo de prueba 2",
        descripcion: "La descripcion del titulo de prueba 2",
      },
    ],
  }
);
export type Tema = Static<typeof Tema>;

export const TemaPut = Type.Pick(Tema, ["titulo", "descripcion"]);
export type TemaPut = Static<typeof TemaPut>;
