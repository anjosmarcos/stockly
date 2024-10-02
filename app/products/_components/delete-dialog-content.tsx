import { deleteProducts } from "@/app/_actions/product/delete-products";
import {
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteProductDialogContentProps {
  productId: string;
}

const DeleteProductDialogContent = ({
  productId,
}: DeleteProductDialogContentProps) => {
  const handleContinueClick = async () => {
    try {
      await deleteProducts({ id: productId });
      toast.success("Produto deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao deletar o produto.");
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          Você tem certeza que deseja deletar esse produto?
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
