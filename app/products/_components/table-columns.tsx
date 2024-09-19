"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Product as PrismaProduct } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

interface Product extends PrismaProduct {
  status: string;
}
const getStatusLabel = (status: string) => {
  if (status === "IN_STOCK") {
    return "Em estoque";
  } else {
    return "Fora de estoque";
  }
};

export const productsTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Produto",
  },
  {
    accessorKey: "price",
    header: "Valor unitário",
  },
  {
    accessorKey: "stock",
    header: "Estoque",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);

      return (
        <Badge
          variant={label === "Em estoque" ? "default" : "outline"}
          className="gap-2"
        >
          <CircleIcon
            size={14}
            className={`${label === "Em estoque" ? "fill-primary-foreground" : "fill-destructive-foreground"}`}
          />
          {label}
        </Badge>
      );
    },
  },
];
