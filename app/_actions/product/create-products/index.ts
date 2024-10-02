"use server";

import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { CreateProductSchema, createProductsSchema } from "./schema";

export const createProducts = async (data: CreateProductSchema) => {
  createProductsSchema.parse(data);
  await db.product.create({
    data,
  });

  revalidateTag("get-products");
};
