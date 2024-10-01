import { z } from "zod";

export const createProductsSchema = z.object({
  name: z.string().trim().min(1, {
    message: "O nome do produto é obrigatório.",
  }),
  price: z.number().min(0.01, {
    message: "O preço é obrigatório.",
  }),
  stock: z.coerce
    .number()
    .positive({
      message: "A quantidade do estoque deve ser positiva.",
    })
    .int()
    .min(0, {
      message: "A quantidade em estoque é obrigatório.",
    }),
});

export type CreateProductSchema = z.infer<typeof createProductsSchema>;
