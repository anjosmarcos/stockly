import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import {
  ClipboardCopyIcon,
  Edit2Icon,
  MoreHorizontalIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import DeleteProductDialogContent from "./delete-dialog-content";
import UpsertProductDialogContent from "./upsert-dialog-content";

interface ProductTableDropdownMenuProps {
  product: Product;
}

const ProductTableDropdownMenu = ({
  product,
}: ProductTableDropdownMenuProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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
                onClick={() => navigator.clipboard.writeText(product.name)}
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
};

export default ProductTableDropdownMenu;
