"use client";

import { upsertProducts } from "@/app/_actions/product/upsert-products";
import {
  UpsertProductSchema,
  createProductsSchema,
} from "@/app/_actions/product/upsert-products/schema";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";

interface UpsertProductDialogContentProps {
  defaultValues?: UpsertProductSchema;
  onSuccess?: () => void;
}

const UpsertProductDialogContent = ({
  defaultValues,
  onSuccess,
}: UpsertProductDialogContentProps) => {
  const form = useForm<UpsertProductSchema>({
    shouldUnregister: true,
    resolver: zodResolver(createProductsSchema),
    defaultValues: defaultValues ?? {
      name: "",
      price: 0,
      stock: 1,
    },
  });

  const isEditing = !!defaultValues;

  const onSubmit = async (data: UpsertProductSchema) => {
    try {
      await upsertProducts({ ...data, id: defaultValues?.id });
      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <AlertDialogHeader>
            <DialogTitle>
              {isEditing ? "Editar" : "Criar"} novo produto
            </DialogTitle>
            <DialogDescription>Insira as informações abaixo</DialogDescription>
          </AlertDialogHeader>
          {/* inputs */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* input */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço do produto</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Digite o preço do produto" {...field} /> */}
                  <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    fixedDecimalScale
                    decimalScale={2}
                    prefix="R$ "
                    allowNegative={false}
                    customInput={Input}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                    {...field}
                    onChange={() => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* input */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock do produto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite o stock do produto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Button */}
          <AlertDialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" type="reset">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="gap-2"
            >
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" size={16} />
              )}
              Salvar
            </Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertProductDialogContent;
