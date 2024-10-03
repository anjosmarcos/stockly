"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import DeleteProductDialogContent from "@/app/products/_components/delete-dialog-content";
import { Product as PrismaProduct } from "@prisma/client";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  CircleIcon,
  ClipboardCopyIcon,
  Edit2Icon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import UpsertProductDialogContent from "./upsert-dialog-content";

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
  {
    accessorKey: "actions",
    header: "Ações",
    cell: (row) => {
      const [editDialogOpen, setEditDialogOpen] = useState(false);
      const product = row.row.original;
      return (
        <AlertDialog>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <MoreHorizontalIcon size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="gap-1">
                  <ClipboardCopyIcon
                    size={16}
                    className="1.5"
                    onClick={() => navigator.clipboard.writeText(product.id)}
                  />
                  Copiar ID
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem className="gap-1">
                    <Edit2Icon size={16} />
                    Editar
                  </DropdownMenuItem>
                </DialogTrigger>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="gap-1.5">
                    <Trash2Icon size={16} />
                    Deletar
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <UpsertProductDialogContent
              defaultValues={{
                id: product.id,
                name: product.name,
                price: Number(product.price),
                stock: product.stock,
              }}
              onSuccess={() => setEditDialogOpen(false)}
            />
            <DeleteProductDialogContent productId={product.id} />
          </Dialog>
        </AlertDialog>
      );
    },
  },
];
