"use client";

import { Button } from "@/app/_components/ui/button";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formShema = z.object({
  productId: z.string().uuid({
    message: "O produto é obrigatório",
  }),
  quantity: z.coerce.number().int().positive(),
});

type FormShema = z.infer<typeof formShema>;

interface UpsertSheetContentProps {
  productsOptions: ComboboxOption[];
  products: Product[];
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  productsOptions,
  products,
}: UpsertSheetContentProps) => {
  const [selectedProducts, setSelectProducts] = useState<SelectedProduct[]>([]);
  const form = useForm<FormShema>({
    resolver: zodResolver(formShema),
    defaultValues: {
      productId: "",
      quantity: 1,
    },
  });

  const onSubmit = (data: FormShema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );

    if (!selectedProduct) return;

    setSelectProducts((currentProducts) => {
      const existingProduct = currentProducts.find(
        (product) => product.id === selectedProduct.id,
      );

      if (existingProduct) {
        return currentProducts.map((product) =>
          product.id === existingProduct.id
            ? {
                ...existingProduct,
                quantity: existingProduct.quantity + data.quantity,
              }
            : product,
        );
      }
      return [
        ...currentProducts,
        {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
    form.reset();
  };

  const productTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>Insira as informas da venda abaixo.</SheetDescription>
      </SheetHeader>
      {/* form */}
      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione um produto"
                    options={productsOptions}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* salvar */}
          <Button type="submit" variant="secondary" className="w-full gap-2">
            <PlusIcon size={16} />
            Adicionar produto a venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista de produtos adicionados a venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {formatCurrency(productTotal)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {selectedProducts.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </SheetContent>
  );
};

export default UpsertSheetContent;
