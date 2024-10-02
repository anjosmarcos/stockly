import "server-only";

import { Product } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { db } from "../_lib/prisma";

export const getProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({});
};

export const cacheGetProducts = unstable_cache(getProducts, ["getProducts"], {
  tags: ["get-products"],
  revalidate: 60,
});
