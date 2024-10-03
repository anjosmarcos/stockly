"use server";

import { db } from "@/app/_lib/prisma";
import { revalidateTag } from "next/cache";
import { UpsertProductSchema, createProductsSchema } from "./schema";

export const upsertProducts = async (data: UpsertProductSchema) => {
  createProductsSchema.parse(data);
  await db.product.upsert({
    where: {
      id: data.id ?? "",
    },
    update: data,
    create: data,
  });

  revalidateTag("get-products");
};
