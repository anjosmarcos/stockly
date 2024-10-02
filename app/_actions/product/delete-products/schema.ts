import { z } from "zod";

export const deleteProductsSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteProductSchema = z.infer<typeof deleteProductsSchema>;
