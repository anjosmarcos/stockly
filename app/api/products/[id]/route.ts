import { db } from "@/app/_lib/prisma";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const serchParams = request.nextUrl.searchParams;
  const query = serchParams.get("teste");

  console.log({ query });
  //   http://localhost:3000/api/products/42b2ee51-041c-404e-b47a-963cea3c01c8?teste=12345

  const productId = params.id;
  const product = await db.product.findMany({
    where: {
      id: productId,
    },
  });
  if (!product) {
    return Response.json(
      { message: "Produto nao encontrado" },
      { status: 404 },
    );
  }
  return Response.json(product, { status: 200 });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  await db.product.delete({
    where: {
      id: params.id,
    },
  });

  return Response.json({}, { status: 204 });
}
