"use server";

import {
  DeleteProductSchema,
  deleteProductsSchema,
} from "@/app/_actions/product/delete-products/schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProducts = async ({ id }: DeleteProductSchema) => {
  deleteProductsSchema.parse({ id });
  await db.product.delete({
    where: {
      id,
    },
  });
  revalidatePath("/products");
};
